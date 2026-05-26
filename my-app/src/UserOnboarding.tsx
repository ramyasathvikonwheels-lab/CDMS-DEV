import { useState } from 'react'
import './UserOnboarding.css'

interface UserOnboardingProps {
  onCancel?: () => void
}

function UserOnboarding({ onCancel }: UserOnboardingProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    userType: '',
    role: ''
  })

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

  const handleCreate = () => {
    console.log('Creating user:', formData)
    // Handle form submission
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <div className="user-onboarding">
      <div className="onboarding-header">
        <div>
          <h1>Onboarding Screen (Create User / EVP)</h1>
          <div className="breadcrumb">
            <span>Home</span>
            <span className="breadcrumb-separator">|</span>
            <span>Onboarding</span>
          </div>
        </div>
        <button className="create-evp-btn">+ Create EVP</button>
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

            <div className="form-row">
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
    </div>
  )
}

export default UserOnboarding
