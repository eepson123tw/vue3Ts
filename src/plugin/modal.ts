/* eslint-disable no-unused-vars */
import { sizes } from '@/utils/Sizes'
import { time } from '@/utils/Time'
import camrea from '@/plugin/camera'
import renderer from '@/plugin/renderer'
import world from './world'
import * as THREE from 'three'

type Etype = (canvas: HTMLCanvasElement, window: Window) => void
export const experience: Etype = (canvas, window) => {
  let scene = new THREE.Scene()
  let resizeFn: (item: { width: number; height: number }) => void = (item) => {
    camera.aspect = item.width / item.height
    camera.updateProjectionMatrix()
    renderers.setSize(item.width, item.height)
    renderers.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }
  let timeFn = (item: {}) => {
    controls.update()
    renderers.render(scene, camera)
  }
  const { width, height } = sizes(canvas, window, resizeFn)
  const { camera, controls } = camrea({ width, height, scene, canvas })
  let renderers = renderer({ scene, canvas, camera, width, height })
  //resize fn
  time(timeFn)
  // resources(sources)
  world({ scene })
}
