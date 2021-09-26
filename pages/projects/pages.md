---
layout: raw
permalink: /projects/pages.json
---
[{% for project in site.projects %}{ "title": {{ project.title | replace: '"', '\"' | escape }},"description": {{ project.description | replace: '"', '\"' | escape }},"date": {{ project.date | date: "%e %B %Y %l:%M %P" | replace: '"', '\"' | escape }},"url": {{ project.url | replace: '"', '\"' | escape }} },{% endfor %}{ "updated": "{{ "now" | date: "%d.%m.%Y %I:%M%P" }}" }]