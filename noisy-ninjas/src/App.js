import './App.css'

import { HexagonGrid } from './components/hexagon/HexagonGrid'

import { Moveset } from './components/overlay/moveset'
import { Character } from './components/Character'
import './style/overlay.css'

function App() {
  return (
    <div className="App">
       <Moveset/>

      <header className="App-header">
        <Character role="screamer"/>
        <HexagonGrid></HexagonGrid>
      </header>
    </div>
  )
}

export default App
