<template>
  <div class="container">
    <canvas id="bg"></canvas>
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
import sunTexture from '../assets/img/sun.jpg'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
// import { TextGeometryParameters } from '/node_modules/types/three/examples/jsm/geometries/TextGeometry'
onMounted(() => {
  const canvas: HTMLCanvasElement = document.querySelector(
    '#bg'
  ) as HTMLCanvasElement

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  })

  const TextureLoader = new THREE.TextureLoader()
  const matcapTexture = TextureLoader.load(sunTexture)

  renderer.setSize(window.innerWidth, window.innerHeight)
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  camera.position.z = 5
  /**
   * Fonts
   */
  const fontLoader = new FontLoader()
  fontLoader.load(
    '/src/assets/font/helvetiker_regular.typeface.json',
    (font) => {
      const textGeometry = new TextGeometry('Hello Three.js', {
        font: font,
        size: 0.5,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      }) as any
      textGeometry.computeBoundingBox()
      //將其對齊中心 因為字級大小的關係 必須扣除 bevelSize bevelThickness
      // textGeometry.translate(
      //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5,
      //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
      //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5
      // )
      //一樣可以對齊
      textGeometry.center()
      const textMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture,
      })
      const text = new THREE.Mesh(textGeometry, textMaterial)
      scene.add(text)
      const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
      const donutMaterial = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture,
      })
      for (let i = 0; i < 120; i++) {
        const donut = new THREE.Mesh(donutGeometry, donutMaterial)
        donut.position.x = (Math.random() - 0.5) * 10
        donut.position.y = (Math.random() - 0.5) * 10
        donut.position.z = (Math.random() - 0.5) * 10

        donut.rotation.x = Math.random() * Math.PI
        donut.rotation.y = Math.random() * Math.PI
        const scale = Math.random()
        donut.scale.set(scale, scale, scale)
        scene.add(donut)
      }
    }
  )

  const controls = new OrbitControls(camera, canvas)
  const axesHelper = new THREE.AxesHelper()
  scene.add(axesHelper)

  function animate() {
    requestAnimationFrame(animate)
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

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
}
</style>
