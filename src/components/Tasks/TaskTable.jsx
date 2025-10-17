import React from 'react';
import { Table, Badge, Button, Dropdown } from 'react-bootstrap';
import { Eye, Edit2, Trash2, MoreVertical, CheckCircle } from 'lucide-react';
import { format, isPast } from 'date-fns';

const TaskTable = ({ tasks, onView, onEdit, onDelete, onComplete }) => {
  const getStatusBadge = (status) => {
    const variants = {
      'Pending': 'warning',
      'In Progress': 'info',
      'Completed': 'success',
      'Cancelled': 'secondary'
    };
    return <Badge bg={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getPriorityBadge = (priority) => {
    const variants = {
      'Low': 'secondary',
      'Medium': 'info',
      'High': 'warning',
      'Urgent': 'danger'
    };
    return <Badge bg={variants[priority] || 'secondary'}>{priority}</Badge>;
  };

  const getTypeBadge = (type) => {
    const variants = {
      'Call': 'primary',
      'Email': 'info',
      'Meeting': 'success',
      'Follow-up': 'warning',
      'Demo': 'secondary',
      'Proposal': 'dark',
      'Other': 'light'
    };
    return <Badge bg={variants[type] || 'light'} text={type === 'Other' ? 'dark' : 'white'}>
      {type}
    </Badge>;
  };

  const isOverdue = (dueDate, status) => {
    return status !== 'Completed' && status !== 'Cancelled' && isPast(new Date(dueDate));
  };

  return (
    <div className="table-responsive">
      <Table hover className="align-middle">
        <thead className="table-light">
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Related To</th>
            <th>Priority</th>
            <th>Status</th>
            <th>Due Date</th>
            <th>Assigned To</th>
            <th className="text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length === 0 ? (
            <tr>
              <td colSpan="8" className="text-center py-4 text-muted">
                No tasks found
              </td>
            </tr>
          ) : (
            tasks.map((task) => (
              <tr key={task._id} className={isOverdue(task.dueDate, task.status) ? 'table-danger' : ''}>
                <td>
                  <div className="fw-semibold">{task.title}</div>
                  {task.description && (
                    <small className="text-muted d-block text-truncate" style={{ maxWidth: '200px' }}>
                      {task.description}
                    </small>
                  )}
                </td>
                <td>{getTypeBadge(task.type)}</td>
                <td>
                  <div className="small">
                    <Badge bg="light" text="dark" className="mb-1">
                      {task.relatedTo?.model || 'N/A'}
                    </Badge>
                    <div className="text-muted">
                      {task.relatedTo?.id?.name || 'N/A'}
                    </div>
                  </div>
                </td>
                <td>{getPriorityBadge(task.priority)}</td>
                <td>{getStatusBadge(task.status)}</td>
                <td>
                  <div className={isOverdue(task.dueDate, task.status) ? 'text-danger fw-semibold' : ''}>
                    {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </div>
                  {isOverdue(task.dueDate, task.status) && (
                    <small className="text-danger">Overdue</small>
                  )}
                </td>
                <td>
                  <div className="small">
                    {task.assignedTo?.name || 'Unassigned'}
                  </div>
                </td>
                <td>
                  <div className="d-flex justify-content-end gap-2">
                    {task.status !== 'Completed' && (
                      <Button 
                        variant="success" 
                        size="sm"
                        onClick={() => onComplete(task)}
                        title="Mark as Complete"
                      >
                        <CheckCircle size={16} />
                      </Button>
                    )}
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => onView(task)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="light" 
                      size="sm"
                      onClick={() => onEdit(task)}
                    >
                      <Edit2 size={16} />
                    </Button>
                    <Dropdown align="end">
                      <Dropdown.Toggle 
                        variant="light" 
                        size="sm"
                        id={`dropdown-${task._id}`}
                      >
                        <MoreVertical size={16} />
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item onClick={() => onView(task)}>
                          <Eye size={14} className="me-2" />
                          View Details
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => onEdit(task)}>
                          <Edit2 size={14} className="me-2" />
                          Edit
                        </Dropdown.Item>
                        {task.status !== 'Completed' && (
                          <Dropdown.Item onClick={() => onComplete(task)} className="text-success">
                            <CheckCircle size={14} className="me-2" />
                            Mark as Complete
                          </Dropdown.Item>
                        )}
                        <Dropdown.Divider />
                        <Dropdown.Item 
                          onClick={() => onDelete(task)}
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

export default TaskTable;