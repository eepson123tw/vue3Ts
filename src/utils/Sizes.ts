/* eslint-disable no-unused-vars */
type SizesType = (
  canvas: HTMLCanvasElement,
  window: Window,
  fn: (...res: any) => any
) => { width: number; height: number; pixelRAtio: number }

export const sizes: SizesType = (canvas, window, fn) => {
  let width = window.innerWidth
  let height = window.innerHeight
  let pixelRAtio = Math.min(window.devicePixelRatio, 2)
  //Resize event
  window.addEventListener('resize', () => {
    width = window.innerWidth
    height = window.innerHeight
    pixelRAtio = Math.min(window.devicePixelRatio, 2)
    fn({ width, height, pixelRAtio })
  })
  return { width, height, pixelRAtio, event }
}
