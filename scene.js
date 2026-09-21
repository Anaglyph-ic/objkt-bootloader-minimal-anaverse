// Building THREE scene
import * as THREE from "three";
import { OrbitControls } from "./OrbitControls.js";

const buildScene = () => {
  // Create and set up scene
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xffffff);

  // Create and set up camera
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  camera.position.z = 5;
  camera.position.y = 5;
  camera.position.x = 5;
  camera.lookAt(0, 3, 0);

  // Create renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  const rendererDOM = renderer.domElement;
  document.body.appendChild(renderer.domElement);

  // Render function
  const renderThumbnail = () => renderer.render(scene, camera);

  const renderDevView = () => {
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.update();

    function animate(time) {
      controls.update();

      renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
  };

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
  });

  return { scene, rendererDOM, renderThumbnail, renderDevView };
};

export { buildScene };
