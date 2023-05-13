/* eslint-disable no-unused-vars */
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
// import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'
interface Items {
  [key: string | number]: any
}
const resources: (ary: any, loadedFn: (...res: any) => any) => void = (
  ary,
  loadedFn
) => {
  let sources = ary
  // setup
  let items: Items = {}
  let toLoad = sources.length
  let loaded = 0
  let loaders: {
    gltfLoader?: GLTFLoader
    textureLoader?: THREE.TextureLoader
    cubeTextureLoader?: THREE.CubeTextureLoader
  } = {}
  loaders.gltfLoader = new GLTFLoader()
  loaders.textureLoader = new THREE.TextureLoader()
  loaders.cubeTextureLoader = new THREE.CubeTextureLoader()

  for (const source of sources) {
    if (source.type === 'gltfModel') {
      loaders.gltfLoader.load(source.path, (file) => {
        sourceLoaded(source, file)
      })
    } else if (source.type === 'texture') {
      loaders.textureLoader.load(source.path, (file) => {
        sourceLoaded(source, file)
      })
    } else if (source.type === 'cubeTexture') {
      loaders.cubeTextureLoader.load(source.path, (file) => {
        sourceLoaded(source, file)
      })
    }
  }

  const sourceLoaded: (...res: any) => void = (source, file) => {
    items[source.name] = file
    loaded++
    if (loaded === toLoad) {
      loadedFn({ sources })
    }
  }
}

export default resources
