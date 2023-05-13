/* eslint-disable no-unused-vars */
import { experience } from '@/plugin/modal'
import environment from './environment'
import resources from '@/utils/Resources'
import sources from '@/utils/sources'
import * as THREE from 'three'

type World = (obj: { scene: THREE.Scene }) => void
const world: World = ({ scene }) => {
  const testMesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ wireframe: true })
  )
  scene.add(testMesh)

  let resource = resources(sources, (item) => {
    let environments = environment({ scene })
  })
}

export default world
