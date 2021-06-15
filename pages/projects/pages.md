---
layout: raw
permalink: /projects/pages.json
---
[{% for project in site.projects %}{ "title": {{ project | map:  "title" | jsonify }},"description": {{ project | map:  "description" | jsonify }},"date": "{{ project.date | date: "%e %B %Y %l:%M %P" }}","id": {{ project | map:  "id" | jsonify }} },{% endfor %}{}]