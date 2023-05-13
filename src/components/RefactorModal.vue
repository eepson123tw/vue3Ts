<template>
  <div class="container">
    <canvas id="bg"></canvas>
  </div>
</template>

<script setup lang="ts">
// import * as THREE from 'three'
import { onMounted } from 'vue'
import { experience } from '../plugin/modal'
// import * as dat from 'lil-gui'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
onMounted(() => {
  const canvas: HTMLCanvasElement = document.querySelector(
    '#bg'
  ) as HTMLCanvasElement
  experience(canvas, window)

  // //scene
  // const scene = new THREE.Scene()
  // /**
  //  * Loaders
  //  */
  // const gltfLoader = new GLTFLoader()
  // const textureLoader = new THREE.TextureLoader()
  // const cubeTextureLoader = new THREE.CubeTextureLoader()
  // /**
  //  * Base
  //  */
  // // Debug
  // const gui = new dat.GUI()
  // const debugObject: { envMapIntensity: number } = { envMapIntensity: 0 }
  // /**
  //  * Update all materials
  //  */
  // const updateAllMaterials = () => {
  //   scene.traverse((child) => {
  //     if (
  //       child instanceof THREE.Mesh &&
  //       child.material instanceof THREE.MeshStandardMaterial
  //     ) {
  //       // child.material.envMap = environmentMap
  //       child.material.envMapIntensity = debugObject.envMapIntensity
  //       child.material.needsUpdate = true
  //       child.castShadow = true
  //       child.receiveShadow = true
  //     }
  //   })
  // }
  // /**
  //  * Environment map
  //  */
  // const environmentMap = cubeTextureLoader.load([
  //   '/xtextures/environmentMap/px.jpg',
  //   '/xtextures/environmentMap/nx.jpg',
  //   '/xtextures/environmentMap/py.jpg',
  //   '/xtextures/environmentMap/ny.jpg',
  //   '/xtextures/environmentMap/pz.jpg',
  //   '/xtextures/environmentMap/nz.jpg',
  // ])
  // environmentMap.encoding = THREE.sRGBEncoding
  // // scene.background = environmentMap
  // scene.environment = environmentMap
  // debugObject.envMapIntensity = 0.4
  // gui
  //   .add(debugObject, 'envMapIntensity')
  //   .min(0)
  //   .max(4)
  //   .step(0.001)
  //   .onChange(updateAllMaterials)
  // /**
  //  * Models
  //  */
  // let foxMixer: any = null
  // gltfLoader.load('/xmodels/Fox/glTF/Fox.gltf', (gltf) => {
  //   // Model
  //   gltf.scene.scale.set(0.02, 0.02, 0.02)
  //   scene.add(gltf.scene)
  //   // Animation
  //   foxMixer = new THREE.AnimationMixer(gltf.scene)
  //   const foxAction = foxMixer.clipAction(gltf.animations[0])
  //   foxAction.play()
  //   // Update materials
  //   updateAllMaterials()
  // })
  // /**
  //  * Floor
  //  */
  // const floorColorTexture = textureLoader.load('/xtextures/dirt/color.jpg')
  // floorColorTexture.encoding = THREE.sRGBEncoding
  // floorColorTexture.repeat.set(1.5, 1.5)
  // floorColorTexture.wrapS = THREE.RepeatWrapping
  // floorColorTexture.wrapT = THREE.RepeatWrapping
  // const floorNormalTexture = textureLoader.load('/xtextures/dirt/normal.jpg')
  // floorNormalTexture.repeat.set(1.5, 1.5)
  // floorNormalTexture.wrapS = THREE.RepeatWrapping
  // floorNormalTexture.wrapT = THREE.RepeatWrapping
  // const floorGeometry = new THREE.CircleGeometry(5, 64)
  // const floorMaterial = new THREE.MeshStandardMaterial({
  //   map: floorColorTexture,
  //   normalMap: floorNormalTexture,
  // })
  // const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  // floor.rotation.x = -Math.PI * 0.5
  // scene.add(floor)
  // /**
  //  * Lights
  //  */
  // const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
  // directionalLight.castShadow = true
  // directionalLight.shadow.camera.far = 15
  // directionalLight.shadow.mapSize.set(1024, 1024)
  // directionalLight.shadow.normalBias = 0.05
  // directionalLight.position.set(3.5, 2, -1.25)
  // scene.add(directionalLight)
  // gui
  //   .add(directionalLight, 'intensity')
  //   .min(0)
  //   .max(10)
  //   .step(0.001)
  //   .name('lightIntensity')
  // gui
  //   .add(directionalLight.position, 'x')
  //   .min(-5)
  //   .max(5)
  //   .step(0.001)
  //   .name('lightX')
  // gui
  //   .add(directionalLight.position, 'y')
  //   .min(-5)
  //   .max(5)
  //   .step(0.001)
  //   .name('lightY')
  // gui
  //   .add(directionalLight.position, 'z')
  //   .min(-5)
  //   .max(5)
  //   .step(0.001)
  //   .name('lightZ')
  // /**
  //  * Sizes
  //  */
  // const sizes = {
  //   width: window.innerWidth,
  //   height: window.innerHeight,
  // }
  // //camera
  // const camera = new THREE.PerspectiveCamera(
  //   45,
  //   window.innerWidth / window.innerHeight,
  //   0.1,
  //   100
  // )
  // camera.position.z = 20
  // scene.add(camera)
  // // renderer
  // const canvas: HTMLCanvasElement = document.querySelector(
  //   '#bg'
  // ) as HTMLCanvasElement
  // const renderer = new THREE.WebGLRenderer({
  //   canvas: canvas,
  // })
  // // 與滑鼠事件建立連線
  // const controls = new OrbitControls(camera, canvas)
  // controls.enableDamping = true
  // renderer.physicallyCorrectLights = true
  // renderer.outputEncoding = THREE.sRGBEncoding
  // renderer.toneMapping = THREE.CineonToneMapping
  // renderer.toneMappingExposure = 1.75
  // renderer.shadowMap.enabled = true
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap
  // renderer.setClearColor('#211d20')
  // renderer.setSize(sizes.width, sizes.height)
  // renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  // /**
  //  * Animate
  //  */
  // const clock = new THREE.Clock()
  // let previousTime = 0
  // function animate() {
  //   const elapsedTime = clock.getElapsedTime()
  //   const deltaTime = elapsedTime - previousTime
  //   previousTime = elapsedTime
  //   // Update controls
  //   controls.update()
  //   // Fox animation
  //   if (foxMixer) {
  //     foxMixer.update(deltaTime)
  //   }
  //   // Render
  //   renderer.render(scene, camera)
  //   // Call tick again on the next frame
  //   window.requestAnimationFrame(animate)
  // }
  // animate()
  // window.addEventListener('resize', () => {
  //   camera.updateProjectionMatrix()
  //   camera.aspect = window.innerWidth / window.innerHeight
  //   renderer.setSize(window.innerWidth, window.innerHeight)
  // })
})
</script>

<style scoped>
/* canvas {
  position: fixed;
  top: 0;
  left: 0;
} */
.container {
  width: 100vw;
  height: 95vh;
  background: #ccc;
}
body,
html {
  overflow-x: hidden;
  font-family: 'Courier New', Courier, monospace;
}
s canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}

nav {
  color: white;
  z-index: 2;
  position: relative;
  padding: 4rem;
  display: flex;
  justify-content: space-between;
}
nav a {
  text-decoration: none;
  color: white;
  font-weight: bold;
}
nav ul {
  list-style: none;
  display: flex;
  gap: 4rem;
}
h1.title {
  color: white;
  z-index: 2;
  position: absolute;
  font-size: 3rem;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -75%);
}
</style>
