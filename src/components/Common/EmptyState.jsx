import React from 'react';
import { Button } from 'react-bootstrap';
import { Plus } from 'lucide-react';

const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction 
}) => {
  return (
    <div className="text-center py-5">
      <div className="mb-4">
        {Icon && <Icon size={64} className="text-muted opacity-25" />}
      </div>
      <h4 className="mb-2">{title}</h4>
      <p className="text-muted mb-4">{description}</p>
      {actionLabel && onAction && (
        <Button variant="primary" onClick={onAction}>
          <Plus size={18} className="me-2" />
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;