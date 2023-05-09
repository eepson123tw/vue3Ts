import { sizes } from '@/utils/Sizes'
// eslint-disable-next-line no-unused-vars
type Etype = (canvas: HTMLCanvasElement, window: Window) => void
export const experience: Etype = (canvas, window) => {
  let fn = (item: {}) => {
    console.log(item)
  }
  const { width, height, pixelRAtio } = sizes(canvas, window, fn)
  console.log(width, height, pixelRAtio)
}
