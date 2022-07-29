import { useRoutes } from 'react-router-dom'
import routes from './routes'
import './App.css'

function App() {
  const routeResult = useRoutes(routes)
  return (
    <>
      <main>{routeResult}</main>
    </>
  )
}

export default App
