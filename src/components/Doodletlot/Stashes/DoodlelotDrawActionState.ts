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
}

const [useDoodlelotDrawActionState, DoodlelotDrawActionStateContext] =
  createStrictStash<DoodlelotDrawActionStateStash>((set) => ({
    action: { type: 'select' },
    setAction: (action) => set({ action }),
  }))

export { DoodlelotDrawActionStateContext }

export function useDoodlelotDrawAction() {
  return useDoodlelotDrawActionState(({ action }) => action)
}

export function useDoodlelotDrawSetAction() {
  return useDoodlelotDrawActionState(({ setAction }) => setAction)
}
