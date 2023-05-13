/* eslint-disable no-unused-vars */
import * as THREE from 'three'

type Environment = (obj: { scene: THREE.Scene }) => void
const environment: Environment = ({ scene }) => {
  const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
  directionalLight.castShadow = true
  directionalLight.shadow.camera.far = 15
  directionalLight.shadow.mapSize.set(1024, 1024)
  directionalLight.shadow.normalBias = 0.05
  directionalLight.position.set(3.5, 2, -1.25)
  scene.add(directionalLight)
}

export default environment
