import { createMouseParallax } from '@/shared/lib/parallax'

const parallax = createMouseParallax()

export const initParallax = () => {
  const croissant = document.querySelector('.croissant')
  if (croissant instanceof HTMLElement) {
    parallax.addElement(croissant, 0.08)
  }

  const pancake = document.querySelector('.pancake')
  if (pancake instanceof HTMLElement) {
    parallax.addElement(pancake, 0.025)
  }

  const title = document.querySelector('.window__title')
  if (title instanceof HTMLElement) {
    parallax.addElement(title, 0.005)
  }

  parallax.start()
}

export const destroyParallax = () => {
  parallax.start()
}
