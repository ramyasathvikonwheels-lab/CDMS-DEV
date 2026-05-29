import { useState } from 'react'
import './Header.css'

interface HeaderProps {
  userName: string
  onMenuClick: () => void
  onLogout?: () => void
}

function Header({ userName, onMenuClick, onLogout }: HeaderProps) {
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => {
    setShowDropdown(false)
    if (onLogout) {
      onLogout()
    }
  }

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <img src="/dewa-logo.png" alt="DEWA Logo" className="header-logo" />
      </div>

      <div className="header-right">
        <div className="user-profile" onClick={() => setShowDropdown(!showDropdown)}>
          <img src="https://ui-avatars.com/api/?name=Muhammad+Ahmad&background=00a86b&color=fff" alt="User" className="avatar" />
          <span className="user-name">{userName}</span>
          <span className="dropdown-arrow">▼</span>
        </div>

        {showDropdown && (
          <div className="user-dropdown">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header
