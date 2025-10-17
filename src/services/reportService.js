import api from './api';

const reportService = {
  // Get dashboard statistics
  getDashboardStats: async () => {
    const response = await api.get('/reports/dashboard');
    return response.data;
  },

  // Get sales report
  getSalesReport: async (params = {}) => {
    const response = await api.get('/reports/sales', { params });
    return response.data;
  },

  // Get customer report
  getCustomerReport: async () => {
    const response = await api.get('/reports/customers');
    return response.data;
  },

  // Get activity report
  getActivityReport: async (params = {}) => {
    const response = await api.get('/reports/activities', { params });
    return response.data;
  },

  // Get performance report
  getPerformanceReport: async () => {
    const response = await api.get('/reports/performance');
    return response.data;
  }
};

export default reportService;