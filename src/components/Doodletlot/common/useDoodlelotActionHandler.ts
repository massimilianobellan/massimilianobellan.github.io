import { useCallback, type MouseEvent, type RefObject } from 'react'
import {
  useDoodlelotDrawAction,
  useDoodlelotDrawSetAction,
  useResetDoodleDrawAction,
} from '../Stashes/DoodlelotDrawActionState'
import {
  useAddDoodle,
  useSelectDoodle,
  useSetPreviewDoodle,
} from '../Stashes/DoodlelotStash'

export function useDoodlelotMouseHandler(
  ref: RefObject<HTMLDivElement | null>
) {
  const action = useDoodlelotDrawAction()
  const setAction = useDoodlelotDrawSetAction()
  const addDoodle = useAddDoodle()
  const setPreview = useSetPreviewDoodle()
  const resetAction = useResetDoodleDrawAction()

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

  const onMouseMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return

      if (action.type === 'draw-rectangle' && action.phase === 'drawing') {
        const rect = ref.current.getBoundingClientRect()
        const currentX = event.clientX - rect.left
        const currentY = event.clientY - rect.top
        const { start } = action
        if (!start) return
        setPreview({
          id: 'preview',
          type: 'rectangle',
          ...getBoundsFromPoints(start, { x: currentX, y: currentY }),
        })
      }
    },
    [action, ref, setPreview]
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
            if (!start) return
            const rect = ref.current.getBoundingClientRect()
            const endX = event.clientX - rect.left
            const endY = event.clientY - rect.top
            addDoodle({
              ...getBoundsFromPoints(start, { x: endX, y: endY }),
              type: 'rectangle',
            })
          }
          break
        case 'draw-circle':
          break
        case 'type-text':
          break
      }
      resetAction()
    },
    [action, addDoodle, ref, resetAction]
  )

  return { onMouseUp, onMouseDown, onMouseMove }
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
  }, [action.type, selectShape])

  return { onClickCallback }
}

function getBoundsFromPoints(
  start: { x: number; y: number },
  end: { x: number; y: number }
) {
  const x = Math.min(start.x, end.x)
  const y = Math.min(start.y, end.y)
  const width = Math.abs(end.x - start.x)
  const height = Math.abs(end.y - start.y)
  return {
    coordinates: { x, y },
    size: { width, height },
  }
}
