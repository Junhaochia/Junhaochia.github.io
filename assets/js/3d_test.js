// @ts-nocheck
import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/0.163.0/three.module.min.js';

// One unit = 1cm
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
        //this.cubeSize = width / 5; // 1/5 of the full width
        this.cubeSize = 1; // 1cm cube
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

// State
let width = 0;
let height = 0;
let intersects = [];
// let hovered = {};

// setup
const rootElement = document.getElementById('root');
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, rootElement.clientWidth / rootElement.clientHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setPixelRatio(Math.min(Math.max(1, window.devicePixelRatio), 2));
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.outputEncoding = THREE.sRGBEncoding;

// Add three.js Canvas to rootElement
rootElement.appendChild(renderer.domElement);

const raycaster = new THREE.Raycaster();
raycaster.far = 50;
const mouse = new THREE.Vector2(); // Track where the mouse is (and used for raycasting)

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
    width = rootElement.clientWidth;
    height = rootElement.clientHeight;
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

rootElement.addEventListener('resize', resize);
resize();

// mouseHover
let singleHover = false;
function isMouseHovering() {
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children, true);

    if (singleHover) singleHover.object.onPointerOut(singleHover);

    const hit = intersects[0];
    if (hit) {
        if (hit.object.onPointerOver) hit.object.onPointerOver(hit);
        if (hit.object.onPointerMove) hit.object.onPointerMove(hit);

        singleHover = hit;
    }
}

// events
rootElement.addEventListener('pointermove', (e) => {
    mouse.set((e.offsetX / width) * 2 - 1, -(e.offsetY / height) * 2 + 1);
});

rootElement.addEventListener('click', (e) => {
    // Update also
    mouse.set((e.offsetX / width) * 2 - 1, -(e.offsetY / height) * 2 + 1);
    raycaster.setFromCamera(mouse, camera);
    intersects = raycaster.intersectObjects(scene.children, true);

    intersects.forEach((hit) => {
        // Call onClick
        if (hit.object.onClick) hit.object.onClick(hit);
    });
});

// render-loop, called (Monitor Refresh Rate)/second
function animate(t) {
    isMouseHovering();
    requestAnimationFrame(animate);
    scene.traverse((obj) => {
        if (obj.render) obj.render(t);
    });
    renderer.render(scene, camera);
}

animate();
