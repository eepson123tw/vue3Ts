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
  const moonTexture = textureLoader.load('/src/assets/img/uranusring.png')
  // particle
  const particlesGeometry = new THREE.SphereGeometry()
  const particlesMaterial = new THREE.PointsMaterial({
    // color: '#ee11cc',
    vertexColors: true,
    size: 0.1,
    sizeAttenuation: true,
    alphaMap: moonTexture,
    transparent: true,
    // alphaTest: 0.001,
    // depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })
  const count = 5000
  // Multiply by 3 because each position is composed of 3 values (x, y, z)
  const positions = new Float32Array(count * 3)
  const colors = new Float32Array(count * 3)
  console.log(positions)

  // point
  for (let i = 0; i < count * 3; i++) {
    // Multiply by 3 for same reason
    positions[i] = (Math.random() - 0.5) * 10
    colors[i] = Math.random()
  }
  // Create the Three.js BufferAttribute and specify that each information is composed of 3 values
  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  )
  particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
  const point = new THREE.Points(particlesGeometry, particlesMaterial)

  scene.add(point)

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
  scene.add(ambientLight)

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
  camera.position.z = 3
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

  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  /**
   * Animate
   */
  // const clock = new THREE.Clock()

  const tick = () => {
    // const elapsedTime = clock.getElapsedTime()

    //Update particle
    // point.position.y = -elapsedTime * 0.2
    // for (let i = 0; i < count; i++) {
    //   const i3 = i * 3
    //   const x = particlesGeometry.attributes.position.array[i3]
    //   particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
    //     elapsedTime + x
    //   )
    // }
    particlesGeometry.attributes.position.needsUpdate = true
    // particlesGeometry.attributes.position.array
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
