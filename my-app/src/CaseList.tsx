import { useState } from 'react'
import './CaseList.css'

interface Case {
  id: string
  title: string
  status: 'Approved' | 'Further Info' | 'In Progress' | 'Pending'
  department: string
  referenceNo: string
  requestedDate: string
}

interface CaseListProps {
  onNavigateToDashboard?: () => void
  onViewCase?: (caseData: Case) => void
  onEditCase?: (caseData: Case) => void
}

function CaseList({ onNavigateToDashboard, onViewCase, onEditCase }: CaseListProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedViewRowId, setSelectedViewRowId] = useState<string | null>(null)
  const [selectedEditRowId, setSelectedEditRowId] = useState<string | null>(null)
  const rowsPerPage = 5

  const cases: Case[] = [
    { id: '1', title: 'Contract Payment Dispute', status: 'Approved', department: 'Generation', referenceNo: '2026-0192', requestedDate: '15/02/2026' },
    { id: '2', title: 'Supplier Quality Issue', status: 'Further Info', department: 'Transmission Power', referenceNo: '2026-0192', requestedDate: '18/03/2026' },
    { id: '3', title: 'Equipment Maintenance Request', status: 'In Progress', department: 'Transmission Water', referenceNo: '2026-0192', requestedDate: '01/04/2026' },
    { id: '4', title: 'Software License Renewal', status: 'Approved', department: 'Customer Services', referenceNo: '2026-0192', requestedDate: '05/05/2026' },
    { id: '5', title: 'Customer Feedback Analysis', status: 'Further Info', department: 'Transmission Water', referenceNo: '2026-0192', requestedDate: '10/06/2026' },
    { id: '6', title: 'New Vendor Onboarding', status: 'Pending', department: 'Generation', referenceNo: '2026-0192', requestedDate: '20/07/2026' },
    { id: '7', title: 'Data Migration Project', status: 'In Progress', department: 'Transmission Water', referenceNo: '2026-0192', requestedDate: '01/08/2026' },
    { id: '8', title: 'Marketing Campaign Launch', status: 'Further Info', department: 'Transmission Power', referenceNo: '2026-0192', requestedDate: '15/09/2026' },
    { id: '9', title: 'Product Development Update', status: 'Pending', department: 'Generation', referenceNo: '2026-0192', requestedDate: '10/10/2026' },
    { id: '10', title: 'Compliance Audit Review', status: 'Approved', department: 'Transmission Water', referenceNo: '2026-0192', requestedDate: '05/11/2026' },
    { id: '11', title: 'Employee Training Session', status: 'Further Info', department: 'Transmission Power', referenceNo: '2026-0192', requestedDate: '20/12/2026' }
  ]

  const filteredCases = cases.filter((caseItem) => {
    const matchesSearch = caseItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      caseItem.department.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const totalPages = Math.ceil(filteredCases.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedCases = filteredCases.slice(startIndex, endIndex)

  const getStatusBadgeClass = (status: Case['status']) => {
    switch (status) {
      case 'Approved':
        return 'status-approved'
      case 'Further Info':
        return 'status-further-info'
      case 'In Progress':
        return 'status-in-progress'
      case 'Pending':
        return 'status-pending'
      default:
        return ''
    }
  }

  const getStatusIcon = (status: Case['status']) => {
    switch (status) {
      case 'Approved':
        return '✓'
      case 'Further Info':
        return 'ⓘ'
      case 'In Progress':
        return '⟳'
      case 'Pending':
        return '○'
      default:
        return ''
    }
  }

  return (
    <div className="case-list">
      <div className="case-list-header">
        <div>
          <h1>Case List</h1>
          <div className="breadcrumb">
            <button className="breadcrumb-home" onClick={onNavigateToDashboard}>Home</button>
            <span className="breadcrumb-separator">|</span>
            <span>Case List</span>
          </div>
        </div>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="cases-table-container">
        <table className="cases-table">
          <thead>
            <tr>
              <th>Case Title</th>
              <th>Case Status</th>
              <th>Department</th>
              <th>Case Reference No</th>
              <th>Case Requested Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCases.map((caseItem) => (
              <tr key={caseItem.id}>
                <td>{caseItem.title}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(caseItem.status)}`}>
                    <span className="status-icon">{getStatusIcon(caseItem.status)}</span>
                    {caseItem.status}
                  </span>
                </td>
                <td>{caseItem.department}</td>
                <td>{caseItem.referenceNo}</td>
                <td>{caseItem.requestedDate}</td>
                <td className="action-cell">
                  <button
                    className="action-btn view-btn"
                    title="View"
                    onMouseDown={() => setSelectedViewRowId(caseItem.id)}
                    onMouseUp={() => setSelectedViewRowId(null)}
                    onMouseLeave={() => setSelectedViewRowId(null)}
                    onClick={() => onViewCase?.(caseItem)}
                  >
                    <img src={selectedViewRowId === caseItem.id ? '/View3.png' : '/View2.png'} alt="View" />
                  </button>
                  <button
                    className={`action-btn edit-btn ${caseItem.status === 'Further Info' ? 'enabled' : 'disabled'}`}
                    title="Edit"
                    disabled={caseItem.status !== 'Further Info'}
                    onMouseDown={() => caseItem.status === 'Further Info' && setSelectedEditRowId(caseItem.id)}
                    onMouseUp={() => setSelectedEditRowId(null)}
                    onMouseLeave={() => setSelectedEditRowId(null)}
                    onClick={() => caseItem.status === 'Further Info' && onEditCase?.(caseItem)}
                  >
                    <img
                      src={
                        caseItem.status === 'Further Info'
                          ? selectedEditRowId === caseItem.id ? '/Edit4.png' : '/Edit3.png'
                          : '/Edit2.png'
                      }
                      alt="Edit"
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="record-count">Total Number of Records: {filteredCases.length}</span>
        <div className="pagination-controls">
          <button className="nav-btn" onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>◀</button>
          <span className="current-page">{currentPage}</span>
          {totalPages > 1 && <button className="page-btn" onClick={() => setCurrentPage(2)}>2</button>}
          {totalPages > 2 && <button className="page-btn" onClick={() => setCurrentPage(3)}>3</button>}
          {totalPages > 3 && <button className="page-btn" onClick={() => setCurrentPage(4)}>4</button>}
          <button className="nav-btn" onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>▶</button>
          <input type="text" placeholder="10" className="page-input" />
          <button className="nav-btn">⋯</button>
        </div>
      </div>
    </div>
  )
}

export default CaseList
