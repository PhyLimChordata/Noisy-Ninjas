import { HexagonGrid } from "../components/hexagon/HexagonGrid";
import { Moveset } from "../components/overlay/Moveset";
import { Character } from "../components/Character";

export function GameScreen (props)  {
  return <div className = "gamescreen">
      <Moveset/>
      <Character role="screamer"/>
      <HexagonGrid/>
  </div>
}