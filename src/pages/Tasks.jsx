import React, { useState, useEffect, useCallback } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Plus, CheckSquare } from 'lucide-react';
import {
  TaskTable,
  TaskForm,
  Modal,
  LoadingSpinner,
  Pagination,
  FilterBar,
  ConfirmDialog,
  EmptyState
} from '../components';
import taskService from '../services/taskService';
import customerService from '../services/customerService';
import leadService from '../services/leadService';
import dealService from '../services/dealService';
import { toast } from 'react-toastify';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [leads, setLeads] = useState([]);
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [deleteTask, setDeleteTask] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: '',
    priority: ''
  });

  const fetchTasks = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        status: filters.status,
        priority: filters.priority
      };
      const response = await taskService.getTasks(params);
      setTasks(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to load tasks');
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [pagination.page, pagination.limit, filters.status, filters.priority]);

  const fetchRelatedData = useCallback(async () => {
    try {
      const [customersRes, leadsRes, dealsRes] = await Promise.all([
        customerService.getCustomers({ limit: 100 }),
        leadService.getLeads({ limit: 100 }),
        dealService.getDeals({ limit: 100 })
      ]);
      setCustomers(customersRes.data);
      setLeads(leadsRes.data);
      setDeals(dealsRes.data);
    } catch (error) {
      console.error('Error fetching related data:', error);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  useEffect(() => {
    fetchRelatedData();
  }, [fetchRelatedData]);

  const handleCreate = () => {
    setSelectedTask(null);
    setShowModal(true);
  };

  const handleEdit = (task) => {
    setSelectedTask(task);
    setShowModal(true);
  };

  const handleView = (task) => {
    setSelectedTask(task);
    toast.info(`Viewing task: ${task.title}`);
  };

  const handleDelete = (task) => {
    setDeleteTask(task);
    setShowConfirm(true);
  };

  const handleComplete = async (task) => {
    try {
      await taskService.updateTask(task._id, { status: 'Completed' });
      toast.success('Task marked as completed');
      fetchTasks();
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const confirmDelete = async () => {
    try {
      await taskService.deleteTask(deleteTask._id);
      toast.success('Task deleted successfully');
      setShowConfirm(false);
      setDeleteTask(null);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete task');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedTask) {
        await taskService.updateTask(selectedTask._id, formData);
        toast.success('Task updated successfully');
      } else {
        await taskService.createTask(formData);
        toast.success('Task created successfully');
      }
      setShowModal(false);
      fetchTasks();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    }
  };

  const handlePageChange = (page) => {
    setPagination({ ...pagination, page });
  };

  const handleFilterChange = (name, value) => {
    setFilters({ ...filters, [name]: value });
    setPagination({ ...pagination, page: 1 });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setFilters({ status: '', priority: '' });
    setPagination({ ...pagination, page: 1 });
  };

  const filterOptions = [
    {
      name: 'status',
      label: 'Status',
      value: filters.status,
      size: 3,
      options: [
        { value: 'Pending', label: 'Pending' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Completed', label: 'Completed' },
        { value: 'Cancelled', label: 'Cancelled' }
      ]
    },
    {
      name: 'priority',
      label: 'Priority',
      value: filters.priority,
      size: 3,
      options: [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' },
        { value: 'Urgent', label: 'Urgent' }
      ]
    }
  ];

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Tasks</h2>
          <p className="text-muted mb-0">Manage your activities and to-dos</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <Plus size={18} className="me-2" />
          Add Task
        </Button>
      </div>

      <Card className="border-0 shadow-sm">
        <Card.Body>
          <FilterBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filterOptions}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
          />

          {loading ? (
            <LoadingSpinner />
          ) : tasks.length === 0 ? (
            <EmptyState
              icon={CheckSquare}
              title="No Tasks Found"
              description="Create tasks to organize your work"
              actionLabel="Add Task"
              onAction={handleCreate}
            />
          ) : (
            <>
              <TaskTable
                tasks={tasks}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onComplete={handleComplete}
              />
              <Pagination
                currentPage={pagination.page}
                totalPages={pagination.pages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </Card.Body>
      </Card>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={selectedTask ? 'Edit Task' : 'Add New Task'}
        size="lg"
      >
        <TaskForm
          task={selectedTask}
          customers={customers}
          leads={leads}
          deals={deals}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <ConfirmDialog
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Task"
        message={`Are you sure you want to delete ${deleteTask?.title}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </Container>
  );
};

export default Tasks;
