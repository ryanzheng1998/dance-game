'use client'

import { a, useTransition } from '@react-spring/web'
import { setUp } from './setUp'
import { startPlay } from './startPlay'
import { useStore } from './useStore'

export const FrontPage = (p: { songs: string[] }) => {
  const store = useStore()

  const transition = useTransition(store.currentSong === null, {
    from: { opacity: 1 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent = transition((style, item) => {
    if (!item) return

    return (
      <a.div
        style={style}
        className="grid h-screen w-screen place-items-center bg-gradient-to-b from-slate-500 to-slate-800"
      >
        <div className="grid place-items-center gap-4">
          {p.songs.map((s) => {
            const name = s.split('.')[0]!
            return (
              <button
                className="text-3xl text-white shadow-2xl"
                key={s}
                onClick={() => {
                  store.setCurrentSong(s)

                  const startTime = performance.now()
                  let countDown = store.countDown

                  const draw = (t2: number) => {
                    const t = t2 - startTime

                    if (countDown === 5) {
                      setUp(name, performance.now() + 5000)
                    }

                    if (countDown === -1) {
                      startPlay()
                      return
                    }

                    if (countDown > 5 - t / 1000) {
                      store.decressCountDown()
                      countDown -= 1
                    }

                    requestAnimationFrame(draw)
                  }

                  requestAnimationFrame(draw)
                }}
              >
                {name}
              </button>
            )
          })}
        </div>
      </a.div>
    )
  })

  return animatedContent
}
