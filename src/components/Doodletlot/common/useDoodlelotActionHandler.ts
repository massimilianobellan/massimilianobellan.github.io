import { useCallback, type MouseEvent, type RefObject } from 'react'
import {
  useDoodlelotDrawAction,
  useDoodlelotDrawSetAction,
} from '../Stashes/DoodlelotDrawActionState'
import { useAddDoodle, useSelectDoodle } from '../Stashes/DoodlelotStash'

export function useDoodlelotMouseHandler(
  ref: RefObject<HTMLDivElement | null>
) {
  const action = useDoodlelotDrawAction()
  const setAction = useDoodlelotDrawSetAction()
  const addShape = useAddDoodle()

  const onMouseDown = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      const { type } = action
      switch (type) {
        case 'select':
          break
        case 'draw-rectangle':
          {
            const rect = ref.current.getBoundingClientRect()
            setAction({
              type: 'draw-rectangle',
              phase: 'drawing',
              start: {
                x: event.clientX - rect.left,
                y: event.clientY - rect.top,
              },
            })
          }
          break
        case 'draw-circle':
          break
        case 'type-text':
          break
      }
    },
    [action, ref, setAction]
  )

  const onMouseUp = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return
      switch (action.type) {
        case 'select':
          break
        case 'draw-rectangle':
          {
            const { start } = action
            if (start === undefined) return
            const rect = ref.current.getBoundingClientRect()
            const endX = event.clientX - rect.left
            const endY = event.clientY - rect.top
            const x = Math.min(start.x, endX)
            const y = Math.min(start.y, endY)
            const width = Math.abs(endX - start.x)
            const height = Math.abs(endY - start.y)
            addShape({
              coordinates: { x, y },
              size: { height, width },
              type: 'rectangle',
            })
          }
          break
        case 'draw-circle':
          break
        case 'type-text':
          break
      }
    },
    [action, addShape, ref]
  )

  return { onMouseUp, onMouseDown }
}

export function useDoodlelotClickHandler() {
  const action = useDoodlelotDrawAction()
  const selectShape = useSelectDoodle()

  const onClickCallback = useCallback(() => {
    switch (action.type) {
      case 'select':
        return (id: string) => selectShape(id)
      case 'draw-rectangle':
        break
      case 'draw-circle':
        break
      case 'type-text':
        break
    }
  }, [selectShape])

  return { onClickCallback }
}
