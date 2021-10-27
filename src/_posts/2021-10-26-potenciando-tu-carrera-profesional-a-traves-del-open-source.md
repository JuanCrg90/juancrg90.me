---
layout: post
title: "Potenciando tu carrera profesional a través del Open Source"
date: 2021-10-26 00:00:00 -0500
categories: beginners, career, spanish, Open Source
permalink: /posts/potenciando-tu-carrera-profesional-a-traves-del-open-source
---

Durante las últimas semanas tuve la oportunidad de dar una charla titulada "Potenciando tu carrera profesional a través del Open Source" en diferentes eventos y comunidades, te comparto la grabación de la presentación con el equipo de [Código Facilito](https://codigofacilito.com) en su 10 Aniversario.

<div class="center">
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/C5KdEAQd4m8?controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

En esta charla traté de plasmar algunos de los aprendizajes obtenidos a lo largo de casi 6 años contribuyendo a proyectos de código abierto, si no tuviste la oportunidad de verla o bien prefieres el formato en texto, aquí te comparto el contenido de esta.

Primero que nada el contenido de este blogpost no es sobre qué es el Open Source o como contribuir a este, está más bien orientado en por qué comenzar a contribuir.

![Open Source Meme](https://res.cloudinary.com/juancrg90/image/upload/v1635301091/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled.png)

Nota: Todo lo expresado en esta charla viene desde mi experiencia personal así que puede que haya cosas que a otros no les resulte relevantes o bien no sea el camino que siguieron, sin embargo si estas tomándote el tiempo de leerlo espero sea de tu agrado.

![Personal Experience Meme](https://res.cloudinary.com/juancrg90/image/upload/v1635301091/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_1.png)

## Contribuyendo desde tu comezón

![amazon-product-api](https://res.cloudinary.com/juancrg90/image/upload/v1635301090/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_2.png)

Creo la mejor manera de explicarte esto es empezar por mi primer intento por contribuir a un proyecto de código abierto. Hace unos años estaba trabajando en una devshop donde necesitábamos implementar un meta-buscador de productos y una de nuestras fuentes de información era Amazon, cuando estábamos haciendo la implementación nos encontramos con una biblioteca de JavaScript de nombre [t3chnoboy/amazon-product-api](https://github.com/t3chnoboy/amazon-product-api/) la cual contenía algunas de las operaciones que necesitábamos en nuestro proyecto; sin embargo, ya que avanzamos con la implementación, nos encontramos con que no todas las operaciones que íbamos a utilizar estaban contenidas en esta dependencia, por lo que decidí ponerme a leer cómo estaba hecha la biblioteca e intenté agregar las operaciones que nos faltaban.

![my-first-pull-request](https://res.cloudinary.com/juancrg90/image/upload/v1635301090/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_3.png)

Ya que terminé de realizar el primer cambio, decidí probar suerte y abrí un pull request titulado [Added support for ItemPage](https://github.com/t3chnoboy/amazon-product-api/pull/2) donde después de un poco de feedback por parte de [t3chnoboy](https://github.com/t3chnoboy)  terminó siendo integrado.

![collaboration-invitation](https://res.cloudinary.com/juancrg90/image/upload/v1635301090/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_4.png)

Después de enviar otro aporte al repositorio t3chnoboy me ofreció hacerme [colaborador del proyecto](https://github.com/t3chnoboy/amazon-product-api/pull/3#issuecomment-82641462) para que pudiera hacer aportes sin necesidad de depender de mi Fork, no sé si fue porque ya no le interesaba tanto la dependencia o bien porque vio mi interés por seguir haciéndole mejoras.

![Grogu meme](https://res.cloudinary.com/juancrg90/image/upload/v1635301090/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_5.png)

De este primer intento aprendí que no se necesita ser un Super Senior para comenzar a contribuir, solo es de tener una necesidad y un poco de ganas de intentarlo. **La comunidad está abierta a recibir gente nueva y a ayudarte a mejorar, así que no te descartes sin intentarlo.**

## No todo lo que envíes será aceptado

![cropuploader package](https://res.cloudinary.com/juancrg90/image/upload/v1635301090/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_6.png)

Por esas fechas estaba explorando un paquete llamado cropuploader para un framework de JavaScript llamado Meteor JS, envié un [pull request](https://github.com/jamgold/cropuploader/pull/3) donde agregaba algunos archivos de configuración faltantes para que el ejemplo funcionará y apliqué una indentación automática para satisfacer a JSHint. Sin embargo, al autor le parecieron innecesarios estos cambios de estilo y prefirió aplicar él mismo los cambios de configuración que consideró necesarios, cerrando mi pull request.

![cropuploader-pr](https://res.cloudinary.com/juancrg90/image/upload/v1635301091/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_7.png)

De esta experiencia aprendí que no todo lo que envíes a un repositorio público necesariamente será aceptado, pero esta no es razón para desmotivarte. **Hay muchos proyectos ahí afuera esperando gente entusiasta en busca de sumarse a un proyecto.**

![no-meme](https://res.cloudinary.com/juancrg90/image/upload/v1635301091/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_8.png)

## Nunca sabes quién terminará viendo tu trabajo

![react-stl-viewer](https://res.cloudinary.com/juancrg90/image/upload/v1635301091/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_9.png)

En otra ocasión necesitábamos hacer una prueba de concepto para un proyecto que teníamos que estimar relacionado con visualizar [archivos de impresión 3D STL](https://es.3dsystems.com/quickparts/learning-center/what-is-stl-file). Parte de los requerimientos del proyecto era que este fuera desarrollado con [React](https://reactjs.org), así que en nuestra búsqueda encontramos una biblioteca de nombre [react-stl-viewer](https://github.com/chiedolabs/react-stl-viewer) la cual hacia la implementación para visualizar los archivos STL utilizando [Three.js](https://threejs.org). Después de echar un ojo al código terminamos haciendo un refactor de esta biblioteca para remover código duplicado que encontramos y hacerla más mantenible, ya que existía la posibilidad de si el cliente decidía seguir adelante con el proyecto era una dependencia que íbamos a terminar utilizando en producción, y no hacer estas mejoras se podía volver un dolor de cabeza potencial; y pues hecho dicho refactor decidimos enviar su respectivo [pull request](https://github.com/chiedolabs/react-stl-viewer/pull/11).

![Course invitation](https://res.cloudinary.com/juancrg90/image/upload/v1635301091/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_10.png)

Lo interesante de este aporte fue que años después me contactaron para invitarme a grabar un curso relacionado con esta dependencia, aunque lamentablemente por falta de tiempo no pude  seguir adelante con ello. Sin embargo de esta experiencia me quedó el aprendizaje de que **uno nunca sabe quién verá tu trabajo y tal vez termine abriéndote puertas a cosas que no esperabas.**

## Creando impacto con tus aportes

![Solidus](https://res.cloudinary.com/juancrg90/image/upload/v1635301091/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_11.png)

Más delante en mi carrera, estuve trabajando en un proyecto de eCommerce donde utilizábamos [Solidus](https://solidus.io) como framework de desarrollo. Conforme iba haciendo mejoras al proyecto, aportes para el framework iban saliendo a la luz.

![solidus pull requests](https://res.cloudinary.com/juancrg90/image/upload/v1635301091/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_12.png)

De los aportes que pude ir enviando al framework, hubo uno que me dejó un aprendizaje muy valioso, fue el cambio titulado [[API] Complete Shipments Big json with small json fields #3221](https://github.com/solidusio/solidus/pull/3221). Este cambio consistía en fusionar los campos que devolvía el endpoint de Shipments Big JSON con los campos del endpoint de Shipments Small JSON, ya que de primera vista daba la impresión de que small JSON era solo un subset de Big JSON pero en la práctica contenían diferente información, lo que hacía que no fuera posible intercambiarlos.

![Solidus API PR](https://res.cloudinary.com/juancrg90/image/upload/v1635301091/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_13.png)

Después de hablarlo con uno de los miembros del Core Team en el Slack de la comunidad, apliqué el cambio, el cual literal fue agregar solo 1 línea de código a un archivo y remover 10 líneas que ya no eran necesarias. Este Pull request terminó etiquetado como un cambio importante para el release de la siguiente versión del framework. **De esta experiencia aprendí que cambios grandes no implican tocar miles de archivos sino estar consciente del impacto que tu contribución puede causar al ecosistema.**

## Enseñando desde el Open Source

Para este momento de mi carrera ya había trabajado como maestro en una universidad local y había participado como mentor en un bootcamp. Sin embargo, el papel del Open Source era el de utilizar frameworks o librerías para hacer proyectos más allá de conocer cómo estaban hechas las dependencias que se utilizaban. En 2019 tuve la oportunidad de ser aceptado como mentor en el programa de [RubyMe](https://rubyme.org/) organizado por Ruby Together, este programa consistía en apoyar a un mentee a iniciar a hacer aportes al Open Source utilizando Ruby. Mis aportes a proyectos de Open Source fueron mi carta de presentación para formar parte de este proyecto.

![RubyMe](https://res.cloudinary.com/juancrg90/image/upload/v1635301091/Potenciando%20tu%20carrera%20profesional%20a%20traves%20del%20open%20source/Untitled_14.png)

Durante 3 meses estuve trabajando con Alicia, una chica de Atlanta que decidió hacer su [cambio de carrera de ciencias políticas a desarrollo de software](https://rubytogether.org/news/2019-06-30-career-switching-into-code). Estuvimos haciendo aportes a diferentes proyectos, enviando desde mejoras a la documentación así como funcionalidades nuevas. Considero que lo más interesante durante este programa de mentorías fue hacer la transferencia de conocimiento de cómo abordar un proyecto cuando no estás familiarizado con él.

## Concluyendo

- Trata de que tus aportes sean relacionados con algo que estés trabajando, de esta manera no lo verás como algo forzado o un trabajo extra.
- No hay aportes pequeños, siempre que sea algo para mejorar el proyecto es un candidato a ser integrado. Roma no se hizo en un día, posiblemente quieres que tus aportes sean al repositorio más importante de la comunidad a la que perteneces, sin embargo, hasta hacer una corrección en la documentación es algo que ayuda a crear un mejor ecosistema y sentará las bases de otros aportes que en un futuro estarás haciendo.
- Considera el Open Source como parte de tu portafolio profesional, un pull request o merge request público dice más que un curriculum lleno de estrellitas sin pruebas.
- Usa el Open Source como una herramienta para enseñar a otros o aprender algo nuevo. A menudo escucho comentarios como “no tengo experiencia” o "no sé por dónde empezar". El Open Source es un excelente lugar para empezar a crear experiencia comprobable, incluso antes de empezar a buscar trabajo activamente. Las guías de contribución, los issues y los pull request existentes son un excelente lugar para que empieces a relacionarte con el proyecto y tengas un mejor entendimiento de a dónde va este encaminado.

Y bueno, quiero agradecerte por leer hasta aquí, espero este pequeño ensayo te sea de utilidad en tu camino como desarrollador, si quieres charlar puedes encontrarme en redes sociales en [@JuanCrg90](https://twitter.com/Juancrg90) y en la comunidad de [Calzada Code](https://twitter.com/CalzadaCode), mis DMs están abiertos.
