import { genererFigures } from "./figure.js";
import { addToScene } from "./manufacture.js";
import { buildScene } from "./scene.js";

// How to pass arguments and select what you see in the browser:
// 1. the s=xxxx argument is the seed argument, if you pass a stable
// see accross views it will display the same iteration.
// 2. the view=xxxx argument is the browser view argument.
// thumbnail or nothing shows the marketplace render thumbnail,
// dev should show a three js orbitControls enabled scene,
// and webApp should show what you want users to see when they
// open the iteration standalone in a browser.

// display seed for dev purposes
const seedDisplayDiv = document.createElement("div");
seedDisplayDiv.id = "seedDisplayDiv";
seedDisplayDiv.innerText = $bootloader.seed;
document.body.append(seedDisplayDiv);
seedDisplayDiv.addEventListener("click", () =>
  navigator.clipboard.writeText($bootloader.seed),
);

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

let renderMode = new URLSearchParams(location.search).get("view");

switch (renderMode) {
  case "webApp":
    break;

  case "dev":
    sceneBuild.renderDevView();
    break;

  case "thumbnail":
  default:
    sceneBuild.renderThumbnail();
    break;
}

// Capture when in capture mode
if ($bootloader.isCapture) {
  $bootloader.capture();
}
