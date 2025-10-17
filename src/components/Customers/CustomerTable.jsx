import React from 'react';
import { Table, Badge, Button, Dropdown } from 'react-bootstrap';
import { Eye, Edit2, Trash2, MoreVertical, Mail, Phone } from 'lucide-react';
import { format } from 'date-fns';

const CustomerTable = ({ customers, onView, onEdit, onDelete }) => {
  const getStatusBadge = (status) => {
    const variants = {
      Active: 'success',
      Inactive: 'secondary',
      Lead: 'warning',
      Prospect: 'info'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  return (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Status</th>
            <th>Total Value</th>
            <th>Last Contact</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center py-4 text-muted">
                No customers found
              </td>
            </tr>
          ) : (
            customers.map((customer) => (
              <tr key={customer._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                         style={{ width: '40px', height: '40px' }}>
                      {customer.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="fw-semibold">{customer.name}</div>
                      <small className="text-muted">{customer.jobTitle || 'N/A'}</small>
                    </div>
                  </div>
                </td>
                <td>{customer.company || 'N/A'}</td>
                <td>
                  <div className="small">
                    <div className="d-flex align-items-center mb-1">
                      <Mail size={14} className="me-1 text-muted" />
                      <a href={`mailto:${customer.email}`} className="text-decoration-none">
                        {customer.email}
                      </a>
                    </div>
                    <div className="d-flex align-items-center">
                      <Phone size={14} className="me-1 text-muted" />
                      <span>{customer.phone}</span>
                    </div>
                  </div>
                </td>
                <td>{getStatusBadge(customer.status)}</td>
                <td className="fw-semibold">
                  ${customer.totalValue?.toLocaleString() || 0}
                </td>
                <td>
                  {customer.lastContactDate 
                    ? format(new Date(customer.lastContactDate), 'MMM dd, yyyy')
                    : 'Never'
                  }
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => onView(customer)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => onEdit(customer)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Dropdown align="end">
                      <Dropdown.Toggle 
                        variant="light" 
                        size="sm"
                        id={`dropdown-${customer._id}`}
                      >
                        <MoreVertical size={16} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onView(customer)}>
                          <Eye size={14} className="me-2" />
                          View Details
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onEdit(customer)}>
                          <Edit2 size={14} className="me-2" />
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item 
                          onClick={() => onDelete(customer)}
                          className="text-danger"
                        >
                          <Trash2 size={14} className="me-2" />
                          Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default CustomerTable;