import React from 'react';
import { Card } from 'react-bootstrap';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const PieChartCard = ({ data, title = 'Distribution' }) => {
  const COLORS = ['#0d6efd', '#20c997', '#ffc107', '#dc3545', '#6f42c1'];

  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <h5 className="card-title mb-4">{title}</h5>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value) => value.toLocaleString()}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #dee2e6',
                borderRadius: '4px'
              }}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              wrapperStyle={{ fontSize: '14px' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default PieChartCard;