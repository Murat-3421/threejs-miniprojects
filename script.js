import * as THREE from 'https://cdn.skypack.dev/three@0.128.0';

const scene = new THREE.Scene();

// osia coordonatelor
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper);

const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({
    color: 'purple',
    wireframe: true,
});

const group = new THREE.Group();
group.scale.y = 1.4;
group.rotation.x = Math.PI * 0.25;
const cube1 = new THREE.Mesh(geometry, material);
cube1.position.x = -1.2;

const cube2 = new THREE.Mesh(geometry, material);
cube2.position.x = 0;

const cube3 = new THREE.Mesh(geometry, material);
cube3.position.x = 1.2;

group.add(cube1);
group.add(cube2);
group.add(cube3);

scene.add(group);

// const mesh = new THREE.Mesh(geometry, material);

// change the position
// mesh.position.x = -1
// mesh.position.y = -0.8
// mesh.position.z = 0.5

// scale - lungimea , latirea 
// mesh.scale.x = 0.5;
// mesh.scale.y = 2;
// mesh.scale.z = 0.7;

// rotation
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25
// mesh.rotation.reorder('YXZ');

// quaterneon


// scene.add(mesh);

const sizes = {
    width: 600, 
    height: 600,
};

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height);
camera.position.z = 5;
camera.position.y = 1;

scene.add(camera);


// lookat
// camera.lookAt(mesh.position)

const canvas = document.querySelector(".canvas");
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene,camera)
