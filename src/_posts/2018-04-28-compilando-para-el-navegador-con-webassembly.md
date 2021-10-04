---
layout: post
title: "Compilando para el navegador con WebAssembly"
date:   2018-04-28 22:04:00 -0500
categories: JavaScript, WebAssembly, Performance, C++, C
permalink: /essays/compilando-para-el-navegador-con-webassembly
---

![](http://res.cloudinary.com/juancrg90/image/upload/v1524945789/webassembly/webassembly-logo.svg)

## ¿Qué es WebAssembly?

WebAssembly, abreviado conocido como WASM, es una nueva capacidad para la web. Es un blanco de compilación para lenguajes utilizados en aplicaciones nativas. Es rápido, portable y seguro.

## ¿Viene a Reemplazar a JavaScript?

No, JavaScript es un lenguaje muy dinámico y llegó para quedarse.

De manera resumida podemos considerar que WebAssembly viene a ayudar a JavaScript con tareas que requieran performance. Permitiéndonos tener más libertad a la hora de elegir un lenguaje para implementar nuestra solución.

## ¿Qué puedo hacer con él?

Código Existente de C/C++ lo podemos correr en el navegador, de manera que podamos realizar tareas que requieran un alto rendimiento utilizando JS sólo como un “pegamento” entre nuestra lógica y el navegador.

El siguiente ejemplo nos muestra como código existente de C es llamado con JavaScript mostrándonos valores de un dado.

![dice-roll-code](http://res.cloudinary.com/juancrg90/image/upload/v1524945819/webassembly/dice-c.png)

![dice-roll-html](http://res.cloudinary.com/juancrg90/image/upload/v1524945819/webassembly/dice-html-code.png)

![Dice Roll](http://res.cloudinary.com/juancrg90/image/upload/v1524945819/webassembly/dice-html.gif)

Si deseas ver el ejemplo completo puedes encontrarlo [aquí](https://github.com/JuanCrg90/wasm-playground/tree/master/04.dice-roll).

Un caso donde utilizar WASM puede ser una buena opción es en la creación de juegos para el navegador. La página oficial del proyecto nos muestra un demo de un juego de tanques optimizado para trabajar con WASM.

![](https://dzwonsemrish7.cloudfront.net/items/2u0z3a041p0K3O320h3g/Screen%20Recording%202018-04-26%20at%2008.52%20PM.gif)
Si deseas probarlo, puedes visitar el siguiente [enlace](http://webassembly.org/demo/Tanks/).

Otra área de oportunidad son las tareas relacionadas con procesamiento de imágenes o video. El siguiente demo muestra un algoritmo de detección de rostros en el que se compara el rendimiento de WASM vs una implementación en JavaScript.

![](https://dzwonsemrish7.cloudfront.net/items/0x002t2Q0T2w2I3i2Z2b/Screen%20Recording%202018-04-26%20at%2010.16%20PM.gif)

Si deseas probar el demo en tu equipo puedes visitar el siguiente [enlace](https://websightjs.com/).

## ¿Qué lenguajes están soportados?

La versión 1 del MVP considera C/C++ y Rust como lenguajes para WebAssembly, sin embargo ya hay gente trabajando en opciones para otros lenguajes como C#. Hace unos días vi que ya hay gente trabajando en soportar Go.

## ¿Entonces puedo acceder a sockets, archivos, APIs nativas desde WASM?

![sudo rm -rf /](http://res.cloudinary.com/juancrg90/image/upload/v1524945831/webassembly/rm-all.gif)

No, WebAssembly corre dentro de un sandbox en el navegador y sólo puede acceder a Web APIs (igual que Javascript). Sin embargo el SDK de Emscripten provee wrappers de varias apis nativas permitiendo simplificar el portar código nativo al navegador (Por ejemplo sockets a web sockets, GL a WebGL, OpenAL a WebAudio, entre otras)

## ¿Que navegadores lo soportan actualmente?
Al día de hoy WebAssembly está soportado en los principales navegadores del mercado, siendo Internet Explorer el único que no lo soporta, por lo que si tu aplicación aún debe mantener IE no es una opción 100% viable. Esperemos en un futuro no muy lejano ya no sea necesario tener que considerar IE a la hora de crear nuestras aplicaciones.

![can I use webassembly](http://res.cloudinary.com/juancrg90/image/upload/v1524945792/webassembly/caniuse.png)
https://caniuse.com/#search=webassembly

## ¿Entonces cómo desarrollador frontend debería aprender C y C++ para utilizar WASM?
No necesariamente. La idea de WASM es el crear librerías que sean llamadas utilizando Javascript. Posiblemente en un futuro NPM tendrá varios módulos de proyectos hechos en WASM (Spoiler ya hay algunos).

## Conclusión

WebAssembly es una alternativa para el navegador que en unos años tomará mucha fuerza, por lo que vale la pena tenerlo en cuenta como una herramienta a aprender desde ahora.
