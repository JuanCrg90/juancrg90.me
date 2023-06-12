---
layout: post
title: "How to use turbo_frame_tag in a custom layout"
date: 2023-06-11 00:00:00 -0500
categories: Rails, Ruby, Hotwire, Turbo
permalink: /posts/how-to-use-turbo-frame-tag-in-a-custom-layout
---

I am working on a side project using Rails 7 and Hotwire. One of the features I implemented was a modal window which is called using `turbo_frame_tag` to render the creation form. Everything was going well until I decided to include a custom layout for the logged-in user dashboard.

## TLDR;

Do not load the layout statically using `layout 'custom_layout'`. Instead, use a method that checks if the request is a `turbo_frame_tag`.

```ruby
class Foo::ApplicationController < ApplicationController

  layout :set_custom_layout_with_turbo_frame_support

private

  def set_custom_layout_with_turbo_frame_support
    return 'custom_layout' unless turbo_frame_request?
  end
end
```

## The problem

Initially, the logic to load the modal window was composed of 3 elements:

A call to the `turbo_frame_tag` in the base layout that contains my Rails application:

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

A view that contains the content of the frame representing the modal:

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

And finally a call to the turbo frame using a data attribute:

```ruby
<%= link_to 'Create Element', new_element_path, class: 'link link-hover', data: { turbo_frame: 'modal' } %>
```

By default, this generates the `turbo-frame` and renders it in my application using the properties of `turbo-rails`.

```ruby
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

The problem started when I created a new identical layout within the layouts directory and set it as the default layout within the `ApplicationController` of my namespace.

```ruby
class Foo::ApplicationController < ApplicationController
  layout 'custom_layout'
end
```

Immediately upon doing this, when I clicked on the link that calls the turbo frame, instead of retrieving `<turbo-frame id="modal">` as the response of the request, I started receiving the entire layout as the response. This caused the native `turbo-rails` action to stop working:

```ruby
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

## The solution

After researching for a while and ending up on this [issue reported in 2021](https://github.com/hotwired/turbo-rails/issues/268) in the [hotwired/turbo-rails](https://github.com/hotwired/turbo-rails) repository, I found that the solution is to check if the request is classified as `turbo_frame_request?` and if so, return `false` to prevent the response from including the custom layout we added. If you're curious about how this `turbo_frame_request?` method works, you can check it out [at this link](https://github.com/hotwired/turbo-rails/blob/ea00f3732e21af9c2156cf74dabe95524b17c361/app/controllers/turbo/frames/frame_request.rb). Essentially, we're checking if the request contains the `Turbo-Frame` header.

The solution can be as follows

```ruby
class Foo::ApplicationController < ApplicationController

  layout :set_custom_layout_with_turbo_frame_support

private

  def set_custom_layout_with_turbo_frame_support
    return 'custom_layout' unless turbo_frame_request?
  end
end
```

On [June 5 2023 a Pull request was opened](https://github.com/hotwired/turbo-rails/pull/470) adding a section to the readme to explain this situation and how to solve it, in order to avoid having to navigate through issues to find a way to address this problem.
