// eslint-disable-next-line no-unused-vars
export const time: (fn: (...res: any) => any) => any = (fn) => {
  let start = Date.now()
  let current = start
  let elapsed = 0
  let delta = 16 //wait one tick
  const tick = () => {
    const currentTime = Date.now()
    delta = currentTime - current
    current = currentTime
    elapsed = current - start
    fn({ delta, current, elapsed })
    window.requestAnimationFrame(tick)
  }
  window.requestAnimationFrame(tick)
}
