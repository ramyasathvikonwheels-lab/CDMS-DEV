import { useState } from 'react'
import './ManageLawFirm.css'

interface LawFirm {
  id: string
  name: string
  email: string
  registrationNo: string
  specialization: string
}

function ManageLawFirm() {
  const [searchTerm, setSearchTerm] = useState('')
  const [registrationFilter, setRegistrationFilter] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('')
  const [currentPage] = useState(1)
  const [showFilterPopup, setShowFilterPopup] = useState(false)

  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showUpdateSuccessPopup, setShowUpdateSuccessPopup] = useState(false)
  const [selectedFirm, setSelectedFirm] = useState<LawFirm | null>(null)
  const [editFormData, setEditFormData] = useState({
    firstName: '',
    registrationNo: '',
    email: '',
    contactPhone: '',
    country: '',
    city: '',
    address: '',
    specializations: [] as string[]
  })

  const lawFirms: LawFirm[] = [
    { id: '1', name: 'Law Firm Name1', email: 'email@example.com', registrationNo: 'REG001', specialization: 'Civil' },
    { id: '2', name: 'Law Firm Name2', email: 'bob@example.com', registrationNo: 'REG002', specialization: 'Commercial' },
    { id: '3', name: 'Law Firm Name3', email: 'carol@example.com', registrationNo: 'REG003', specialization: 'Arbitration' },
    { id: '4', name: 'Law Firm Name5', email: 'eve@example.com', registrationNo: 'REG004', specialization: 'Criminal' },
    { id: '5', name: 'Law Firm Name6', email: 'frank@example.com', registrationNo: 'REG005', specialization: 'Civil' },
    { id: '6', name: 'Law Firm Name7', email: 'grace@example.com', registrationNo: 'REG006', specialization: 'Commercial' },
    { id: '7', name: 'Law Firm Name9', email: 'iris@example.com', registrationNo: 'REG007', specialization: 'Arbitration' },
    { id: '8', name: 'Law Firm Name10', email: 'jack@example.com', registrationNo: 'REG008', specialization: 'Criminal' },
    { id: '9', name: 'Law Firm Name11', email: 'kathy@example.com', registrationNo: 'REG009', specialization: 'Civil' },
    { id: '10', name: 'Law Firm Name12', email: 'lake@example.com', registrationNo: 'REG010', specialization: 'Commercial' }
  ]

  const handleClearFilters = () => {
    setRegistrationFilter('')
    setSpecializationFilter('')
    setSearchTerm('')
  }

  const handleSubmitFilters = () => {
    console.log('Applying filters:', { registrationFilter, specializationFilter })
  }

  const handleEditClick = (firm: LawFirm) => {
    setSelectedFirm(firm)
    setEditFormData({
      firstName: firm.name,
      registrationNo: firm.registrationNo,
      email: firm.email,
      contactPhone: '989898908',
      country: 'UAE',
      city: 'Dubai',
      address: 'Lorem ipsum dolor sit amet, consectetur adipiscing eli',
      specializations: [firm.specialization]
    })
    setShowEditPopup(true)
  }

  const handleCloseEditPopup = () => {
    setShowEditPopup(false)
    setSelectedFirm(null)
    setEditFormData({
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

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setEditFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSpecializationChange = (specialization: string) => {
    setEditFormData((prev) => ({
      ...prev,
      specializations: prev.specializations.includes(specialization)
        ? prev.specializations.filter((s) => s !== specialization)
        : [...prev.specializations, specialization]
    }))
  }

  const validateEditForm = () => {
    if (!editFormData.firstName.trim()) return false
    if (!editFormData.registrationNo.trim()) return false
    if (!editFormData.email.trim()) return false
    if (!editFormData.contactPhone.trim()) return false
    if (editFormData.specializations.length === 0) return false
    return true
  }

  const handleUpdateFirm = () => {
    if (validateEditForm()) {
      console.log('Updating law firm:', editFormData)
      handleCloseEditPopup()
      setShowUpdateSuccessPopup(true)
    }
  }

  const handleCloseUpdateSuccessPopup = () => {
    setShowUpdateSuccessPopup(false)
  }

  const filteredLawFirms = lawFirms.filter((firm) => {
    const matchesSearch = firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firm.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegistration = !registrationFilter || firm.registrationNo.includes(registrationFilter)
    const matchesSpecialization = !specializationFilter || firm.specialization === specializationFilter

    return matchesSearch && matchesRegistration && matchesSpecialization
  })

  return (
    <div className="manage-law-firm">
      <div className="manage-header-section">
        <div className="manage-header">
          <div>
            <h1>Edit Law Firm List</h1>
            <div className="breadcrumb">
              <span>Home</span>
              <span className="breadcrumb-separator">|</span>
              <span>Edit Law Firm List</span>
            </div>
          </div>
        </div>

        <div className="manage-controls">
          <div className="controls-right">
            <div className="search-bar">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <button
              className="filter-btn"
              onClick={() => setShowFilterPopup(!showFilterPopup)}
              title="Filter"
            >
              <img src="/Filter Icon.png" alt="Filter" />
            </button>

            {showFilterPopup && (
              <div className="filter-popup">
                <div className="filter-header">Filter</div>
                <div className="filter-fields">
                  <div className="filter-field">
                    <label htmlFor="registration">Registration Number</label>
                    <select
                      id="registration"
                      value={registrationFilter}
                      onChange={(e) => setRegistrationFilter(e.target.value)}
                    >
                      <option value="">-- All --</option>
                      <option value="REG001">REG001</option>
                      <option value="REG002">REG002</option>
                      <option value="REG003">REG003</option>
                      <option value="REG004">REG004</option>
                      <option value="REG005">REG005</option>
                    </select>
                  </div>

                  <div className="filter-field">
                    <label htmlFor="specialization">Specialization</label>
                    <select
                      id="specialization"
                      value={specializationFilter}
                      onChange={(e) => setSpecializationFilter(e.target.value)}
                    >
                      <option value="">-- All --</option>
                      <option value="Civil">Civil</option>
                      <option value="Commercial">Commercial</option>
                      <option value="Arbitration">Arbitration</option>
                      <option value="Criminal">Criminal</option>
                    </select>
                  </div>
                </div>

                <div className="filter-actions">
                  <button className="clear-btn" onClick={handleClearFilters}>
                    Clear
                  </button>
                  <button className="submit-btn" onClick={handleSubmitFilters}>
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="law-firms-grid">
        {filteredLawFirms.map((firm) => (
          <div key={firm.id} className="law-firm-card">
            <div className="firm-card-content">
              <div className="firm-info">
                <h3>{firm.name}</h3>
                <p>{firm.email}</p>
              </div>
            </div>
            <div className="firm-actions">
              <button className="action-btn" title="View">
                <img src="/View Icon.png" alt="View" />
              </button>
              <button className="action-btn" title="Edit" onClick={() => handleEditClick(firm)}>
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

      {showEditPopup && selectedFirm && (
        <div className="law-firm-popup-overlay" onClick={handleCloseEditPopup}>
          <div className="law-firm-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="law-firm-popup-header">
              <h2>Edit Law Firm</h2>
              <button className="law-firm-popup-close-btn" onClick={handleCloseEditPopup}>
                ✕
              </button>
            </div>

            <div className="law-firm-popup-body">
              <h3 className="law-firm-name-display">{selectedFirm.name}</h3>

              <div className="law-firm-form">
                <div className="law-firm-form-row">
                  <div className="law-firm-form-field">
                    <label htmlFor="firstName">Firm Name</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={editFormData.firstName}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="law-firm-form-field">
                    <label htmlFor="registrationNo">Registration No</label>
                    <input
                      type="text"
                      id="registrationNo"
                      name="registrationNo"
                      value={editFormData.registrationNo}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </div>

                <div className="law-firm-form-row">
                  <div className="law-firm-form-field">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={editFormData.email}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="law-firm-form-field">
                    <label htmlFor="contactPhone">Contact Phone</label>
                    <input
                      type="text"
                      id="contactPhone"
                      name="contactPhone"
                      value={editFormData.contactPhone}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </div>

                <div className="law-firm-form-row">
                  <div className="law-firm-form-field">
                    <label htmlFor="country">Country</label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={editFormData.country}
                      onChange={handleEditInputChange}
                    />
                  </div>
                  <div className="law-firm-form-field">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={editFormData.city}
                      onChange={handleEditInputChange}
                    />
                  </div>
                </div>

                <div className="law-firm-form-row full-width">
                  <div className="law-firm-form-field">
                    <label htmlFor="address">Address</label>
                    <textarea
                      id="address"
                      name="address"
                      value={editFormData.address}
                      onChange={handleEditInputChange}
                      rows={3}
                    />
                  </div>
                </div>

                <div className="law-firm-specialization-section">
                  <label>Specialization</label>
                  <div className="law-firm-checkbox-group">
                    {['Civil', 'Commercial', 'Arbitration', 'Criminal'].map((spec) => (
                      <label key={spec} className="law-firm-checkbox-label">
                        <input
                          type="checkbox"
                          checked={editFormData.specializations.includes(spec)}
                          onChange={() => handleSpecializationChange(spec)}
                        />
                        <span>{spec}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="law-firm-popup-actions">
                <button className="law-firm-cancel-btn" onClick={handleCloseEditPopup}>
                  ✕ Cancel
                </button>
                <button className="law-firm-update-btn" onClick={handleUpdateFirm}>
                  ✓ Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showUpdateSuccessPopup && (
        <div className="law-firm-popup-overlay" onClick={handleCloseUpdateSuccessPopup}>
          <div className="law-firm-success-popup" onClick={(e) => e.stopPropagation()}>
            <div className="law-firm-success-icon">
              <svg viewBox="0 0 24 24" width="80" height="80" fill="none" stroke="#087b36" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="16 9 10.5 15 8 12.5" />
              </svg>
            </div>
            <h2 className="law-firm-success-message">Updated Successfully</h2>
            <button className="law-firm-success-ok-btn" onClick={handleCloseUpdateSuccessPopup}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageLawFirm
