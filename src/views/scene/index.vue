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

  group.add(cube1)
  group.add(cube2)
  group.add(cube3)

  // group.position.y = 2
  // group.scale.y = 2
  // group.rotation.z = 2
  scene.add(group)
  //Create camera
  //The field of view(vision angle),The aspect ratio(縱恆比),near,far
  const camera = new THREE.PerspectiveCamera(75, 800 / 600, 0.1, 100)
  // const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 5, 1000)
  camera.position.z = 5
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

  //cursor
  const cursor = {
    x: 0,
    y: 0,
  }
  window.addEventListener('mousemove', (e) => {
    cursor.x = e.clientX / 800 - 0.5 //0=>1
    cursor.y = -e.clientY / 600 - 0.5 //0=>1 y預設為政
  })

  // const clock = new THREE.Clock()
  // let time = Date.now()
  const tick = () => {
    // const curTime = Date.now()
    // const diffTime = curTime - time
    // time = curTime
    // console.log(clock.getElapsedTime())
    camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    camera.position.Z = Math.cos(cursor.x * Math.PI * 2) * 3
    camera.position.y = cursor.y * 5
    renderer.render(scene, camera)

    //利用數學屬性變動Animate
    // group.rotation.y = clock.getElapsedTime()
    // group.position.y = Math.sin(clock.getElapsedTime())
    // group.position.x = Math.cos(clock.getElapsedTime())
    camera.lookAt(group.position)
    window.requestAnimationFrame(tick)
  }
  tick()
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
