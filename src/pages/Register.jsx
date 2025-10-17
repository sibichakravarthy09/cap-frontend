import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { UserPlus, Mail, Lock, User, Database } from 'lucide-react';
import authService from '../services/authService';
import './Auth.css';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...registerData } = formData;
      await authService.register(registerData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100 py-5">
          <Col md={6} lg={5}>
            <div className="text-center mb-4">
              <div className="auth-logo mb-3">
                <Database size={48} className="text-primary" />
              </div>
              <h2 className="fw-bold">Sales CRM</h2>
              <p className="text-muted">Create your account</p>
            </div>

            <Card className="shadow-lg border-0">
              <Card.Body className="p-4">
                {error && (
                  <Alert variant="danger" dismissible onClose={() => setError('')}>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <User size={18} />
                      </span>
                      <Form.Control
                        type="text"
                        name="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Mail size={18} />
                      </span>
                      <Form.Control
                        type="email"
                        name="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={18} />
                      </span>
                      <Form.Control
                        type="password"
                        name="password"
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Form.Text className="text-muted">
                      Must be at least 6 characters
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <div className="input-group">
                      <span className="input-group-text">
                        <Lock size={18} />
                      </span>
                      <Form.Control
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </Form.Group>

                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        <UserPlus size={18} className="me-2" />
                        Create Account
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <span className="text-muted">Already have an account? </span>
                    <Link to="/login" className="text-decoration-none">
                      Sign In
                    </Link>
                  </div>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-4 text-muted small">
              <p>© 2024 Sales CRM. All rights reserved.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;