import { memo } from 'react'
import { useDoodlelotShapeById } from '../Stashes/DoodlelotStash'
import styles from './DoodlelotShape.module.css'

interface ShapeProps {
  id: string
}

function DoodlelotShape({ id }: ShapeProps) {
  const shape = useDoodlelotShapeById(id)

  return (
    <div
      className={styles.handDrawnBox}
      style={{
        left: shape?.coordinates.x,
        top: shape?.coordinates.y,
        position: 'absolute',
      }}
    />
  )
}

const MemoizedDoodlelotShape = memo(DoodlelotShape)
export { MemoizedDoodlelotShape as DoodlelotShape }
