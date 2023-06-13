---
layout: post
title: "Removiendo el namespace de mi ruta en Rails"
date: 2023-06-12 00:00:00 -0500
categories: Rails, Ruby
permalink: /posts/removiendo-el-namespace-de-mi-ruta-en-rails
---

Si por alguna razón tienes especificado un namespace en tus rutas de rails y quieres removerlo de tu ruta, para pasar de http://localhost:3000/foo/bars/1 a http://localhost:3000/bars/1

Basta con colocar un path vacio al namespace:

```ruby
namespace :foo, path: '' do
  resources :bars, only: [:new, :create, :show]
end
```

De esta manera pasamos de tener

```bash
foo_bar_index POST   /foo/bar(.:format)                                                                                foo/bar#create
  new_foo_bar GET    /foo/bar/new(.:format)                                                                            foo/bar#new
      foo_bar GET    /foo/bar/:id(.:format)                                                                            foo/bar#show
```

A tener
```bash
foo_bar_index POST   /bar(.:format)                                                                                    foo/bar#create
  new_foo_bar GET    /bar/new(.:format)                                                                                foo/bar#new
      foo_bar GET    /bar/:id(.:format)                                                                                foo/bar#show
```
