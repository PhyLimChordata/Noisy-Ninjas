import logo from './logo.svg'
import './App.css'

import { NinjaHexagonGrid } from './components/hexagon/hexagongrid-ninja'
import { BossHexagonGrid } from './components/hexagon/hexagongrid-boss'

import { BossHexagonGrids } from './components/hexagon/hex-test'

import { Moveset } from './components/overlay/moveset'


function App() {
  return (
    <div className="App">
       <Moveset/>

      <header className="App-header">
       
        <BossHexagonGrids/>

        {/* <NinjaHexagonGrid/>
        <BossHexagonGrid/> */}
      </header>
    </div>
  )
}

export default App
