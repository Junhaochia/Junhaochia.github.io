---
layout: raw
permalink: /projects/pages.json
---
[{% for project in site.projects %}{ "title": "{{ project.title | replace: '"', '\"' | escape }}","description": "{{ project.description | replace: '"', '\"' | escape }}","date": {{ project.date | date: "%s" }},"url": "{{ project.url | replace: '"', '\"' | escape }}" },{% endfor %}{ "updated": {{ "now" | date: "%s" }} }]