/* eslint-disable no-unused-vars */
import * as THREE from 'three'
import resources from '@/utils/Resources'
import sources from '@/utils/sources'
type Fox = (obj: { scene: THREE.Scene }) => any
const fox: Fox = ({ scene }) => {
  let foxs: any
  resources(sources, () => {}).then((res) => {
    let resource = res.foxModel
    let model = resource.scene
    model.scale.set(0.02, 0.02, 0.02)
    scene.add(model)
    model.traverse((child: { castShadow: boolean }) => {
      if (child instanceof THREE.Mesh) {
        child.castShadow = true
      }
    })
    let animation: any = {}
    animation.mixer = new THREE.AnimationMixer(model)
    animation.action = animation.mixer.clipAction(resource.animations[0])
    animation.action.play()
    animation.mixer.update()
    foxs = animation
  })

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(foxs)
    }, 1000)
  })
}

export default fox
