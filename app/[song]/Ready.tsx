'use client'

import { a, useTransition } from '@react-spring/web'
import { useStore } from './useStore'

export function Ready() {
  const store = useStore()

  const transition = useTransition(store.countDown === 4, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent = transition((style, item) => {
    if (!item) return

    return (
      <a.div className="text-9xl" style={style}>
        Ready?
      </a.div>
    )
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      {animatedContent}
    </div>
  )
}
