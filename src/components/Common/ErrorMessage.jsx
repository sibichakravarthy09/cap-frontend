import React from 'react';
import { Alert } from 'react-bootstrap';
import { AlertCircle } from 'lucide-react';

const ErrorMessage = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <Alert variant="danger" dismissible onClose={onClose} className="d-flex align-items-center">
      <AlertCircle size={20} className="me-2" />
      <div>{message}</div>
    </Alert>
  );
};

export default ErrorMessage;