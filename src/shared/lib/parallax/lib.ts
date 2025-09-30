import { type ParallaxState } from './types'

// Начальное состояние
const createInitialState = (): ParallaxState => ({
  elements: [],
  mouseX: 0,
  mouseY: 0,
  centerX: window.innerWidth / 2,
  centerY: window.innerHeight / 2,
  isActive: false,
  animationId: null
})

// Основная функция создания параллакса
const createMouseParallax = () => {
  let state: ParallaxState = createInitialState()

  // Обновление позиций элементов
  const updateElementPositions = (): void => {
    const { elements, mouseX, mouseY, centerX, centerY } = state

    const deltaX = mouseX - centerX
    const deltaY = mouseY - centerY

    elements.forEach(parallaxElement => {
      const targetX = deltaX * parallaxElement.speed
      const targetY = deltaY * parallaxElement.speed

      // Плавная интерполяция
      parallaxElement.currentX += (targetX - parallaxElement.currentX) * 0.08
      parallaxElement.currentY += (targetY - parallaxElement.currentY) * 0.08

      parallaxElement.element.style.transform =
        `translate3d(${parallaxElement.currentX}px, ${parallaxElement.currentY}px, 0)`
    })
  }

  // Анимационный цикл
  const animate = (): void => {
    if (state.isActive) {
      updateElementPositions()
    }
    state.animationId = requestAnimationFrame(animate)
  }

  // Обработчики событий
  const handleMouseMove = (event: MouseEvent): void => {
    state.mouseX = event.clientX
    state.mouseY = event.clientY

    if (!state.isActive) {
      state.isActive = true
    }
  }

  const handleResize = (): void => {
    state.centerX = window.innerWidth / 2
    state.centerY = window.innerHeight / 2
  }

  // Публичные методы
  const addElement = (element: HTMLElement, speed: number = 0.5): void => {
    const validatedSpeed = Math.max(0, Math.min(1, speed))

    state.elements.push({
      element,
      speed: validatedSpeed,
      currentX: 0,
      currentY: 0
    })

    // Добавляем CSS для производительности
    element.style.willChange = 'transform'
  }

  const start = (): void => {
    // Добавляем обработчики событий
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('resize', handleResize)

    // Запускаем анимацию
    animate()
  }

  const stop = (): void => {
    // Удаляем обработчики событий
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('resize', handleResize)

    // Останавливаем анимацию
    if (state.animationId) {
      cancelAnimationFrame(state.animationId)
      state.animationId = null
    }

    // Сбрасываем трансформации элементов
    state.elements.forEach(({ element }) => {
      element.style.transform = ''
      element.style.willChange = ''
    })

    // Сбрасываем состояние
    state = createInitialState()
  }

  // Вспомогательные функции
  const getElementCount = (): number => state.elements.length

  const getState = (): Readonly<ParallaxState> => ({ ...state })

  return {
    addElement,
    start,
    stop,
    getElementCount,
    getState
  }
}

// Фабричная функция для быстрого создания параллакса с элементами
const createParallaxWithElements = (
  elements: Array<{ element: HTMLElement, speed: number }>
) => {
  const parallax = createMouseParallax()

  elements.forEach(({ element, speed }) => {
    parallax.addElement(element, speed)
  })

  parallax.start()

  return parallax
}

export { createMouseParallax, createParallaxWithElements }
