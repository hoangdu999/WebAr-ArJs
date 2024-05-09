//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.136.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

class Game {
  constructor() {
    this.createRender();
    this.createCamara();
    this.createScene();
    this.createLight();
    this.loadPersonModel();
    new OrbitControls(this.camera, this.renderer.domElement);
  }

  createRender = () => {
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.domElement);
  };

  createCamara = () => {
    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    this.camera.position.z = 5;
  };

  createScene = () => {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
  };

  createLight = () => {
    var ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    var pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.z = 5;
    pointLight.position.y = 10;
    this.scene.add(pointLight);
  };
  loadPersonModel = () => {
    const loader = new GLTFLoader();
    loader.load(
      "../models/person/scene.gltf",
      (gltf) => {
        this.personModel = gltf.scene;
        // Scale and position the model as needed
        this.personModel.scale.set(0.02, 0.02, 0.02);
        this.personModel.position.set(0, -2, 0); // Set position as needed
        this.scene.add(this.personModel);
      },
      undefined,
      (error) => {
        console.error("Error loading person model", error);
      }
    );
  };
  animate = () => {
    requestAnimationFrame(this.animate);
    this.personModel.rotation.y += 0.01; // Xoay mô hình tự động
    this.renderer.render(this.scene, this.camera);
  };
}

export default Game;
