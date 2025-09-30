export type ParallaxElement = {
  element: HTMLElement
  speed: number
  currentX: number
  currentY: number
}

export type ParallaxState = {
  elements: ParallaxElement[]
  mouseX: number
  mouseY: number
  centerX: number
  centerY: number
  isActive: boolean
  animationId: number | null
}
