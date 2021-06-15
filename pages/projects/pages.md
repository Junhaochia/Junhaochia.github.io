---
layout: raw
permalink: /projects/pages.json
---
[{% for project in site.projects %}{"title": "{{project.title}}","description": "{{project.description}}","date": "{{ project.date | date: "%e %B %Y %l:%M %P" }}","id": "{{project.id}}"},{% endfor %}{}]