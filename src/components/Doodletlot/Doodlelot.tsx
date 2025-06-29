import { DoodlelotCanvas } from './DoodlelotCanvas/DoodlelotCanvas'
import { DoodlelotDrawActionStateContext } from './Stashes/DoodlelotDrawActionState'
import { DoodleStashContext } from './Stashes/DoodlelotStash'

export function Doodlelot() {
  return (
    <DoodleStashContext>
      <DoodlelotDrawActionStateContext>
        <DoodlelotCanvas />
      </DoodlelotDrawActionStateContext>
    </DoodleStashContext>
  )
}
