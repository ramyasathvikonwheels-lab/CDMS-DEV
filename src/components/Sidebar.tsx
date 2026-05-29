import { useState, useRef } from 'react'
import './Sidebar.css'

interface MenuItem {
  icon: string
  label: string
  id: string
}

interface SidebarProps {
  isOpen: boolean
  onLogout?: () => void
  onNavigate?: (view: string) => void
  activeItem?: string
  menuItems?: MenuItem[]
}

interface TooltipPos {
  top: number
  left: number
}

function Sidebar({ isOpen, onNavigate, activeItem: activeItemProp, menuItems: customMenuItems }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('dashboard')
  const [tooltipItem, setTooltipItem] = useState<string | null>(null)
  const [tooltipPos, setTooltipPos] = useState<TooltipPos | null>(null)
  const displayActiveItem = activeItemProp || activeItem
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({})

  const defaultMenuItems = [
    { icon: '/Dashboard.png', label: 'Dashboard', id: 'dashboard' },
    { icon: '/Onboard User.png', label: 'Onboard User', id: 'onboard-user' },
    { icon: '/Manage User.png', label: 'Manage User', id: 'manage-user' },
    { icon: '/Onboard Law Firm.png', label: 'Onboard Law Firm', id: 'onboard-firm' },
    { icon: '/Manage Law Firm.png', label: 'Manage Law Firm', id: 'manage-firm' },
    { icon: '/Logout.png', label: 'Logout', id: 'logout' }
  ]

  const menuItems = customMenuItems || defaultMenuItems

  const handleItemClick = (id: string) => {
    setActiveItem(id)
    if (onNavigate) {
      onNavigate(id)
    }
  }

  const handleMouseEnter = (id: string) => {
    setTooltipItem(id)
    const button = buttonRefs.current[id]
    if (button) {
      const rect = button.getBoundingClientRect()
      setTooltipPos({
        top: rect.top + rect.height / 2,
        left: rect.left + rect.width + 10
      })
    }
  }

  const handleMouseLeave = () => {
    setTooltipItem(null)
    setTooltipPos(null)
  }

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'collapsed'}`}>
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <div key={item.id} className="nav-item-wrapper">
            <button
              ref={(el) => {
                if (el) buttonRefs.current[item.id] = el
              }}
              className={`nav-item ${displayActiveItem === item.id ? 'active' : ''}`}
              onClick={() => handleItemClick(item.id)}
              onMouseEnter={() => handleMouseEnter(item.id)}
              onMouseLeave={handleMouseLeave}
            >
              <img src={item.icon} alt={item.label} className="nav-icon" />
              <span className="nav-label">{item.label}</span>
            </button>
          </div>
        ))}
      </nav>
      {tooltipItem && tooltipPos && (
        <div
          className="tooltip"
          style={{
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`
          }}
        >
          {menuItems.find(item => item.id === tooltipItem)?.label}
        </div>
      )}
    </aside>
  )
}

export default Sidebar
