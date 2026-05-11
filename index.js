import { genererFigures } from "./figure.js";
import { addToScene } from "./manufacture.js";
import { buildScene } from "./scene.js";

// Build the three js scene displayed on the DOM
const sceneBuild = buildScene();

// Generate the anaverse space
const anavGenerator = genererFigures($bootloader.seed);

// Add it to the local scene
addToScene(anavGenerator.figures, sceneBuild.scene);

// Set the name for the piece
$bootloader.setFeatures({
  name: anavGenerator.features.Name,
});

document.title = anavGenerator.features.Name;

// Compute the image showed on screen
sceneBuild.render();

// Capture when in capture mode
if ($bootloader.isCapture) {
  $bootloader.capture();
}
