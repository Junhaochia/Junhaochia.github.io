---
layout: raw
permalink: /projects/pages.json
---
[
{% for project in site.projects %}
{
"title": "{{project.title}}",
"description": "{{project.description}}",
"date_created": {{project.date_created}},
"id": "{{project.id}}"
},
{% endfor %}
{}
]