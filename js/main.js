// Import the THREE.js library
// import * as THREE from "https://cdn.skypack.dev/three@0.136.0/build/three.module.js";
// To allow for the camera to move around the scene (Optional now)
//import { OrbitControls } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/controls/OrbitControls.js";
// To allow for importing the .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js";

class Game {
  constructor() {
    this.loadModels();
  }

  loadModels() {
    const loader = new GLTFLoader();
    loader.load(
      "../models/yasuo/scene.gltf",
      (gltf) => {
        // Code to handle the model
        console.log("Model loaded", gltf);
      },
      undefined,
      (error) => {
        console.error("Error loading models", error);
      }
    );
  }
}

export default Game;
