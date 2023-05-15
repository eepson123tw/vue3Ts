/* eslint-disable no-unused-vars */
import * as THREE from 'three'

type Floor = (obj: { scene: THREE.Scene; item: Array<any> }) => void
const floor: Floor = ({ scene, item }) => {
  console.log(scene)
  let geometry = new THREE.CircleGeometry(5, 64)
  let texture: any = {}
  texture.color = item[0]
  texture.color.encoding = THREE.sRGBEncoding
  texture.color.repeat.set(1.5, 1.5)
  texture.color.wrapS = THREE.RepeatWrapping
  texture.color.wrapT = THREE.RepeatWrapping

  texture.normal = item[1]
  texture.normal.repeat.set(1.5, 1.5)
  texture.normal.wrapS = THREE.RepeatWrapping
  texture.normal.wrapT = THREE.RepeatWrapping

  let material = new THREE.MeshStandardMaterial({
    map: texture.color,
    normalMap: texture.normal,
  })

  let mesh = new THREE.Mesh(geometry, material)
  mesh.rotation.x = -Math.PI * 0.5
  mesh.receiveShadow = true
  scene.add(mesh)
}

export default floor
