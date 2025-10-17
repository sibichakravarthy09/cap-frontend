import api from './api';

const customerService = {
  // Get all customers
  getCustomers: async (params = {}) => {
    const response = await api.get('/customers', { params });
    return response.data;
  },

  // Get single customer
  getCustomer: async (id) => {
    const response = await api.get(`/customers/${id}`);
    return response.data;
  },

  // Create customer
  createCustomer: async (customerData) => {
    const response = await api.post('/customers', customerData);
    return response.data;
  },

  // Update customer
  updateCustomer: async (id, customerData) => {
    const response = await api.put(`/customers/${id}`, customerData);
    return response.data;
  },

  // Delete customer
  deleteCustomer: async (id) => {
    const response = await api.delete(`/customers/${id}`);
    return response.data;
  },

  // Get customer statistics
  getCustomerStats: async () => {
    const response = await api.get('/customers/stats');
    return response.data;
  }
};

export default customerService;