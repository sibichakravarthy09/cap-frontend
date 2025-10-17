import api from './api';

const dealService = {
  // Get all deals
  getDeals: async (params = {}) => {
    const response = await api.get('/deals', { params });
    return response.data;
  },

  // Get single deal
  getDeal: async (id) => {
    const response = await api.get(`/deals/${id}`);
    return response.data;
  },

  // Create deal
  createDeal: async (dealData) => {
    const response = await api.post('/deals', dealData);
    return response.data;
  },

  // Update deal
  updateDeal: async (id, dealData) => {
    const response = await api.put(`/deals/${id}`, dealData);
    return response.data;
  },

  // Delete deal
  deleteDeal: async (id) => {
    const response = await api.delete(`/deals/${id}`);
    return response.data;
  },

  // Get deal statistics
  getDealStats: async () => {
    const response = await api.get('/deals/stats');
    return response.data;
  }
};

export default dealService;