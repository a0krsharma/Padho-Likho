const express = require('express');
const { body } = require('express-validator');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

// Import controller (will implement later)
const paymentController = {
  createPayment: (req, res) => {
    res.json({ message: 'Create payment endpoint - to be implemented' });
  },
  getPayments: (req, res) => {
    res.json({ message: 'Get payments endpoint - to be implemented' });
  },
  getPaymentById: (req, res) => {
    res.json({ message: 'Get payment by ID endpoint - to be implemented' });
  },
  processRefund: (req, res) => {
    res.json({ message: 'Process refund endpoint - to be implemented' });
  }
};

// Create a new payment
router.post(
  '/',
  auth,
  [
    body('bookingId').notEmpty().withMessage('Booking ID is required'),
    body('paymentMethod').notEmpty().withMessage('Payment method is required')
  ],
  paymentController.createPayment
);

// Get all payments for a user
router.get('/', auth, paymentController.getPayments);

// Get payment by ID
router.get('/:id', auth, paymentController.getPaymentById);

// Process refund
router.post('/:id/refund', auth, paymentController.processRefund);

module.exports = router;
