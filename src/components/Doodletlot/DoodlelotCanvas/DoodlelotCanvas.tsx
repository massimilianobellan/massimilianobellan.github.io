import { useRef } from 'react'
import { useDoodlelotMouseHandler } from '../common/useDoodlelotActionHandler'
import { DoodlelotBar } from '../DoodlelotBar/DoodlelotBar'
import { DoodlelotShape } from '../DoodlelotShape/DoodlelotShape'
import { useDoodles } from '../Stashes/DoodlelotStash'
import styles from './DoodlelotCanvas.module.css'

export function DoodlelotCanvas() {
  const canvasRef = useRef<HTMLDivElement>(null)
  const { onMouseUp, onMouseDown } = useDoodlelotMouseHandler(canvasRef)
  const shapes = useDoodles()

  return (
    <>
      <div
        className={styles.canvas}
        ref={canvasRef}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <DoodlelotBar />
        {shapes.map(({ id }) => {
          return <DoodlelotShape key={id} id={id} />
        })}
      </div>
    </>
  )
}
