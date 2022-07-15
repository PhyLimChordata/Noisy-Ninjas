import './App.css'

import { HexTest} from './components/hexagon/hex-test'

import { Moveset } from './components/overlay/moveset'
import { Character } from './components/Character'
import './style/overlay.css'

import { NinjaHexagonGrid } from './components/hexagon/hexagongrid-ninja'
import { BossHexagonGrid } from './components/hexagon/hexagongrid-boss'

function App() {
  return (
    <div className="App">
       <Moveset/>

      <header className="App-header">
        <Character role="screamer"/>
        <HexTest></HexTest>
        
        {/* <NinjaHexagonGrid/> */}
        {/* <BossHexagonGrid/> */}
      </header>
    </div>
  )
}

export default App
