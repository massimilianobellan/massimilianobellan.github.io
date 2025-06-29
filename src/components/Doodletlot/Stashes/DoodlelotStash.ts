import { createStrictStash } from '@massimilianobellan/stash/react'
import { v4 as uuidv4 } from 'uuid'

type DoodlelotShape = {
  id: string
  coordinates: {
    x: number
    y: number
  }
  size: {
    width: number
    height: number
  }
  type: 'rectangle' | 'circle'
}

type DoodlelotText = {
  id: string
  coordinates: {
    x: number
    y: number
  }
  type: 'text'
}

type Doodle = DoodlelotShape | DoodlelotText

type DoodlelotStash = {
  doodles: Array<Doodle>
  preview: DoodlelotShape | null
  selected: string | null
  addDoodle: (newShape: Omit<DoodlelotShape, 'id'>) => void
  removeDoodle: (doodleId: string) => void
  setPreview: (doodle: DoodlelotShape | null) => void
  selectDoodle: (doodleId: string | null) => void
}

const [useDoodleStash, DoodleStashContext] = createStrictStash<DoodlelotStash>(
  (set) => ({
    doodles: [],
    preview: null,
    selected: null,
    addDoodle: (newDoodle) => {
      const doodleWithUuid: DoodlelotShape = { ...newDoodle, id: uuidv4() }
      set(({ doodles }) => {
        return { doodles: [...doodles, doodleWithUuid] }
      })
    },
    removeDoodle: (doodleId) => {
      set(({ doodles }) => {
        return { doodles: doodles.filter(({ id }) => id !== doodleId) }
      })
    },
    setPreview: (doodle) => {
      set(() => ({ preview: doodle }))
    },
    selectDoodle: (doodleId) => {
      set(() => ({ selected: doodleId }))
    },
  })
)

export { DoodleStashContext }

export function useDoodles() {
  return useDoodleStash(({ doodles }) => doodles)
}

export function useDoodleShapes() {
  return useDoodleStash(({ doodles }) =>
    doodles.filter((doodle) => isShape(doodle))
  )
}

export function useDoodleShapeById(doodleId: string) {
  return useDoodleStash(({ doodles }) => {
    const doodle = doodles.find(({ id }) => id === doodleId)
    if (doodle === undefined)
      throw new Error(`Could not find shape by id ${doodleId}`)
    if (!isShape(doodle))
      throw new Error(
        `Found shape of id ${doodleId} but is of type ${doodle.type}`
      )
    return doodle
  })
}

export function useDoodleTexts() {
  return useDoodleStash(({ doodles }) =>
    doodles.filter((doodle) => isText(doodle))
  )
}

export function useDoodleTextById(doodleId: string) {
  return useDoodleStash(({ doodles }) => {
    const doodle = doodles.find(({ id }) => id === doodleId)
    if (doodle === undefined)
      throw new Error(`Could not find shape by id ${doodleId}`)
    if (!isText(doodle))
      throw new Error(
        `Found shape of id ${doodleId} but is of type ${doodle.type}`
      )
    return doodle
  })
}

export function useDoodleById(doodleId: string) {
  return useDoodleStash(({ doodles }) =>
    doodles.find(({ id }) => id === doodleId)
  )
}

export function usePreviewDoodle() {
  return useDoodleStash(({ preview }) => preview)
}

export function useSelectedDoodle(doodleId: string) {
  return useDoodleStash(({ selected }) => selected === doodleId)
}

export function useAddDoodle() {
  return useDoodleStash(({ addDoodle }) => addDoodle)
}

export function useRemoveDoodle() {
  return useDoodleStash(({ removeDoodle }) => removeDoodle)
}

export function useSetPreviewDoodle() {
  return useDoodleStash(({ setPreview }) => setPreview)
}

export function useSelectDoodle() {
  return useDoodleStash(({ selectDoodle }) => selectDoodle)
}

function isShape(shape: Doodle): shape is DoodlelotShape {
  return shape.type === 'circle' || shape.type === 'rectangle'
}

function isText(shape: Doodle): shape is DoodlelotText {
  return shape.type === 'text'
}
