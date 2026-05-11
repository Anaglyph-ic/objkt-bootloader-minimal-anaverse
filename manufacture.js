import * as THREE from "three";

//Materials
const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const fullMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

const addToScene = (figures, scene) => {
  figures.forEach((fig) => {
    var line, mesh;

    const geometry = new THREE[fig.geometry.type](...fig.geometry.args);
    const pos = new THREE.Vector3(fig.pos.x, fig.pos.y, fig.pos.z);
    const rot = new THREE.Vector3(fig.rot.x, fig.rot.y, fig.rot.z);
    const scale = new THREE.Vector3(fig.scale.x, fig.scale.y, fig.scale.z);

    if (fig.lines) {
      const edges = new THREE.EdgesGeometry(geometry);
      line = new THREE.LineSegments(edges, lineMaterial);
      line.geometry.center();
      line.userData = {};
      line.position.set(pos.x, pos.y, pos.z);
      line.rotation.set(rot.x, rot.y, rot.z);
      line.scale.set(scale.x, scale.y, scale.z);
      scene.add(line);
    }

    if (fig.hatch) {
      mesh = new THREE.Mesh(geometry, whiteMaterial);
    } else if (fig.full) {
      mesh = new THREE.Mesh(geometry, fullMaterial);
    }
    if (fig.hatch || fig.full) {
      mesh.geometry.center();
      mesh.userData = {};
      mesh.position.set(pos.x, pos.y, pos.z);
      mesh.rotation.set(rot.x, rot.y, rot.z);
      mesh.scale.set(scale.x, scale.y, scale.z);
      scene.add(mesh);
    }
  });
};

export { addToScene };
