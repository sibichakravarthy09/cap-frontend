import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import { BarChart3 } from 'lucide-react';
import { RevenueChart, SalesChart, PieChartCard, LoadingSpinner } from '../components';
import reportService from '../services/reportService';
import { toast } from 'react-toastify';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const [loading, setLoading] = useState(true);
  const [salesReport, setSalesReport] = useState(null);
  const [customerReport, setCustomerReport] = useState(null);
  const [activeTab, setActiveTab] = useState('sales');
  const [performanceReport, setPerformanceReport] = useState(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
  try {
    setLoading(true);
    const [salesRes, customerRes, performanceRes] = await Promise.all([
      reportService.getSalesReport(),
      reportService.getCustomerReport(),
      reportService.getPerformanceReport() // Add this line
    ]);
    setSalesReport(salesRes.data);
    setCustomerReport(customerRes.data);
    setPerformanceReport(performanceRes.data); // Add this line
  } catch (error) {
    toast.error('Failed to load reports');
    console.error('Error fetching reports:', error);
  } finally {
    setLoading(false);
  }
};

  // Sample data for charts
  const revenueData = [
    { month: 'Jan', revenue: 45000 },
    { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 },
    { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 55000 },
    { month: 'Jun', revenue: 67000 }
  ];

  const salesData = [
    { month: 'Jan', revenue: 45000, customers: 12 },
    { month: 'Feb', revenue: 52000, customers: 15 },
    { month: 'Mar', revenue: 48000, customers: 14 },
    { month: 'Apr', revenue: 61000, customers: 18 },
    { month: 'May', revenue: 55000, customers: 16 },
    { month: 'Jun', revenue: 67000, customers: 20 }
  ];

  const customerStatusData = customerReport?.byStatus?.map(item => ({
    name: item._id,
    value: item.count
  })) || [];

  const customerSourceData = customerReport?.bySource?.map(item => ({
    name: item._id,
    value: item.count
  })) || [];

  if (loading) {
    return <LoadingSpinner text="Loading reports..." />;
  }

  return (
    <Container fluid>
      <div className="mb-4">
        <h2 className="mb-1">Reports & Analytics</h2>
        <p className="text-muted mb-0">Analyze your business performance</p>
      </div>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="sales" title="Sales Reports">
          <Row className="g-4">
            <Col lg={12}>
              <RevenueChart data={revenueData} title="Revenue Trend" />
            </Col>
            <Col lg={12}>
              <SalesChart data={salesData} title="Sales Performance" />
            </Col>
            <Col lg={12}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h5 className="card-title mb-4">Deals by Stage</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Stage</th>
                          <th>Count</th>
                          <th>Total Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {salesReport?.dealsByStage?.map((stage, index) => (
                          <tr key={index}>
                            <td>{stage._id}</td>
                            <td>{stage.count}</td>
                            <td>${stage.value?.toLocaleString() || 0}</td>
                          </tr>
                        )) || (
                          <tr>
                            <td colSpan="3" className="text-center text-muted">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

        <Tab eventKey="customers" title="Customer Reports">
          <Row className="g-4">
            <Col lg={6}>
              <PieChartCard 
                data={customerStatusData} 
                title="Customers by Status" 
              />
            </Col>
            <Col lg={6}>
              <PieChartCard 
                data={customerSourceData} 
                title="Customers by Source" 
              />
            </Col>
            <Col lg={12}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <h5 className="card-title mb-4">Top Customers</h5>
                  <div className="table-responsive">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Customer</th>
                          <th>Company</th>
                          <th>Total Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customerReport?.topCustomers?.map((customer) => (
                          <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.company || 'N/A'}</td>
                            <td className="fw-bold text-success">
                              ${customer.totalValue?.toLocaleString() || 0}
                            </td>
                          </tr>
                        )) || (
                          <tr>
                            <td colSpan="3" className="text-center text-muted">
                              No data available
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Tab>

  
        <Tab eventKey="performance" title="Performance">
  <Row className="g-4">
    {/* Sales Rep Performance */}
    <Col lg={12}>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h5 className="card-title mb-4">Sales Rep Performance</h5>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={performanceReport?.salesRepPerformance || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="dealsWon" fill="#10b981" name="Deals Won" />
              <Bar dataKey="totalRevenue" fill="#3b82f6" name="Revenue" />
            </BarChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Col>

    {/* Monthly Revenue Trend */}
    <Col lg={12}>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h5 className="card-title mb-4">Monthly Revenue Trend</h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceReport?.monthlyRevenue || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={2} name="Revenue" />
              <Line type="monotone" dataKey="target" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Col>

    {/* Deal Stage Distribution */}
    <Col lg={6}>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h5 className="card-title mb-4">Deal Stage Distribution</h5>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={performanceReport?.dealStageDistribution || []}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value }) => `${name}: ${value}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {(performanceReport?.dealStageDistribution || []).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][index % 5]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card.Body>
      </Card>
    </Col>

    {/* Key Metrics */}
    <Col lg={6}>
      <Card className="border-0 shadow-sm">
        <Card.Body>
          <h5 className="card-title mb-4">Key Performance Metrics</h5>
          <div className="space-y-3">
            {performanceReport?.keyMetrics && Object.entries(performanceReport.keyMetrics).map(([key, value]) => (
              <div key={key} className="d-flex justify-content-between align-items-center p-3 bg-light rounded">
                <span className="text-muted">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                <span className="fw-bold text-primary fs-5">
                  {typeof value === 'number' && value % 1 !== 0 ? value.toFixed(2) : value}
                  {key.includes('Rate') && '%'}
                </span>
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
    </Col>

    {/* Activity by Rep */}
    
  </Row>
</Tab>
      </Tabs>
    </Container>
  );
};

export default Reports;