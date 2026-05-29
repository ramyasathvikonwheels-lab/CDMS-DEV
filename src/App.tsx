import { useState } from 'react'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import InitiatorDashboard from './InitiatorDashboard'

type Page = 'landing' | 'admin-dashboard' | 'initiator-dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')

  const handleNavigateToDashboard = (role: 'admin' | 'initiator') => {
    if (role === 'admin') {
      setCurrentPage('admin-dashboard')
    } else {
      setCurrentPage('initiator-dashboard')
    }
  }

  const handleLogout = () => {
    setCurrentPage('landing')
  }

  return (
    <>
      {currentPage === 'landing' && (
        <LandingPage onGetStarted={handleNavigateToDashboard} />
      )}
      {currentPage === 'admin-dashboard' && (
        <Dashboard onLogout={handleLogout} />
      )}
      {currentPage === 'initiator-dashboard' && (
        <InitiatorDashboard onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
