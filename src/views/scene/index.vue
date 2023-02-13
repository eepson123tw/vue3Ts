<template>
  <div class="container">
    <p>Scene</p>
    <canvas id="bg"></canvas>
  </div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { onMounted } from 'vue'
onMounted(() => {
  //scene
  const scene = new THREE.Scene()
  //Create  Box
  // const geometry = new THREE.BoxGeometry(1, 1, 1)
  // const material = new THREE.MeshBasicMaterial({ color: 'red' })
  // const cube = new THREE.Mesh(geometry, material)
  // cube.position.y = 2
  // cube.position.set(1, 2, 3)
  // scene.add(cube)

  // create group
  const group = new THREE.Group()
  const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'red' })
  )
  const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'blue' })
  )
  const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 'white' })
  )
  cube2.position.x = 4
  cube3.position.x = -4
  group.add(cube1)
  group.add(cube2)
  group.add(cube3)

  group.position.y = 2
  group.scale.y = 2
  group.rotation.z = 2
  scene.add(group)
  //Create camera
  //The field of view(vision angle),The aspect ratio(縱恆比),
  const camera = new THREE.PerspectiveCamera(75, 800 / 600)
  camera.position.z = 6
  scene.add(camera)
  // camera.lookAt(cube.position)

  // position between middle
  // console.log(cube.position.length(), camera.position)
  // know the distance
  // console.log(cube.position.distanceTo(camera.position))
  // normalize to one
  // console.log(cube.position.normalize())
  // console.log(cube.position.length())

  //scale
  // cube.scale.x = 2
  // cube.scale.y = 0.5
  // rotation
  // cube.rotation.reorder('YXZ')
  // cube.rotation.x = 2

  //axesHelper
  const axesHelper = new THREE.AxesHelper(2)
  scene.add(axesHelper)

  // renderer
  const canvas: HTMLCanvasElement = document.querySelector(
    '#bg'
  ) as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  })

  renderer.setSize(800, 600)
  renderer.render(scene, camera)
})
</script>

<style lang="less" scoped>
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
