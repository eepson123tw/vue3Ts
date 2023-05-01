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
onMounted(() => {
  //scene
  const scene = new THREE.Scene()
  /**
   * Objects
   */
  const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
  )
  object1.position.x = -2

  const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
  )

  const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
  )
  object3.position.x = 2

  scene.add(object1, object2, object3)

  const raycaster = new THREE.Raycaster()
  // const rayOrigin = new THREE.Vector3(-3, 0, 0)
  // const rayDirection = new THREE.Vector3(10, 0, 0)

  // rayDirection.normalize()
  // raycaster.set(rayOrigin, rayDirection)

  // const intersect = raycaster.intersectObject(object2)
  // const intersects = raycaster.intersectObjects([object1, object2, object3])

  // Mouse

  const mouse = new THREE.Vector2()

  window.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
  })

  window.addEventListener('click', (e) => {
    if (currentIntersect) {
      if (currentIntersect.object === object1) {
        console.log('object1 click')
      }
      if (currentIntersect.object === object2) {
        console.log('object2 click')
      }
      if (currentIntersect.object === object3) {
        console.log('object3 click')
      }
    }
  })

  /**
   * Lights
   */
  // Ambient light
  const ambientLight = new THREE.AmbientLight('#ffffff', 0.3)
  scene.add(ambientLight)

  // Directional light
  const directionalLight = new THREE.DirectionalLight('#ffffff', 0.7)
  directionalLight.position.set(1, 2, 3)
  scene.add(directionalLight)

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  }
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

  // renderer
  const canvas: HTMLCanvasElement = document.querySelector(
    '#bg'
  ) as HTMLCanvasElement
  const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
  })

  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  //loader modal

  const gltfLoader = new GLTFLoader()
  let modal = null
  gltfLoader.load(
    '/models/Duck/glTF-Binary/Duck.glb',
    (gltf) => {
      modal = gltf.scene
      modal.position.y = -1.2
      scene.add(modal)

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

  const clock = new THREE.Clock()
  let currentIntersect: any = null

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    //Animate object

    object1.position.y = Math.sin(elapsedTime)
    object2.position.y = Math.sin(elapsedTime) * 1.5
    object3.position.y = Math.sin(elapsedTime * 0.5) * 2.8

    //cast a ray

    raycaster.setFromCamera(mouse, camera)

    // const rayOrigin = new THREE.Vector3(-3, 0, 0)
    // const rayDirection = new THREE.Vector3(1, 0, 0)

    // rayDirection.normalize()
    // raycaster.set(rayOrigin, rayDirection)

    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    for (const object of objectsToTest) {
      object.material.color.set('#ff0000')
    }

    for (const intersect of intersects) {
      intersect.object.material.color.set('#0000ff')
    }

    if (intersects.length) {
      if (currentIntersect === null) {
        console.log(' enter')
      }
      currentIntersect = intersects[0]
    } else {
      if (currentIntersect) {
        console.log(' leave')
      }
      currentIntersect = null
    }

    if (modal) {
      const modalIntersects = raycaster.intersectObject(modal)
      if (modalIntersects.length) {
        modal.scale.set(1.2, 1.2, 1.2)
      } else {
        modal.scale.set(1, 1, 1)
      }
    }

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
