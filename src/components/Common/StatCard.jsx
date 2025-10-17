import React from 'react';
import { Card } from 'react-bootstrap';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './StatCard.css';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendValue, 
  color = 'primary',
  prefix = '',
  suffix = ''
}) => {
  const isPositiveTrend = trend === 'up';
  
  return (
    <Card className="stat-card border-0 shadow-sm h-100">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start">
          <div className="flex-grow-1">
            <p className="text-muted mb-2 small text-uppercase fw-semibold">
              {title}
            </p>
            <h3 className="mb-0 fw-bold">
              {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
            </h3>
            
            {trendValue && (
              <div className={`d-flex align-items-center mt-2 small ${
                isPositiveTrend ? 'text-success' : 'text-danger'
              }`}>
                {isPositiveTrend ? (
                  <TrendingUp size={16} className="me-1" />
                ) : (
                  <TrendingDown size={16} className="me-1" />
                )}
                <span className="fw-semibold">{trendValue}</span>
                <span className="text-muted ms-1">vs last month</span>
              </div>
            )}
          </div>
          
          <div className={`stat-icon bg-${color} bg-opacity-10 text-${color} rounded-3 p-3`}>
            <Icon size={24} />
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default StatCard;