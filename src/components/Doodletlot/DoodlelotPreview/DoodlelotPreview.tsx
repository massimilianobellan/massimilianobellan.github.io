import { memo } from 'react'
import styles from '../DoodlelotShape/DoodlelotShape.module.css'
import { usePreviewDoodle } from '../Stashes/DoodlelotStash'

function DoodlelotPreview() {
  const preview = usePreviewDoodle()

  if (!preview) return null

  return (
    <div
      className={styles.shape}
      style={{
        left: preview.coordinates.x,
        top: preview.coordinates.y,
        height: preview.size.height,
        width: preview.size.width,
        position: 'absolute',
        borderColor: 'var(--secondary)',
        borderStyle: 'dashed',
      }}
    />
  )
}

const MemoizedDoodlelotPreview = memo(DoodlelotPreview)
export { MemoizedDoodlelotPreview as DoodlelotPreview }
