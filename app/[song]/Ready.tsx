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
      <a.div className="absolute text-9xl" style={style}>
        Ready?
      </a.div>
    )
  })

  const transition2 = useTransition(store.countDown === 3, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent2 = transition2((style, item) => {
    if (!item) return

    return (
      <a.div className="absolute text-9xl" style={style}>
        3
      </a.div>
    )
  })

  const transition3 = useTransition(store.countDown === 2, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent3 = transition3((style, item) => {
    if (!item) return

    return (
      <a.div className="absolute text-9xl" style={style}>
        2
      </a.div>
    )
  })

  const transition4 = useTransition(store.countDown === 1, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent4 = transition4((style, item) => {
    if (!item) return

    return (
      <a.div className="absolute text-9xl" style={style}>
        1
      </a.div>
    )
  })

  const transition5 = useTransition(store.countDown === 0, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent5 = transition5((style, item) => {
    if (!item) return

    return (
      <a.div className="absolute text-9xl" style={style}>
        GO!
      </a.div>
    )
  })

  return (
    <div className="fixed inset-0 grid place-items-center">
      {animatedContent}
      {animatedContent2}
      {animatedContent3}
      {animatedContent4}
      {animatedContent5}
    </div>
  )
}
