import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const TaskForm = ({ task, customers, leads, deals, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Call',
    status: 'Pending',
    priority: 'Medium',
    dueDate: '',
    relatedTo: {
      model: 'Customer',
      id: ''
    },
    notes: ''
  });

  const [relatedOptions, setRelatedOptions] = useState([]);

  useEffect(() => {
    if (task) {
      setFormData({
        ...task,
        dueDate: task.dueDate 
          ? new Date(task.dueDate).toISOString().split('T')[0]
          : '',
        relatedTo: {
          model: task.relatedTo?.model || 'Customer',
          id: task.relatedTo?.id?._id || task.relatedTo?.id || ''
        }
      });
    }
  }, [task]);

  useEffect(() => {
    // Update related options when model changes
    switch (formData.relatedTo.model) {
      case 'Customer':
        setRelatedOptions(customers || []);
        break;
      case 'Lead':
        setRelatedOptions(leads || []);
        break;
      case 'Deal':
        setRelatedOptions(deals || []);
        break;
      default:
        setRelatedOptions([]);
    }
  }, [formData.relatedTo.model, customers, leads, deals]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('relatedTo.')) {
      const field = name.split('.')[1];
      setFormData({
        ...formData,
        relatedTo: {
          ...formData.relatedTo,
          [field]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Task Title <span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter task title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Task description..."
        />
      </Form.Group>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Select
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="Call">Call</option>
              <option value="Email">Email</option>
              <option value="Meeting">Meeting</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Demo">Demo</option>
              <option value="Proposal">Proposal</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
              <option value="Urgent">Urgent</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Due Date <span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <h6 className="mb-3">Related To</h6>
      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Type <span className="text-danger">*</span></Form.Label>
            <Form.Select
              name="relatedTo.model"
              value={formData.relatedTo.model}
              onChange={handleChange}
              required
            >
              <option value="Customer">Customer</option>
              <option value="Lead">Lead</option>
              <option value="Deal">Deal</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={8}>
          <Form.Group className="mb-3">
            <Form.Label>Select {formData.relatedTo.model} <span className="text-danger">*</span></Form.Label>
            <Form.Select
              name="relatedTo.id"
              value={formData.relatedTo.id}
              onChange={handleChange}
              required
            >
              <option value="">Select {formData.relatedTo.model}</option>
              {relatedOptions.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.name || option.title} 
                  {option.company && ` - ${option.company}`}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={2}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes..."
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </Form>
  );
};

export default TaskForm;