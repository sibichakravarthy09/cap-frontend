import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { Search, } from 'lucide-react';

const FilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  filters, 
  onFilterChange, 
  onClearFilters 
}) => {
  return (
    <div className="filter-bar bg-light p-3 rounded mb-3">
      <Row className="g-3 align-items-end">
        <Col md={4}>
          <Form.Group>
            <Form.Label className="small fw-semibold text-muted">Search</Form.Label>
            <div className="input-group">
              <span className="input-group-text bg-white">
                <Search size={16} />
              </span>
              <Form.Control
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          </Form.Group>
        </Col>
        
        {filters && filters.map((filter, index) => (
          <Col md={filter.size || 3} key={index}>
            <Form.Group>
              <Form.Label className="small fw-semibold text-muted">
                {filter.label}
              </Form.Label>
              <Form.Select
                value={filter.value}
                onChange={(e) => onFilterChange(filter.name, e.target.value)}
              >
                <option value="">All</option>
                {filter.options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        ))}
        
        <Col md="auto">
          <Button 
            variant="outline-secondary" 
            onClick={onClearFilters}
            className="d-flex align-items-center"
          >
            <X size={16} className="me-1" />
            Clear
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default FilterBar;