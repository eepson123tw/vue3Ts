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
  // const moonTexture = textureLoader.load('/src/assets/img/uranusring.png')

  // Ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.2)
  scene.add(ambientLight)

  // galaxy

  const parameters = {
    count: 100000,
    size: 0.01,
    radius: 5,
    branches: 10,
    spin: 2,
    randomness: 0.2,
    randomnessPower: 3,
    insideColor: '#ff6030',
    outSideColor: '#1b3984',
  }

  let geometry: THREE.BufferGeometry | null | undefined = null
  let positions = null
  let material: THREE.PointsMaterial | null | undefined = null
  let points: THREE.Object3D<THREE.Event> | null = null
  let colors = null

  const generateGalaxy = () => {
    if (geometry !== null || geometry !== undefined) {
      geometry && geometry.dispose()
      material && material.dispose()
      points && scene.remove(points)
    }
    //geometry
    geometry = new THREE.BufferGeometry()
    positions = new Float32Array(parameters.count * 3)
    colors = new Float32Array(parameters.count * 3)
    const colorInside = new THREE.Color(parameters.insideColor)
    const colorOutside = new THREE.Color(parameters.outSideColor)
    for (let i = 0; i < parameters.count; i++) {
      const i3 = i * 3
      const radius = Math.random() * parameters.radius
      const branchesAngle =
        ((i % parameters.branches) / parameters.branches) * Math.PI * 2
      const spinAngle = radius * parameters.spin

      const randomX =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius
      const randomY =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius
      const randomZ =
        Math.pow(Math.random(), parameters.randomnessPower) *
        (Math.random() < 0.5 ? 1 : -1) *
        parameters.randomness *
        radius

      positions[i3] = Math.cos(branchesAngle + spinAngle) * radius + randomX
      positions[i3 + 1] = 0 + randomY
      positions[i3 + 2] = Math.sin(branchesAngle + spinAngle) * radius + randomZ
      const mixColor = colorInside.clone()
      mixColor.lerp(colorOutside, radius / parameters.radius)
      colors[i3] = mixColor.r
      colors[i3 + 1] = mixColor.g
      colors[i3 + 2] = mixColor.b
    }
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    //material
    material = new THREE.PointsMaterial({
      size: parameters.size,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
    })

    // points
    points = new THREE.Points(geometry, material)
    // points.rotation.x = 0.0002
    scene.add(points)
  }

  generateGalaxy()

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
    // generateGalaxy()
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
