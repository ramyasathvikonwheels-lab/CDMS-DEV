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

  const [showViewPopup, setShowViewPopup] = useState(false)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showUpdateSuccessPopup, setShowUpdateSuccessPopup] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    role: '',
    status: '',
    userType: ''
  })

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

  const handleViewClick = (user: User) => {
    setSelectedUser(user)
    setShowViewPopup(true)
  }

  const handleEditClick = (user: User) => {
    setSelectedUser(user)
    const [firstName, ...lastNameParts] = user.name.split(' ')
    const lastName = lastNameParts.join(' ')
    setEditFormData({
      firstName: firstName,
      lastName: lastName,
      email: user.email,
      role: 'Electrical Engineer',
      status: user.status,
      userType: 'Type of user'
    })
    setShowEditPopup(true)
  }

  const handleCloseViewPopup = () => {
    setShowViewPopup(false)
    setSelectedUser(null)
  }

  const handleCloseEditPopup = () => {
    setShowEditPopup(false)
    setSelectedUser(null)
    setEditFormData({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      status: '',
      userType: ''
    })
  }

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateUser = () => {
    console.log('Updating user:', editFormData)
    handleCloseEditPopup()
    setShowUpdateSuccessPopup(true)
  }

  const handleCloseUpdateSuccessPopup = () => {
    setShowUpdateSuccessPopup(false)
  }

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
              <button className="action-btn" title="View" onClick={() => handleViewClick(user)}>
                <img src="/View Icon.png" alt="View" />
              </button>
              <button className="action-btn" title="Edit" onClick={() => handleEditClick(user)}>
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

      {showViewPopup && selectedUser && (
        <div className="popup-overlay" onClick={handleCloseViewPopup}>
          <div className="popup-content view-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>View User Details</h2>
              <button className="popup-close-btn" onClick={handleCloseViewPopup}>
                ✕
              </button>
            </div>

            <div className="popup-body">
              <div className="user-header">
                <div className="user-avatar-large" style={{ backgroundColor: selectedUser.avatarColor }}>
                  {selectedUser.initials}
                </div>
                <div className="user-name-section">
                  <h3>{selectedUser.name}</h3>
                  <p>Legal Manager</p>
                </div>
              </div>

              <div className="details-divider"></div>

              <div className="details-grid">
                <div className="detail-row">
                  <label>First Name</label>
                  <span>{selectedUser.name.split(' ')[0]}</span>
                </div>
                <div className="detail-row">
                  <label>Last Name</label>
                  <span>{selectedUser.name.split(' ').slice(1).join(' ')}</span>
                </div>
                <div className="detail-row">
                  <label>Email</label>
                  <span>{selectedUser.email}</span>
                </div>
                <div className="detail-row">
                  <label>Role</label>
                  <span>Electrical Engineer</span>
                </div>
                <div className="detail-row">
                  <label>Status</label>
                  <span>{selectedUser.status}</span>
                </div>
                <div className="detail-row">
                  <label>User Type</label>
                  <span>Type of user</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showEditPopup && selectedUser && (
        <div className="popup-overlay" onClick={handleCloseEditPopup}>
          <div className="popup-content edit-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h2>Edit User Details</h2>
              <button className="popup-close-btn" onClick={handleCloseEditPopup}>
                ✕
              </button>
            </div>

            <div className="popup-body">
              <div className="user-header">
                <div className="user-avatar-large" style={{ backgroundColor: selectedUser.avatarColor }}>
                  {selectedUser.initials}
                </div>
                <div className="user-name-section">
                  <h3>{selectedUser.name}</h3>
                  <p>Legal Manager</p>
                </div>
              </div>

              <div className="edit-form">
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="firstName">First Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={editFormData.firstName}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={editFormData.lastName}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="form-field">
                    <label htmlFor="role">Role</label>
                    <select id="role" name="role" value={editFormData.role} onChange={handleEditInputChange}>
                      <option value="">Electrical Engineer</option>
                      <option value="manager">Manager</option>
                      <option value="supervisor">Supervisor</option>
                      <option value="staff">Staff</option>
                    </select>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="status">Status</label>
                    <select id="status" name="status" value={editFormData.status} onChange={handleEditInputChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div className="form-field">
                    <label htmlFor="userType">User Type</label>
                    <select id="userType" name="userType" value={editFormData.userType} onChange={handleEditInputChange}>
                      <option value="">User Type</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="evp">EVP</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="edit-actions">
                <button className="cancel-btn-text" onClick={handleCloseEditPopup}>
                  ✕ Cancel
                </button>
                <button className="update-btn" onClick={handleUpdateUser}>
                  ✓ Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateSuccessPopup && (
        <div className="popup-overlay" onClick={handleCloseUpdateSuccessPopup}>
          <div className="success-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon-large">
              <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="#087b36" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="16 9 10.5 15 8 12.5" />
              </svg>
            </div>
            <h2 className="success-message-large">Updated Successfully</h2>
            <button className="success-ok-btn-large" onClick={handleCloseUpdateSuccessPopup}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageUser
