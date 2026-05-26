import './Header.css'

interface HeaderProps {
  userName: string
  onMenuClick: () => void
}

function Header({ userName, onMenuClick }: HeaderProps) {
  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button className="menu-btn" onClick={onMenuClick}>
          ☰
        </button>
        <img src="/dewa-logo.png" alt="DEWA Logo" className="header-logo" />
      </div>

      <div className="header-right">
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=Muhammad+Ahmad&background=00a86b&color=fff" alt="User" className="avatar" />
          <span className="user-name">{userName}</span>
          <span className="dropdown-arrow">▼</span>
        </div>
      </div>
    </header>
  )
}

export default Header
