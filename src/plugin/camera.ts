/* eslint-disable no-unused-vars */
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
type Camera = (obj: {
  width: number
  height: number
  scene: THREE.Scene
  canvas: HTMLCanvasElement
}) => { camera: THREE.PerspectiveCamera; controls: OrbitControls }
const camrea: Camera = (obj) => {
  const camera = new THREE.PerspectiveCamera(
    35,
    obj.width / obj.height,
    0.1,
    100
  )
  camera.position.set(6, 4, 8)
  obj.scene.add(camera)
  const controls = new OrbitControls(camera, obj.canvas)
  controls.enableDamping = true
  return { camera, controls }
}

export default camrea
