'use client'
import { a, useTransition } from '@react-spring/web'
import { useStore } from './useStore'

export const EndScreen = () => {
  const store = useStore()

  const totalScore = store.scores.reduce((a, b) => a + b, 0)
  const averageScore = totalScore / store.scores.length

  const transition = useTransition(store.end, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent = transition((style, item) => {
    if (!item) return

    return (
      <a.div style={style} className="fixed inset-0 z-50 bg-white">
        <div className="grid h-screen w-screen place-items-center">
          <p className="text-6xl"> Final Score: {averageScore.toFixed(2)}</p>
        </div>
      </a.div>
    )
  })

  return animatedContent
}
