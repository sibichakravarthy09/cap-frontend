import React from 'react';
import { Modal as BootstrapModal, Button } from 'react-bootstrap';
import { X } from 'lucide-react';

const Modal = ({ 
  show, 
  onHide, 
  title, 
  children, 
  size = 'lg',
  footer,
  centered = true 
}) => {
  return (
    <BootstrapModal 
      show={show} 
      onHide={onHide} 
      size={size}
      centered={centered}
    >
      <BootstrapModal.Header className="border-bottom">
        <BootstrapModal.Title>{title}</BootstrapModal.Title>
        <Button 
          variant="link" 
          className="text-dark p-0" 
          onClick={onHide}
        >
          <X size={24} />
        </Button>
      </BootstrapModal.Header>
      
      <BootstrapModal.Body>
        {children}
      </BootstrapModal.Body>
      
      {footer && (
        <BootstrapModal.Footer className="border-top">
          {footer}
        </BootstrapModal.Footer>
      )}
    </BootstrapModal>
  );
};

export default Modal;