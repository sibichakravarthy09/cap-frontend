import React, { useState, useEffect } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Plus, Users } from 'lucide-react';
import {
  CustomerTable,
  CustomerForm,
  Modal,
  LoadingSpinner,
  Pagination,
  FilterBar,
  ConfirmDialog,
  EmptyState
} from '../components';
import customerService from '../services/customerService';
import { toast } from 'react-toastify';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [deleteCustomer, setDeleteCustomer] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: ''
  });

  useEffect(() => {
    fetchCustomers();
  }, [pagination.page, searchTerm, filters]);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        status: filters.status
      };
      const response = await customerService.getCustomers(params);
      setCustomers(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to load customers');
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedCustomer(null);
    setShowModal(true);
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleView = (customer) => {
    setSelectedCustomer(customer);
    // Navigate to customer detail page or show detail modal
    toast.info(`Viewing customer: ${customer.name}`);
  };

  const handleDelete = (customer) => {
    setDeleteCustomer(customer);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await customerService.deleteCustomer(deleteCustomer._id);
      toast.success('Customer deleted successfully');
      setShowConfirm(false);
      setDeleteCustomer(null);
      fetchCustomers();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete customer');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedCustomer) {
        await customerService.updateCustomer(selectedCustomer._id, formData);
        toast.success('Customer updated successfully');
      } else {
        await customerService.createCustomer(formData);
        toast.success('Customer created successfully');
      }
      setShowModal(false);
      fetchCustomers();
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
    setFilters({ status: '' });
    setPagination({ ...pagination, page: 1 });
  };

  const filterOptions = [
    {
      name: 'status',
      label: 'Status',
      value: filters.status,
      options: [
        { value: 'Active', label: 'Active' },
        { value: 'Inactive', label: 'Inactive' },
        { value: 'Lead', label: 'Lead' },
        { value: 'Prospect', label: 'Prospect' }
      ]
    }
  ];

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Customers</h2>
          <p className="text-muted mb-0">Manage your customer relationships</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <Plus size={18} className="me-2" />
          Add Customer
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
          ) : customers.length === 0 ? (
            <EmptyState
              icon={Users}
              title="No Customers Found"
              description="Get started by adding your first customer"
              actionLabel="Add Customer"
              onAction={handleCreate}
            />
          ) : (
            <>
              <CustomerTable
                customers={customers}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
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

      {/* Customer Form Modal */}
      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
        size="lg"
      >
        <CustomerForm
          customer={selectedCustomer}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Customer"
        message={`Are you sure you want to delete ${deleteCustomer?.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </Container>
  );
};

export default Customers;