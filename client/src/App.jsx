import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import NoPage from './pages/NoPage'
import Success from './pages/Success'
import Dashboard from './pages/Dashboard'
import Notifications from './pages/Notifications'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signup/success' element={<Success />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/chats' element={<Dashboard />}/>
        <Route path='/notifications' element={<Notifications />}/>
        <Route path='*' element={<NoPage />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
