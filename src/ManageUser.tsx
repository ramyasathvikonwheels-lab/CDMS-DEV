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

interface EVP {
  id: string
  department: string
  email: string
}

interface ManageUserProps {
  onNavigateToDashboard?: () => void
}

function ManageUser({ onNavigateToDashboard }: ManageUserProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [userType, setUserType] = useState<'user' | 'evp'>('user')
  const [currentUserPage, setCurrentUserPage] = useState(1)
  const [currentEVPPage, setCurrentEVPPage] = useState(1)
  const rowsPerPage = 8

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

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedEVP, setSelectedEVP] = useState<EVP | null>(null)
  const [editingEVPId, setEditingEVPId] = useState<string | null>(null)
  const [editingEVPEmail, setEditingEVPEmail] = useState('')

  const generateUsers = (): User[] => {
    const names = [
      'Fazl ur Rahman', 'John Doe', 'Anna Schmidt', 'Luca Rossi', 'Claire Dupont', 'Carlos Martinez',
      'Haruto Tanaka', 'Li Wei', 'Svetlana Ivanova', 'Maria Silva', 'João Pereira', 'Anouk Jansen',
      'Ahmed Hassan', 'Fatima Khan', 'Marco Ferri', 'Elena Rossi', 'David Cohen', 'Sofia Mendez',
      'Yuki Yamamoto', 'Priya Sharma', 'Lars Bergström', 'Maria García', 'Dimitri Petrov', 'Aisha Ali',
      'Bruno Silva', 'Isabella Romano', 'Henrik Andersen', 'Leila Dubois', 'Raj Patel', 'Emma Wilson',
      'Stefan Müller', 'Mira Kapoor', 'Giovanni Bianchi', 'Nadia Farah', 'Oscar López', 'Lucia Conti',
      'Thomas Schmidt', 'Amira Hassan', 'Patrick Dubois', 'Rosa Moretti', 'Viktor Novak', 'Zainab Ali',
      'Robert Taylor', 'Maya Ravi', 'Nicolas Blanc'
    ]
    const colors = ['#FFD700', '#87CEEB', '#FFB347', '#FFB6C1', '#DEB887', '#90EE90', '#98FB98', '#6495ED', '#DDA0DD', '#DB7093']
    const statuses: ('Active' | 'Inactive')[] = ['Active', 'Inactive']

    return names.map((name, index) => ({
      id: String(index + 1),
      name,
      email: `${name.toLowerCase().replace(/\s+/g, '.')}@example.com`,
      initials: name.split(' ').map(n => n[0]).join('').substring(0, 2),
      avatarColor: colors[index % colors.length],
      status: statuses[index % statuses.length]
    }))
  }

  const users: User[] = generateUsers()

  const generateEVPs = (): EVP[] => {
    const departments = [
      'Dept / Legal Manager', 'Dept / Contracts Management', 'Dept / Finance', 'Dept / Operations',
      'Dept / HR', 'Dept / Sales', 'Dept / Marketing', 'Dept / IT', 'Dept / Engineering', 'Dept / Procurement'
    ]
    const emails = [
      'john@example.com', 'jane@example.com', 'bob@example.com', 'alice@example.com', 'charlie@example.com',
      'diana@example.com', 'eve@example.com', 'frank@example.com', 'grace@example.com', 'henry@example.com',
      'iris@example.com', 'jack@example.com', 'kevin@example.com', 'laura@example.com', 'mike@example.com',
      'nancy@example.com', 'oliver@example.com', 'patricia@example.com', 'quinn@example.com', 'rachel@example.com',
      'steven@example.com', 'tina@example.com', 'uma@example.com', 'victor@example.com', 'wendy@example.com',
      'xavier@example.com', 'yara@example.com', 'zack@example.com', 'alice.smith@example.com', 'bob.johnson@example.com',
      'carol.white@example.com', 'david.brown@example.com', 'emma.davis@example.com', 'frank.miller@example.com',
      'grace.wilson@example.com', 'henry.moore@example.com', 'iris.taylor@example.com', 'jack.anderson@example.com',
      'kevin.thomas@example.com', 'laura.jackson@example.com', 'mike.martin@example.com', 'nancy.garcia@example.com',
      'oliver.lee@example.com', 'patricia.harris@example.com', 'quinn.clark@example.com', 'rachel.lewis@example.com',
      'steven.robinson@example.com', 'tina.walker@example.com', 'uma.hall@example.com', 'victor.young@example.com',
      'wendy.hernandez@example.com', 'xavier.king@example.com', 'yara.wright@example.com', 'zack.lopez@example.com',
      'aria.hill@example.com', 'blake.scott@example.com', 'chloe.green@example.com', 'dylan.adams@example.com'
    ]

    return Array.from({ length: 62 }, (_, index) => ({
      id: String(index + 1),
      department: departments[index % departments.length],
      email: emails[index % emails.length]
    }))
  }

  const evps: EVP[] = generateEVPs()

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredEVPs = evps.filter(evp =>
    evp.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    evp.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const userTotalPages = Math.ceil(filteredUsers.length / rowsPerPage)
  const evpTotalPages = Math.ceil(filteredEVPs.length / rowsPerPage)
  const currentPage = userType === 'user' ? currentUserPage : currentEVPPage
  const totalPages = userType === 'user' ? userTotalPages : evpTotalPages

  const userStartIndex = (currentUserPage - 1) * rowsPerPage
  const userEndIndex = userStartIndex + rowsPerPage
  const paginatedUsers = filteredUsers.slice(userStartIndex, userEndIndex)

  const evpStartIndex = (currentEVPPage - 1) * rowsPerPage
  const evpEndIndex = evpStartIndex + rowsPerPage
  const paginatedEVPs = filteredEVPs.slice(evpStartIndex, evpEndIndex)

  const handlePageChange = (page: number) => {
    if (userType === 'user') {
      setCurrentUserPage(Math.min(Math.max(1, page), userTotalPages))
    } else {
      setCurrentEVPPage(Math.min(Math.max(1, page), evpTotalPages))
    }
  }

  const getVisiblePages = () => {
    const pages = []
    const maxPagesToShow = 4
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2))
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i)
    }
    return pages
  }

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

  const handleDeleteEVP = () => {
    console.log('Deleting EVP:', selectedEVP)
    setShowDeleteModal(false)
    setSelectedEVP(null)
  }

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false)
    setSelectedEVP(null)
  }

  const handleEditEVPClick = (evp: EVP) => {
    setEditingEVPId(evp.id)
    setEditingEVPEmail(evp.email)
  }

  const handleSaveEVPEmail = (evpId: string) => {
    const updatedEVP = evps.find(e => e.id === evpId)
    if (updatedEVP) {
      updatedEVP.email = editingEVPEmail
      console.log('Updated EVP email:', updatedEVP)
    }
    setEditingEVPId(null)
    setEditingEVPEmail('')
  }

  const handleEVPEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditingEVPEmail(e.target.value)
  }

  return (
    <div className="manage-user">
      <div className="manage-user-header-section">
        <div className="manage-user-header">
          <div>
            <h1>{userType === 'user' ? 'Edit User List' : 'Edit EVP List'}</h1>
            <div className="breadcrumb">
              <button className="breadcrumb-home" onClick={onNavigateToDashboard}>Home</button>
              <span className="breadcrumb-separator">|</span>
              <span>{userType === 'user' ? 'Edit User List' : 'Edit EVP List'}</span>
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
            </div>

            <div className="type-buttons">
              <button
                data-button-type="user"
                className={userType === 'user' ? 'type-btn active' : 'type-btn'}
                onClick={() => {
                  setUserType('user')
                  setCurrentUserPage(1)
                }}
              >
                User
              </button>
              <button
                data-button-type="evp"
                className={userType === 'evp' ? 'type-btn active' : 'type-btn'}
                onClick={() => {
                  setUserType('evp')
                  setCurrentEVPPage(1)
                }}
              >
                EVP
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="users-grid">
        {userType === 'user' && paginatedUsers.map((user) => (
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
        {userType === 'evp' && paginatedEVPs.map((evp) => (
          <div key={evp.id} className="evp-card">
            <div className="evp-card-header">
              <h3>{evp.department}</h3>
            </div>
            {editingEVPId === evp.id ? (
              <div className="evp-card-edit-mode">
                <input
                  type="email"
                  value={editingEVPEmail}
                  onChange={handleEVPEmailChange}
                  className="evp-email-input"
                  autoFocus
                />
                <button
                  className="evp-checkmark-btn"
                  title="Save"
                  onClick={() => handleSaveEVPEmail(evp.id)}
                >
                  ✓
                </button>
              </div>
            ) : (
              <div className="evp-card-email">{evp.email}</div>
            )}
            <div className="evp-card-actions">
              <button className="evp-action-btn" title="Edit" onClick={() => handleEditEVPClick(evp)}>
                <img src="/Edit Icon.png" alt="Edit" />
              </button>
              <button className="evp-action-btn" title="Delete" onClick={() => {
                setSelectedEVP(evp)
                setShowDeleteModal(true)
              }}>
                <img src="/Delete Icon.png" alt="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <span className="record-count">Total Number of Records: {userType === 'user' ? 45 : 62}</span>
        <div className="pagination-controls">
          <button className="nav-btn" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>◀</button>
          {getVisiblePages().map((page) => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          ))}
          <button className="nav-btn" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>▶</button>
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
                <button className="cancel-btn-text" onClick={handleCloseEditPopup}></button>
                <button className="update-btn" onClick={handleUpdateUser}></button>
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

      {showDeleteModal && selectedEVP && (
        <div className="popup-overlay" onClick={handleCloseDeleteModal}>
          <div className="delete-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="delete-modal-icon">
              <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#d32f2f" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2 className="delete-modal-title">Confirm Delete</h2>
            <p className="delete-modal-message">Are you sure you want to delete this EVP?</p>
            <div className="delete-modal-actions">
              <button className="delete-cancel-btn" onClick={handleCloseDeleteModal}>
                Cancel
              </button>
              <button className="delete-confirm-btn" onClick={handleDeleteEVP}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageUser
