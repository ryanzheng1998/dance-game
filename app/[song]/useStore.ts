import { create } from 'zustand'

interface State {
  countDown: number // 5, 4, 3, 2, 1
  decressCountDown: () => void
}

export const useStore = create<State>((set, get) => ({
  countDown: 5, // 5 -> loading -> 4 -> Ready -> 3 -> 2 -> 1 -> 0 -> start
  decressCountDown: () => set((state) => ({ countDown: state.countDown - 1 })),
}))
