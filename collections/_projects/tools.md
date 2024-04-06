---
title: 'Tools'
description: 'A bunch of random tools & generators.'
header_type: banner
invert: true
background: blank
layout: default
date: 2023-03-10 22:00:48
script:
    - src: 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.163.0/three.module.min.js'
      integrity: 'sha512-g1j6pTQxNd1pZRKqxCPDEDg/QbDBNIvOgwo80Uew+V9xZweFEW4Hj4BlyvHKKAjze45oLDh5Ehe51UyZnwM2Jw=='
      type: 'module'
---

# Tools

## Daily Number Generator

[ ][ ][ ]

<div>
  <noscript> You need to enable JavaScript to run this page. </noscript>
  <style>
    * {
      box-sizing: border-box;
    }

    html,
    body,
    #root {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    body {
      background: #f0f0f0;
    }

  </style>
    <div id="root"></div>
    <script type="module">
      import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.163.0/three.module.min.js';

      class Cube extends THREE.Mesh {
        constructor() {
          super();
          this.geometry = new THREE.BoxGeometry();
          this.material = new THREE.MeshStandardMaterial({ color: new THREE.Color('orange').convertSRGBToLinear() });
          this.cubeSize = 0;
          this.cubeActive = false;
        }

        render() {
          this.rotation.x = this.rotation.y += 0.01;
        }

        onResize(width, height, aspect) {
          this.cubeSize = width / 5; // 1/5 of the full width
          this.scale.setScalar(this.cubeSize * (this.cubeActive ? 1.5 : 1));
        }

        onPointerOver(e) {
          this.material.color.set('hotpink');
          this.material.color.convertSRGBToLinear();
        }

        onPointerOut(e) {
          this.material.color.set('orange');
          this.material.color.convertSRGBToLinear();
        }

        onClick(e) {
          this.cubeActive = !this.cubeActive;
          this.scale.setScalar(this.cubeSize * (this.cubeActive ? 1.5 : 1));
        }
      }

      // state
      let width = 0;
      let height = 0;
      let intersects = [];
      let hovered = {};

      // setup
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.outputEncoding = THREE.sRGBEncoding;
      document.getElementById('root').appendChild(renderer.domElement);
      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();

      // view
      const cube1 = new Cube();
      cube1.position.set(-1.5, 0, 0);
      const cube2 = new Cube();
      cube2.position.set(1.5, 0, 0);
      scene.add(cube1);
      scene.add(cube2);

      const ambientLight = new THREE.AmbientLight();
      const pointLight = new THREE.PointLight();
      pointLight.position.set(10, 10, 10);
      scene.add(ambientLight);
      scene.add(pointLight);

      // responsive
      function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        camera.aspect = width / height;
        const target = new THREE.Vector3(0, 0, 0);
        const distance = camera.position.distanceTo(target);
        const fov = (camera.fov * Math.PI) / 180;
        const viewportHeight = 2 * Math.tan(fov / 2) * distance;
        const viewportWidth = viewportHeight * (width / height);
        camera.updateProjectionMatrix();
        renderer.setSize(width, height);
        scene.traverse((obj) => {
          if (obj.onResize) obj.onResize(viewportWidth, viewportHeight, camera.aspect);
        });
      }

      window.addEventListener('resize', resize);
      resize();

      // events
      window.addEventListener('pointermove', (e) => {
        mouse.set((e.clientX / width) * 2 - 1, -(e.clientY / height) * 2 + 1);
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(scene.children, true);

        // If a previously hovered item is not among the hits we must call onPointerOut
        Object.keys(hovered).forEach((key) => {
          const hit = intersects.find((hit) => hit.object.uuid === key);
          if (hit === undefined) {
            const hoveredItem = hovered[key];
            if (hoveredItem.object.onPointerOver) hoveredItem.object.onPointerOut(hoveredItem);
            delete hovered[key];
          }
        });

        intersects.forEach((hit) => {
          // If a hit has not been flagged as hovered we must call onPointerOver
          if (!hovered[hit.object.uuid]) {
            hovered[hit.object.uuid] = hit;
            if (hit.object.onPointerOver) hit.object.onPointerOver(hit);
          }
          // Call onPointerMove
          if (hit.object.onPointerMove) hit.object.onPointerMove(hit);
        });
      });

      window.addEventListener('click', (e) => {
        intersects.forEach((hit) => {
          // Call onClick
          if (hit.object.onClick) hit.object.onClick(hit);
        });
      });

      // render-loop, called 60-times/second
      function animate(t) {
        requestAnimationFrame(animate);
        scene.traverse((obj) => {
          if (obj.render) obj.render(t);
        });
        renderer.render(scene, camera);
      }

      animate();

  </script>

</div>
