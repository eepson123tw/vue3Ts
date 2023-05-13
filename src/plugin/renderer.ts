/* eslint-disable no-unused-vars */
import * as THREE from 'three'
type Renderer = (obj: {
  scene: THREE.Scene
  canvas: HTMLCanvasElement
  width: number
  height: number
  camera: THREE.PerspectiveCamera
}) => THREE.WebGLRenderer
const renderer: Renderer = (obj) => {
  const renderer = new THREE.WebGLRenderer({
    canvas: obj.canvas,
    antialias: true,
  })

  renderer.physicallyCorrectLights = true
  renderer.outputEncoding = THREE.sRGBEncoding
  renderer.toneMapping = THREE.CineonToneMapping
  renderer.toneMappingExposure = 1.75
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setClearColor('#211d20')
  renderer.setSize(obj.width, obj.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

  return renderer
}

export default renderer
