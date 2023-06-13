---
layout: post
title: "Removing the namespace from my Rails route"
date: 2023-06-12 00:00:00 -0500
categories: Rails, Ruby
permalink: /posts/removing-the-namespace-from-my-rails-route
---

If, for any reason, you have specified a namespace in your Rails routes and want to remove it from your route, going from **http://localhost:3000/foo/bars/1** to **http://localhost:3000/bars/1**

You need to set an empty path for the namespace:

```ruby
namespace :foo, path: '' do
  resources :bars, only: [:new, :create, :show]
end
```

This way, we go from having:
```bash
foo_bar_index POST   /foo/bar(.:format)       foo/bar#create
  new_foo_bar GET    /foo/bar/new(.:format)   foo/bar#new
      foo_bar GET    /foo/bar/:id(.:format)   foo/bar#show
```

To having:
```bash
foo_bar_index POST   /bar(.:format)      foo/bar#create
  new_foo_bar GET    /bar/new(.:format   foo/bar#new
      foo_bar GET    /bar/:id(.:format)  foo/bar#show
```
