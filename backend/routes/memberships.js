/* ---------- backend/routes/memberships.js ---------- */
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const MembershipSchema = new mongoose.Schema({
    customerName: String,
    phone: String,
    combo: String,
    address: String,
    deliveryTime: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    startDate: Date,
    endDate: Date,
    status: {
      type: String,
      enum: ['active', 'delivered'],
      default: 'active'
    }
  });

  const haversineDistance = (pointA, pointB) => {
    const R = 6371; // Earth's radius in km
    const dLat = (pointB.lat - pointA.lat) * Math.PI / 180;
    const dLon = (pointB.lng - pointA.lng) * Math.PI / 180;
    const lat1 = pointA.lat * Math.PI / 180;
    const lat2 = pointB.lat * Math.PI / 180;
  
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

const Membership = mongoose.model('Membership', MembershipSchema);

// Update the GET route to include all statuses
router.get('/', async (req, res) => {
    const data = await Membership.find({}); // Remove the status filter to get all orders
    res.json(data);
  });
// Update the PUT route to validate status
router.put('/:id/status', async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      if (!['active', 'delivered'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status. Must be either "active" or "delivered"' });
      }
      
      const membership = await Membership.findByIdAndUpdate(
        id,
        { status },
        { new: true }
      );
      
      if (!membership) {
        return res.status(404).json({ message: 'Membership not found' });
      }
      
      res.json(membership);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  });

  // ...existing code...
  

router.post('/optimized-route', async (req, res) => {
  try {
    const { hub, selectedIds } = req.body;
    
    // Fetch selected orders
    const memberships = await Membership.find({ 
      _id: { $in: selectedIds },
      status: 'active'
    });

    if (!memberships.length) {
      return res.status(400).json({ message: 'No active orders found' });
    }

    // Calculate optimized route
    const calculateRoute = (start, points) => {
      let route = [];
      let current = start;
      let unvisited = [...points];
      let totalDistance = 0;
      let lastDistance = 0;

      // First, find nearest point from hub
      let firstPoint = unvisited.reduce((min, point) => {
        const distance = haversineDistance(current, point.coordinates);
        return distance < min.distance ? { point, distance } : min;
      }, { point: unvisited[0], distance: Infinity });

      // Add first point with distance from hub
      route.push({
        _id: firstPoint.point._id,
        customerName: firstPoint.point.customerName,
        address: firstPoint.point.address,
        distanceFromLast: Math.round(firstPoint.distance * 10) / 10,
        coordinates: firstPoint.point.coordinates
      });

      totalDistance += firstPoint.distance;
      current = firstPoint.point.coordinates;
      unvisited = unvisited.filter(p => p._id !== firstPoint.point._id);

      // Then find nearest points from last delivery
      while (unvisited.length > 0) {
        let nearest = unvisited.reduce((min, point) => {
          const distance = haversineDistance(current, point.coordinates);
          return distance < min.distance ? { point, distance } : min;
        }, { point: unvisited[0], distance: Infinity });

        route.push({
          _id: nearest.point._id,
          customerName: nearest.point.customerName,
          address: nearest.point.address,
          distanceFromLast: Math.round(nearest.distance * 10) / 10,
          coordinates: nearest.point.coordinates
        });

        totalDistance += nearest.distance;
        current = nearest.point.coordinates;
        unvisited = unvisited.filter(p => p._id !== nearest.point._id);
      }

      return { 
        route, 
        totalDistance: Math.round(totalDistance * 10) / 10,
        hubCoordinates: start 
      };
    };

    const result = calculateRoute(hub, memberships);
    res.json(result);
  } catch (err) {
    console.error('Route optimization error:', err);
    res.status(500).json({ message: 'Error calculating route', error: err.message });
  }
});
  
  

module.exports = router;