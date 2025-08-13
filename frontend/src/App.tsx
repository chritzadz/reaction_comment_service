import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import SignIn from './pages/SignIn'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home/:username" element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App;