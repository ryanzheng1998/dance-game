'use client'
import { useEffect, useRef } from 'react'
import { startPlay } from './startPlay'
import { useStore } from './useStore'

export const useCountDown = () => {
  const store = useStore()
  const animationRef = useRef<number>(0)
  const countDownRef = useRef<number>(store.countDown)
  const startTimeRef = useRef<number>(0)

  useEffect(() => {
    startTimeRef.current = performance.now()

    const draw = (t2: number) => {
      const t = t2 - startTimeRef.current

      if (countDownRef.current === 0) {
        startPlay()
        return
      }

      if (countDownRef.current > 5 - t / 1000) {
        store.decressCountDown()
        countDownRef.current -= 1
      }

      animationRef.current = requestAnimationFrame(draw)
    }

    animationRef.current = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [])
}
