---
layout: post
title: "Unificando estilos de programación con EditorConfig"
date:   2016-10-30 08:10:00 -0500
categories: Vim, sublime text, editor config, coding style
permalink: /essays/unificando-estilos-de-programacion-con-editorconfig-2
---

![](http://res.cloudinary.com/juancrg90/image/upload/v1475299394/Editor-Config_kmh3pc.png)

Bueno, ya tengo bastante tiempo sin escribir, han sido multiples motivos tanto personales como profesionales los que me orillaron a tener mi blog algo olvidado. Pero bueno, dejando todo eso de lado, hoy quiero hablarles de EditorConfig y como este puede ayudarnos en nuestros proyectos de software.

A menudo cuando trabajamos en proyectos de software en los cuales están involucradas más personas, ya sea desde un proyecto de clase hasta un proyecto de open source, nos enfrentamos al hecho de que cada quien tiene su propio estilo de programación, así como sus herramientas de trabajo favoritas. por lo que mantener consistencia puede volverse un dolor de cabeza. La mayoría de los editores de código nos permiten configurar si queremos utilizar espacios o tabulación para la sangría del código así como el tamaño de esta, también nos permiten indicar el fin de línea de los archivos, entre muchas otras opciones. El problema radica en el tener que configurar cada editor para cada proyecto dependiendo del estilo que necesitemos seguir.


![Spaces over tabs](http://res.cloudinary.com/juancrg90/image/upload/v1475297150/silicon_valley_spaces_over_tabs_vim_over_emacs_by_digi_matrix-da824de_fgclb0.gif)

Para estos casos, existe editorConfig, una herramienta que nos permite mediante un archivo de configuración, indicar cual será el estilo a seguir en el proyecto. Para utilizarlo debemos definir un archivo `.editorconfig` en la raíz de nuestro proyecto y configurarlo acorde a nuestro estilo de programación.

```
# EditorConfig is awesome: http://EditorConfig.org

# top-most EditorConfig file
root = true

# Unix-style newlines with a newline ending every file
[*]
end_of_line = lf
insert_final_newline = true

# Matches multiple files with brace expansion notation
# Set default charset
[*.{js,py}]
charset = utf-8

# 4 space indentation
[*.py]
indent_style = space
indent_size = 4

# Tab indentation (no size specified)
[Makefile]
indent_style = tab

# Indentation override for all JS under lib directory
[lib/**.js]
indent_style = space
indent_size = 2

# Matches the exact files either package.json or .travis.yml
[{package.json,.travis.yml}]
indent_style = space
indent_size = 2
```

EditorConfig trabaja por default en editores de código basados en IntelliJ. Sin embargo si queremos utilizarlo en nuestro editor favorito como [vim](https://github.com/editorconfig/editorconfig-vim#readme) o [atom](https://github.com/sindresorhus/atom-editorconfig#readme) deberemos instalar un plugin que se encargue de dar seguimiento a las reglas que hayamos definido en nuestro archivo de configuración.

Si quieres aprender más de cómo utilizar eficientemente EditorConfig, te recomiendo visitar la página oficial de proyecto.

Referencias:
- http://editorconfig.org/
- https://www.jetbrains.com/idea/
