---
layout: page
title: Posts
permalink: /posts/
---

<ul>
  {% for post in site.posts %}
    <li class="post-link">
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
