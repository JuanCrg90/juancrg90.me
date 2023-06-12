---
layout: post
title: "Cómo utilizar turbo_frame_tag en un layout personalizado"
date: 2023-06-11 00:00:00 -0500
categories: Rails, Ruby, Hotwire, Turbo
permalink: /posts/como-utilizar-turbo-frame-tag-en-un-layout-personalizado
---

Me encuentro trabajando en un side project utilizando Rails 7 y Hotwire, una de las funciones que implementé fue una ventana modal la cual es llamada utilizando `turbo_frame_tag` para hacer el render del formulario de creación. Todo iba bien hasta que decidí incluir un layout personalizado para el dashboard del usuario con sesión.

## TLDR;

No cargues el layout de manera estática usando `layout 'custom_layout'`. En su lugar, utiliza un método que revise si la solicitud es un `turbo_frame_tag`.

```ruby
class Foo::ApplicationController < ApplicationController

  layout :set_custom_layout_with_turbo_frame_support

private

  def set_custom_layout_with_turbo_frame_support
    return 'custom_layout' unless turbo_frame_request?
  end
end
```

## El problema

Inicialmente la lógica para cargar la ventana modal estaba compuesta de 3 elementos:

Una llamada al `turbo_frame_tag` en el layout base que contiene mi aplicación de rails

```ruby
# app/views/layouts/application.html.erb
<body>
  <%= render "shared/alerts" %>
  <main class="container mx-auto mt-28 px-5 flex">
  <%= turbo_frame_tag "modal" %>
    <%= yield %>
  </main>
</body>
```

Una vista la cual contiene el contenido del frame que representa la modal:

```ruby
# app/views/elements/new.html.erb
<%= turbo_frame_tag "modal" do %>
  <div class="modal modal-open", data-controller="turbo-modal", data-action="...">
    <%= form_with(model: @element, url: element_path, class: 'modal-box') do |form| %>
      My form content
    <% end %>
  </div>
<% end %>
```

Y finalmente una llamada al turbo frame utilizando un data attribute:

```ruby
<%= link_to 'Create Element', new_element_path, class: 'link link-hover', data: { turbo_frame: 'modal' } %>
```

Esto por defecto lo que hace es generar el `turbo-frame` y hacer render de este al momento en mi aplicación utilizando las propiedades de `turbo-rails`

```html
<turbo-frame id="modal">
  <div class="modal modal-open",
       data-controller="turbo-modal",
       data-action="....">
    <form class="modal-box" action="/elements" accept-charset="UTF-8" method="post"><input type="hidden" name="authenticity_token" value="xyz" autocomplete="off" />
      My form content
    </form>
    </div>
</turbo-frame>
```

El problema inició al crear un nuevo layout idéntico dentro del directorio layouts y colocandolo como el layout por defecto dentro del  `ApplicationController` de mi namespace

```ruby
class Foo::ApplicationController < ApplicationController
  layout 'custom_layout'
end
```

Inmediatamente al hacer esto, al momento de dar click en el enlace que llama al turbo frame en lugar de recuperar `<turbo-frame id="modal">` como respuesta del request, comencé a recibir todo el layout como respuesta; lo que provocó que la acción nativa de `turbo-rails` dejara de funcionar:

```html
<!DOCTYPE html>
<html data-theme="light">
  <head>
    <title>Foo</title>
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="csrf-param" content="authenticity_token" />
    <meta name="csrf-token" content="5QJ-_2XaOHFTaNKEJkLcjOTewSbJ03QMjp6yeVABCkHaP94Uc4la6GnGtxIRp6LmoXAwbpixj657sYrc3ir2Mg" />


    <link rel="stylesheet" href="/assets/tailwind-24d55e02196000307cecef67bba818aa60975a400a31c502e1ad9c155bd7b147.css" data-turbo-track="reload" />
    <link rel="stylesheet" href="/assets/inter-font-8c3e82affb176f4bca9616b838d906343d1251adc8408efe02cf2b1e4fcf2bc4.css" data-turbo-track="reload" />

    <link rel="stylesheet" href="/assets/application-186311012c4e733c61b267717a8abc6092b57cc4ba1b125e36e9c3fc2c3b8e30.css" data-turbo-track="reload" />
```

## La solución

Después de investigar un rato y terminar en este [issue reportado en 2021](https://github.com/hotwired/turbo-rails/issues/268) en el repositorio de [hotwired/turbo-rails](https://github.com/hotwired/turbo-rails) encontré que la solución es verificar si el request viene clasificado como `turbo_frame_request?` y si es así devolver `false` para evitar que la respuesta incluya el el layout personalizado que agregamos, si tienes curiosidad de como funciona este método `turbo_frame_request?` puedes revisarlo [en este enlace](https://github.com/hotwired/turbo-rails/blob/ea00f3732e21af9c2156cf74dabe95524b17c361/app/controllers/turbo/frames/frame_request.rb), prácticamente estamos verificando si el request contiene el header `Turbo-Frame`.

La solución puede quedar de la siguiente manera

```ruby
class Foo::ApplicationController < ApplicationController

  layout :set_custom_layout_with_turbo_frame_support

private

  def set_custom_layout_with_turbo_frame_support
    return 'custom_layout' unless turbo_frame_request?
  end
end
```

El [5 de Junio de 2023 se abrió un Pull request](https://github.com/hotwired/turbo-rails/pull/470) que agrega una sección al readme para explicar esta situación y como solucionarlo para no terminar navegando entre issues para encontrar como abordar este problema.
