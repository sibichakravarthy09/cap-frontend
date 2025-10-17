import React, { useState, useEffect } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Plus, DollarSign } from 'lucide-react';
import {
  DealTable,
  DealForm,
  Modal,
  LoadingSpinner,
  Pagination,
  FilterBar,
  ConfirmDialog,
  EmptyState
} from '../components';
import dealService from '../services/dealService';
import customerService from '../services/customerService';
import { toast } from 'react-toastify';

const Deals = () => {
  const [deals, setDeals] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [deleteDeal, setDeleteDeal] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    stage: ''
  });

  useEffect(() => {
    fetchDeals();
    fetchCustomers();
  }, [pagination.page, searchTerm, filters]);

  const fetchDeals = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        stage: filters.stage
      };
      const response = await dealService.getDeals(params);
      setDeals(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to load deals');
      console.error('Error fetching deals:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomers = async () => {
    try {
      const response = await customerService.getCustomers({ limit: 100 });
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleCreate = () => {
    setSelectedDeal(null);
    setShowModal(true);
  };

  const handleEdit = (deal) => {
    setSelectedDeal(deal);
    setShowModal(true);
  };

  const handleView = (deal) => {
    setSelectedDeal(deal);
    toast.info(`Viewing deal: ${deal.title}`);
  };

  const handleDelete = (deal) => {
    setDeleteDeal(deal);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await dealService.deleteDeal(deleteDeal._id);
      toast.success('Deal deleted successfully');
      setShowConfirm(false);
      setDeleteDeal(null);
      fetchDeals();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete deal');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedDeal) {
        await dealService.updateDeal(selectedDeal._id, formData);
        toast.success('Deal updated successfully');
      } else {
        await dealService.createDeal(formData);
        toast.success('Deal created successfully');
      }
      setShowModal(false);
      fetchDeals();
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
    setFilters({ stage: '' });
    setPagination({ ...pagination, page: 1 });
  };

  const filterOptions = [
    {
      name: 'stage',
      label: 'Stage',
      value: filters.stage,
      options: [
        { value: 'Prospecting', label: 'Prospecting' },
        { value: 'Qualification', label: 'Qualification' },
        { value: 'Proposal', label: 'Proposal' },
        { value: 'Negotiation', label: 'Negotiation' },
        { value: 'Closed Won', label: 'Closed Won' },
        { value: 'Closed Lost', label: 'Closed Lost' }
      ]
    }
  ];

  return (
    <Container fluid>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-1">Deals</h2>
          <p className="text-muted mb-0">Manage your sales pipeline</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <Plus size={18} className="me-2" />
          Add Deal
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
          ) : deals.length === 0 ? (
            <EmptyState
              icon={DollarSign}
              title="No Deals Found"
              description="Create deals to track your sales opportunities"
              actionLabel="Add Deal"
              onAction={handleCreate}
            />
          ) : (
            <>
              <DealTable
                deals={deals}
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

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        title={selectedDeal ? 'Edit Deal' : 'Add New Deal'}
        size="lg"
      >
        <DealForm
          deal={selectedDeal}
          customers={customers}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <ConfirmDialog
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Deal"
        message={`Are you sure you want to delete ${deleteDeal?.title}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />
    </Container>
  );
};

export default Deals;