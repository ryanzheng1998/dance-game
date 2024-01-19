import { create } from 'zustand'

interface State {
  countDown: number // 5, 4, 3, 2, 1
  decressCountDown: () => void
  currentSong: null | string
  setCurrentSong: (song: string) => void
  scores: number[]
  addScore: (score: number) => void
  showScoreLabel: null | 'PERFECT' | 'GOOD' | 'BAD'
  setShowScoreLabel: (label: null | 'PERFECT' | 'GOOD' | 'BAD') => void
  end: boolean
  setEnd: (end: boolean) => void
  restart: () => void
}

export const useStore = create<State>((set, get) => ({
  countDown: 5, // 5 -> loading -> 4 -> Ready -> 3 -> 2 -> 1 -> 0 -> -1 -> start
  decressCountDown: () => set((state) => ({ countDown: state.countDown - 1 })),
  currentSong: null,
  setCurrentSong: (song: string) => set({ currentSong: song }),
  scores: [],
  addScore: (score: number) =>
    set((state) => ({ scores: [...state.scores, score] })),
  showScoreLabel: null,
  setShowScoreLabel: (label: null | 'PERFECT' | 'GOOD' | 'BAD') =>
    set({ showScoreLabel: label }),
  end: false,
  setEnd: (end: boolean) => set({ end }),
  restart: () => {
    set({
      countDown: 5,
      currentSong: null,
      scores: [],
      showScoreLabel: null,
      end: false,
    })
  },
}))

// export const useStore = create<State>((set, get) => ({
//   countDown: -1, // 5 -> loading -> 4 -> Ready -> 3 -> 2 -> 1 -> 0 -> -1 -> start
//   decressCountDown: () => set((state) => ({ countDown: state.countDown - 1 })),
//   currentSong: '花园种花.mp4',
//   setCurrentSong: (song: string) => set({ currentSong: song }),
//   scores: [30],
//   addScore: (score: number) =>
//     set((state) => ({ scores: [...state.scores, score] })),
//   showScoreLabel: null,
//   setShowScoreLabel: (label: null | 'PERFECT' | 'GOOD' | 'BAD') =>
//     set({ showScoreLabel: label }),
//   end: true,
//   setEnd: (end: boolean) => set({ end }),
//   restart: () => {
//     set({
//       countDown: 5,
//       currentSong: null,
//       scores: [],
//       showScoreLabel: null,
//       end: false,
//     })
//   },
// }))
