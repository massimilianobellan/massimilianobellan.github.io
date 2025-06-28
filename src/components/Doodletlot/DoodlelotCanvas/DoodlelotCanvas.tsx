import { useRef, type MouseEvent } from 'react'
import { DoodlelotBar } from '../DoodlelotBar/DoodlelotBar'
import { DoodlelotShape } from '../DoodlelotShape/DoodlelotShape'
import {
  useDoodlelotAddShape,
  useDoodlelotShapes,
} from '../Stashes/DoodlelotStash'
import styles from './DoodlelotCanvas.module.css'

export function DoodlelotCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const shapes = useDoodlelotShapes()
  const addShape = useDoodlelotAddShape()

  function handleClick(event: MouseEvent<HTMLDivElement>) {
    if (!canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    addShape({ type: 'rectangle', coordinates: { x, y } })
  }

  return (
    <>
      <div className={styles.canvas} onClick={handleClick} ref={canvasRef}>
        <DoodlelotBar />
        {shapes.map(({ id }) => {
          return <DoodlelotShape key={id} id={id} />
        })}
      </div>
    </>
  )
}
