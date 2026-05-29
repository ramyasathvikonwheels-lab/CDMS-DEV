import { useState } from 'react'
import './Dashboard.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatsCard from './components/StatsCard'
import UsersChart from './components/UsersChart'
import SpecializationChart from './components/SpecializationChart'
import RaisingCase from './RaisingCase'
import CaseList from './CaseList'

type InitiatorDashboardView = 'dashboard' | 'raise-case' | 'case-list' | 'logout'

interface InitiatorDashboardProps {
  onLogout?: () => void
}

function InitiatorDashboard({ onLogout }: InitiatorDashboardProps) {
  const [userName] = useState('Muhammad Ahmad')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState<InitiatorDashboardView>('dashboard')

  const today = new Date()
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const stats = [
    { label: 'Total Cases Raised', value: '24', icon: '📋' },
    { label: 'Approved', value: '10', icon: '✅' },
    { label: 'Rejected', value: '4', icon: '✗' },
    { label: 'Pending', value: '10', icon: '⏳' }
  ]

  const initiatorMenuItems = [
    { icon: '/Dashboard.png', label: 'Dashboard', id: 'dashboard' },
    { icon: '/Onboard User.png', label: 'Raise Case', id: 'raise-case' },
    { icon: '/Manage User.png', label: 'Case List', id: 'case-list' },
    { icon: '/Logout.png', label: 'Logout', id: 'logout' }
  ]

  const handleNavigateToScreen = (view: string) => {
    if (view === 'logout') {
      if (onLogout) {
        onLogout()
      }
    } else {
      setCurrentView(view as InitiatorDashboardView)
    }
  }

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={isSidebarOpen}
        onLogout={onLogout}
        onNavigate={handleNavigateToScreen}
        activeItem={currentView}
        menuItems={initiatorMenuItems}
      />
      <div className="dashboard-main">
        <Header
          userName={userName}
          onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)}
        />
        {currentView === 'dashboard' && (
          <div className="dashboard-content">
            <div className="welcome-section">
              <h1>Welcome, {userName}</h1>
              <p>{dateString}</p>
            </div>

            <div className="stats-grid">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                />
              ))}
            </div>

            <div className="charts-grid">
              <UsersChart />
              <SpecializationChart />
            </div>
          </div>
        )}
        {currentView === 'raise-case' && (
          <RaisingCase onNavigateToDashboard={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'case-list' && (
          <CaseList onNavigateToDashboard={() => setCurrentView('dashboard')} />
        )}
      </div>
    </div>
  )
}

export default InitiatorDashboard
