import './StatsCard.css'

interface StatsCardProps {
  label: string
  value: string
  icon: string
}

function StatsCard({ label, value, icon }: StatsCardProps) {
  return (
    <div className="stats-card">
      <div className="stats-content">
        <p className="stats-label">{label}</p>
        <p className="stats-value">{value}</p>
      </div>
      <div className="stats-icon">{icon}</div>
    </div>
  )
}

export default StatsCard
