// // // import Payment from '../models/Payment.js';

// // // // Get all payments
// // // export const getPayments = async (req, res) => {
// // //   try {
// // //     const payments = await Payment.find();
// // //     res.json(payments);
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server Error' });
// // //   }
// // // };

// // // // Create a new payment
// // // export const createPayment = async (req, res) => {
// // //   const { userId, amount, status } = req.body;

// // //   try {
// // //     const newPayment = new Payment({ userId, amount, status });
// // //     await newPayment.save();
// // //     res.status(201).json(newPayment);
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server Error' });
// // //   }
// // // };

// // // // Update a payment
// // // export const updatePayment = async (req, res) => {
// // //   try {
// // //     const payment = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
// // //     if (!payment) return res.status(404).json({ message: 'Payment not found' });
// // //     res.json(payment);
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server Error' });
// // //   }
// // // };

// // // // Delete a payment
// // // export const deletePayment = async (req, res) => {
// // //   try {
// // //     const payment = await Payment.findByIdAndDelete(req.params.id);
// // //     if (!payment) return res.status(404).json({ message: 'Payment not found' });
// // //     res.json({ message: 'Payment removed' });
// // //   } catch (err) {
// // //     res.status(500).json({ message: 'Server Error' });
// // //   }
// // // };


// // import Stripe from 'stripe';
// // import Payment from '../models/Payment'// Initialize Stripe with your secret key
// // const stripe = new Stripe('sk_test_51QBrrwHbve0bLiRTWUuz7F8nGK4yn8JpqQXRhH3rWwsvIbQ0rqvAahKJtBOcgosQYdQKjQJ1KAlrJc6NNCSoBFfH004JQOEquw');
// // const plans = {
// //   monthly: {
// //     amount: 2999, // $29.99 in cents
// //     currency: 'usd',
// //   },
// //   yearly: {
// //     amount: 29999, // $299.99 in cents
// //     currency: 'usd',
// //   },
// // };
// // // Create a PaymentIntent for the selected plan
// // const createPaymentIntent = async (req, res) => {
// //   const { plan } = req.body;
// //   const userId = req.user._id.toString();
// //   try {
// //     // Ensure the plan is valid
// //     if (!plans[plan]) {
// //       return res.status(400).send({ error: 'Invalid plan selected' });
// //     }
// //     const paymentIntent = await stripe.paymentIntents.create({
// //       amount: plans[plan].amount,
// //       currency: plans[plan].currency,
// //       metadata: { userId, plan }, // Attach user and plan info to metadata
// //     });
// //     res.send({
// //       clientSecret: paymentIntent.client_secret,
// //     });
// //   } catch (error) {
// //     console.error('Error creating payment intent:', error);
// //     res.status(500).send({ error: 'Failed to create payment intent' });
// //   }
// // };
// // const handlePaymentSuccess = async (req, res) => {
// //   const { paymentIntentId } = req.body;
// //   try {
// //       if (!paymentIntentId || !paymentIntentId.startsWith('pi_')) {
// //           return res.status(400).send({ error: 'Invalid PaymentIntent ID provided' });
// //       }
// //       const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
// //       // Log the status for debugging
// //       console.log('Payment Intent Status:', paymentIntent.status);
// //       // Handle different payment intent statuses
// //       if (paymentIntent.status === 'requires_payment_method') {
// //           return res.status(400).send({
// //               error: `Payment not successful. Current status: ${paymentIntent.status}. Please provide a valid payment method.`
// //           });
// //       } else if (paymentIntent.status !== 'succeeded') {
// //           return res.status(400).send({ error: `Payment not successful. Current status: ${paymentIntent.status}` });
// //       }
// //       const { userId, plan } = paymentIntent.metadata;
// //       const payment = new Payment({
// //           userId,
// //           plan,
// //           amount: paymentIntent.amount,
// //           currency: paymentIntent.currency,
// //           paymentIntentId,
// //           status: paymentIntent.status,
// //       });
// //       await payment.save();
// //       return res.status(200).send({ message: 'Payment recorded successfully', payment });
// //   } catch (error) {
// //       console.error('Error handling payment success:', error);
// //       return res.status(500).send({ error: 'Failed to record payment', details: error.message });
// //   }
// // };
// // // Get subscription status for a user by userId
// // const getSubscriptionStatus = async (req, res) => {
// //   const { userId } = req.params;
// //   try {
// //     // Find the most recent payment for the user
// //     const latestPayment = await Payment.findOne({ userId }).sort({ createdAt: -1 });
// //     if (!latestPayment) {
// //       return res.status(404).send({ error: 'No subscription found' });
// //     }
// //     const subscriptionStatus = {
// //       plan: latestPayment.plan,
// //       status: latestPayment.status,
// //       expiresAt: latestPayment.expiresAt,
// //     };
// //     res.status(200).send(subscriptionStatus);
// //   } catch (error) {
// //     console.error('Error getting subscription status:', error);
// //     res.status(500).send({ error: 'Failed to get subscription status' });
// //   }
// // };
// // const getAllPayments = async (req, res) => {
// //   try {
// //     // Fetch all payments and populate the user details
// //     const payments = await Payment.find()
// //       .sort({ createdAt: -1 })
// //       .populate('userId', 'username');
// //     if (!payments.length) {
// //       return res.status(404).send({ error: 'No payments found' });
// //     }
// //     res.status(200).send(payments);
// //   } catch (error) {
// //     console.error('Error getting all payments with user details:', error);
// //     res.status(500).send({ error: 'Failed to get payments' });
// //   }
// // };
// // // Export all functions as default object
// // export default {
// //   createPaymentIntent,
// //   handlePaymentSuccess,
// //   getSubscriptionStatus,
// //   getAllPayments
// // };

