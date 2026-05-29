import { useState } from 'react'
import './RaisingCase.css'

interface RaisingCaseProps {
  onNavigateToDashboard?: () => void
}

function RaisingCase({ onNavigateToDashboard }: RaisingCaseProps) {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showWarningPopup, setShowWarningPopup] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [formData, setFormData] = useState({
    caseTitle: '',
    department: '',
    amount: '',
    caseRequestedDate: '',
    caseSummary: ''
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadedFiles(Array.from(e.target.files))
    }
  }

  const handleUploadAreaClick = () => {
    const fileInput = document.getElementById('file-upload') as HTMLInputElement
    if (fileInput) {
      fileInput.click()
    }
  }

  const validateForm = () => {
    if (!formData.caseTitle.trim()) return false
    if (!formData.department.trim()) return false
    if (!formData.amount.trim()) return false
    if (!formData.caseRequestedDate.trim()) return false
    if (!formData.caseSummary.trim()) return false
    return true
  }

  const handleSubmitCase = () => {
    if (validateForm()) {
      console.log('Submitting case:', { ...formData, files: uploadedFiles })
      setShowSuccessPopup(true)
    } else {
      setShowWarningPopup(true)
    }
  }

  const handleCloseSuccessPopup = () => {
    setShowSuccessPopup(false)
    setFormData({
      caseTitle: '',
      department: '',
      amount: '',
      caseRequestedDate: '',
      caseSummary: ''
    })
    setUploadedFiles([])
    if (onNavigateToDashboard) {
      onNavigateToDashboard()
    }
  }

  return (
    <div className="raising-case">
      <div className="raising-case-header">
        <div>
          <h1>Raising Case (Create Case Form)</h1>
          <div className="breadcrumb">
            <button className="breadcrumb-home" onClick={onNavigateToDashboard}>Home</button>
            <span className="breadcrumb-separator">|</span>
            <span>Raising Case</span>
          </div>
        </div>
      </div>

      <div className="raising-case-card">
        <div className="form-section">
          <h2>Basic Case Info</h2>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="caseTitle">Case Title <span className="required">*</span></label>
              <input
                type="text"
                id="caseTitle"
                name="caseTitle"
                value={formData.caseTitle}
                onChange={handleInputChange}
                placeholder="Enter case title"
              />
            </div>
            <div className="form-field">
              <label htmlFor="department">Department <span className="required">*</span></label>
              <select
                id="department"
                name="department"
                value={formData.department}
                onChange={handleInputChange}
              >
                <option value="">-- Select --</option>
                <option value="Generation">Generation</option>
                <option value="Transmission Power">Transmission Power</option>
                <option value="Transmission Water">Transmission Water</option>
                <option value="Customer Services">Customer Services</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="amount">Amount <span className="required">*</span></label>
              <input
                type="text"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="Enter amount"
              />
            </div>
            <div className="form-field">
              <label htmlFor="caseRequestedDate">Case Requested Date <span className="required">*</span></label>
              <input
                type="date"
                id="caseRequestedDate"
                name="caseRequestedDate"
                value={formData.caseRequestedDate}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="form-row full-width">
            <div className="form-field">
              <label htmlFor="caseSummary">Case Summary <span className="required">*</span></label>
              <textarea
                id="caseSummary"
                name="caseSummary"
                value={formData.caseSummary}
                onChange={handleInputChange}
                rows={4}
                placeholder="Enter case summary"
              />
            </div>
          </div>
        </div>

        <div className="form-section">
          <h2>Document Upload</h2>
          <label>Attach Documents</label>
          <div className="upload-area" onClick={handleUploadAreaClick}>
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#087b36" strokeWidth="2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <h3>Upload a file</h3>
            <p>Supported file type: PDF, DOC, XLS</p>
          </div>
          <input
            type="file"
            id="file-upload"
            multiple
            onChange={handleFileUpload}
            style={{ display: 'none' }}
            accept=".pdf,.doc,.docx,.xls,.xlsx"
          />
          {uploadedFiles.length > 0 && (
            <div className="uploaded-files">
              <p>{uploadedFiles.length} file(s) selected</p>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button className="cancel-btn" onClick={onNavigateToDashboard}>
            <img src="/Cancel Button.png" alt="Cancel" />
          </button>
          <button className="submit-btn" onClick={handleSubmitCase}>
            Submit Case
          </button>
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
            <h2 className="success-message">Case Submitted Successfully</h2>
            <button className="success-ok-btn" onClick={handleCloseSuccessPopup}>
              Ok
            </button>
          </div>
        </div>
      )}

      {showWarningPopup && (
        <div className="warning-overlay" onClick={() => setShowWarningPopup(false)}>
          <div className="warning-popup" onClick={(e) => e.stopPropagation()}>
            <div className="warning-icon">
              <svg viewBox="0 0 24 24" width="64" height="64" fill="none" stroke="#d32f2f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
            </div>
            <p className="warning-message">Please fill all the mandatory fields</p>
            <button className="warning-ok-btn" onClick={() => setShowWarningPopup(false)}>
              Ok
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RaisingCase
