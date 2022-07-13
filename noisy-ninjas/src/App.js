import logo from './logo.svg'
import './App.css'

import { NinjaHexagonGrid } from './components/hexagon/hexagongrid-ninja'
import { BossHexagonGrid } from './components/hexagon/hexagongrid-boss'

import { BossHexagonGrids } from './components/hexagon/hex-test'


function App() {
  return (
    <div className="App">
      <header className="App-header">
      <BossHexagonGrids/>

        {/* <NinjaHexagonGrid/>
        <BossHexagonGrid/> */}

        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
