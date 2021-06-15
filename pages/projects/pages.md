---
layout: raw
permalink: /projects/pages.json
---
[{% for project in site.projects %}{ "title": {{ project.title | jsonify }},"description": {{ project.description | jsonify }},"date": {{ project.date | date: "%e %B %Y %l:%M %P" | jsonify }},"id": {{ project.id | jsonify }} },{% endfor %}{}]