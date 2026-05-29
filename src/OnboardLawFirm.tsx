import { useState } from 'react'
import './OnboardLawFirm.css'

interface OnboardLawFirmProps {
  onNavigateToDashboard?: () => void
}

function OnboardLawFirm({ onNavigateToDashboard }: OnboardLawFirmProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    registrationNo: '',
    email: '',
    contactPhone: '',
    country: '',
    city: '',
    address: '',
    specializations: [] as string[]
  })

  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showValidationWarning, setShowValidationWarning] = useState(false)

  const specializations = ['Civil', 'Commercial', 'Arbitration', 'Criminal']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSpecializationChange = (specialization: string) => {
    setFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter((s) => s !== specialization)
        : [...prev.specializations, specialization]
    }))
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) return false
    if (!formData.registrationNo.trim()) return false
    if (!formData.email.trim()) return false
    if (!formData.contactPhone.trim()) return false
    if (formData.specializations.length === 0) return false
    return true
  }

  const handleCreateFirm = () => {
    if (validateForm()) {
      console.log('Creating law firm:', formData)
      setSuccessMessage('Create Law Firm Success!')
      setShowSuccessPopup(true)
      setFormData({
        firstName: '',
        registrationNo: '',
        email: '',
        contactPhone: '',
        country: '',
        city: '',
        address: '',
        specializations: []
      })
    } else {
      setShowValidationWarning(true)
    }
  }

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false)
    setSuccessMessage('')
  }

  const handleCancel = () => {
    setFormData({
      firstName: '',
      registrationNo: '',
      email: '',
      contactPhone: '',
      country: '',
      city: '',
      address: '',
      specializations: []
    })
  }

  return (
    <div className="onboard-law-firm">
      <div className="onboarding-header">
        <div>
          <h1>Law Firm Onboarding</h1>
          <div className="breadcrumb">
            <button className="breadcrumb-home" onClick={onNavigateToDashboard}>Home</button>
            <span className="breadcrumb-separator">|</span>
            <span>Law Firm Onboarding</span>
          </div>
        </div>
      </div>

      <div className="onboarding-card">
        <div className="form-section">
          <h2>Law Firm Information</h2>

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
                <label htmlFor="registrationNo">
                  Registration No <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="registrationNo"
                  name="registrationNo"
                  value={formData.registrationNo}
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
                <label htmlFor="contactPhone">
                  Contact Phone <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>

              <div className="form-field">
                <label htmlFor="country">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>

              <div className="form-field">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  placeholder=""
                />
              </div>
            </div>

            <div className="form-row full-width">
              <div className="form-field">
                <label htmlFor="address">Address</label>
                <textarea
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder=""
                  rows={4}
                />
              </div>
            </div>

            <div className="form-row specialization-row">
              <div className="form-field full-width">
                <label>
                  Specialization <span className="required">*</span>
                </label>
                <div className="checkbox-group">
                  {specializations.map((spec) => (
                    <label key={spec} className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={formData.specializations.includes(spec)}
                        onChange={() => handleSpecializationChange(spec)}
                      />
                      <span>{spec}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <button className="cancel-btn" onClick={handleCancel}>
              <img src="/Cancel Button.png" alt="Cancel" />
            </button>
            <button className="create-btn" onClick={handleCreateFirm}>
              <img src="/Create Button.png" alt="Create" />
            </button>
          </div>
        </div>
      </div>

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
    </div>
  )
}

export default OnboardLawFirm
