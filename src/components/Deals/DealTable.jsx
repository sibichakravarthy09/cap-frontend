import React from 'react';
import { Table, Badge, Button, Dropdown } from 'react-bootstrap';
import { Eye, Edit2, Trash2, MoreVertical } from 'lucide-react';
import { format } from 'date-fns';

const DealTable = ({ deals, onView, onEdit, onDelete }) => {
  const getStageBadge = (stage) => {
    const variants = {
      'Prospecting': 'primary',
      'Qualification': 'info',
      'Proposal': 'warning',
      'Negotiation': 'secondary',
      'Closed Won': 'success',
      'Closed Lost': 'danger'
    };
    return <Badge bg={variants[stage] || 'secondary'}>{stage}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'Low': 'secondary',
      'Medium': 'info',
      'High': 'warning',
      'Critical': 'danger'
    };
    return <Badge bg={variants[priority] || 'secondary'}>{priority}</Badge>;
  };

  return (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Customer</th>
            <th>Value</th>
            <th>Stage</th>
            <th>Priority</th>
            <th>Probability</th>
            <th>Expected Close</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {deals.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4 text-muted">
                No deals found
              </td>
            </tr>
          ) : (
            deals.map((deal) => (
              <tr key={deal._id}>
                <td>
                  <div className="fw-semibold">{deal.title}</div>
                  <small className="text-muted">
                    {deal.assignedTo?.name || 'Unassigned'}
                  </small>
                </td>
                <td>
                  <div>{deal.customer?.name || 'N/A'}</div>
                  <small className="text-muted">
                    {deal.customer?.company || ''}
                  </small>
                </td>
                <td className="fw-bold text-success">
                  ${deal.value?.toLocaleString() || 0}
                </td>
                <td>{getStageBadge(deal.stage)}</td>
                <td>{getPriorityBadge(deal.priority)}</td>
                <td>
                  <Badge bg="light" text="dark">{deal.probability}%</Badge>
                </td>
                <td>
                  {deal.expectedCloseDate 
                    ? format(new Date(deal.expectedCloseDate), 'MMM dd, yyyy')
                    : 'N/A'
                  }
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => onView(deal)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => onEdit(deal)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Dropdown align="end">
                      <Dropdown.Toggle 
                        variant="light" 
                        size="sm"
                        id={`dropdown-${deal._id}`}
                      >
                        <MoreVertical size={16} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onView(deal)}>
                          <Eye size={14} className="me-2" />
                          View Details
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onEdit(deal)}>
                          <Edit2 size={14} className="me-2" />
                          Edit
                        </Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item 
                          onClick={() => onDelete(deal)}
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

export default DealTable;