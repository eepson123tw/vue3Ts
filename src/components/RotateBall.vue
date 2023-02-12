<template>
  <div class="container">
    <canvas id="bg"></canvas>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import starsTexture from '../assets/img/stars.jpg'

import sunTexture from '../assets/img/sun.jpg'
import mercuryTexture from '../assets/img/mercury.jpg'
import venusTexture from '../assets/img/venus.jpg'
import earthTexture from '../assets/img/earth.jpg'
// import marsTexture from '../assets/img/mars.jpg'
// import jupiterTexture from '../assets/img/jupiter.jpg'
import saturnTexture from '../assets/img/saturn.jpg'
import saturnRingTexture from '../assets/img/saturn ring.png'
// import uranusTexture from '../assets/img/uranus.jpg'
// import uranusRingTexture from '../assets/img/uranus ring.png'
// import neptuneTexture from '../assets/img/neptune.jpg'
// import plutoTexture from '../assets/img/pluto.jpg'

onMounted(() => {
  const canvas: HTMLCanvasElement = document.querySelector(
    '#bg'
  ) as HTMLCanvasElement

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)

  const scene = new THREE.Scene()

  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )

  const controls = new OrbitControls(camera, canvas)

  camera.position.set(-90, 140, 140)
  controls.update()

  const ambientLight = new THREE.AmbientLight(0x333333)

  scene.add(ambientLight)

  const cubTextureLoader = new THREE.CubeTextureLoader()
  scene.background = cubTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
  ])

  const TextureLoader = new THREE.TextureLoader()

  const sunGeo = new THREE.SphereGeometry(16, 30, 30)
  const sunMat = new THREE.MeshBasicMaterial({
    map: TextureLoader.load(sunTexture),
  })
  const sun = new THREE.Mesh(sunGeo, sunMat)
  scene.add(sun)

  function createPlanete(size: number, texture: string, position: number) {
    const geo = new THREE.SphereGeometry(size, 30, 30)
    const mat = new THREE.MeshStandardMaterial({
      map: TextureLoader.load(texture),
    })
    const mesh = new THREE.Mesh(geo, mat)
    const obj = new THREE.Object3D()
    obj.add(mesh) // 製造出隱形物件代替太陽座標，來讓各自星球有不同的轉速
    scene.add(obj)
    mesh.position.x = position
    return {
      mesh,
      obj,
    }
  }

  const mercury = createPlanete(3.2, mercuryTexture, 28)
  const venus = createPlanete(5, venusTexture, 40)
  const saturn = createPlanete(10, saturnTexture, 138)
  const earth = createPlanete(10.5, earthTexture, 55)
  const saturnRingGeo = new THREE.RingGeometry(10, 20, 32)
  const saturnRingMat = new THREE.MeshBasicMaterial({
    map: TextureLoader.load(saturnRingTexture),
    side: THREE.DoubleSide,
  })

  const saturnRing = new THREE.Mesh(saturnRingGeo, saturnRingMat)
  saturn.obj.add(saturnRing)
  saturnRing.position.x = 138
  saturnRing.rotation.x = -0.5 * Math.PI

  const pointLight = new THREE.PointLight(0xffffff, 2, 300)
  scene.add(pointLight)

  function animate() {
    sun.rotateY(0.004)
    mercury.mesh.rotateY(0.04)
    venus.mesh.rotateY(0.009)
    saturn.mesh.rotateY(0.0009)
    earth.mesh.rotateY(0.0018)

    mercury.obj.rotateY(0.04)
    venus.obj.rotateY(0.009)
    saturn.obj.rotateY(0.0009)
    earth.obj.rotateY(0.0018)
    renderer.render(scene, camera)
  }

  renderer.setAnimationLoop(animate)
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
</style>
