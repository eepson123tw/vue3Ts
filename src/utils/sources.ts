//   '/xtextures/environmentMap/px.jpg',
//   '/xtextures/environmentMap/nx.jpg',
//   '/xtextures/environmentMap/py.jpg',
//   '/xtextures/environmentMap/ny.jpg',
//   '/xtextures/environmentMap/pz.jpg',
//   '/xtextures/environmentMap/nz.jpg',
//   '/xtextures/dirt/color.jpg'
//   '/xtextures/dirt/normal.jpg'

export default [
  {
    name: 'environmentMapTexture',
    type: 'cubeTexture',
    path: [
      '/xtextures/environmentMap/px.jpg',
      '/xtextures/environmentMap/nx.jpg',
      '/xtextures/environmentMap/py.jpg',
      '/xtextures/environmentMap/ny.jpg',
      '/xtextures/environmentMap/pz.jpg',
      '/xtextures/environmentMap/nz.jpg',
    ],
  },
  {
    name: 'grassColorTexture',
    type: 'texture',
    path: '/xtextures/dirt/color.jpg',
  },
  {
    name: 'grassNormalTexture',
    type: 'texture',
    path: '/xtextures/dirt/normal.jpg',
  },
  {
    name: 'foxModel',
    type: 'gltfModel',
    path: '/xmodels/Fox/glTF/Fox.gltf',
  },
]
