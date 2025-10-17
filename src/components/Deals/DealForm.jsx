import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const DealForm = ({ deal, customers, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    title: '',
    customer: '',
    value: 0,
    stage: 'Prospecting',
    probability: 0,
    priority: 'Medium',
    expectedCloseDate: '',
    description: '',
    notes: ''
  });

  useEffect(() => {
    if (deal) {
      setFormData({
        ...deal,
        customer: deal.customer?._id || deal.customer,
        expectedCloseDate: deal.expectedCloseDate 
          ? new Date(deal.expectedCloseDate).toISOString().split('T')[0]
          : ''
      });
    }
  }, [deal]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Deal Title <span className="text-danger">*</span></Form.Label>
        <Form.Control
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          placeholder="Enter deal title"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Customer <span className="text-danger">*</span></Form.Label>
        <Form.Select
          name="customer"
          value={formData.customer}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name} - {customer.company || 'No Company'}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Deal Value ($) <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="number"
              name="value"
              value={formData.value}
              onChange={handleChange}
              required
              min="0"
              placeholder="0"
            />
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Expected Close Date <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="date"
              name="expectedCloseDate"
              value={formData.expectedCloseDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Stage</Form.Label>
            <Form.Select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
            >
              <option value="Prospecting">Prospecting</option>
              <option value="Qualification">Qualification</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={6}>
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
              <option value="Critical">Critical</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Probability (%)</Form.Label>
        <Form.Control
          type="number"
          name="probability"
          value={formData.probability}
          onChange={handleChange}
          min="0"
          max="100"
          placeholder="0"
        />
        <Form.Text className="text-muted">
          Automatically calculated based on stage, but can be manually adjusted
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Deal description..."
        />
      </Form.Group>

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
          {loading ? 'Saving...' : deal ? 'Update Deal' : 'Create Deal'}
        </Button>
      </div>
    </Form>
  );
};

export default DealForm;