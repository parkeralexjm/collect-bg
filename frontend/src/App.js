// React imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Component imports
import Landing from './components/Landing'
import GamesDisplay from './components/GamesDisplay'
import NotFound from './components/NotFound'

// Bootstrap imports

export default function App() {

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  const vh = window.innerHeight * 0.01
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty('--vh', `${vh}px`)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/games' element={<GamesDisplay />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
