// import Stripe from 'stripe';

// const stripe = new Stripe('sk_test_51QMinOFmUhbnIp9jbuqL4OSC5CddYFUIZqzUAlkx4GiqcMtEYD8ngH7LQ5aVNcst2kCn5mSnxbRvbC3k8Hn0rJhy00V5DETMM2'); // Your Stripe secret key

// // Service function to handle the payment processing with Stripe
// export const processPayment = async (clientSecret, cardElement) => {
//   try {
//     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: cardElement,
//       },
//     });

//     if (error) {
//       throw new Error(error.message);
//     }

//     return paymentIntent;
//   } catch (error) {
//     throw new Error(`Error processing payment: ${error.message}`);
//   }
// };


import Stripe from 'stripe';

const stripe = new Stripe('sk_test_51QMinOFmUhbnIp9jbuqL4OSC5CddYFUIZqzUAlkx4GiqcMtEYD8ngH7LQ5aVNcst2kCn5mSnxbRvbC3k8Hn0rJhy00V5DETMM2'); // Your Stripe secret key

// Service function to handle the payment processing with Stripe
const processPayment = async (clientSecret, cardElement) => {
  try {
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return paymentIntent;
  } catch (error) {
    throw new Error(`Error processing payment: ${error.message}`);
  }
};

export default { processPayment }; // Default export
