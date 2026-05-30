import { useState } from 'react'
import './UserOnboarding.css'

interface UserOnboardingProps {
  onNavigateToDashboard?: () => void
}

function UserOnboarding({ onNavigateToDashboard }: UserOnboardingProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    role: ''
  })

  const [showEVPModal, setShowEVPModal] = useState(false)
  const [evpData, setEvpData] = useState({
    department: '',
    email: ''
  })

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showValidationWarning, setShowValidationWarning] = useState(false)
  const [showEVPWarning, setShowEVPWarning] = useState(false)

  const userTypeOptions = [
    { value: '', label: '-- Select --' },
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
    { value: 'evp', label: 'EVP' }
  ]

  const roleOptions = [
    { value: '', label: '-- Select --' },
    { value: 'manager', label: 'Manager' },
    { value: 'supervisor', label: 'Supervisor' },
    { value: 'staff', label: 'Staff' },
    { value: 'consultant', label: 'Consultant' }
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return false
    if (!formData.lastName.trim()) return false
    if (!formData.email.trim()) return false
    if (!formData.userType) return false
    if (!formData.role) return false
    return true
  }

  const handleCreate = () => {
    if (validateForm()) {
      console.log('Creating user:', formData)
      setSuccessMessage('Create User Success!')
      setShowSuccessPopup(true)
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        userType: '',
        role: ''
      })
    } else {
      setShowValidationWarning(true)
    }
  }

  const handleCancel = () => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      userType: '',
      role: ''
    })
  }

  const handleCreateEVPClick = () => {
    setShowEVPModal(true)
  }

  const handleCloseEVPModal = () => {
    setShowEVPModal(false)
    setEvpData({ department: '', email: '' })
  }

  const handleEVPInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEvpData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const validateEVPForm = () => {
    if (!evpData.department.trim()) return false
    if (!evpData.email.trim()) return false
    return true
  }

  const handleCreateEVP = () => {
    if (validateEVPForm()) {
      console.log('Creating EVP:', evpData)
      handleCloseEVPModal()
      setSuccessMessage('Create EVP Success!')
      setShowSuccessPopup(true)
      setEvpData({ department: '', email: '' })
    } else {
      setShowEVPWarning(true)
    }
  }

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false)
    setSuccessMessage('')
  }

  return (
    <div className="user-onboarding">
      <div className="onboarding-header">
        <div>
          <h1>Onboarding Screen (Create User / EVP)</h1>
          <div className="breadcrumb">
            <button className="breadcrumb-home" onClick={onNavigateToDashboard}>Home</button>
            <span className="breadcrumb-separator">|</span>
            <span>Onboarding</span>
          </div>
        </div>
        <button className="create-evp-btn" onClick={handleCreateEVPClick}>+ Create EVP</button>
      </div>

      <div className="onboarding-card">
        <div className="form-section">
          <h2>User Information</h2>

          <div className="form-group">
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="firstName">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>

              <div className="form-field">
                <label htmlFor="lastName">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>

              <div className="form-field">
                <label htmlFor="email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>
            </div>

            <div className="form-row two-col-row">
              <div className="form-field">
                <label htmlFor="userType">
                  User Type <span className="required">*</span>
                </label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleInputChange}
                >
                  {userTypeOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-field">
                <label htmlFor="role">
                  Role <span className="required">*</span>
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleInputChange}
                >
                  {roleOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="cancel-btn" onClick={handleCancel}>
              <img src="/Cancel Button.png" alt="Cancel" />
            </button>
            <button className="create-btn" onClick={handleCreate}>
              <img src="/Create Button.png" alt="Create" />
            </button>
          </div>
        </div>
      </div>

      {showEVPModal && (
        <div className="modal-overlay" onClick={handleCloseEVPModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>EVP</h2>
              <button className="modal-close-btn" onClick={handleCloseEVPModal}>
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="modal-form-group">
                <label htmlFor="department">
                  Department <span className="required">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  value={evpData.department}
                  onChange={handleEVPInputChange}
                >
                  <option value="">-- Select --</option>
                  <option value="sales">Sales</option>
                  <option value="marketing">Marketing</option>
                  <option value="hr">HR</option>
                  <option value="operations">Operations</option>
                </select>
              </div>

              <div className="modal-form-group">
                <label htmlFor="evp-email">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="evp-email"
                  name="email"
                  value={evpData.email}
                  onChange={handleEVPInputChange}
                  placeholder=""
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="modal-cancel-btn" onClick={handleCloseEVPModal}>
                <img src="/Cancel Button.png" alt="Cancel" />
              </button>
              <button className="modal-create-btn" onClick={handleCreateEVP}>
                <img src="/Create Button.png" alt="Create" />
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessPopup && (
        <div className="success-overlay" onClick={handleCloseSuccessPopup}>
          <div className="success-popup" onClick={(e) => e.stopPropagation()}>
            <div className="success-icon">
              <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="#087b36" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="16 9 10.5 15 8 12.5" />
              </svg>
            </div>
            <h2 className="success-message">{successMessage}</h2>
            <button className="success-ok-btn" onClick={handleCloseSuccessPopup}>
              Ok
            </button>
          </div>
        </div>
      )}

      {showValidationWarning && (
        <div className="warning-overlay" onClick={() => setShowValidationWarning(false)}>
          <div className="warning-popup" onClick={(e) => e.stopPropagation()}>
            <div className="warning-icon">
              <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#d32f2f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="warning-message">Please fill all the mandatory fields</h2>
            <button className="warning-ok-btn" onClick={() => setShowValidationWarning(false)}>
              Ok
            </button>
          </div>
        </div>
      )}

      {showEVPWarning && (
        <div className="warning-overlay" onClick={() => setShowEVPWarning(false)}>
          <div className="warning-popup" onClick={(e) => e.stopPropagation()}>
            <div className="warning-icon">
              <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#d32f2f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <h2 className="warning-message">Please fill all the mandatory fields</h2>
            <button className="warning-ok-btn" onClick={() => setShowEVPWarning(false)}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserOnboarding
