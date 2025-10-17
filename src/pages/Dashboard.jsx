import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Users, Target, DollarSign, TrendingUp } from 'lucide-react';
import { 
  StatCard, 
  RevenueChart, 
  SalesChart, 
  PieChartCard,
  LoadingSpinner 
} from '../components';
import reportService from '../services/reportService';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sample data for charts
  const salesData = [
    { month: 'Jan', revenue: 45000, customers: 12 },
    { month: 'Feb', revenue: 52000, customers: 15 },
    { month: 'Mar', revenue: 48000, customers: 14 },
    { month: 'Apr', revenue: 61000, customers: 18 },
    { month: 'May', revenue: 55000, customers: 16 },
    { month: 'Jun', revenue: 67000, customers: 20 }
  ];

  const statusData = [
    { name: 'Active', value: 45 },
    { name: 'Lead', value: 30 },
    { name: 'Inactive', value: 25 }
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await reportService.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
      console.error('Error fetching dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Dashboard</h2>
          <p className="text-muted mb-0">Welcome back! Here's your overview.</p>
        </div>
      </div>

      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={6} lg={3}>
          <StatCard
            title="Total Customers"
            value={stats?.customers?.total || 0}
            icon={Users}
            trend="up"
            trendValue="+12%"
            color="primary"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            title="Active Leads"
            value={stats?.leads?.total || 0}
            icon={Target}
            trend="up"
            trendValue="+8%"
            color="info"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            title="Total Revenue"
            value={stats?.revenue?.total || 0}
            icon={DollarSign}
            trend="up"
            trendValue="+23%"
            color="success"
            prefix="$"
          />
        </Col>
        <Col md={6} lg={3}>
          <StatCard
            title="Win Rate"
            value={stats?.deals?.winRate || 0}
            icon={TrendingUp}
            trend="up"
            trendValue="+5%"
            color="warning"
            suffix="%"
          />
        </Col>
      </Row>

      {/* Charts Row 1 */}
      <Row className="g-4 mb-4">
        <Col lg={8}>
          <SalesChart data={salesData} title="Sales Performance" />
        </Col>
        <Col lg={4}>
          <PieChartCard data={statusData} title="Customer Status" />
        </Col>
      </Row>

      {/* Charts Row 2 */}
      <Row className="g-4 mb-4">
        <Col lg={12}>
          <RevenueChart data={salesData} title="Revenue Trend" />
        </Col>
      </Row>

      {/* Additional Stats */}
      <Row className="g-4">
        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="card-title mb-4">Quick Stats</h5>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Pipeline Value:</span>
                <span className="fw-bold">${stats?.revenue?.pipeline?.toLocaleString() || 0}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Won Deals:</span>
                <span className="fw-bold">{stats?.deals?.won || 0}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Pending Tasks:</span>
                <span className="fw-bold">{stats?.tasks?.pending || 0}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Overdue Tasks:</span>
                <span className="fw-bold text-danger">{stats?.tasks?.overdue || 0}</span>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h5 className="card-title mb-4">Conversion Metrics</h5>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Lead Conversion:</span>
                <span className="fw-bold">{stats?.leads?.conversionRate || 0}%</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Deal Win Rate:</span>
                <span className="fw-bold">{stats?.deals?.winRate || 0}%</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span className="text-muted">Total Deals:</span>
                <span className="fw-bold">{stats?.deals?.total || 0}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-muted">Avg Deal Size:</span>
                <span className="fw-bold">
                  ${((stats?.revenue?.total || 0) / (stats?.deals?.won || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </span>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;