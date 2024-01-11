'use client'

import { useCountDown } from './useCountDown'
import { useStore } from './useStore'

export function Webcam(p: {
  poseData: { [key: string]: [number, number, number][] }
}) {
  const store = useStore()

  useCountDown()

  return <div className="">{store.countDown}</div>
}
