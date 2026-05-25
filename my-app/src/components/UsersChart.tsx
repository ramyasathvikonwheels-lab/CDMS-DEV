import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import './Chart.css'

const data = [
  { name: 'Admin', value: 160 },
  { name: 'Management', value: 130 },
  { name: 'Legal Department', value: 190 },
  { name: 'Others', value: 210 }
]

function UsersChart() {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Users by department</h3>
        <div className="year-filter">
          2026 <span className="filter-arrow">▼</span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#00a86b" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default UsersChart
