import { useState } from 'react'
import './ManageLawFirm.css'

interface LawFirm {
  id: string
  name: string
  email: string
  registrationNo: string
  specialization: string
}

interface ManageLawFirmProps {
  onNavigateToDashboard?: () => void
}

function ManageLawFirm({ onNavigateToDashboard }: ManageLawFirmProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [registrationFilter, setRegistrationFilter] = useState('')
  const [specializationFilter, setSpecializationFilter] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showFilterPopup, setShowFilterPopup] = useState(false)
  const rowsPerPage = 12

  const [showEditPopup, setShowEditPopup] = useState(false)
  const [showUpdateSuccessPopup, setShowUpdateSuccessPopup] = useState(false)
  const [showDeleteConfirmPopup, setShowDeleteConfirmPopup] = useState(false)
  const [selectedFirm, setSelectedFirm] = useState<LawFirm | null>(null)
  const [firmToDelete, setFirmToDelete] = useState<LawFirm | null>(null)
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

  const generateLawFirms = (): LawFirm[] => {
    const names = [
      'Law Firm Name1', 'Law Firm Name2', 'Law Firm Name3', 'Law Firm Name4', 'Law Firm Name5',
      'Law Firm Name6', 'Law Firm Name7', 'Law Firm Name8', 'Law Firm Name9', 'Law Firm Name10',
      'Law Firm Name11', 'Law Firm Name12', 'Law Firm Name13', 'Law Firm Name14', 'Law Firm Name15',
      'Law Firm Name16', 'Law Firm Name17', 'Law Firm Name18', 'Law Firm Name19', 'Law Firm Name20',
      'Law Firm Name21', 'Law Firm Name22', 'Law Firm Name23', 'Law Firm Name24', 'Law Firm Name25',
      'Law Firm Name26', 'Law Firm Name27', 'Law Firm Name28', 'Law Firm Name29', 'Law Firm Name30',
      'Law Firm Name31', 'Law Firm Name32', 'Law Firm Name33', 'Law Firm Name34', 'Law Firm Name35',
      'Law Firm Name36', 'Law Firm Name37', 'Law Firm Name38', 'Law Firm Name39', 'Law Firm Name40',
      'Law Firm Name41', 'Law Firm Name42', 'Law Firm Name43', 'Law Firm Name44', 'Law Firm Name45',
      'Law Firm Name46', 'Law Firm Name47', 'Law Firm Name48', 'Law Firm Name49', 'Law Firm Name50',
      'Law Firm Name51', 'Law Firm Name52', 'Law Firm Name53', 'Law Firm Name54', 'Law Firm Name55',
      'Law Firm Name56', 'Law Firm Name57', 'Law Firm Name58', 'Law Firm Name59', 'Law Firm Name60',
      'Law Firm Name61', 'Law Firm Name62', 'Law Firm Name63', 'Law Firm Name64', 'Law Firm Name65',
      'Law Firm Name66', 'Law Firm Name67', 'Law Firm Name68', 'Law Firm Name69', 'Law Firm Name70',
      'Law Firm Name71', 'Law Firm Name72', 'Law Firm Name73', 'Law Firm Name74', 'Law Firm Name75',
      'Law Firm Name76', 'Law Firm Name77', 'Law Firm Name78', 'Law Firm Name79', 'Law Firm Name80',
      'Law Firm Name81', 'Law Firm Name82', 'Law Firm Name83', 'Law Firm Name84'
    ]
    const specializations = ['Civil', 'Commercial', 'Arbitration', 'Criminal']

    return names.map((name, index) => ({
      id: String(index + 1),
      name,
      email: `firm${index + 1}@example.com`,
      registrationNo: `REG${String(index + 1).padStart(3, '0')}`,
      specialization: specializations[index % specializations.length]
    }))
  }

  const lawFirms: LawFirm[] = generateLawFirms()

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

  const handleDeleteClick = (firm: LawFirm) => {
    setFirmToDelete(firm)
    setShowDeleteConfirmPopup(true)
  }

  const handleConfirmDelete = () => {
    if (firmToDelete) {
      console.log('Deleting law firm:', firmToDelete)
      setShowDeleteConfirmPopup(false)
      setFirmToDelete(null)
    }
  }

  const handleCancelDelete = () => {
    setShowDeleteConfirmPopup(false)
    setFirmToDelete(null)
  }

  const filteredLawFirms = lawFirms.filter((firm) => {
    const matchesSearch = firm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      firm.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegistration = !registrationFilter || firm.registrationNo.includes(registrationFilter)
    const matchesSpecialization = !specializationFilter || firm.specialization === specializationFilter

    return matchesSearch && matchesRegistration && matchesSpecialization
  })

  const totalPages = Math.ceil(filteredLawFirms.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedLawFirms = filteredLawFirms.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages))
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

  return (
    <div className="manage-law-firm">
      <div className="manage-header-section">
        <div className="manage-header">
          <div>
            <h1>Edit Law Firm List</h1>
            <div className="breadcrumb">
              <button className="breadcrumb-home" onClick={onNavigateToDashboard}>Home</button>
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
                placeholder="Search"
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
        {paginatedLawFirms.map((firm) => (
          <div key={firm.id} className="law-firm-card">
            <div className="firm-card-content">
              <div className="firm-info">
                <h3>{firm.name}</h3>
                <p>{firm.email}</p>
              </div>
            </div>
            <div className="firm-actions">
              <button className="action-btn" title="Edit" onClick={() => handleEditClick(firm)}>
                <img src="/Edit Icon.png" alt="Edit" />
              </button>
              <button className="action-btn" title="Delete" onClick={() => handleDeleteClick(firm)}>
                <img src="/Delete Icon.png" alt="Delete" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <span className="record-count">Total Number of Records: 84</span>
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

      {showDeleteConfirmPopup && firmToDelete && (
        <div className="law-firm-popup-overlay" onClick={handleCancelDelete}>
          <div className="law-firm-delete-popup" onClick={(e) => e.stopPropagation()}>
            <div className="law-firm-delete-icon">
              <svg viewBox="0 0 24 24" width="60" height="60" fill="none" stroke="#d32f2f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="8" y1="12" x2="16" y2="12" />
              </svg>
            </div>
            <h2 className="law-firm-delete-title">Confirm Delete</h2>
            <p className="law-firm-delete-message">
              Are you sure you want to delete <strong>{firmToDelete.name}</strong>? This action cannot be undone.
            </p>
            <div className="law-firm-delete-actions">
              <button className="law-firm-delete-cancel-btn" onClick={handleCancelDelete}>
                Cancel
              </button>
              <button className="law-firm-delete-confirm-btn" onClick={handleConfirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ManageLawFirm
