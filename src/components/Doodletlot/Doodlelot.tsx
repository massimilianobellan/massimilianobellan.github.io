import { useEffect, useRef, type RefObject } from 'react'
import styles from './Doodlelot.module.css'
import {
  DoodleStashContext,
  useDoodlelotAddShape,
  useDoodlelotShapeById,
  useDoodlelotShapes,
} from './DoodlelotStash'

export function Doodlelot() {
  return (
    <DoodleStashContext>
      <DoodlelotCanvas />
    </DoodleStashContext>
  )
}

function DoodlelotCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const shapes = useDoodlelotShapes()
  const addShape = useDoodlelotAddShape()

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    addShape({
      id: Math.random().toString(36).slice(2),
      coordinates: { x, y },
      type: 'rectangle',
    })
  }

  useEffect(() => {
    console.log(shapes)
  }, [shapes])

  return (
    <>
      <canvas
        className={styles.canvas}
        ref={canvasRef}
        onClick={handleCanvasClick}
      >
        Your browser does not support canvas 😔
      </canvas>
      {shapes.map((shape) => (
        <Shape key={shape.id} id={shape.id} canvasRef={canvasRef} />
      ))}
    </>
  )
}

interface ShapeProps {
  id: string
  canvasRef: RefObject<HTMLCanvasElement | null>
}

function Shape({ id, canvasRef }: ShapeProps) {
  const shape = useDoodlelotShapeById(id)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !shape) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    if (shape.type === 'rectangle') {
      ctx.fillStyle = '#1976d2'
      ctx.fillRect(shape.coordinates.x, shape.coordinates.y, 100, 60)
    }
  }, [shape, canvasRef])

  return null
}
