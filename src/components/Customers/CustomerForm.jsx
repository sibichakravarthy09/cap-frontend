import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CustomerForm = ({ customer, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    status: 'Lead',
    source: 'Website',
    industry: '',
    website: '',
    notes: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  });

  useEffect(() => {
    if (customer) {
      setFormData({
        ...customer,
        address: customer.address || {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: ''
        }
      });
    }
  }, [customer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('address.')) {
      const addressField = name.split('.')[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value
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
              placeholder="Enter customer name"
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
              placeholder="customer@example.com"
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
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Lead">Lead</option>
              <option value="Prospect">Prospect</option>
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
            <Form.Label>Industry</Form.Label>
            <Form.Control
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
              placeholder="e.g., Technology, Healthcare"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Website</Form.Label>
        <Form.Control
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://example.com"
        />
      </Form.Group>

      <h6 className="mb-3 mt-4">Address Information</h6>
      
      <Form.Group className="mb-3">
        <Form.Label>Street Address</Form.Label>
        <Form.Control
          type="text"
          name="address.street"
          value={formData.address.street}
          onChange={handleChange}
          placeholder="123 Main St"
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              name="address.city"
              value={formData.address.city}
              onChange={handleChange}
              placeholder="New York"
            />
          </Form.Group>
        </Col>
        
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              type="text"
              name="address.state"
              value={formData.address.state}
              onChange={handleChange}
              placeholder="NY"
            />
          </Form.Group>
        </Col>
        
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              type="text"
              name="address.zipCode"
              value={formData.address.zipCode}
              onChange={handleChange}
              placeholder="10001"
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Country</Form.Label>
        <Form.Control
          type="text"
          name="address.country"
          value={formData.address.country}
          onChange={handleChange}
          placeholder="United States"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Additional notes about the customer..."
        />
      </Form.Group>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <Button variant="secondary" onClick={onCancel} disabled={loading}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Saving...' : customer ? 'Update Customer' : 'Create Customer'}
        </Button>
      </div>
    </Form>
  );
};

export default CustomerForm;