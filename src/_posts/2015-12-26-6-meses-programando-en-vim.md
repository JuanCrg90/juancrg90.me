---
layout: post
title: "6 Meses usando Vim"
date:   2015-12-26 23:12:00 -0500
categories: JavaScript, Open Source, Node.js, Vim, Code Editors, Plugins, Programming
permalink: /essays/6-meses-programando-en-vim
---

![](http://res.cloudinary.com/juancrg90/image/upload/v1450592438/Captura_de_pantalla_de_2015-12-19_12-56-43_rfiw7y.png)

Hace 6 meses inicié a utilizar Vim como mi editor de código principal, y decidí escribir esta entrada para platicar un poco de mi experiencia.

## ¿Qué es Vim?
Vim significa Vi IMproved, la cual es una versión mejorada del editor de texto Vi. Dicho editor se encuentra presente en todos los sistemas Unix.

## Motivación
Durante mis estudios universitarios, desarrollé aplicaciones principalmente en los lenguajes C y C++, utilizando al inicio [dev-c++](http://www.bloodshed.net/devcpp.html) como mi editor de código. Realmente esto no fue una elección, sino lo que se me solicitó en su momento. Posteriormente, salté entre diferentes editores y ambientes de desarrollo, buscando ese espacio donde me sintiera como en casa al desarrollar. Pasando por [Visual Studio](https://www.visualstudio.com/), [Geany](http://www.geany.org/), [Eclipse](https://eclipse.org/), [Netbeans](https://netbeans.org/), [Qt-Creator](http://www.qt.io/ide/) y finalmente [Sublime Text](http://www.sublimetext.com/) el cual es realmente cómodo con el detalle de que si no tienes una licencia, te saldrá un letrero solicitándote amablemente considerar comprarlo. Sin embargo, siempre que tenía que trabajar en un sistema que no poseía una interfaz gráfica era un dolor de cabeza, puesto que nano me parecía incomodo y usar Vim era casi estar haciendo conjuros mágicos para poder moverme dentro él. No fue sino hasta julio de este año que decidí darle una oportunidad a Vim y migrar completamente a él.

### Primeros pasos
Después de leer varios artículos en blogs, en los que se mencionaban las ventajas de usar Vim y la experiencia de los autores durante el aprendizaje de este, comencé mi recorrido. Lo primero fue aprender los comandos básicos para moverme adecuadamente dentro del editor. Para esto comencé desempolvando un cheatsheet que hace tiempo un maestro me había enviado.

![Vim cheatsheet](http://res.cloudinary.com/juancrg90/image/upload/v1450596081/vim_d24zmy.jpg)

Posteriormente comencé con el vimtutor el cual me mostró de manera práctica lo que todo usuario novato debería saber:

![Vim Tutor](http://res.cloudinary.com/juancrg90/image/upload/v1450596264/Vim%20Tutor.png)

Además de jugar [Vim adventures](http://vim-adventures.com/) para acostumbrarme a usar **h,j,k,l** para el movimiento

![Vim adventures](http://res.cloudinary.com/juancrg90/image/upload/v1450597120/Vim%20Adventure.png)

### Poniéndome cómodo
Una vez que me acostumbré a los comandos básicos, comencé a buscar la forma de hacer de Vim mi nuevo hogar.

Lo primero fue buscar la manera de instalar plugins a mi editor de una manera cómoda y sencilla. Para esto tuve que elegir entre 3 opciones, [Pathogen](https://github.com/tpope/vim-pathogen), [Vundle](https://github.com/VundleVim/Vundle.vim) y [Neobundle](https://github.com/Shougo/neobundle.vim). Eligiendo **Vundle** como mi opción, el motivo fue que la mayoría de los blogs que leí, lo utilizaban para sus ejemplos. Sin embargo, NeoBundle ofrece algunas características, las cuales lo posicionan como una mejor opción, por lo que probablemente en un futuro salte a él.

Una vez que tuve la forma de instalar plugins sin tanto rollo, comencé buscando un tema para mi editor. Como estoy muy acostumbrado a los colores que me da el tema Monokai de sublime text, busqué lo mas cercano a esté, encontrando el tema [Molokai](https://github.com/tomasr/molokai) de [Tomas Restrepo](https://github.com/tomasr). El cual se ajusta a lo que estaba buscando.

![Vim Molokai](http://res.cloudinary.com/juancrg90/image/upload/v1450678466/Vim%20Molokai.png)

Lo siguiente fue buscar una forma efectiva de moverme entre archivos, para ello, buscaba algo similar a la barra lateral y al comando ctrl + p de sublime text, encontrándome con [Nerdtree](https://github.com/scrooloose/nerdtree). El cual permite explorar a manera de árbol los directorios del proyecto.

![NerdTree](http://res.cloudinary.com/juancrg90/image/upload/v1450729564/Nerdtree.png)

Y con el plugin [ctrlp.vim](https://github.com/ctrlpvim/ctrlp.vim), el cual permite buscar un archivo específico, con solo saber su nombre.

![ctrlp.vim](http://res.cloudinary.com/juancrg90/image/upload/v1450729564/ctrl-p.png)

Ya teniendo una forma rápida de moverme entre directorios y archivos, comencé a trabajar con él, integrando gradualmente plugins que me simplificarán tareas, como el caso de [Emmet-vim](https://github.com/mattn/emmet-vim) para las abreviaciones al escribir código HTML, [Syntastic](https://github.com/scrooloose/syntastic) para la revisión de sintaxis en diferentes lenguajes, [vim-multiple-cursors](https://github.com/terryma/vim-multiple-cursors) para poder editar múltiples lineas a la vez, entre otros.

## Opinión Personal

Realmente aprender Vim, ha sido una experiencia bastante divertida e interesante, aunque para muchos puede ser como "sólo es un editor de texto", es la herramienta en la que paso la mayor parte de mi día, por lo que es importante sentirme cómodo con ella. Al inicio lo más complicado fue acostumbrarme a moverme con las letras, por lo que en un inicio tenía habilitadas las flechas para esos momentos de "flojera", pero no fue hasta que las desactivé totalmente y comencé a jugar [Nethack](http://www.nethack.org/) que logré acostumbrarme del todo a ellas. Otro problema que experimenté en un inicio, fue el poder pegar cosas del navegador en el editor sin que lo colocará por ningún lado, aunque esto solo fue falta de conocimiento del comando `:set paste` y `:set nopaste` los cuales son de mucha ayuda.

Puedo decir que estando en un medio como el desarrollo de aplicaciones, vale la pena aprender a usar un editor como Vim puesto que no importa donde te encuentres siempre puedes bajar tus dotfiles y sentirte casi como en casa.

Finalmente, un consejo que se me dio en un inicio y quiero compartir es, **no coloques en tu vimrc, cosas que no comprendas, mejor primero entiende que estas haciendo y posteriormente agrégalo, eso te dará un mejor control de tu configuración.**

Si estas interesado en saber que configuración de Vim utilizo en mi día a día, puedes consultar mi archivo de configuración en mi repositorio de github, [click aquí](https://github.com/JuanCrg90/dotfiles/blob/master/vim/vimrc.symlink).

