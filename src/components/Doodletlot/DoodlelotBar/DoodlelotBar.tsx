import { memo } from 'react'
import { useDoodlelotAddShape } from '../Stashes/DoodlelotStash'
import styles from './DoodlelotBar.module.css'

function DoodlelotBar() {
  const addShape = useDoodlelotAddShape()

  return (
    <div className={styles.bar}>
      <button>{'⏹️'}</button>
    </div>
  )
}

const MemoizedDoodlelotBar = memo(DoodlelotBar)
export { MemoizedDoodlelotBar as DoodlelotBar }
