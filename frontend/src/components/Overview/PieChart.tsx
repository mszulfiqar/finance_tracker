import React from 'react'
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

export const data = [
  { name: "Rent", value: 1200, color: "#f56565" },
  { name: "Groceries", value: 450, color: "#48bb78" },
  { name: "Utilities", value: 200, color: "#4299e1" },
  { name: "Transport", value: 150, color: "#ed8936" },
  { name: "Healthcare", value: 100, color: "#9f7aea" },
  { name: "Entertainment", value: 80, color: "#ecc94b" },
  { name: "Shopping", value: 120, color: "#f6ad55" },
  { name: "Dining Out", value: 90, color: "#e53e3e" },
  { name: "Education", value: 60, color: "#38b2ac" },
  { name: "Other", value: 50, color: "#a0aec0" },
];

const PieCharts = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
        <PieChart >
          <Pie
          
            data={data}
            cx="22%"
            cy="50%"
            labelLine={false}
            // label={renderCustomizedLabel}
            outerRadius={90}
            fill="#8884d8"
            dataKey="value"
            stroke='none'
            // label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
  )
}

export default PieCharts