import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const LeadForm = ({ lead, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    stage: 'New',
    source: 'Website',
    score: 0,
    estimatedValue: 0,
    probability: 0,
    expectedCloseDate: '',
    notes: '',
    tags: []
  });

  useEffect(() => {
    if (lead) {
      setFormData({
        ...lead,
        expectedCloseDate: lead.expectedCloseDate 
          ? new Date(lead.expectedCloseDate).toISOString().split('T')[0]
          : '',
        tags: lead.tags || []
      });
    }
  }, [lead]);

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
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Name <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter lead name"
            />
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="lead@example.com"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Phone <span className="text-danger">*</span></Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="+1 (555) 000-0000"
            />
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Company</Form.Label>
            <Form.Control
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="Company name"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="e.g., CEO, Manager"
            />
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Stage</Form.Label>
            <Form.Select
              name="stage"
              value={formData.stage}
              onChange={handleChange}
            >
              <option value="New">New</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Closed Won">Closed Won</option>
              <option value="Closed Lost">Closed Lost</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Source</Form.Label>
            <Form.Select
              name="source"
              value={formData.source}
              onChange={handleChange}
            >
              <option value="Website">Website</option>
              <option value="Referral">Referral</option>
              <option value="Cold Call">Cold Call</option>
              <option value="Social Media">Social Media</option>
              <option value="Email Campaign">Email Campaign</option>
              <option value="Trade Show">Trade Show</option>
              <option value="Other">Other</option>
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Lead Score (0-100)</Form.Label>
            <Form.Control
              type="number"
              name="score"
              value={formData.score}
              onChange={handleChange}
              min="0"
              max="100"
              placeholder="0"
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Estimated Value ($)</Form.Label>
            <Form.Control
              type="number"
              name="estimatedValue"
              value={formData.estimatedValue}
              onChange={handleChange}
              min="0"
              placeholder="0"
            />
          </Form.Group>
        </Col>
        
        <Col md={4}>
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
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group className="mb-3">
            <Form.Label>Expected Close Date</Form.Label>
            <Form.Control
              type="date"
              name="expectedCloseDate"
              value={formData.expectedCloseDate}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about the lead..."
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : lead ? 'Update Lead' : 'Create Lead'}
        </Button>
      </div>
    </Form>
  );
};

export default LeadForm;