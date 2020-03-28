---
layout: blog
permalink: /blog/
---

#### __Probability:__ 50 Challenging Problems in Probability

<ul class="posts">
    {% for post in site.categories.book %}
        <li>
            <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
            ::
            <a class="post-link" href="/math/{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}
</ul>

#### __Probability:__ Other

<ul class="posts">
    {% for post in site.categories.other %}
        <li>
            <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
            ::
            <a class="post-link" href="/math/{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}

#### __Numbers__

<ul class="posts">
    {% for post in site.categories.numbers %}
        <li>
            <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
            ::
            <a class="post-link" href="/math/{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}
</ul>