---
layout: post
title: "Optimizando costos en GitHub Actions"
date: 2020-05-30 00:00:00 -0500
categories: Ruby, Rails, GitHub, Testing
permalink: /posts/optimizando-costos-en-github-actions
---

[English version](/posts/optimizing-costs-in-github-actions)

Recientemente en [EasyBroker](https://www.easybroker.com/) migramos nuestro sistema de Integración continua a GitHub Actions.

Inicialmente configuramos un Workflow con 12 contenedores considerando que era una buena idea para identificar rápidamente donde fallaron las pruebas.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_e9sjqq.png)

En promedio cada contenedor tardaba 6 minutos en completar su tarea, mientras que 2 contenedores en específico (modelos y un grupo de controladores) tardaban en promedio 12 minutos.
![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%201.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892643/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_1_rbxmvb.png)

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%202.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892643/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_2_oornut.png)

Después de una semana trabajando con esta nueva implementación recibimos un mensaje de GitHub alertándonos que estábamos por llegar al límite de uso de la capa gratuita que GitHub nos provee 💸💸💸, por lo que decidimos investigar.

En primer lugar notamos que de los 6 minutos que tardaban los 10 contenedores más rápidos, en promedio 4 minutos eran tareas de configuración.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%203.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892643/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_3_ryutfn.png)

Posteriormente notamos que a pesar de tener el cache "configurado", nuestro contenedor estaba descargando las gemas una y otra vez.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%204.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_4_mkohr1.png)

Y finalmente solo se invertían entre 20 y 50 segundos en ejecutar las pruebas.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%205.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_5_dhlisu.png)

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%206.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892643/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_6_u1saes.png)

## Ahorrándonos unos minutos

Lo primero que decidimos hacer fue pasar de 12 contenedores a 2 contenedores. Considerando que las pruebas de los controladores de agentes son las que toman más tiempo, decidimos que lo modelos podían convivir con las pruebas de los 10 contenedores que tardaban 6 minutos en promedio, terminando con una configuración como la siguiente.

Antes

```yaml
strategy:
      fail-fast: false
      matrix:
        test_folder: [models, helpers, jobs, lib, mailers, presenters, services, controllers/*.rb, controllers/admin, controllers/agent, controllers/webhooks, controllers/api]
```

Ahora

```yaml
strategy:
      fail-fast: false
      matrix:
        test_folder: [models helpers test/jobs test/lib test/mailers test/presenters test/services test/controllers/*.rb test/controllers/admin test/controllers/webhooks testcontrollers/api, controllers/agent]

```

Lo siguiente fue actualizar el apartado de cache para hacerlo funcionar, nuestra configuración utilizaba la versión 1 de actions/cache e incluía la opción de restore-keys la cual según la documentación es [opcional](https://github.com/actions/cache#inputs).

```yaml
- name: Gem cache
        uses: actions/cache@v1
        with:
          path: vendor/bundle
          key: ${{ runner.os }}-gems-${{ hashFiles('**/Gemfile.lock') }}
          restore-keys: |
            ${{ runner.os }}-gems-
```

Por lo que simplemente actualicé a la versión 2 de la acción y removí la opción de restore-keys al considerar que no es algo que requerimos aún.

```yaml
- name: Gem cache
        uses: actions/cache@v2
        with:
          path: vendor/bundle
          key: ${{ runner.os }}-gem-use-ruby-${{ hashFiles('**/Gemfile.lock') }}
```

Además de eso, revisando el paso donde se instalan las dependencias, encontré que lo teníamos fusionado con el paso para crear la base de datos y nos mostraba un deprecation warning al momento de ejecutar bundle install  con la bandera para indicar la ruta de instalación de las gemas.

```yaml
- name: Bundle Install and Create DB
        env:
          RAILS_ENV: test
          DB_PASSWORD: root
          DB_PORT: ${{ job.services.mysql.ports[3306] }}
        run: |
          sudo /etc/init.d/mysql start
          cp config/database.ci.yml config/database.yml
          gem install bundler --version 2.0.2 --no-ri --no-rdoc
          bundle install --jobs 4 --retry 3 --path vendor/bundle
          bin/rails db:setup
```

```bash
[DEPRECATED] The `--path` flag is deprecated because it relies on being remembered across bundler invocations, which bundler will no longer do in future versions. Instead please use `bundle config set path 'vendor/bundle'`, and stop using this flag
```

Por lo que opté por separarlo en 2 pasos independientes y actualizar la forma en la que bundler detecta la ubicación de las gemas.

```yaml
- name: Bundle install
        run: |
          gem install bundler --version 2.0.2 --no-ri --no-rdoc
          bundle config path vendor/bundle
          bundle install --jobs 4 --retry 3
```

```yaml
- name: Create DB
        env:
          RAILS_ENV: test
          DB_PASSWORD: root
          DB_PORT: ${{ job.services.mysql.ports[3306] }}
        run: |
          sudo /etc/init.d/mysql start
          cp config/database.ci.yml config/database.yml
          bin/rails db:setup
```

Con estos pequeños cambios logramos pasar de  4 minutos en la instalación de las gemas a tan solo 4 segundos.

Antes

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%207.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_7_tawvjy.png)

Ahora

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%208.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_8_dyhwlj.png)

Como paso final para esta primer etapa de optimización, revisé los pasos dónde realizábamos la instalación de algunas dependencias por apt-get y encontré que algunos eran innecesarios. Por ejemplo, cuando verificábamos la conexión a MySQL, estábamos tratando de instalar el cliente que ya está disponible y esto tomaba 20 segundos en promedio (entre verificar la instalación y verificar que la conexión fue exitosa) con solo remover la llamada de apt-get que no era necesario logramos bajar a un promedio de 6 segundos.

Antes

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%209.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892645/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_9_odbx1j.png)

Ahora

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%2010.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_10_s1uik1.png)

## Notas finales

Esta fue la primer etapa de nuestra actualización para tener un sistema de integración continua saludable y eficiente, logramos pasar de un promedio de 1 hora 30 minutos por ejecución.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%2011.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_11_tt7ewa.png)

A tan solo 20 minutos en promedio.

![Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled%2012.png](https://res.cloudinary.com/juancrg90/image/upload/v1590892644/Optimizing%20costs%20in%20GitHub%20Actions%207b464c031286482f9b1db7b6d9b72442/Untitled_12_kifcvl.png)

Como experiencia nos llevamos que, en servicios donde la factura es por tiempo de uso, el ahorrar segundos es crucial y es importante poner atención a los detalles por pequeños que sean. Como en el caso de la instalación de dependencias que ya existen en el contenedor. Puede que 13 segundos ahorrados suene a nada, pero si lo multiplicamos por el número de builds que tiene tu empresa al día, puede que logres ahorrar un par de horas en tu factura.

Lo siguiente que haremos será tratar de mover la instalación de dependencias que requieren ser instaladas manualmente a un contenedor Docker (aún necesito investigar si es posible esto) y utilizar alguna herramienta como [TestProf](https://evilmartians.com/chronicles/testprof-a-good-doctor-for-slow-ruby-tests) para identificar los tests más lentos y ver la manera de optimizarlos.
