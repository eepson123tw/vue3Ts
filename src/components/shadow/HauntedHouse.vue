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
  //texture
  const textureLoader = new THREE.TextureLoader()
  const doorColorTexture = textureLoader.load('/src/assets/img/door/color.jpg')
  const doorAlphaTexture = textureLoader.load('/src/assets/img/door/alpha.jpg')
  const doorAmbientOcclusionTexture = textureLoader.load(
    '/src/assets/img/door/ambientOcclusion.jpg'
  )
  const doorHeightTexture = textureLoader.load(
    '/src/assets/img/door/height.jpg'
  )
  const doorNormalTexture = textureLoader.load(
    '/src/assets/img/door/normal.jpg'
  )
  // const doorMetalnessTexture = textureLoader.load(
  //   '/src/assets/img/door/metalness.jpg'
  // )
  const doorRoughnessTexture = textureLoader.load(
    '/src/assets/img/door/roughness.jpg'
  )

  const bricksColorTexture = textureLoader.load(
    '/src/assets/img/bricks/color.jpg'
  )
  const bricksAmbientOcclusionTexture = textureLoader.load(
    '/src/assets/img/bricks/ambientOcclusion.jpg'
  )
  const bricksNormalTexture = textureLoader.load(
    '/src/assets/img/bricks/normal.jpg'
  )
  const bricksRoughnessTexture = textureLoader.load(
    '/src/assets/img/bricks/roughness.jpg'
  )

  const grassColorTexture = textureLoader.load(
    '/src/assets/img/grass/color.jpg'
  )
  const grassAmbientOcclusionTexture = textureLoader.load(
    '/src/assets/img/grass/ambientOcclusion.jpg'
  )
  const grassNormalTexture = textureLoader.load(
    '/src/assets/img/grass/normal.jpg'
  )
  const grassRoughnessTexture = textureLoader.load(
    '/src/assets/img/grass/roughness.jpg'
  )

  grassColorTexture.repeat.set(8, 8)
  grassAmbientOcclusionTexture.repeat.set(8, 8)
  grassAmbientOcclusionTexture.repeat.set(8, 8)
  grassRoughnessTexture.repeat.set(8, 8)

  grassColorTexture.wrapS = THREE.RepeatWrapping
  grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
  grassAmbientOcclusionTexture.wrapS = THREE.RepeatWrapping
  grassRoughnessTexture.wrapS = THREE.RepeatWrapping
  grassColorTexture.wrapT = THREE.RepeatWrapping
  grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
  grassAmbientOcclusionTexture.wrapT = THREE.RepeatWrapping
  grassRoughnessTexture.wrapT = THREE.RepeatWrapping
  /**
   * House
   */

  const house = new THREE.Group()
  scene.add(house)

  // fog

  const fog = new THREE.Fog('#262837', 1, 15)
  scene.fog = fog

  //walls
  const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
      map: bricksColorTexture,
      aoMap: bricksAmbientOcclusionTexture,
      normalMap: bricksNormalTexture,
      roughnessMap: bricksRoughnessTexture,
    })
  )
  walls.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(walls.geometry.attributes.uv.array, 2)
  )
  walls.position.y = 1.25
  house.add(walls)

  //roof
  const roof = new THREE.Mesh(
    new THREE.ConeGeometry(3.5, 1, 4),
    new THREE.MeshStandardMaterial({ color: '#b35f45' })
  )
  // Math.PI 3.14XXX 要轉1/4度 一个圆的周长与直径的比值 Math.PI * 0.25 将会得到圆的一个四分之一的周长（即一个圆的周长乘以 0.25）
  roof.rotation.y = Math.PI * 0.25
  roof.position.y = 3
  house.add(roof)

  // door
  const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
      map: doorColorTexture,
      alphaMap: doorAlphaTexture,
      transparent: true,
      aoMap: doorAmbientOcclusionTexture,
      displacementMap: doorHeightTexture,
      displacementScale: 0.1,
      normalMap: doorNormalTexture,
      roughnessMap: doorRoughnessTexture,
    })
  )
  door.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(door.geometry.attributes.uv.array, 2)
  )
  house.add(door)

  door.position.y = 1
  door.position.z = 2 + 0.01
  house.add(door)

  // Bushes
  const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
  const bushMaterial = new THREE.MeshStandardMaterial({ color: '#89c854' })

  const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush1.scale.set(0.5, 0.5, 0.5)
  bush1.position.set(0.8, 0.2, 2.2)

  const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush2.scale.set(0.25, 0.25, 0.25)
  bush2.position.set(1.4, 0.1, 2.1)

  const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush3.scale.set(0.4, 0.4, 0.4)
  bush3.position.set(-0.8, 0.1, 2.2)

  const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
  bush4.scale.set(0.15, 0.15, 0.15)
  bush4.position.set(-1, 0.05, 2.6)

  house.add(bush1, bush2, bush3, bush4)

  //graves

  const graves = new THREE.Group()
  scene.add(graves)

  const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
  const graveMaterial = new THREE.MeshStandardMaterial({ color: '#a00' })

  for (let i = 0; i < 50; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 4 + Math.random() * 5
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.4, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4
    grave.rotation.z = Math.random() * 0.25
    grave.castShadow = true
    graves.add(grave)
  }

  // Floor
  const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({
      map: grassColorTexture,
      aoMap: grassAmbientOcclusionTexture,
      normalMap: grassNormalTexture,
      roughnessMap: grassRoughnessTexture,
    })
  )
  floor.geometry.setAttribute(
    'uv2',
    new THREE.Float32BufferAttribute(floor.geometry.attributes.uv.array, 2)
  )
  floor.rotation.x = -Math.PI * 0.5
  floor.position.y = 0
  scene.add(floor)

  /**
   * Lights
   */
  // Ambient light
  const ambientLight = new THREE.AmbientLight('#b9d5ff', 0.12)

  scene.add(ambientLight)

  // Directional light
  const moonLight = new THREE.DirectionalLight('#b9d5ff', 0.12)
  moonLight.position.set(4, 5, -2)

  scene.add(moonLight)

  //Door light

  const doorLight = new THREE.PointLight('#ff7d46', 1, 7)
  doorLight.position.set(0, 2.2, 2.7)
  house.add(doorLight)

  /**
   * ghost
   */

  const ghost1 = new THREE.PointLight('#ff00ff', 2, 3)
  scene.add(ghost1)
  const ghost2 = new THREE.PointLight('#00ffff', 2, 3)
  scene.add(ghost2)
  const ghost3 = new THREE.PointLight('#ffff00', 2, 3)
  scene.add(ghost3)

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
  camera.position.x = 4
  camera.position.y = 2
  camera.position.z = 5
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
  renderer.setClearColor('#262837')

  renderer.shadowMap.enabled = true
  moonLight.castShadow = true
  doorLight.castShadow = true
  ghost1.castShadow = true
  ghost2.castShadow = true
  ghost3.castShadow = true
  walls.castShadow = true
  bush1.castShadow = true
  bush2.castShadow = true
  bush3.castShadow = true
  bush4.castShadow = true
  floor.receiveShadow = true

  moonLight.shadow.mapSize.width = 256
  moonLight.shadow.mapSize.height = 256
  moonLight.shadow.camera.far = 15

  // ...

  doorLight.shadow.mapSize.width = 256
  doorLight.shadow.mapSize.height = 256
  doorLight.shadow.camera.far = 7

  // ...

  ghost1.shadow.mapSize.width = 256
  ghost1.shadow.mapSize.height = 256
  ghost1.shadow.camera.far = 7

  // ...

  ghost2.shadow.mapSize.width = 256
  ghost2.shadow.mapSize.height = 256
  ghost2.shadow.camera.far = 7

  // ...

  ghost3.shadow.mapSize.width = 256
  ghost3.shadow.mapSize.height = 256
  ghost3.shadow.camera.far = 7

  // ...

  renderer.shadowMap.type = THREE.PCFSoftShadowMap

  // Controls
  const controls = new OrbitControls(camera, canvas)
  controls.enableDamping = true

  /**
   * Animate
   */
  const clock = new THREE.Clock()

  const tick = () => {
    const elapsedTime = clock.getElapsedTime()
    //update ghost
    const ghost1Angle = elapsedTime * 0.5
    ghost1.position.x = Math.cos(ghost1Angle) * 4
    ghost1.position.z = Math.sin(ghost1Angle) * 4
    ghost1.position.y = Math.abs(Math.sin(ghost1Angle) * 3)
    const ghost2Angle = -elapsedTime * 0.32
    ghost2.position.x = Math.cos(ghost2Angle) * 4
    ghost2.position.z = Math.sin(ghost2Angle) * 4
    ghost2.position.y = Math.abs(
      Math.sin(ghost2Angle) + Math.sin(elapsedTime * 2.5)
    )
    const ghost3Angle = -elapsedTime * 0.18
    ghost3.position.x =
      Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
    ghost3.position.z =
      Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
    ghost3.position.y = Math.abs(Math.sin(ghost3Angle) * 2)

    //Update shadow

    // Update controls
    controls.update()

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
