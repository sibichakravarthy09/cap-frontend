import React, { useState, useEffect } from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Plus, Target } from 'lucide-react';
import {
  LeadTable,
  LeadForm,
  Modal,
  LoadingSpinner,
  Pagination,
  FilterBar,
  ConfirmDialog,
  EmptyState
} from '../components';
import leadService from '../services/leadService';
import { toast } from 'react-toastify';

const Leads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showConvertConfirm, setShowConvertConfirm] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [deleteLead, setDeleteLead] = useState(null);
  const [convertLead, setConvertLead] = useState(null);
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
    fetchLeads();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination.page, searchTerm, filters]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.page,
        limit: pagination.limit,
        search: searchTerm,
        stage: filters.stage
      };
      const response = await leadService.getLeads(params);
      setLeads(response.data);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to load leads');
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setSelectedLead(null);
    setShowModal(true);
  };

  const handleEdit = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const handleView = (lead) => {
    setSelectedLead(lead);
    toast.info(`Viewing lead: ${lead.name}`);
  };

  const handleDelete = (lead) => {
    setDeleteLead(lead);
    setShowConfirm(true);
  };

  const handleConvert = (lead) => {
    setConvertLead(lead);
    setShowConvertConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await leadService.deleteLead(deleteLead._id);
      toast.success('Lead deleted successfully');
      setShowConfirm(false);
      setDeleteLead(null);
      fetchLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete lead');
    }
  };

  const confirmConvert = async () => {
    try {
      await leadService.convertLead(convertLead._id);
      toast.success('Lead converted to customer successfully');
      setShowConvertConfirm(false);
      setConvertLead(null);
      fetchLeads();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to convert lead');
    }
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedLead) {
        await leadService.updateLead(selectedLead._id, formData);
        toast.success('Lead updated successfully');
      } else {
        await leadService.createLead(formData);
        toast.success('Lead created successfully');
      }
      setShowModal(false);
      fetchLeads();
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
        { value: 'New', label: 'New' },
        { value: 'Contacted', label: 'Contacted' },
        { value: 'Qualified', label: 'Qualified' },
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
          <h2 className="mb-1">Leads</h2>
          <p className="text-muted mb-0">Track and manage your sales leads</p>
        </div>
        <Button variant="primary" onClick={handleCreate}>
          <Plus size={18} className="me-2" />
          Add Lead
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
          ) : leads.length === 0 ? (
            <EmptyState
              icon={Target}
              title="No Leads Found"
              description="Start tracking leads to grow your business"
              actionLabel="Add Lead"
              onAction={handleCreate}
            />
          ) : (
            <>
              <LeadTable
                leads={leads}
                onView={handleView}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onConvert={handleConvert}
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
        title={selectedLead ? 'Edit Lead' : 'Add New Lead'}
        size="lg"
      >
        <LeadForm
          lead={selectedLead}
          onSubmit={handleSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>

      <ConfirmDialog
        show={showConfirm}
        onHide={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
        title="Delete Lead"
        message={`Are you sure you want to delete ${deleteLead?.name}? This action cannot be undone.`}
        confirmText="Delete"
        variant="danger"
      />

      <ConfirmDialog
        show={showConvertConfirm}
        onHide={() => setShowConvertConfirm(false)}
        onConfirm={confirmConvert}
        title="Convert Lead"
        message={`Convert ${convertLead?.name} to a customer?`}
        confirmText="Convert"
        variant="success"
      />
    </Container>
  );
};

export default Leads;