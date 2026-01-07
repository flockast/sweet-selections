import { onBeforeUnmount, onMounted, readonly, reactive } from 'vue'

export const useEvent = <
  TypeElement extends HTMLElement | Window | Document | null,
  TypeEventType extends keyof GlobalEventHandlersEventMap
>(
  element: TypeElement,
  eventType: TypeEventType,
  callback: (event: GlobalEventHandlersEventMap[TypeEventType]) => void
) => {
  const state = reactive({
    isListening: false
  })

  const add = () => {
    if (!element) return
    element.addEventListener(eventType, callback as EventListener)
    state.isListening = true
  }

  const remove = () => {
    if (!element) return
    element.removeEventListener(eventType, callback as EventListener)
    state.isListening = false
  }

  onMounted(add)
  onBeforeUnmount(remove)

  return {
    state: readonly(state),
    add,
    remove
  }
}
