import React, { useEffect, useState } from "react";
import { Card, Form, InputGroup, Row, Col, Container, Badge, Dropdown, Tab, Tabs } from "react-bootstrap";
import axios from "axios";
import './OrdersPage.css';

const OrdersPage = () => {
  const [memberships, setMemberships] = useState([]);
  const [search, setSearch] = useState("");
  const [filterTime, setFilterTime] = useState("");
  const [key, setKey] = useState("active");

  useEffect(() => {
    axios.get("http://localhost:5000/api/memberships").then(res => {
      setMemberships(res.data);
    });
  }, []);

  const filtered = memberships.filter((m) =>
    m.customerName.toLowerCase().includes(search.toLowerCase()) &&
    (filterTime === "" || m.deliveryTime === filterTime)
  );

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/memberships/${id}/status`, {
        status: newStatus
      });
      const res = await axios.get("http://localhost:5000/api/memberships");
      setMemberships(res.data);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const getStatusBadgeColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'active': return 'primary';
      case 'delivered': return 'success';
      default: return 'secondary';
    }
  };

  return (
    <Container className="mt-4">
      <h3 className="page-title mb-4">Orders</h3>
      <InputGroup className="mb-4">
        <Form.Control
          placeholder="Search by customer name"
          onChange={(e) => setSearch(e.target.value)}
        />
        <Form.Select onChange={(e) => setFilterTime(e.target.value)}>
          <option value="">All Times</option>
          <option value="morning">Morning</option>
          <option value="afternoon">Afternoon</option>
          <option value="evening">Evening</option>
        </Form.Select>
      </InputGroup>

      <Tabs activeKey={key} onSelect={(k) => setKey(k)} className="mb-3">
        <Tab eventKey="active" title="Active Orders">
          <Row xs={1} md={2} lg={3} className="g-4">
            {filtered
              .filter((m) => m.status !== "delivered")
              .map((m, idx) => (
                <Col key={idx}>
                  <Card className="membership-card h-100 shadow">
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                        <span>{m.customerName}</span>
                        <Badge bg="primary" className="delivery-badge">{m.deliveryTime}</Badge>
                      </Card.Title>
                      <Card.Text>
                        <div className="info-row">
                          <i className="fas fa-box me-2"></i>
                          <span>{m.combo}</span>
                        </div>
                        <div className="info-row">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          <span>{m.address}</span>
                        </div>
                        <div className="info-row mt-3">
    <Badge bg={getStatusBadgeColor(m.status)} className="status-badge me-2">
      {m.status || 'N/A'}
    </Badge>
    <Dropdown className="d-inline">
      <Dropdown.Toggle variant="outline-secondary" size="sm">
        Update Status
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => updateStatus(m._id, 'active')}>Active</Dropdown.Item>
        <Dropdown.Item onClick={() => updateStatus(m._id, 'delivered')}>Delivered</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Tab>
        <Tab eventKey="delivered" title="Delivered Orders">
          <Row xs={1} md={2} lg={3} className="g-4">
            {filtered
              .filter((m) => m.status === "delivered")
              .map((m, idx) => (
                <Col key={idx}>
                  <Card className="membership-card h-100 shadow">
                    <Card.Body>
                      <Card.Title className="d-flex justify-content-between align-items-center mb-3">
                        <span>{m.customerName}</span>
                        <Badge bg="primary" className="delivery-badge">{m.deliveryTime}</Badge>
                      </Card.Title>
                      <Card.Text>
                        <div className="info-row">
                          <i className="fas fa-box me-2"></i>
                          <span>{m.combo}</span>
                        </div>
                        <div className="info-row">
                          <i className="fas fa-map-marker-alt me-2"></i>
                          <span>{m.address}</span>
                        </div>
                        <div className="info-row mt-3">
                          <Badge bg={getStatusBadgeColor(m.status)} className="status-badge me-2">
                            {m.status || 'N/A'}
                          </Badge>
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
          </Row>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default OrdersPage;