// import Payment from '../models/Payment.js';
// // import paymentService from '/home/uki/Downloads/event aaa/event aa/event/Backend/services/paymentService.js';
// import paymentService from '../services/paymentService.js';



// // Handle the payment submission and save data to the database
// export const savePayment = async (req, res) => {
//   try {
//     const { amount, paymentIntentId, paymentStatus, userId } = req.body;

//     // Save payment to the database
//     const newPayment = new Payment({
//       amount,
//       paymentIntentId,
//       paymentStatus,
//       userId,
//     });

//     await newPayment.save();

//     res.status(201).json({
//       message: 'Payment saved successfully.',
//       payment: newPayment,
//     });
//   } catch (error) {
//     console.error('Error saving payment:', error);
//     res.status(500).json({ message: 'Error saving payment', error: error.message });
//   }
// };


// import Payment from '../models/Payment.js';
// import paymentService from '../services/paymentService.js';

// // Handle the payment submission, process payment with Stripe, and save data to the database
// export const savePayment = async (req, res) => {
//   try {
//     const { amount, paymentIntentId, paymentStatus, userId, clientSecret, cardElement } = req.body;

//     // Process payment with Stripe
//     const paymentIntent = await paymentService.processPayment(clientSecret, cardElement);

//     if (paymentIntent.status === 'succeeded') {
//       // Save payment to the database
//       const newPayment = new Payment({
//         amount,
//         paymentIntentId: paymentIntent.id,
//         paymentStatus: paymentIntent.status,
//         userId,
//       });

//       await newPayment.save();

//       res.status(201).json({
//         message: 'Payment processed and saved successfully.',
//         payment: newPayment,
//       });
//     } else {
//       res.status(400).json({
//         message: 'Payment failed.',
//         error: 'Payment not successful',
//       });
//     }
//   } catch (error) {
//     console.error('Error processing or saving payment:', error);
//     res.status(500).json({ message: 'Error processing payment', error: error.message });
//   }
// };


import Stripe from 'stripe';
import Payment from '../models/Payment.js';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create a payment intent
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    // Convert amount to cents for Stripe
    const amountInCents = amount * 100;

    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents, // Amount in cents
      currency: 'usd',
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Error creating payment intent: ' + error.message });
  }
};

// Save payment details after successful payment
export const savePayment = async (req, res) => {
  try {
    const { amount, paymentIntentId, paymentStatus, userId } = req.body;

    // Check if payment status is successful
    if (paymentStatus === 'succeeded') {
      // Save payment details to the database
      const newPayment = new Payment({
        amount,
        paymentIntentId,
        paymentStatus,
        userId,
      });

      await newPayment.save();
      res.status(201).json({ message: 'Payment saved successfully', payment: newPayment });
    } else {
      res.status(400).json({ error: 'Payment failed, details not saved' });
    }
  } catch (error) {
    console.error('Error saving payment:', error);
    res.status(500).json({ error: 'Error saving payment: ' + error.message });
  }
};

// Fetch all payment records
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ createdAt: -1 }); // Fetch and sort by latest
    res.status(200).json(payments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching payments', error: err.message });
  }
};