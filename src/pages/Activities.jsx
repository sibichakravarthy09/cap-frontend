import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Row, Col } from 'react-bootstrap';
import { Activity } from 'lucide-react';
import { ActivityTimeline, LoadingSpinner, EmptyState } from '../components';
import api from '../services/api';
import { toast } from 'react-toastify';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({
    type: '',
    model: ''
  });

  

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const params = {
        type: filter.type,
        model: filter.model,
        limit: 50
      };
      const response = await api.get('/activities', { params });
      setActivities(response.data.data);
    } catch (error) {
      toast.error('Failed to load activities');
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (name, value) => {
    setFilter({ ...filter, [name]: value });
  };

  return (
    <Container fluid>
      <div className="mb-4">
        <h2 className="mb-1">Activities</h2>
        <p className="text-muted mb-0">Track all your customer interactions</p>
      </div>

      <Row className="g-4">
        <Col lg={3}>
          <Card className="border-0 shadow-sm sticky-top" style={{ top: '100px' }}>
            <Card.Body>
              <h6 className="mb-3">Filters</h6>
              
              <Form.Group className="mb-3">
                <Form.Label className="small">Activity Type</Form.Label>
                <Form.Select
                  size="sm"
                  value={filter.type}
                  onChange={(e) => handleFilterChange('type', e.target.value)}
                >
                  <option value="">All Types</option>
                  <option value="Call">Call</option>
                  <option value="Email">Email</option>
                  <option value="Meeting">Meeting</option>
                  <option value="Note">Note</option>
                  <option value="Task">Task</option>
                  <option value="Deal Created">Deal Created</option>
                  <option value="Deal Updated">Deal Updated</option>
                  <option value="Status Change">Status Change</option>
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="small">Related To</Form.Label>
                <Form.Select
                  size="sm"
                  value={filter.model}
                  onChange={(e) => handleFilterChange('model', e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Customer">Customer</option>
                  <option value="Lead">Lead</option>
                  <option value="Deal">Deal</option>
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={9}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              {loading ? (
                <LoadingSpinner />
              ) : activities.length === 0 ? (
                <EmptyState
                  icon={Activity}
                  title="No Activities Found"
                  description="Activities will appear here as you interact with customers, leads, and deals"
                />
              ) : (
                <ActivityTimeline activities={activities} />
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Activities;