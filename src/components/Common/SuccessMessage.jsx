import React from 'react';
import { Alert } from 'react-bootstrap';
import { CheckCircle } from 'lucide-react';

const SuccessMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <Alert variant="success" dismissible onClose={onClose} className="d-flex align-items-center">
      <CheckCircle size={20} className="me-2" />
      <div>{message}</div>
    </Alert>
  );
};

export default SuccessMessage;