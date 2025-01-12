import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home }from './components/pages/home/home'
import { Login } from './components/pages/login/loginPages'
import { Dashboard } from './components/pages/dashboard/dashboard'
import { PrivateRoute } from './routerPrivate/routesPrivaty'





function App() {
  const [count, setCount] = useState(0)

  return (
    
    <Routes>
      <Route path='/' element={<Home/>}/>   
      <Route path='/login' element={<Login/>}/>
      <Route 
        path='/dashboard' 
        element={
          <privateRoute>
            <Dashboard/>
          </privateRoute>
        }/>
    </Routes>
  )
}

export default App
