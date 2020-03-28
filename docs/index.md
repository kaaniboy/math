---
layout: default
---

I am an undergraduate senior studying computer science at Arizona State University. I will be 
graduating in May of 2020. This site serves primarily as a blog of my studies in math and 
computer science, as well as anything else that interests me.

### Recent Posts

<ul class="posts">
    {% for post in site.posts limit:5 %}
        <li>
            <span class="post-date">{{ post.date | date: "%b %d, %Y" }}</span>
            ::
            <a class="post-link" href="/math/{{ post.url }}">{{ post.title }}</a>
        </li>
    {% endfor %}
</ul>