<template>
  <div class="container">
    <canvas id="bg"></canvas>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'
onMounted(() => {
  //scene
  const scene = new THREE.Scene()
  /**
   * Textures
   */
  const textureLoader = new THREE.TextureLoader()
  // const bakedShadow = textureLoader.load('/src/assets/img/bakedShadow.jpg')
  const simpleShadow = textureLoader.load('/src/assets/img/simpleShadow.jpg')
  /**
   * Lights PointLight DirectionLight SpotLight support shadow
   */
  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
  scene.add(ambientLight)

  // Directional light
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.3)
  directionalLight.position.set(2, 2, -1)
  scene.add(directionalLight)
  directionalLight.castShadow = false
  directionalLight.shadow.mapSize.width = 1024
  directionalLight.shadow.mapSize.height = 1024
  directionalLight.shadow.camera.top = 2
  directionalLight.shadow.camera.bottom = -2
  directionalLight.shadow.camera.right = 2
  directionalLight.shadow.camera.left = -2
  directionalLight.shadow.camera.near = 1
  directionalLight.shadow.camera.far = 6

  // directionalLight.shadow.radius = 10 softshaowmap 不存在這屬性

  const directionalLightHelper = new THREE.CameraHelper(
    directionalLight.shadow.camera
  )
  directionalLightHelper.visible = false
  scene.add(directionalLightHelper)

  //SpotLight

  const SpotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3)
  SpotLight.castShadow = false
  SpotLight.position.set(0, 2, 2)
  scene.add(SpotLight)
  scene.add(SpotLight.target)

  SpotLight.castShadow = false
  SpotLight.shadow.mapSize.width = 1024
  SpotLight.shadow.mapSize.height = 1024
  SpotLight.shadow.camera.fov = 30
  SpotLight.shadow.camera.near = 1
  SpotLight.shadow.camera.far = 6

  const SpotLightHelper = new THREE.CameraHelper(SpotLight.shadow.camera)
  SpotLightHelper.visible = false
  scene.add(SpotLightHelper)

  // Point light
  const pointLight = new THREE.PointLight(0xffffff, 0.5)
  pointLight.position.set(-1, 1, 0)
  scene.add(pointLight)
  pointLight.castShadow = false
  pointLight.shadow.mapSize.width = 1024
  pointLight.shadow.mapSize.height = 1024
  pointLight.shadow.camera.near = 0.1
  pointLight.shadow.camera.far = 5

  const pointLightHelper = new THREE.CameraHelper(pointLight.shadow.camera)
  pointLightHelper.visible = false
  scene.add(pointLightHelper)

  /**
   * Objects
   */
  const material = new THREE.MeshStandardMaterial()
  material.roughness = 0.7
  const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
  sphere.castShadow = false
  //陰影可以用靜態圖檔載入,也可以用動態
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
  // const plane = new THREE.Mesh(
  //   new THREE.PlaneGeometry(5, 5),
  //   new THREE.MeshBasicMaterial({
  //     map: bakedShadow,
  //   })
  // )
  plane.rotation.x = -Math.PI * 0.5
  plane.position.y = -0.5
  plane.receiveShadow = true
  scene.add(sphere, plane)

  const sphereShadow = new THREE.Mesh(
    new THREE.PlaneGeometry(1.5, 1.5),
    new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      alphaMap: simpleShadow,
    })
  )
  sphereShadow.rotation.x = -Math.PI * 0.5
  sphereShadow.position.y = plane.position.y + 0.01
  scene.add(sphereShadow)
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
  camera.position.x = 1
  camera.position.y = 1
  camera.position.z = 2
  scene.add(camera)

  /**
   * Renderer
   */

  const canvas: HTMLCanvasElement = document.querySelector(
    '#bg'
  ) as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.shadowMap.enabled = false
  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  /**
   * Animate
   */
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    //update tge sphere
    sphere.position.x = Math.cos(elapsedTime) * 1.5
    sphere.position.z = Math.sin(elapsedTime) * 1.5
    sphere.position.y = Math.abs(Math.sin(elapsedTime) * 2)
    //Update shadow

    // Update controls
    controls.update()
    sphereShadow.position.x = sphere.position.x
    sphereShadow.position.z = sphere.position.z
    sphereShadow.material.opacity = (1 - sphere.position.y) * 0.3
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()
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

canvas {
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
