import { DoodlelotCanvas } from './DoodlelotCanvas/DoodlelotCanvas'
import { DoodleStashContext } from './Stashes/DoodlelotStash'

export function Doodlelot() {
  return (
    <DoodleStashContext>
      <DoodlelotCanvas />
    </DoodleStashContext>
  )
}
