// React imports
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Component imports
import Landing from './components/Landing'

// Bootstrap imports

export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <Landing />
        } />
      </Routes>
    </BrowserRouter>
  )
}
