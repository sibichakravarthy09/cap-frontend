import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { User, Mail, Phone, Briefcase, Lock } from 'lucide-react';
import authService from '../services/authService';
import { toast } from 'react-toastify';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    department: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setProfileData({
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phone: currentUser?.phone || '',
      department: currentUser?.department || ''
    });
  }, []);

  const handleProfileChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authService.updateProfile(profileData);
      toast.success('Profile updated successfully');
      // Update local user data
      const updatedUser = { ...user, ...profileData };
      setUser(updatedUser);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await authService.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });
      toast.success('Password changed successfully');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setShowPasswordForm(false);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: 'danger',
      manager: 'warning',
      sales_rep: 'primary'
    };
    return badges[role] || 'secondary';
  };

  const getRoleLabel = (role) => {
    const labels = {
      admin: 'Administrator',
      manager: 'Manager',
      sales_rep: 'Sales Representative'
    };
    return labels[role] || role;
  };

  return (
    <Container fluid>
      <div className="mb-4">
        <h2 className="mb-1">My Profile</h2>
        <p className="text-muted mb-0">Manage your account settings</p>
      </div>

      <Row>
        <Col lg={4}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body className="text-center">
              <div className="mb-3">
                <div 
                  className="bg-primary text-white rounded-circle d-inline-flex align-items-center justify-content-center"
                  style={{ width: '100px', height: '100px', fontSize: '2.5rem' }}
                >
                  {user?.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              <h4 className="mb-1">{user?.name}</h4>
              <p className="text-muted mb-2">{user?.email}</p>
              <span className={`badge bg-${getRoleBadge(user?.role)} mb-3`}>
                {getRoleLabel(user?.role)}
              </span>
              {user?.department && (
                <p className="text-muted mb-0">
                  <Briefcase size={16} className="me-2" />
                  {user.department}
                </p>
              )}
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h6 className="mb-3">Account Information</h6>
              <div className="mb-2">
                <small className="text-muted">Account Created</small>
                <p className="mb-0">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div className="mb-2">
                <small className="text-muted">Last Login</small>
                <p className="mb-0">
                  {user?.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'N/A'}
                </p>
              </div>
              <div>
                <small className="text-muted">Status</small>
                <p className="mb-0">
                  <span className="badge bg-success">Active</span>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={8}>
          <Card className="border-0 shadow-sm mb-4">
            <Card.Body>
              <h5 className="card-title mb-4">Edit Profile</h5>
              <Form onSubmit={handleProfileSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <User size={16} className="me-2" />
                        Full Name
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="name"
                        value={profileData.name}
                        onChange={handleProfileChange}
                        required
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Mail size={16} className="me-2" />
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        value={profileData.email}
                        disabled
                        readOnly
                      />
                      <Form.Text className="text-muted">
                        Email cannot be changed
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Phone size={16} className="me-2" />
                        Phone Number
                      </Form.Label>
                      <Form.Control
                        type="tel"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        placeholder="+1 (555) 000-0000"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>
                        <Briefcase size={16} className="me-2" />
                        Department
                      </Form.Label>
                      <Form.Control
                        type="text"
                        name="department"
                        value={profileData.department}
                        onChange={handleProfileChange}
                        placeholder="e.g., Sales, Marketing"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-end">
                  <Button type="submit" variant="primary" disabled={loading}>
                    {loading ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <h5 className="card-title mb-0">
                  <Lock size={20} className="me-2" />
                  Change Password
                </h5>
                {!showPasswordForm && (
                  <Button 
                    variant="outline-primary" 
                    size="sm"
                    onClick={() => setShowPasswordForm(true)}
                  >
                    Change Password
                  </Button>
                )}
              </div>

              {showPasswordForm && (
                <Form onSubmit={handlePasswordSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Current Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="currentPassword"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                      placeholder="Enter current password"
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="newPassword"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                      placeholder="Enter new password"
                    />
                    <Form.Text className="text-muted">
                      Must be at least 6 characters
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Confirm New Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      placeholder="Confirm new password"
                    />
                  </Form.Group>

                  <div className="d-flex justify-content-end gap-2">
                    <Button 
                      variant="secondary" 
                      onClick={() => {
                        setShowPasswordForm(false);
                        setPasswordData({
                          currentPassword: '',
                          newPassword: '',
                          confirmPassword: ''
                        });
                      }}
                      disabled={loading}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" variant="primary" disabled={loading}>
                      {loading ? 'Updating...' : 'Update Password'}
                    </Button>
                  </div>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;