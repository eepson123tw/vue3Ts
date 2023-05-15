/* eslint-disable no-unused-vars */
import * as THREE from 'three'

type Environment = (obj: { scene: THREE.Scene; item: Array<any> }) => void
const environment: Environment = ({ scene, item }) => {
  const directionalLight = new THREE.DirectionalLight('#ffffff', 4)
  directionalLight.castShadow = true
  directionalLight.shadow.camera.far = 15
  directionalLight.shadow.mapSize.set(1024, 1024)
  directionalLight.shadow.normalBias = 0.05
  directionalLight.position.set(3.5, 2, -1.25)
  scene.add(directionalLight)
  let environmentMap: any = {}
  environmentMap.intensity = 0.4
  environmentMap.texture = item
  environmentMap.texture.encoding = THREE.sRGBEncoding
  scene.environment = environmentMap.texture

  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMap = environmentMap.texture
      child.material.envMapIntensity = environmentMap.intensity
      child.material.needsUpdate = true
      child.castShadow = true
      child.receiveShadow = true
    }
  })
}

export default environment
