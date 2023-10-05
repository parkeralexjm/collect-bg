// React imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Component imports
import Landing from './components/Landing'
import GamesDisplay from './components/GamesDisplay'
import NotFound from './components/NotFound'

// Bootstrap imports

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/gamesdisplay' element={<GamesDisplay />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
