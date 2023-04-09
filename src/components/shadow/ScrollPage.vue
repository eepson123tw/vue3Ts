<template>
  <canvas class="webgl"></canvas>
  <section class="section">
    <h1>My Portfolio</h1>
  </section>
  <section class="section">
    <h2>My projects</h2>
  </section>
  <section class="section">
    <h2>Contact me</h2>
  </section>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import gsap from 'gsap'
import { onMounted } from 'vue'

onMounted(() => {
  const parameters = {
    materialColor: '#ffeded',
  }

  const objectsDistance = 4

  //texture
  const textureLoader = new THREE.TextureLoader()
  const texture = textureLoader.load('/src/assets/img/gradients/3.jpg')
  texture.magFilter = THREE.NearestFilter //WEBGL WILL CHOICE THE LIGHT TO MIX COLOR BY DEFAULT , BUT WE DON'T WANT
  /**
   * Base
   */
  // Canvas
  const canvas = document.querySelector('canvas.webgl') as HTMLCanvasElement

  // Scene
  const scene = new THREE.Scene()

  /**
   * Objects
   */

  //MeshToonMaterial only appear has light
  const material = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: texture,
  })

  const mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 16, 60),
    material
  )
  const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material)
  const mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
    material
  )

  mesh1.position.y = -objectsDistance * 0
  mesh2.position.y = -objectsDistance * 1
  mesh3.position.y = -objectsDistance * 2

  mesh1.position.x = 2
  mesh2.position.x = -1
  mesh3.position.x = 2
  scene.add(mesh1, mesh2, mesh3)

  const sectionMeshs = [mesh1, mesh2, mesh3]
  /**
   * particles
   */

  //geometry

  const particles = 200
  const positions = new Float32Array(particles * 3)

  for (let i = 0; i < particles; i++) {
    positions[i * 3 + 0] = (Math.random() - 0.5) * 10
    positions[i * 3 + 1] =
      objectsDistance * 0.4 -
      Math.random() * objectsDistance * sectionMeshs.length
  }

  const particlesGeometry = new THREE.BufferGeometry()
  particlesGeometry.setAttribute(
    'position',
    new THREE.BufferAttribute(positions, 3)
  )
  //material

  const particlesMaterial = new THREE.PointsMaterial({
    color: parameters.materialColor,
    sizeAttenuation: true,
    size: 0.03,
  })

  const particlesPoint = new THREE.Points(particlesGeometry, particlesMaterial)
  scene.add(particlesPoint)

  /**
   * light
   */

  const directionalLight = new THREE.DirectionalLight('#ffffff', 1)
  directionalLight.position.set(1, 1, 0)
  scene.add(directionalLight)
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

  const cameraGroup = new THREE.Group()
  scene.add(cameraGroup)

  const camera = new THREE.PerspectiveCamera(
    35,
    sizes.width / sizes.height,
    0.1,
    100
  )
  camera.position.z = 6
  cameraGroup.add(camera)

  /**
   * Renderer
   */
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
  })
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  /**
   * Scroll
   */

  let scrollY = window.scrollY
  let currentSection = 0
  window.addEventListener('scroll', () => {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)
    if (currentSection !== newSection) {
      currentSection = newSection
      gsap.to(sectionMeshs[currentSection].rotation, {
        duration: 1.5,
        ease: 'power2.inOut',
        x: '+=6',
        y: '+=3',
        z: '+=0.12',
      })
    }
  })

  /**
   * Cursor
   */

  const cursor = { x: 0, y: 0 }

  window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / sizes.width - 0.5 // RWD保持等比例 0.5 ~ -0.5
    cursor.y = e.clientY / sizes.height - 0.5
  })

  /**
   * Animate
   */
  const clock = new THREE.Clock()
  let previousTime = 0

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    //Animate camera
    // 將滾動距離/可視網頁高度*物件距離 就可得出每個section的相對位置
    camera.position.y = (-scrollY / sizes.height) * objectsDistance
    const parallaxX = cursor.x * 0.5
    const parallaxY = -cursor.y * 0.5
    //camera包了一層group 我們移動group本身,但camera不移動
    //easing 算出距離後緩慢移動
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * deltaTime

    //Animate meshes
    for (const mesh of sectionMeshs) {
      mesh.rotation.x += deltaTime * 0.1
      mesh.rotation.y += deltaTime * 0.12
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
  }

  tick()
})
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html,
body {
  background: #1e1a20;
  /* overflow: hidden; */
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}

.section {
  display: flex;
  align-items: center;
  height: 100vh;
  position: relative;
  font-family: 'Cabin', sans-serif;
  color: #ffeded;
  text-transform: uppercase;
  font-size: 7vmin;
  padding-left: 10%;
  padding-right: 10%;
}

section:nth-child(odd) {
  justify-content: flex-end;
}
</style>
