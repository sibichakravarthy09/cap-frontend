import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { LogIn, Mail, Lock, Database } from 'lucide-react';
import authService from '../services/authService';
import './Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
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
    setLoading(true);

    try {
      await authService.login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          <Col md={5} lg={4}>
            <div className="text-center mb-4">
              <div className="auth-logo mb-3">
                <Database size={48} className="text-primary" />
              </div>
              <h2 className="fw-bold">Sales CRM</h2>
              <p className="text-muted">Sign in to your account</p>
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
                        placeholder="Enter your password"
                        value={formData.password}
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
                        Signing in...
                      </>
                    ) : (
                      <>
                        <LogIn size={18} className="me-2" />
                        Sign In
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <span className="text-muted">Don't have an account? </span>
                    <Link to="/register" className="text-decoration-none">
                      Sign Up
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

export default Login;