<template>
  <div class="container">
    <canvas id="bg"></canvas>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
onMounted(() => {
  //scene
  const scene = new THREE.Scene()
  /**
   * modal
   */
  // const dracoLoader = new DRACOLoader()
  // dracoLoader.setDecoderPath('/models/draco/')
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('/draco/')
  const gltfLoader = new GLTFLoader()
  gltfLoader.setDRACOLoader(dracoLoader)

  // let mixer: any = null
  gltfLoader.load(
    '/models/hambuger.glb',
    (gltf) => {
      // mixer = new THREE.AnimationMixer(gltf.scene)
      // const action = mixer.clipAction(gltf.animations[2])
      // action.play()
      // gltf.scene.scale.set(0.025, 0.025, 0.025)
      scene.add(gltf.scene)
      // let x = [...gltf.scene.children]
      // x.forEach((item, idx) => {
      //   scene.add(item)
      // })
    },
    () => {
      console.log('progress')
    },
    () => {
      console.log('error')
    }
  )

  /**
   * Floor
   */
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
      color: '#444444',
      metalness: 0,
      roughness: 0.5,
    })
  )
  floor.receiveShadow = true
  floor.rotation.x = -Math.PI * 0.4
  scene.add(floor)

  // light
  const light = new THREE.PointLight(0xffffff, 1, 100)
  light.position.set(0, 10, 10)
  light.intensity = 1.25
  scene.add(light)
  //camera
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
  camera.position.z = 20
  scene.add(camera)

  // renderer
  const canvas: HTMLCanvasElement = document.querySelector(
    '#bg'
  ) as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  })
  // 與滑鼠事件建立連線
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true
  controls.enablePan = false
  controls.enableZoom = true
  // controls.autoRotate = true
  // controls.autoRotateSpeed = 5

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(2)
  renderer.render(scene, camera)
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

  window.addEventListener('resize', () => {
    camera.updateProjectionMatrix()
    camera.aspect = window.innerWidth / window.innerHeight
    renderer.setSize(window.innerWidth, window.innerHeight)
  })
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
