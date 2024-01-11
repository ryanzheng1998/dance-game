'use client'

import { a, useTransition } from '@react-spring/web'
import { useStore } from './useStore'

export function ScoreLabel() {
  const store = useStore()

  const transition = useTransition(store.showScoreLabel !== null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent = transition((style, item) => {
    if (!item) return

    return (
      <a.label
        style={style}
        className="absolute right-0 text-8xl text-white drop-shadow-2xl"
      >
        {store.showScoreLabel}
      </a.label>
    )
  })

  return animatedContent
}
