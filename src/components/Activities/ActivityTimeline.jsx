import React from 'react';
import { Card, Badge } from 'react-bootstrap';
import { Phone, Mail, Calendar, FileText, DollarSign, Activity } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import './ActivityTimeline.css';

const ActivityTimeline = ({ activities }) => {
  const getActivityIcon = (type) => {
    const icons = {
      'Call': Phone,
      'Email': Mail,
      'Meeting': Calendar,
      'Note': FileText,
      'Deal Created': DollarSign,
      'Deal Updated': DollarSign,
      'Status Change': Activity,
      'Task': FileText,
      'Other': Activity
    };
    const Icon = icons[type] || Activity;
    return <Icon size={20} />;
  };

  const getActivityColor = (type) => {
    const colors = {
      'Call': 'primary',
      'Email': 'info',
      'Meeting': 'success',
      'Note': 'secondary',
      'Deal Created': 'success',
      'Deal Updated': 'warning',
      'Status Change': 'info',
      'Task': 'primary',
      'Other': 'secondary'
    };
    return colors[type] || 'secondary';
  };

  if (activities.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <Activity size={48} className="mb-3 opacity-25" />
        <p>No activities found</p>
      </div>
    );
  }

  return (
    <div className="activity-timeline">
      {activities.map((activity, index) => (
        <div key={activity._id} className="timeline-item">
          <div className={`timeline-marker bg-${getActivityColor(activity.type)}`}>
            {getActivityIcon(activity.type)}
          </div>
          
          <Card className="timeline-content border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <Badge bg={getActivityColor(activity.type)} className="mb-2">
                    {activity.type}
                  </Badge>
                  <h6 className="mb-1">{activity.description}</h6>
                </div>
                <small className="text-muted">
                  {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                </small>
              </div>
              
              {activity.notes && (
                <p className="mb-2 text-muted small">{activity.notes}</p>
              )}
              
              <div className="d-flex justify-content-between align-items-center">
                <div className="small text-muted">
                  By {activity.performedBy?.name || 'Unknown'}
                </div>
                {activity.duration > 0 && (
                  <Badge bg="light" text="dark">
                    {activity.duration} min
                  </Badge>
                )}
              </div>
            </Card.Body>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ActivityTimeline;