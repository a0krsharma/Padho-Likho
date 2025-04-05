const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Booking',
    required: true
  },
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  paidBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  paymentMethod: {
    type: String,
    enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'wallet'],
    required: true
  },
  transactionId: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'pending'
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  refundAmount: {
    type: Number
  },
  refundDate: Date,
  refundReason: String,
  invoiceUrl: String,
  receiptNumber: String,
  taxAmount: Number,
  discountAmount: Number,
  walletDeduction: Number,
  referralDiscount: Number,
  paymentDetails: {
    cardLast4: String,
    cardBrand: String,
    upiId: String,
    bankName: String
  }
}, {
  timestamps: true
});

// Indexes for faster queries
paymentSchema.index({ booking: 1 });
paymentSchema.index({ student: 1 });
paymentSchema.index({ teacher: 1 });
paymentSchema.index({ status: 1 });

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
