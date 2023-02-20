<template>
  <div class="container">
    <p>Scene</p>
    <canvas id="bg"></canvas>
  </div>
</template>
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
  const geometry = new THREE.BufferGeometry()

  const count = 300

  const positionArray = new Float32Array(count * 3 * 3)

  for (let i = 0; i < count * 3 * 3; i++) {
    positionArray[i] = Math.random()
  }

  const positionAttribute = new THREE.BufferAttribute(positionArray, 3)
  geometry.setAttribute('position', positionAttribute)

  // create group
  const group = new THREE.Group()
  const cube1 = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })
  )
  // const cube2 = new THREE.Mesh(
  //   new THREE.BoxGeometry(1, 1, 1),
  //   new THREE.MeshBasicMaterial({ color: 'blue' })
  // )
  // const cube3 = new THREE.Mesh(
  //   new THREE.BoxGeometry(1, 1, 1, 2, 2, 2),
  //   new THREE.MeshBasicMaterial({ color: 'red' })
  // )

  group.add(cube1)
  // group.add(cube2)
  // group.add(cube3)

  // group.position.y = 2
  // group.scale.y = 2
  // group.rotation.z = 2
  scene.add(group)
  //Create camera
  //The field of view(vision angle),The aspect ratio(縱恆比),near,far
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  )
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

  renderer.setSize(window.innerWidth, window.innerHeight)

  //resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight) //update canvas
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)) //get right pixelratio
  })

  window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
      canvas.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  })

  //cursor
  // const cursor = {
  //   x: 0,
  //   y: 0,
  // }

  //controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  // controls.target.y = 2
  // controls.update()
  // window.addEventListener('mousemove', (e) => {
  //   cursor.x = e.clientX / 800 - 0.5 //0=>1
  //   cursor.y = -e.clientY / 600 - 0.5 //0=>1 y預設為政
  // })

  // const clock = new THREE.Clock()
  // let time = Date.now()
  const tick = () => {
    // const curTime = Date.now()
    // const diffTime = curTime - time
    // time = curTime
    // console.log(clock.getElapsedTime())
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
    // camera.position.Z = Math.cos(cursor.x * Math.PI * 2) * 3
    // camera.position.y = cursor.y * 5
    renderer.render(scene, camera)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    //利用數學屬性變動Animate
    // group.rotation.y = clock.getElapsedTime()
    // group.position.y = Math.sin(clock.getElapsedTime())
    // group.position.x = Math.cos(clock.getElapsedTime())
    camera.lookAt(group.position)
    window.requestAnimationFrame(tick)
    controls.update()
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
