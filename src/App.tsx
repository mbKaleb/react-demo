import { useEffect } from 'react';

import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import SceneInit from './lib/SceneInit';

function App() {
  const glftLoader = new GLTFLoader();

  useEffect(() => {
    const mainScene = new SceneInit('myThreeJsCanvas');
    mainScene.initialize();
    mainScene.animate();

    
    let loadedModel:any;

    glftLoader.load('../models/tron_disk/scene.gltf', (gltfScene) => {
      loadedModel = gltfScene;
      // console.log(loadedModel);

      gltfScene.scene.rotation.y = Math.PI / 8;
      // gltfScene.scene.position.y = 30;
      gltfScene.scene.rotation.x = 0.8;
      gltfScene.scene.scale.set(0.1, 0.1, 0.1);

      mainScene.scene.add(gltfScene.scene);
    });

    const animate = () => {
      if (loadedModel) {
        // loadedModel.scene.rotation.x += 0.01;
        loadedModel.scene.rotation.y += 0.09;
        // loadedModel.scene.rotation.z += 0.001;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;