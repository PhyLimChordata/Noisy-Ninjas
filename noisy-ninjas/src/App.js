import logo from './logo.svg'
import './App.css'
import './style/Input.css'

import {Button} from "./components/Button";
import {Input} from "./components/Input";

function App() {
  return (
    <div className="App">
       <Moveset/>

      <header className="App-header">
      {/*<BossHexagonGrids/>*/}

        {/* <NinjaHexagonGrid/>
        <BossHexagonGrid/> */}
        <Button width={"40%"} content={"BROOOOOO"} onPress={() => console.log("MY DUDE")}></Button>
        <Input width={"40%"}/>
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
