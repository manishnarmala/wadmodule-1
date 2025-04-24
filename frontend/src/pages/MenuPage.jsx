import React from 'react';
import { Container, Table, Card } from 'react-bootstrap';

const comboPrices = {
  "Tropical Mix": 300,
  "Berry Blast": 250,
  "Citrus Combo": 200,
  "Healthy Banana": 180,
  "Grape Deluxe": 220
};

const MenuPage = () => {
  return (
    <Container className="mt-4">
      <h3 className="mb-4">Menu & Pricing</h3>
      <Card>
        <Card.Body>
          <Table striped hover>
            <thead>
              <tr>
                <th>Combo Name</th>
                <th>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(comboPrices).map(([combo, price]) => (
                <tr key={combo}>
                  <td>{combo}</td>
                  <td>₹{price}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default MenuPage;