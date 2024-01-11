'use client'

import { a, useTransition } from '@react-spring/web'
import { useStore } from './useStore'

export function Webcam() {
  const store = useStore()

  const transition = useTransition(store.currentSong !== null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  })

  const animatedContent = transition((style, item) => {
    if (!item) return

    return (
      <a.div style={style} className="fixed inset-0">
        <video
          id="video"
          className="absolute left-0 z-10 h-screen bg-transparent"
          src={`/videos/${store.currentSong}`}
          onEnded={() => {
            console.log('end')
          }}
        />
        <div className="absolute h-screen w-screen overflow-hidden">
          <div className="translate-x-44">
            <video
              id="webcam"
              autoPlay
              className="h-screen w-screen -scale-x-100 bg-black"
            />
            <canvas
              id="canvas"
              className="absolute top-0 h-screen w-screen -scale-x-100"
            />
          </div>
        </div>
      </a.div>
    )
  })

  return animatedContent
}
