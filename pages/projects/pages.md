---
layout: raw
permalink: /projects/pages.json
---
{% assign projects = site.projects
    for p_page in projects
        p_page.next = blank
        p_page.previous = blank
        p_page.output = blank
    endfor
%}
{{ projects | jsonify | strip_html }}
