import { useState } from 'react'
import './Sidebar.css'

interface SidebarProps {
  isOpen: boolean
  onLogout?: () => void
}

function Sidebar({ isOpen, onLogout }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [tooltipItem, setTooltipItem] = useState<string | null>(null)

  const menuItems = [
    { icon: '/Dashboard.png', label: 'Dashboard', id: 'dashboard' },
    { icon: '/Onboard User.png', label: 'Onboard User', id: 'onboard-user' },
    { icon: '/Manage User.png', label: 'Manage User', id: 'manage-user' },
    { icon: '/Onboard Law Firm.png', label: 'Onboard Law Firm', id: 'onboard-firm' },
    { icon: '/Manage Law Firm.png', label: 'Manage Law Firm', id: 'manage-firm' },
    { icon: '/Logout.png', label: 'Logout', id: 'logout' }
  ]

  const handleItemClick = (id: string) => {
    if (id === 'logout' && onLogout) {
      onLogout()
    } else {
      setActiveItem(id)
    }
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id} className="nav-item-wrapper">
            <button
              className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => setTooltipItem(item.id)}
              onMouseLeave={() => setTooltipItem(null)}
            >
              <img src={item.icon} alt={item.label} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </button>
            {tooltipItem === item.id && (
              <div className="tooltip">{item.label}</div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
