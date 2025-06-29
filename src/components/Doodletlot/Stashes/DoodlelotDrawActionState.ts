import { createStrictStash } from '@massimilianobellan/stash/react'

export type DoodlelotActionState =
  | { type: 'select' }
  | {
      type: 'draw-rectangle'
      phase: 'idle' | 'drawing'
      start?: { x: number; y: number }
    }
  | {
      type: 'draw-circle'
      phase: 'idle' | 'drawing'
      start?: { x: number; y: number }
    }
  | { type: 'type-text' }

type DoodlelotDrawActionStateStash = {
  action: DoodlelotActionState
  setAction: (action: DoodlelotActionState) => void
  resetAction: () => void
}

const [useDoodlelotDrawActionState, DoodlelotDrawActionStateContext] =
  createStrictStash<DoodlelotDrawActionStateStash>((set, get) => ({
    action: { type: 'select' },
    setAction: (action) => set({ action }),
    resetAction: () => {
      const action = get().action
      switch (action.type) {
        case 'select':
          set({ action: { type: 'select' } })
          break
        case 'draw-rectangle':
          set({ action: { type: 'draw-rectangle', phase: 'idle' } })
          break
        case 'draw-circle':
          set({ action: { type: 'draw-circle', phase: 'idle' } })
          break
        case 'type-text':
          set({ action: { type: 'type-text' } })
          break
      }
    },
  }))

export { DoodlelotDrawActionStateContext }

export function useDoodlelotDrawAction() {
  return useDoodlelotDrawActionState(({ action }) => action)
}

export function useDoodlelotDrawSetAction() {
  return useDoodlelotDrawActionState(({ setAction }) => setAction)
}

export function useResetDoodleDrawAction() {
  return useDoodlelotDrawActionState(({ resetAction }) => resetAction)
}
