import { useState } from 'react'
import './Dashboard.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import StatsCard from './components/StatsCard'
import UsersChart from './components/UsersChart'
import SpecializationChart from './components/SpecializationChart'
import UserOnboarding from './UserOnboarding'
import ManageUser from './ManageUser'
import OnboardLawFirm from './OnboardLawFirm'
import ManageLawFirm from './ManageLawFirm'

type DashboardView = 'dashboard' | 'onboard-user' | 'manage-user' | 'onboard-firm' | 'manage-firm' | 'logout'

interface DashboardProps {
  onLogout?: () => void
}

function Dashboard({ onLogout }: DashboardProps) {
  const [userName] = useState('Muhammad Ahmad')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [currentView, setCurrentView] = useState<DashboardView>('dashboard')

  const today = new Date()
  const dateString = today.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })

  const stats = [
    { label: 'Total Users', value: '100', icon: '👥' },
    { label: 'Active User', value: '98', icon: '✓' },
    { label: 'Law Firms', value: '56', icon: '⚖️' },
    { label: 'Total EVP', value: '56', icon: '⚙️' }
  ]

  const handleNavigateToScreen = (view: DashboardView) => {
    if (view === 'logout') {
      if (onLogout) {
        onLogout()
      }
    } else {
      setCurrentView(view)
    }
  }

  return (
    <div className="dashboard">
      <Sidebar
        isOpen={isSidebarOpen}
        onLogout={onLogout}
        onNavigate={handleNavigateToScreen}
        activeItem={currentView}
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
        {currentView === 'onboard-user' && (
          <UserOnboarding />
        )}
        {currentView === 'manage-user' && (
          <ManageUser />
        )}
        {currentView === 'onboard-firm' && (
          <OnboardLawFirm />
        )}
        {currentView === 'manage-firm' && (
          <ManageLawFirm />
        )}
      </div>
    </div>
  )
}

export default Dashboard
