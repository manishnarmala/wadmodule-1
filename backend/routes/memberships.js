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

module.exports = router;