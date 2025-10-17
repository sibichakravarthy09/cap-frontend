import React from 'react';
import { Table, Badge, Button, Dropdown, ProgressBar } from 'react-bootstrap';
import { Eye, Edit2, Trash2, MoreVertical, UserCheck } from 'lucide-react';
import { format } from 'date-fns';

const LeadTable = ({ leads, onView, onEdit, onDelete, onConvert }) => {
  const getStageBadge = (stage) => {
    const variants = {
      'New': 'primary',
      'Contacted': 'info',
      'Qualified': 'warning',
      'Proposal': 'secondary',
      'Negotiation': 'success',
      'Closed Won': 'success',
      'Closed Lost': 'danger'
    };
    return <Badge bg={variants[stage] || 'secondary'}>{stage}</Badge>;
  };

  const getScoreColor = (score) => {
    if (score >= 75) return 'success';
    if (score >= 50) return 'warning';
    return 'danger';
  };

  return (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Stage</th>
            <th>Score</th>
            <th>Est. Value</th>
            <th>Probability</th>
            <th>Expected Close</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {leads.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4 text-muted">
                No leads found
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <tr key={lead._id}>
                <td>
                  <div className="d-flex align-items-center">
                    <div className="avatar bg-info text-white rounded-circle d-flex align-items-center justify-content-center me-2" 
                         style={{ width: '40px', height: '40px' }}>
                      {lead.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="fw-semibold">{lead.name}</div>
                      <small className="text-muted">{lead.email}</small>
                    </div>
                  </div>
                </td>
                <td>{lead.company || 'N/A'}</td>
                <td>{getStageBadge(lead.stage)}</td>
                <td>
                  <div style={{ minWidth: '80px' }}>
                    <div className="d-flex align-items-center justify-content-between mb-1">
                      <small className="fw-semibold">{lead.score}/100</small>
                    </div>
                    <ProgressBar 
                      now={lead.score} 
                      variant={getScoreColor(lead.score)}
                      style={{ height: '6px' }}
                    />
                  </div>
                </td>
                <td className="fw-semibold">
                  ${lead.estimatedValue?.toLocaleString() || 0}
                </td>
                <td>
                  <Badge bg="light" text="dark">{lead.probability}%</Badge>
                </td>
                <td>
                  {lead.expectedCloseDate 
                    ? format(new Date(lead.expectedCloseDate), 'MMM dd, yyyy')
                    : 'N/A'
                  }
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => onView(lead)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => onEdit(lead)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Dropdown align="end">
                      <Dropdown.Toggle 
                        variant="light" 
                        size="sm"
                        id={`dropdown-${lead._id}`}
                      >
                        <MoreVertical size={16} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onView(lead)}>
                          <Eye size={14} className="me-2" />
                          View Details
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onEdit(lead)}>
                          <Edit2 size={14} className="me-2" />
                          Edit
                        </Dropdown.Item>
                        {!lead.convertedToCustomer && (
                          <>
                            <Dropdown.Divider />
                            <Dropdown.Item 
                              onClick={() => onConvert(lead)}
                              className="text-success"
                            >
                              <UserCheck size={14} className="me-2" />
                              Convert to Customer
                            </Dropdown.Item>
                          </>
                        )}
                        <Dropdown.Divider />
                        <Dropdown.Item 
                          onClick={() => onDelete(lead)}
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

export default LeadTable;