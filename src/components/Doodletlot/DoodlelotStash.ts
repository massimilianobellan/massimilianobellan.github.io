import { createStrictStash } from '@massimilianobellan/stash/react'

export type DoodlelotShape = {
  id: string
  coordinates: {
    x: number
    y: number
  }
  type: 'rectangle'
}

type DoodlelotStash = {
  shapes: DoodlelotShape[]
  selected: string | null
  addShape: (newShape: DoodlelotShape) => void
  removeShape: (shapeId: string) => void
  selectShape: (shapeId: string | null) => void
}

const [useDoodleStash, DoodleStashContext] = createStrictStash<DoodlelotStash>(
  (set) => ({
    shapes: [],
    selected: null,
    addShape: (newShape) => {
      set(({ shapes }) => {
        return { shapes: [...shapes, newShape] }
      })
    },
    removeShape: (shapeId) => {
      set(({ shapes }) => {
        return { shapes: shapes.filter(({ id }) => id !== shapeId) }
      })
    },
    selectShape: (shapeId) => {
      set(() => {
        return { selected: shapeId }
      })
    },
  })
)

export { DoodleStashContext }

export function useDoodlelotShapes() {
  return useDoodleStash(({ shapes }) => shapes)
}

export function useDoodlelotShapeById(shapeId: string) {
  return useDoodleStash(({ shapes }) => shapes.find(({ id }) => id === shapeId))
}

export function useDoodlelotSelected() {
  return useDoodleStash(({ selected }) => selected)
}

export function useDoodlelotAddShape() {
  return useDoodleStash(({ addShape }) => addShape)
}

export function useDoodlelotRemoveShape() {
  return useDoodleStash(({ removeShape }) => removeShape)
}

export function useDoodlelotSelectShape() {
  return useDoodleStash(({ selectShape }) => selectShape)
}
