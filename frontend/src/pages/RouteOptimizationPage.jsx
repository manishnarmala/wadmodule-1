import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import axios from 'axios';

const RouteOptimizationPage = () => {
  const [hub, setHub] = useState({ lat: 13.0827, lng: 80.2707 }); // Default Chennai coordinates
  const [routes, setRoutes] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [availableOrders, setAvailableOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/memberships');
      setAvailableOrders(res.data.filter(order => order.status === 'active'));
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  };

  const fetchOptimizedRoute = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/memberships/optimized-route', {
        hub,
        selectedIds: selectedOrders
      });
      setRoutes(res.data.route);
      setTotalDistance(res.data.totalDistance);
    } catch (err) {
      console.error('Error optimizing route:', err);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    );
  };

  return (
    <Container className="mt-4">
      <h3>Route Optimization</h3>

      {/* Hub Location */}
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>Hub Location</Card.Title>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Latitude</Form.Label>
                <Form.Control
                  type="number"
                  value={hub.lat}
                  onChange={(e) => setHub({ ...hub, lat: parseFloat(e.target.value) })}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Longitude</Form.Label>
                <Form.Control
                  type="number"
                  value={hub.lng}
                  onChange={(e) => setHub({ ...hub, lng: parseFloat(e.target.value) })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Available Orders */}
      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Select Orders</Card.Title>
              <ListGroup variant="flush">
                {availableOrders.map((order) => (
                  <ListGroup.Item key={order._id}>
                    <Form.Check
                      type="checkbox"
                      label={`${order.customerName} - ${order.address}`}
                      checked={selectedOrders.includes(order._id)}
                      onChange={() => handleSelectOrder(order._id)}
                    />
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        {/* Optimized Route */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>
                Optimized Route
                {totalDistance > 0 && (
                  <Badge bg="info" className="ms-2">
                    Total: {totalDistance} km
                  </Badge>
                )}
              </Card.Title>
              
              <Button 
                variant="primary" 
                className="mb-3"
                onClick={fetchOptimizedRoute}
                disabled={selectedOrders.length === 0}
              >
                Calculate Route
              </Button>

            <ListGroup variant="flush">
            {routes.map((r, i) => (
                <ListGroup.Item key={i}>
                <strong>Stop {i + 1}:</strong> {r.customerName}
                <br />
                <small className="text-muted">
                    {r.address} ({r.distanceFromLast} km {i === 0 ? 'from hub' : 'from previous stop'})
                </small>
                </ListGroup.Item>
            ))}
            </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RouteOptimizationPage;