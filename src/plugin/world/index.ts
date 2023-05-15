/* eslint-disable no-unused-vars */
import { experience } from '@/plugin/modal'
import environment from './environment'
import floor from './floor'
import fox from './fox'
import resources from '@/utils/Resources'
import sources from '@/utils/sources'
import * as THREE from 'three'

type World = (obj: { scene: THREE.Scene }) => void
const world: World = ({ scene }) => {
  let environments
  let floors
  let foxs
  resources(sources, ({ sources, items }) => {
    environments = environment({
      scene,
      item: items.environmentMapTexture,
    })
    floors = floor({
      scene,
      item: [items.grassColorTexture, items.grassNormalTexture],
    })
  })
  foxs = fox({
    scene,
  })
}

export default world
