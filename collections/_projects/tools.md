---
title: 'Tools'
description: 'A bunch of random tools & generators.'
header_type: banner
invert: true
background: blank
layout: projects/ord
date: 2023-03-10 22:00:48
script:
    - content: '{"imports":{"three":"https://cdn.jsdelivr.net/npm/three@<0.163.0/build/three.module.js","three/addons/":"https://cdn.jsdelivr.net/npm/three@0.163.0/examples/jsm/"}}'
      type: 'importmap'
---

# Tools

## Daily Number Generator

[ ][ ][ ]

## 3D Clickables

<div>
  <noscript> You need to enable JavaScript to run this page. </noscript>
  <style>
    * {
      box-sizing: border-box;
    }
    #root {
      width: 100%;
      aspect-ratio: 1;
      border-style: solid;
    }
    #root canvas {
      cursor: pointer;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    }
    body {
      background: #f0f0f0;
    }
  </style>
  <div id="root"></div>
  <script type="module" src="/assets/js/3d_test.js"></script>
</div>
