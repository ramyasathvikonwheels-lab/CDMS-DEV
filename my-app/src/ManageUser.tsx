import { useState } from 'react'
import './ManageUser.css'

interface User {
  id: string
  name: string
  email: string
  initials: string
  avatarColor: string
  status: 'Active' | 'Inactive'
}

function ManageUser() {
  const [searchTerm, setSearchTerm] = useState('')
  const [userType, setUserType] = useState<'user' | 'evp'>('user')
  const [currentPage] = useState(1)

  const users: User[] = [
    { id: '1', name: 'Fazl ur Rahman', email: 'fazlurr@example.com', initials: 'FR', avatarColor: '#FFD700', status: 'Active' },
    { id: '2', name: 'John Doe', email: 'john@example.com', initials: 'JD', avatarColor: '#87CEEB', status: 'Inactive' },
    { id: '3', name: 'Anna Schmidt', email: 'anna@example.com', initials: 'AS', avatarColor: '#FFB347', status: 'Active' },
    { id: '4', name: 'Luca Rossi', email: 'luca.rossi@example.com', initials: 'LR', avatarColor: '#FFB6C1', status: 'Active' },
    { id: '5', name: 'Claire Dupont', email: 'claire.dupont@example.com', initials: 'CD', avatarColor: '#DEB887', status: 'Inactive' },
    { id: '6', name: 'Carlos Martinez', email: 'carlos@org.com', initials: 'CM', avatarColor: '#90EE90', status: 'Inactive' },
    { id: '7', name: 'Haruto Tanaka', email: 'haruto@org.com', initials: 'HT', avatarColor: '#98FB98', status: 'Active' },
    { id: '8', name: 'Li Wei', email: 'li@org.com', initials: 'LW', avatarColor: '#87CEEB', status: 'Active' },
    { id: '9', name: 'Svetlana Ivanova', email: 'svetlana@org.com', initials: 'SI', avatarColor: '#6495ED', status: 'Inactive' },
    { id: '10', name: 'Maria Silva', email: 'maria.silva@org.com', initials: 'MS', avatarColor: '#DDA0DD', status: 'Active' },
    { id: '11', name: 'João Pereira', email: 'joao@org.com', initials: 'JP', avatarColor: '#DB7093', status: 'Inactive' },
    { id: '12', name: 'Anouk Jansen', email: 'anouk@org.com', initials: 'AJ', avatarColor: '#FF69B4', status: 'Active' }
  ]

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="manage-user">
      <div className="manage-user-header-section">
        <div className="manage-user-header">
          <div>
            <h1>Edit User List</h1>
            <div className="breadcrumb">
              <span>Home</span>
              <span className="breadcrumb-separator">|</span>
              <span>Edit User List</span>
            </div>
          </div>
        </div>

        <div className="manage-user-controls">
          <div className="controls-right">
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="type-buttons">
              <button
                className={`type-btn ${userType === 'user' ? 'active' : ''}`}
                onClick={() => setUserType('user')}
                title="User"
              >
                <img src="/User Button.png" alt="User" />
              </button>
              <button
                className={`type-btn ${userType === 'evp' ? 'active' : ''}`}
                onClick={() => setUserType('evp')}
                title="EVP"
              >
                <img src="/EVP Button.png" alt="EVP" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="users-grid">
        {filteredUsers.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-card-content">
              <div className="user-avatar" style={{ backgroundColor: user.avatarColor }}>
                {user.initials}
              </div>
              <div className="user-info">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
              </div>
              <div className="user-status">
                <span className={`status-badge ${user.status.toLowerCase()}`}>
                  {user.status === 'Active' ? '●' : '●'} {user.status}
                </span>
              </div>
            </div>
            <div className="user-actions">
              <button className="action-btn" title="View">
                <img src="/View Icon.png" alt="View" />
              </button>
              <button className="action-btn" title="Edit">
                <img src="/Edit Icon.png" alt="Edit" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <span className="record-count">Total Number of Records: 120</span>
        <div className="pagination-controls">
          <button className="nav-btn">◀</button>
          <span className="current-page">{currentPage}</span>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">4</button>
          <button className="nav-btn">▶</button>
          <input type="text" placeholder="10" className="page-input" />
          <button className="nav-btn">⋯</button>
        </div>
      </div>
    </div>
  )
}

export default ManageUser
