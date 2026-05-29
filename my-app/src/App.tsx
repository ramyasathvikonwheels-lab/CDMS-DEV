import { useState, useEffect } from 'react'
import LandingPage from './LandingPage'
import Dashboard from './Dashboard'
import InitiatorDashboard from './InitiatorDashboard'

type Page = 'landing' | 'admin-dashboard' | 'initiator-dashboard'

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing')
  const [userName, setUserName] = useState('User')

  useEffect(() => {
    const getUserName = () => {
      try {
        // Method 1: Check URL parameters (Power Apps can pass these)
        const getParam = (name: string) => {
          const params = new URLSearchParams(window.location.search)
          return params.get(name)
        }

        const userEmail = getParam('userEmail') || getParam('email') || getParam('userName')
        if (userEmail) {
          const displayName = userEmail.split('@')[0]
          setUserName(displayName.charAt(0).toUpperCase() + displayName.slice(1))
          return
        }

        // Method 2: Check sessionStorage (Power Apps might store it there)
        const storedName = sessionStorage.getItem('userDisplayName') || sessionStorage.getItem('currentUserEmail')
        if (storedName) {
          setUserName(storedName)
          return
        }

        // Method 3: Try to get from window object - Power Apps Canvas App context
        if ((window as any)._powerAppsUserEmail) {
          const email = (window as any)._powerAppsUserEmail
          const displayName = email.split('@')[0]
          setUserName(displayName.charAt(0).toUpperCase() + displayName.slice(1))
          return
        }

        // Method 4: Check if running in Power Apps with Xrm context
        if ((window as any).Xrm && (window as any).Xrm.Page && (window as any).Xrm.Page.context) {
          const context = (window as any).Xrm.Page.context
          if (context.getUserName) {
            const userName = context.getUserName()
            if (userName) {
              setUserName(userName)
              return
            }
          }
        }

        // Method 5: Try accessing global Power Apps context
        if ((window as any).__powerAppsContext && (window as any).__powerAppsContext.user) {
          const user = (window as any).__powerAppsContext.user
          if (user.displayName) {
            setUserName(user.displayName)
            return
          }
          if (user.email) {
            const displayName = user.email.split('@')[0]
            setUserName(displayName.charAt(0).toUpperCase() + displayName.slice(1))
            return
          }
        }
      } catch (error) {
        console.error('Error getting user name:', error)
      }
    }

    getUserName()
  }, [])

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
        <Dashboard userName={userName} onLogout={handleLogout} />
      )}
      {currentPage === 'initiator-dashboard' && (
        <InitiatorDashboard userName={userName} onLogout={handleLogout} />
      )}
    </>
  )
}

export default App
