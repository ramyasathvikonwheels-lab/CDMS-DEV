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
              <button className="action-btn" title="Delete">
                <img src="/Delete Icon.png" alt="Delete" />
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

export default ManageLawFirm
