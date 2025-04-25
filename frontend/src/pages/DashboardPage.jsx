<<<<<<< HEAD
// frontend/src/pages/DashboardPage.jsx
=======
>>>>>>> 3f865c6 (Add project to wadmodule-1 repository)
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Container } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const comboPrices = {
  "Tropical Mix": 300,
  "Berry Blast": 250,
  "Citrus Combo": 200,
  "Healthy Banana": 180,
  "Grape Deluxe": 220
};

const DashboardPage = () => {
  const [memberships, setMemberships] = useState([]);
  const [revenue, setRevenue] = useState(0);
  const [ordersByTime, setOrdersByTime] = useState({
    morning: 0,
    afternoon: 0,
    evening: 0
  });
  const [todayDeliveries, setTodayDeliveries] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/api/memberships")
      .then((res) => {
        const data = res.data;
        setMemberships(data);

        let totalRevenue = 0;
        const orders = { morning: 0, afternoon: 0, evening: 0 };
        let todayDeliveryCount = 0;

<<<<<<< HEAD
        // Count delivered orders and calculate revenue
=======
>>>>>>> 3f865c6 (Add project to wadmodule-1 repository)
        data.forEach((m) => {
          if (m.status === "delivered") {
            todayDeliveryCount++;
            totalRevenue += comboPrices[m.combo] || 0;
          }
<<<<<<< HEAD
          // Count active orders by time slot
=======
          
>>>>>>> 3f865c6 (Add project to wadmodule-1 repository)
          if (m.status === "active") {
            if (m.deliveryTime === 'morning') orders.morning++;
            if (m.deliveryTime === 'afternoon') orders.afternoon++;
            if (m.deliveryTime === 'evening') orders.evening++;
          }
        });

        setRevenue(totalRevenue);
        setOrdersByTime(orders);
        setTodayDeliveries(todayDeliveryCount);
      });
  }, []);

<<<<<<< HEAD
  // Prepare data for the charts
=======
>>>>>>> 3f865c6 (Add project to wadmodule-1 repository)
  const orderData = [
    { time: 'Morning', orders: ordersByTime.morning },
    { time: 'Afternoon', orders: ordersByTime.afternoon },
    { time: 'Evening', orders: ordersByTime.evening },
  ];

  const totalActive = memberships.filter(m => m.status === "active").length;
  const morningCount = memberships.filter(m => m.deliveryTime === "morning" && m.status === "active").length;
  const afternoonCount = memberships.filter(m => m.deliveryTime === "afternoon" && m.status === "active").length;
  const eveningCount = memberships.filter(m => m.deliveryTime === "evening" && m.status === "active").length;

  return (
    <Container className="mt-4">
      <h3>Dashboard</h3>

<<<<<<< HEAD
      {/* Summary Cards */}
=======
>>>>>>> 3f865c6 (Add project to wadmodule-1 repository)
      <Row className="mt-3">
        <Col md={3}>
          <Card bg="success" text="white">
            <Card.Body>
              <Card.Title>Total Active</Card.Title>
              <Card.Text>{totalActive}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="warning" text="white">
            <Card.Body>
              <Card.Title>Morning</Card.Title>
              <Card.Text>{morningCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="info" text="white">
            <Card.Body>
              <Card.Title>Afternoon</Card.Title>
              <Card.Text>{afternoonCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card bg="dark" text="white">
            <Card.Body>
              <Card.Title>Evening</Card.Title>
              <Card.Text>{eveningCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Today's Deliveries */}
      <Row className="mt-4">
        <Col md={4}>
          <Card bg="primary" text="white">
            <Card.Body>
              <Card.Title>Today's Deliveries</Card.Title>
              <Card.Text>{todayDeliveries}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Chart for Remaining Orders */}
      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Remaining Orders (Today)</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={orderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="orders" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>

        {/* Revenue Generated Chart */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title>Revenue Generated (Today)</Card.Title>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={[{ name: "Revenue", value: revenue }]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
