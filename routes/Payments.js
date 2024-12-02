// const express = require('express');
// const router = express.Router();
// const Payment = require('../models/Payment');

// // Get all payments
// router.get('/', async (req, res) => {
//   try {
//     const payments = await Payment.find();
//     res.json(payments);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// // Add new payment
// router.post('/', async (req, res) => {
//   const { user, amount, status, paymentMethod, date } = req.body;
  
//   const payment = new Payment({
//     user,
//     amount,
//     status,
//     paymentMethod,
//     date,
//   });

//   try {
//     const newPayment = await payment.save();
//     res.status(201).json(newPayment);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Edit payment details
// router.patch('/:id', async (req, res) => {
//   try {
//     const payment = await Payment.findById(req.params.id);
//     if (!payment) return res.status(404).json({ message: 'Payment not found' });

//     if (req.body.amount != null) payment.amount = req.body.amount;
//     if (req.body.status != null) payment.status = req.body.status;
//     if (req.body.paymentMethod != null) payment.paymentMethod = req.body.paymentMethod;

//     const updatedPayment = await payment.save();
//     res.json(updatedPayment);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Delete payment
// router.delete('/:id', async (req, res) => {
//   try {
//     const payment = await Payment.findByIdAndDelete(req.params.id);
//     if (!payment) return res.status(404).json({ message: 'Payment not found' });
    
//     res.json({ message: 'Payment deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

// module.exports = router;

// import express from 'express';
// import paymentController from '../controllers/paymentController.j';  // Path relative to the 'routes' folder

// const router = express.Router();


import express from 'express';
import { createPaymentIntent, savePayment, getAllPayments} from '../controllers/paymentController.js';

const router = express.Router();

// Route to create a payment intent
router.post('/create-payment-intent', createPaymentIntent);

// Route to save payment details
router.post('/save-payment', savePayment);

// Route to fetch all payments
router.get('/get-all-payments', getAllPayments);

export default router;

