<template>
  <div class="container">
    <canvas id="bg"></canvas>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
onMounted(() => {
  //scene
  const scene = new THREE.Scene()
  const gui = new dat.GUI()

  const debugObj: { envMapIntensity: number } = { envMapIntensity: 0 }

  /**
   * loaders
   */

  const gltfLoaders = new GLTFLoader()
  const cubeTextureLoader = new THREE.CubeTextureLoader()

  /**
   * Update all materials
   */

  const updateAllMaterials = () => {
    scene.traverse((children) => {
      if (
        children instanceof THREE.Mesh &&
        children.material instanceof THREE.MeshStandardMaterial
      ) {
        // children.material.envMap = enviromentMap
        children.material.envMapIntensity = debugObj.envMapIntensity
        children.material.needsUpdate = true
        children.castShadow = true
        children.receiveShadow = true
      }
    })
  }

  /**
   * Enviroment map
   */
  const enviromentMap = cubeTextureLoader.load([
    '/stextures/environmentMaps/0/px.jpg',
    '/stextures/environmentMaps/0/nx.jpg',
    '/stextures/environmentMaps/0/py.jpg',
    '/stextures/environmentMaps/0/ny.jpg',
    '/stextures/environmentMaps/0/pz.jpg',
    '/stextures/environmentMaps/0/nz.jpg',
  ])
  enviromentMap.encoding = THREE.sRGBEncoding
  scene.background = enviromentMap
  scene.environment = enviromentMap

  gltfLoaders.load('/smodels/hamburger.glb', (gltf) => {
    gltf.scene.scale.set(0.3, 0.3, 0.3)
    gltf.scene.position.set(0, -1, 0)
    // gltf.scene.rotation.y = Math.PI * 0.5。
    scene.add(gltf.scene)

    gui
      .add(gltf.scene.rotation, 'y')
      .min(-Math.PI)
      .max(Math.PI)
      .step(0.001)
      .name('rotation')

    updateAllMaterials()
  })

  // light
  const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
  directionalLight.position.set(0.25, 3, -2.25)
  directionalLight.castShadow = true
  directionalLight.shadow.camera.far = 15
  directionalLight.shadow.mapSize.set(1024, 1024)
  directionalLight.shadow.normalBias = 0.05
  scene.add(directionalLight)

  const directionalLightHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
  )
  scene.add(directionalLightHelper)

  debugObj.envMapIntensity = 5

  gui
    .add(debugObj, 'envMapIntensity')
    .min(0)
    .max(10)
    .step(0.001)
    .onChange(updateAllMaterials)

  gui
    .add(directionalLight, 'intensity')
    .min(0)
    .max(10)
    .step(0.001)
    .name('lightIntensity')
  gui
    .add(directionalLight.position, 'x')
    .min(-5)
    .max(5)
    .step(0.001)
    .name('lightX')
  gui
    .add(directionalLight.position, 'y')
    .min(-5)
    .max(5)
    .step(0.001)
    .name('lightY')
  gui
    .add(directionalLight.position, 'z')
    .min(-5)
    .max(5)
    .step(0.001)
    .name('lightZ')

  /**
   * Sizes
   */
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }

  window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  })

  /**
   * Camera
   */
  // Base camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  )
  camera.position.set(4, 1, -4)
  scene.add(camera)

  // renderer
  const canvas: HTMLCanvasElement = document.querySelector(
    '#bg'
  ) as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    //SSAA FSAA
    antialias: true,
  })
  // 與滑鼠事件建立連線
  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.CineonToneMapping
  renderer.toneMappingExposure = 3
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFShadowMap
  gui.add(renderer, 'toneMapping', {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACFS: THREE.ACESFilmicToneMapping,
  })

  gui.add(renderer, 'toneMappingExposure').min(0).max(10).step(0.001)

  // const clock = new THREE.Clock()
  // let prev = 0

  function animate() {
    // const elapsedTime = clock.getElapsedTime()
    // const deltaTime = elapsedTime - prev
    // prev = elapsedTime
    requestAnimationFrame(animate)
    // mesh.rotation.x += 0.01
    // light.position.y += 0.01
    // light.position.z += 0.01
    // mixer.update(deltaTime)
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
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
