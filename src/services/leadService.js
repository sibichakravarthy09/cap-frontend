import api from './api';

const leadService = {
  // Get all leads
  getLeads: async (params = {}) => {
    const response = await api.get('/leads', { params });
    return response.data;
  },

  // Get single lead
  getLead: async (id) => {
    const response = await api.get(`/leads/${id}`);
    return response.data;
  },

  // Create lead
  createLead: async (leadData) => {
    const response = await api.post('/leads', leadData);
    return response.data;
  },

  // Update lead
  updateLead: async (id, leadData) => {
    const response = await api.put(`/leads/${id}`, leadData);
    return response.data;
  },

  // Convert lead to customer
  convertLead: async (id) => {
    const response = await api.post(`/leads/${id}/convert`);
    return response.data;
  },

  // Delete lead
  deleteLead: async (id) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
  },

  // Get lead statistics
  getLeadStats: async () => {
    const response = await api.get('/leads/stats');
    return response.data;
  }
};

export default leadService;