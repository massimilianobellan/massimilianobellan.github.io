import { memo } from 'react'
import { useDoodlelotClickHandler } from '../common/useDoodlelotActionHandler'
import {
  useDoodleShapeById,
  useSelectedDoodle,
} from '../Stashes/DoodlelotStash'
import styles from './DoodlelotShape.module.css'

interface ShapeProps {
  id: string
}

function DoodlelotShape({ id }: ShapeProps) {
  const shape = useDoodleShapeById(id)
  const isSelected = useSelectedDoodle(id)
  const { onClickCallback } = useDoodlelotClickHandler()

  const handleShapeClick = () => {
    const clickCallback = onClickCallback()
    if (clickCallback !== undefined) {
      clickCallback(id)
    }
  }

  return (
    <div
      className={styles.shape}
      style={{
        left: shape.coordinates.x,
        top: shape.coordinates.y,
        height: shape.size.height,
        width: shape.size.width,
        position: 'absolute',
        borderColor: isSelected ? 'var(--primary)' : 'var(--secondary)',
      }}
      onClick={handleShapeClick}
    />
  )
}

const MemoizedDoodlelotShape = memo(DoodlelotShape)
export { MemoizedDoodlelotShape as DoodlelotShape }
