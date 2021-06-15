---
layout: raw
permalink: /projects/pages.json
---
[{% for project in site.projects %}{ "title": {{ project.title | replace: '"', '\"' | jsonify }},"description": {{ project.description | replace: '"', '\"' | jsonify }},"date": {{ project.date | date: "%e %B %Y %l:%M %P" | replace: '"', '\"' | jsonify }},"id": {{ project.id | replace: '"', '\"' | jsonify }} },{% endfor %}{}]