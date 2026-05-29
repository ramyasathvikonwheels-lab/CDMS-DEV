import { useState } from 'react'
import './EditCaseDetails.css'

interface Case {
  id: string
  title: string
  status: 'Approved' | 'Further Info' | 'In Progress' | 'Pending'
  department: string
  referenceNo: string
  requestedDate: string
}

interface EditCaseDetailsProps {
  caseData: Case
  onNavigateToDashboard?: () => void
  onNavigateToCaseList?: () => void
  onSave?: () => void
}

function EditCaseDetails({ caseData, onNavigateToDashboard, onNavigateToCaseList, onSave }: EditCaseDetailsProps) {
  const [formData, setFormData] = useState({
    title: caseData.title,
    department: caseData.department,
    referenceNo: caseData.referenceNo,
    amount: '100 AED',
    updateDetails: ''
  })
  const [showSuccessPopup, setShowSuccessPopup] = useState(false)
  const [showWarningPopup, setShowWarningPopup] = useState(false)
  const [showCommentsPopup, setShowCommentsPopup] = useState(false)
  const [showDocumentsPopup, setShowDocumentsPopup] = useState(false)
  const [activeCommentTab, setActiveCommentTab] = useState<'general' | 'status'>('general')
  const [newComment, setNewComment] = useState('')

  const documents = [
    { id: 1, name: 'Court Notice', description: 'Official notice from court', date: 'Today', color: '#d32f2f' },
    { id: 2, name: 'Statement of Claim', description: 'Initial claim filed by plaintiff', date: 'Yesterday', color: '#1976d2' },
    { id: 3, name: 'Court Notice', description: 'Official notice from court', date: '16/03/2026', color: '#d32f2f' },
    { id: 4, name: 'Court Notice', description: 'Official notice from court', date: '16/03/2026', color: '#087b36' }
  ]

  const generalComments = [
    { name: 'Abd al-Rahman', text: 'Lorem ipsum dolor sit amet consectetur nullam viverra', date: 'Today' },
    { name: 'Badr al-Din', text: 'Lorem ipsum dolor sit amet consectetur nullam viverra', date: 'Yesterday' },
    { name: 'Fariduddin', text: 'Lorem ipsum dolor sit amet consectetur nullam viverra', date: '16/03/2026' },
    { name: 'Ghulam Faruq', text: 'Lorem ipsum dolor sit amet consectetur nullam viverra', date: '12/03/2026' }
  ]

  const statusComments = [
    { name: 'Fariduddin', text: 'Lorem ipsum dolor sit amet consectetur nullam viverra', date: 'Today' },
    { name: 'Ghulam Faruq', text: 'Lorem ipsum dolor sit amet consectetur nullam viverra', date: 'Yesterday' },
    { name: 'Fariduddin', text: 'Lorem ipsum dolor sit amet consectetur nullam viverra', date: '16/03/2026' },
    { name: 'Ghulam Faruq', text: 'Lorem ipsum dolor sit amet consectetur nullam viverra', date: '12/03/2026' }
  ]

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      setNewComment('')
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleUpdate = () => {
    if (!formData.title.trim() || !formData.department || !formData.referenceNo.trim() || !formData.amount.trim()) {
      setShowWarningPopup(true)
      return
    }
    setShowSuccessPopup(true)
  }

  const handleCancel = () => {
    setFormData({
      title: caseData.title,
      department: caseData.department,
      referenceNo: caseData.referenceNo,
      amount: '100 AED',
      updateDetails: ''
    })
  }

  const handleSuccessClose = () => {
    setShowSuccessPopup(false)
    if (onNavigateToCaseList) {
      onNavigateToCaseList()
    }
  }

  return (
    <div className="edit-case-details">
      <div className="case-header-top">
        <div className="header-left">
          <button className="back-btn" onClick={onNavigateToCaseList}>← Edit Case Details</button>
          <div className="breadcrumb">
            <button className="breadcrumb-link" onClick={onNavigateToDashboard}>Home</button>
            <span className="breadcrumb-separator">|</span>
            <button className="breadcrumb-link" onClick={onNavigateToCaseList}>Case List</button>
            <span className="breadcrumb-separator">|</span>
            <span>Edit Case Details</span>
          </div>
        </div>
        <div className="step-indicator">
          <div className="step active">Step1</div>
          <div className="step">Step2</div>
          <div className="step">Step3</div>
          <div className="step">Step4</div>
        </div>
        <div className="case-actions">
          <button className="tab-btn" title="Comments" onClick={() => setShowCommentsPopup(!showCommentsPopup)}>
            <img src="/Comments Button.png" alt="Comments" />
          </button>
          <button className="tab-btn" title="Documents" onClick={() => setShowDocumentsPopup(!showDocumentsPopup)}>
            <img src="/Documents Button.png" alt="Documents" />
          </button>
        </div>
      </div>

      <div className="case-content">

        <div className="form-section">
          <div className="section-header">Basic Case Details</div>
          <div className="section-content">
            <div className="form-row">
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="title">Case Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="department">Department</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    className="form-select"
                  >
                    <option value="Legal Affairs">Legal Affairs</option>
                    <option value="Generation">Generation</option>
                    <option value="Transmission Power">Transmission Power</option>
                    <option value="Transmission Water">Transmission Water</option>
                    <option value="Customer Services">Customer Services</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="referenceNo">Case Reference No</label>
                  <input
                    type="text"
                    id="referenceNo"
                    name="referenceNo"
                    value={formData.referenceNo}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="text"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">Case Summary (Description)</div>
          <div className="section-content summary-content">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices facilisis metus non consequat. Vivamus suscipit mollis nibh, eu venenatis tortor aliguet a. In luctus eu tellus non rutrum. Donec eifend id ni ac interdum. Pellentesque lobortis tempor tellus, nec sodales odio tincidunt quis. Suspendisse phaetta pouere facilisii.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum ultrices facilisis metus non consequat. Vivamus</p>
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">Update Details</div>
          <div className="section-content">
            <textarea
              name="updateDetails"
              value={formData.updateDetails}
              onChange={handleInputChange}
              className="update-textarea"
              placeholder=""
            />
          </div>
        </div>

        <div className="form-actions">
          <button className="action-btn" title="Cancel" onClick={handleCancel}>
            <img src="/Cancel Button.png" alt="Cancel" />
          </button>
          <button className="action-btn" title="Update" onClick={handleUpdate}>
            <img src="/Update_New Button.png" alt="Update" />
          </button>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="success-popup-content">
            <div className="success-icon">
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="36" stroke="#087B36" strokeWidth="6"/>
                <path d="M25 40L35 50L55 30" stroke="#087B36" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2 className="success-title">Updated Successfully</h2>
            <button className="success-btn" onClick={handleSuccessClose}>Ok</button>
          </div>
        </div>
      )}

      {showWarningPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header warning-header">
              <span className="popup-title">Warning</span>
            </div>
            <div className="popup-body">
              <p>Please fill all required fields before updating the case.</p>
            </div>
            <div className="popup-footer">
              <button className="popup-btn" onClick={() => setShowWarningPopup(false)}>OK</button>
            </div>
          </div>
        </div>
      )}

      {showCommentsPopup && (
        <div className="comments-popup" onClick={() => setShowCommentsPopup(false)}>
          <div className="comments-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="comments-header-wrapper">
              <div className="comments-tabs">
                <button
                  className={`comment-tab ${activeCommentTab === 'general' ? 'active' : ''}`}
                  onClick={() => setActiveCommentTab('general')}
                >
                  General Comments
                </button>
                <button
                  className={`comment-tab ${activeCommentTab === 'status' ? 'active' : ''}`}
                  onClick={() => setActiveCommentTab('status')}
                >
                  Status Comments
                </button>
              </div>
            </div>

            <div className="comments-list">
              {(activeCommentTab === 'general' ? generalComments : statusComments).map((comment, index) => (
                <div key={index} className="comment-item">
                  <div className="comment-header">
                    <span className="comment-name">{comment.name}</span>
                    <span className="comment-date">{comment.date}</span>
                  </div>
                  <p className="comment-text">{comment.text}</p>
                </div>
              ))}
            </div>

            <div className="comments-input-section">
              <input
                type="text"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="comment-input"
              />
              <button className="comment-submit-btn" onClick={handleCommentSubmit}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 10L18 2M2 10L18 18" stroke="#087b36" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {showDocumentsPopup && (
        <div className="documents-popup" onClick={() => setShowDocumentsPopup(false)}>
          <div className="documents-popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="documents-header">
              <h3>Documents ({documents.length})</h3>
            </div>

            <div className="documents-list">
              {documents.map((doc) => (
                <div key={doc.id} className="document-item">
                  <div className="document-icon" style={{ backgroundColor: doc.color }}>
                    📄
                  </div>
                  <div className="document-info">
                    <div className="document-name">{doc.name}</div>
                    <div className="document-description">{doc.description}</div>
                  </div>
                  <div className="document-date">{doc.date}</div>
                  <div className="document-actions">
                    <button className="document-action-btn" title="Download">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 11L4 7M8 11L12 7M8 11V1M2 15H14" stroke="#666" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                    <button className="document-action-btn" title="Delete">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 4H15M3 4V13C3 14.1046 3.89543 15 5 15H11C12.1046 15 13 14.1046 13 13V4M6 4V2C6 1.44772 6.44772 1 7 1H9C9.55228 1 10 1.44772 10 2V4" stroke="#999" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="document-upload">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 18H17M12 3V15M7 15L12 10L17 15" stroke="#087b36" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Upload a file</span>
              <p>Supported file type: PDF, DOC, XLS</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EditCaseDetails
