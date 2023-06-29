import { useEffect } from 'react';

import * as THREE from 'three';
// import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
// import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
// import { VOXLoader } from 'three/examples/jsm/loaders/VOXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const tronDisk = "../models/tron_disk/scene.gltf";

// @ts-ignore 
import SceneInit from './lib/SceneInit';

const basicRotation = (target:any) => {
  // loadedModel.scene.rotation.x += 0.01;
  target.scene.rotation.y += 0.09;
  // loadedModel.scene.rotation.z += 0.001;
}



function App() {
  const glftLoader = new GLTFLoader();
  let prevScrollPos = 0;
  let loadedModel:any;
  
  const handleCamera = (ev:any) => { //Doesnt work lol
    const currScrollPos = document.body.getBoundingClientRect().top;
    let motion = (currScrollPos - prevScrollPos)
    
    console.log(motion)

    if(loadedModel){
      loadedModel.scene.position.y += motion
    }

    prevScrollPos = currScrollPos;
  }

  useEffect(() => {
    
    const mainScene = new SceneInit('myThreeJsCanvas');
    mainScene.initialize();
    mainScene.animate();
    
    // console.log("first")
    glftLoader.load(tronDisk, (gltfScene) => {
      loadedModel = gltfScene;
      // gltfScene.scene.position.setX(1);
      gltfScene.scene.rotation.y = Math.PI / 8;
      gltfScene.scene.rotation.x = 0.8;
      gltfScene.scene.scale.set(0.1, 0.1, 0.1);
      mainScene.scene.add(gltfScene.scene);
    });
    
    const animate = () => {
      if (loadedModel) { basicRotation(loadedModel)};
      requestAnimationFrame(animate);
    };animate();

  }, []);
  
  onscroll = (e) => {
    handleCamera(e)
  };

  
  return (
    <div>
      <canvas id="myThreeJsCanvas" />
    </div>
  );
}

export default App;