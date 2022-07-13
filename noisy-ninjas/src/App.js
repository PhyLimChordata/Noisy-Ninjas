import logo from './logo.svg'
import './App.css'

import { Hexagon } from './components/hexagon'
import { NinjaHexagonGrid } from './components/hexagongrid-ninja'
import { BossHexagonGrid } from './components/hexagongrid-boss'


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NinjaHexagonGrid/>
        <BossHexagonGrid/>
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
