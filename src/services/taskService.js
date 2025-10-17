import api from './api';

const taskService = {
  // Get all tasks
  getTasks: async (params = {}) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },

  // Get single task
  getTask: async (id) => {
    const response = await api.get(`/tasks/${id}`);
    return response.data;
  },

  // Create task
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },

  // Update task
  updateTask: async (id, taskData) => {
    const response = await api.put(`/tasks/${id}`, taskData);
    return response.data;
  },

  // Delete task
  deleteTask: async (id) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
  },

  // Get overdue tasks
  getOverdueTasks: async () => {
    const response = await api.get('/tasks/overdue');
    return response.data;
  },

  // Get today's tasks
  getTodayTasks: async () => {
    const response = await api.get('/tasks/today');
    return response.data;
  }
};

export default taskService;