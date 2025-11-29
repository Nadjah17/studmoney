import { useState } from 'react'
import LoginPage from './components/LoginPage'
import MainLayout from './components/MainLayout'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
  }

  return (
    <>
      {isLoggedIn ? <MainLayout /> : <LoginPage onLogin={handleLogin} />}
    </>
  )
}

export default App
