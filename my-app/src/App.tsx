import { useState } from 'react'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'

type Page = 'landing' | 'dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')

  const handleNavigateToDashboard = () => {
    setCurrentPage('dashboard')
  }

  const handleLogout = () => {
    setCurrentPage('landing')
  }

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={handleNavigateToDashboard} />
      )}
      {currentPage === 'dashboard' && (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
