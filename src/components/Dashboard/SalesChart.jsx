import React from 'react';
import { Card } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SalesChart = ({ data, title = 'Sales Performance' }) => {
  return (
    <Card className="border-0 shadow-sm h-100">
      <Card.Body>
        <h5 className="card-title mb-4">{title}</h5>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              stroke="#6c757d"
              style={{ fontSize: '12px' }}
            />
            <YAxis 
              stroke="#6c757d"
              style={{ fontSize: '12px' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #dee2e6',
                borderRadius: '4px'
              }}
            />
            <Legend wrapperStyle={{ fontSize: '14px' }} />
            <Bar 
              dataKey="revenue" 
              fill="#0d6efd" 
              radius={[8, 8, 0, 0]}
              name="Revenue"
            />
            <Bar 
              dataKey="customers" 
              fill="#20c997" 
              radius={[8, 8, 0, 0]}
              name="Customers"
            />
          </BarChart>
        </ResponsiveContainer>
      </Card.Body>
    </Card>
  );
};

export default SalesChart;