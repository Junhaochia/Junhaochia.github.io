---
layout: raw
permalink: /projects/pages.json
---
[{% for project in site.projects %}{ "title": {{ project.title | jsonify | replace: '"', "\"" }},"description": {{ project.description | jsonify | replace: '"', "\"" }},"date": {{ project.date | date: "%e %B %Y %l:%M %P" | jsonify | replace: '"', "\"" }},"id": {{ project.id | jsonify | replace: '"', "\"" }} },{% endfor %}{}]