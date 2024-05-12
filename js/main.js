//Import the THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.136.0/build/three.module.js";
// To allow for the camera to move around the scene
import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

class Game {
  constructor() {
    this.initialize();
  }
  async initialize() {
    this.clock = new THREE.Clock();
    this.createRender();
    this.createCamara();
    await this.createScene(); // Make sure to await the creation of the scene
    this.createLight();
    this.loadPersonModel();
    new OrbitControls(this.camera, this.renderer.domElement);
    this.animate();
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

  createScene = async () => {
    // Make this method async
    this.scene = new THREE.Scene();
    const videoTexture = await this.setupCamera(); // Use await here
    this.scene.background = videoTexture;
  };

  createLight = () => {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1);
    pointLight.position.z = 5;
    pointLight.position.y = 10;
    this.scene.add(pointLight);
  };

  loadPersonModel = () => {
    const loader = new GLTFLoader();
    loader.load(
      "../models/yasuo/scene.gltf",
      (gltf) => {
        this.personModel = gltf.scene;
        this.personModel.scale.set(2, 2, 2);
        this.personModel.position.set(0, -2, 0);
        this.scene.add(this.personModel);
        this.mixer = new THREE.AnimationMixer(gltf.scene);
        const animation = gltf.animations.find((anim) => anim.name === "win");
        if (animation) {
          this.mixer.clipAction(animation).play(); // Phát hoạt ảnh "win"
        }
      },

      undefined,
      (error) => {
        console.error("Error loading person model", error);
      }
    );
  };

  animate = () => {
    requestAnimationFrame(this.animate);
    // TWEEN.update();
    if (this.personModel) {
      const delta = this.clock.getDelta(); //  khởi tạo clock
      if (this.mixer) this.mixer.update(delta); // Cập nhật mixer
      this.renderer.render(this.scene, this.camera);

      // this.personModel.rotation.y += 0.001; // Xoay mô hình tự động
    }
  };

  setupCamera = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("getUserMedia is not supported by your browser.");
        return;
      }
      const video = document.createElement("video");
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      video.srcObject = stream;
      video.play();

      const texture = new THREE.VideoTexture(video);
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.format = THREE.RGBFormat;
      return texture;
    } catch (error) {
      console.error("Error accessing the camera: ", error);
      alert("Error accessing the camera.");
    }
  };
}

export default Game;
