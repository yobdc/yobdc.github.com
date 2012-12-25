---
layout: page
title: Yobdc Home
tagline:
---
{% include JB/setup %}

{% for post in site.posts limit:3 %}
  <article class="post">
    <header>
      <h1><a href="{{ post.url }}">{{ post.title }}</a></h1>
    </header>
    <section class="body">
      {{ post.content }}
    </section>
    <section class="meta">
      Posted on <a href="{{ post.url }}">{{ post.date | date_to_string }}</a>
    </section>
  </article>
{% endfor %}