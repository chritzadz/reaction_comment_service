import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Home'
import SignIn from './pages/SignIn'
import Admin from './pages/Admin';
import AdminReactionLogs from './pages/AdminReactionLogs';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home/:username" element={<HomePage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/ReactionLogs" element={<AdminReactionLogs />} />
      </Routes>
    </div>
  )
}

export default App;