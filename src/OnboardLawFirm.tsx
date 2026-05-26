import { useState } from 'react'
import './OnboardLawFirm.css'

interface OnboardLawFirmProps {
  onCancel?: () => void
}

function OnboardLawFirm({ onCancel }: OnboardLawFirmProps) {
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

  const handleCreateFirm = () => {
    console.log('Creating law firm:', formData)
  }

  const handleCancel = () => {
    if (onCancel) {
      onCancel()
    }
  }

  return (
    <div className="onboard-law-firm">
      <div className="onboarding-header">
        <div>
          <h1>Law Firm Onboarding</h1>
          <div className="breadcrumb">
            <span>Home</span>
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
              ⊗ Cancel
            </button>
            <button className="create-btn" onClick={handleCreateFirm}>
              ✓ Create Firm
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardLawFirm
