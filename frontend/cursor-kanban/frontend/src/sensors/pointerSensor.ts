import type { PointerEvent } from 'react'
import { PointerSensor } from '@dnd-kit/core'

const IGNORE_TAGS = ['BUTTON', 'INPUT', 'TEXTAREA', 'SELECT']

function shouldActivate(element: HTMLElement | null): boolean {
  let cur: HTMLElement | null = element
  while (cur) {
    if (IGNORE_TAGS.includes(cur.tagName) || cur.dataset?.noDnd) {
      return false
    }
    cur = cur.parentElement
  }
  return true
}

const customHandler = ({ nativeEvent: event }: { nativeEvent: PointerEvent }) =>
  shouldActivate(event.target as HTMLElement) && event.isPrimary && event.button === 0

PointerSensor.activators = [
  { eventName: 'onPointerDown' as const, handler: customHandler },
]
