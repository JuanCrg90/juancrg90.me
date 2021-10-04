---
layout: post
title:  "Meteor un framework de JavaScript para el 2015"
date:   2014-12-29 06:12:00 -0500
categories: Frameworks, JavaScript, Meteor, Desarrollo Web
permalink: /essays/meteor-un-framework-de-javascript-para-el-2015
---

![Meteor logo](http://res.cloudinary.com/juancrg90/image/upload/v1422840430/Diciembre%202014/meteor-logo.png)


[Meteor](https://www.meteor.com) es un framework para desarrollo de aplicaciones web, el cual utiliza Node.js en su núcleo, permitiéndonos de esta manera programar en un mismo lenguaje (JavaScript) tanto del lado del cliente como del servidor. Entre sus principales características esta el poder crear aplicaciones "Realtime" de una manera realmente rápida y sencilla. Actualmente se encuentra en la versión 1.0.2.1.


## Filosofía del framework

* **Transferencia de datos**. Meteor no envía HTML sobre la red. El servidor envía los datos y permite al cliente visualizarlo.
* **Un solo lenguaje**. Meteor permite escribir tanto el cliente como el servidor de tu aplicación en JavaScript.
* **Base de datos en todas partes**. Puedes usar los mismos métodos para acceder a la base de datos tanto desde el cliente, como desde el servidor.
* **Compensación de latencia**. En el cliente, Meteor presolicita  los datos y simula modelos para hacer parecer que la llamada al servidor es instantánea.
* **Reactividad en Full Stack**. En Meteor, el tiempo real es por defecto. Todas las capas de la aplicación, desde la base de datos hasta la plantilla, se actualizan de forma automática cuando es necesario.
* **Adopta el ecosistema**. Meteor es código abierto, se integra con herramientas y frameworks de código abierto.
* **La simplicidad es igual a la productividad**. La mejor manera de hacer que algo parezca simple es hacerlo simple. La principal funcionalidad de Meteor es clara, crear bellas APIs


## El protocolo de datos distribuidos
Entre sus principales cualidades, Meteor posee el protocolo de datos distribuidos (**DDP** por sus siglas en inglés) introducido en su versión 0.2.0. Es un protocolo cliente servidor para consultar y actualizar la base de datos en el servidor y sincronizar dichas actualizaciones a los clientes. Utiliza el patrón de mensajería publish-suscribe.


## El explorador de paquetes
Otra de las mejores características de Meteor es su gestor de paquetes de nombre **[Atmosphere](https://atmospherejs.com)**. En el cual podemos encontrar implementaciones para Meteor de utilerías comúmente utilizadas en desarrollo web. Algunos ejemplos:

* [Bootstrap](https://atmospherejs.com/ian/bootstrap-3).
* [Jquery](https://atmospherejs.com/meteor/jquery).
* [Underscore](https://atmospherejs.com/meteor/underscore).
* [momentjs](https://atmospherejs.com/momentjs/moment).

Todos estos al alcance de nosostros con solo teclear en nuestra terminal el comando `meteor add <nombre de paquete>`.

Adicionalmente al ser código abierto podemos [escribir nuestros propios paquetes](http://docs.meteor.com/#/full/writingpackages) de acuerdo a nuestras necesidades, ya sea que lo subamos a la atmósfera, o lo mantengamos para nuestro uso exclusivo.



## Por dónde empezar
Al ser un framework muy reciente la mayoría de los tutoriales que se encuentran en línea, se encuentran algo desactualizados por lo que lo más recomendable para empezar es seguir el [tutorial en su página oficial ](https://www.meteor.com/install) y leer la [documentación](http://docs.meteor.com/#/full) .



#Referencias
* [Página del proyecto](https://www.meteor.com).
* [Siete Principios](http://docs.meteor.com/#/basic/sevenprinciples).
* [Introducing DDP](https://www.meteor.com/blog/2012/03/21/introducing-ddp).
* [Atmosphere sitio oficial](https://atmospherejs.com).
* [Tutorial de inicio](https://www.meteor.com/install).
* [Documentación Oficial](http://docs.meteor.com/#/full).

