import logo from './logo.svg'
import './App.css'

import { NinjaHexagonGrid } from './components/hexagon/hexagongrid-ninja'
import { BossHexagonGrid } from './components/hexagon/hexagongrid-boss'

import { HexTest} from './components/hexagon/hex-test'

import { Moveset } from './components/overlay/moveset'

import './style/overlay.css'


function App() {
  return (
    <div className="App">
       <Moveset/>

      <header className="App-header">
       
        <div className="SDS">
          <HexTest></HexTest>
        </div>

        {/* <NinjaHexagonGrid/>
        <BossHexagonGrid/> */}
      </header>
    </div>
  )
}

export default App
