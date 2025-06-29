import { useRef } from 'react'
import { useDoodlelotMouseHandler } from '../common/useDoodlelotActionHandler'
import { DoodlelotBar } from '../DoodlelotBar/DoodlelotBar'
import { DoodlelotPreview } from '../DoodlelotPreview/DoodlelotPreview'
import { DoodlelotShape } from '../DoodlelotShape/DoodlelotShape'
import { useDoodleShapes } from '../Stashes/DoodlelotStash'
import styles from './DoodlelotCanvas.module.css'

export function DoodlelotCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const { onMouseUp, onMouseDown, onMouseMove } =
    useDoodlelotMouseHandler(canvasRef)
  const shapes = useDoodleShapes()

  return (
    <>
      <div
        className={styles.canvas}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        <DoodlelotBar />
        {shapes.map(({ id }) => {
          return <DoodlelotShape key={id} id={id} />
        })}
        <DoodlelotPreview />
      </div>
    </>
  )
}
