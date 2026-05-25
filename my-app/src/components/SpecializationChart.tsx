import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts'
import './Chart.css'

const data = [
  { name: 'Civil', value: 45 },
  { name: 'Criminal', value: 32 },
  { name: 'Commercial', value: 28 },
  { name: 'Arbitration', value: 38 }
]

const COLORS = [
  '#00a86b',
  '#ff1744',
  '#2196f3',
  '#9c27b0'
]

function SpecializationChart() {
  return (
    <div className="chart-container">
      <div className="chart-header">
        <h3>Law Firms Specialization</h3>
        <div className="year-filter">
          2026 <span className="filter-arrow">▼</span>
        </div>
      </div>
      <div className="pie-chart-wrapper">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `${value}`} />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              formatter={(value: string) => {
                const item = data.find((d) => d.name === value)
                return item ? `${item.name} - ${item.value}` : value
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default SpecializationChart
