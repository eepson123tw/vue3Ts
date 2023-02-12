<template>
  <!-- <div class="index" ref="bg"></div> -->
  <canvas id="bg"></canvas>
  <main>
    <header>
      <h1>Jeff Delaney</h1>
      <p>🚀 Welcome to my website!</p>
    </header>

    <blockquote>
      <p>I like making stuff and putting it on the internet</p>
    </blockquote>

    <section>
      <h2>📜 Manifesto</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </section>

    <section class="light">
      <h2>👩🏽‍🚀 Projects</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>

      <h2>🏆 Accomplishments</h2>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </section>

    <blockquote>
      <p>The best way out is always through <br />-Robert Frost</p>
    </blockquote>

    <section class="left">
      <h2>🌮 Work History</h2>

      <h3>McDonalds</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <h3>Burger King</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
      <h3>Taco Bell</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </section>

    <blockquote>
      <p>Thanks for watching!</p>
    </blockquote>
  </main>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as THREE from 'three'
import img from '../assets/img/space.jpg'
import img2 from '../assets/img/cast2.jpg'
import moon from '../assets/img/moon.jpg'
import normal from '../assets/img/normal.jpg'
// const bg = ref<HTMLInputElement | null>(null)

onMounted(() => {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  )
  const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
  })
  renderer.setSize(window.innerWidth, window.innerHeight)
  camera.position.setZ(30)
  renderer.render(scene, camera)

  const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
  const material = new THREE.MeshStandardMaterial({
    color: 0xff6565,
  })
  //mesh geometry+material
  const torus = new THREE.Mesh(geometry, material)
  scene.add(torus)
  // light
  const pointLight = new THREE.PointLight(0xffffff)
  const ambientLight = new THREE.AmbientLight(0xffffff) //均勻光線
  pointLight.position.set(5, 5, 5)
  scene.add(pointLight, ambientLight)

  //確認光源點
  // const lightHelper = new THREE.PointLightHelper(pointLight)
  //確認 水平線
  // const gridHelper = new THREE.GridHelper(200, 50)
  // scene.add(lightHelper, gridHelper)
  // 與滑鼠事件建立連線
  const controls = new OrbitControls(camera, renderer.domElement)

  //塞入星星
  function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24)
    const material = new THREE.MeshStandardMaterial({
      color: 0xff6565,
    })
    const star = new THREE.Mesh(geometry, material)
    const [x, y, z] = Array(3)
      .fill()
      .map(() => THREE.MathUtils.randFloatSpread(100))
    star.position.set(x, y, z)
    scene.add(star)
  }

  Array(200).fill().forEach(addStar)
  //background
  const spaceTexture = new THREE.TextureLoader().load(img)
  scene.background = spaceTexture

  //avatar
  const avatarTexture = new THREE.TextureLoader().load(img2)
  const avatar = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ map: avatarTexture }) //
  )
  scene.add(avatar)

  // Moon

  const moonTexture = new THREE.TextureLoader().load(moon)
  const normalTexture = new THREE.TextureLoader().load(normal)
  const Moon = new THREE.Mesh(
    new THREE.SphereGeometry(3, 32, 32),
    new THREE.MeshStandardMaterial({
      map: moonTexture,
      normalMap: normalTexture,
    })
  )
  Moon.position.z = 30
  Moon.position.setX(-10)
  scene.add(Moon)

  function moveCamera() {
    const t = document.body.getBoundingClientRect().top
    Moon.rotation.x += 0.05
    Moon.rotation.y += 0.75
    Moon.rotation.z += 0.05

    avatar.rotation.y += 0.01
    avatar.rotation.z += 0.01

    camera.position.x = t * -0.0002
    camera.position.y = t * -0.0002
    camera.position.z = t * -0.01
  }

  document.body.onscroll = moveCamera

  function animate() {
    requestAnimationFrame(animate)
    torus.rotation.x += 0.01
    torus.rotation.y += 0.01
    torus.rotation.z += 0.01
    controls.update()
    renderer.render(scene, camera)
  }
  animate()
})
</script>

<style scoped>
main {
  width: 100vw;
  color: white;
  z-index: 99;
  position: absolute;
  width: 100%;
  margin: 0px auto;
  padding: 120px 0px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

h1,
h2,
h3,
blockquote {
  font-family: elevon, sans-serif;
  font-weight: 700;
  font-style: normal;
}

canvas {
  position: fixed;
  top: 0;
  left: 0;
}

header {
  background: var(--dark-bg);
  grid-column: 2 / span 5;
  font-size: 2.5rem;
  padding: 2rem;
  margin-bottom: var(--spacing);
}

section {
  grid-column: 2 / 8;
  padding: 1rem;
  background: var(--dark-bg);
  font-size: 1.25rem;
  line-height: 1.5;
  margin-bottom: var(--spacing);
}

blockquote {
  margin: 0;
  padding: 0;
  grid-column: 2 / span 9;
  margin-bottom: var(--spacing);
}

blockquote p {
  color: black;
  background-color: white;
  font-size: 4rem;
  display: inline;
  line-height: 1;
}

.left {
  grid-column: 6 / 12;
}
</style>
