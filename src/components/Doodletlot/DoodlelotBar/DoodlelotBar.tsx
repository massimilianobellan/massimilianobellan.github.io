import {
  useDoodlelotDrawAction,
  useDoodlelotDrawSetAction,
} from '../Stashes/DoodlelotDrawActionState'
import styles from './DoodlelotBar.module.css'

export function DoodlelotBar() {
  const action = useDoodlelotDrawAction()
  const setAction = useDoodlelotDrawSetAction()

  return (
    <div
      className={styles.bar}
      onClick={(e) => {
        e.stopPropagation()
      }}
      onMouseDown={(e) => {
        e.stopPropagation()
      }}
      onMouseUp={(e) => {
        e.stopPropagation()
      }}
    >
      <button
        onClick={() => setAction({ type: 'select' })}
        style={{ borderColor: action.type === 'select' ? 'green' : 'black' }}
      >
        Select
      </button>
      <button
        onClick={() => setAction({ type: 'draw-rectangle', phase: 'idle' })}
        style={{
          borderColor: action.type === 'draw-rectangle' ? 'green' : 'black',
        }}
      >
        Rectangle
      </button>
      <button
        onClick={() => setAction({ type: 'draw-circle', phase: 'idle' })}
        style={{
          borderColor: action.type === 'draw-circle' ? 'green' : 'black',
        }}
      >
        Circle
      </button>
      <button
        onClick={() => setAction({ type: 'type-text' })}
        style={{ borderColor: action.type === 'type-text' ? 'green' : 'black' }}
      >
        Text
      </button>
    </div>
  )
}
