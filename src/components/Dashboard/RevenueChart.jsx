import React from 'react';
import { Card } from 'react-bootstrap';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ data, title = 'Revenue Overview' }) => {
  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <h5 className="card-title mb-4">{title}</h5>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6c757d"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6c757d"
              style={{ fontSize: '12px' }}
              tickFormatter={(value) => `$${value.toLocaleString()}`}
            />
            <Tooltip 
              formatter={(value) => `$${value.toLocaleString()}`}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #dee2e6',
                borderRadius: '4px'
              }}
            />
            <Legend 
              wrapperStyle={{ fontSize: '14px' }}
            />
            <Line 
              type="monotone" 
              dataKey="revenue" 
              stroke="#0d6efd" 
              strokeWidth={3}
              dot={{ fill: '#0d6efd', r: 5 }}
              activeDot={{ r: 7 }}
              name="Revenue"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default RevenueChart;