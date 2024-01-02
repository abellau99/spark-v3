// src/components/StripeCheckout.js

import { loadStripe } from '@stripe/stripe-js';
import stripeConfig from '../utils/stripeConfig';

const StripeCheckout = () => {
  const handleClick = async () => {
    // Fetch Stripe.js instance
    const stripe = await loadStripe(process.env.STRIPE_PUBLIC_KEY);

    // Call your backend to create a Checkout Session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
    });

    const session = await response.json();

    // Redirect to Stripe Checkout
    const result = await stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      // Handle any errors that occur during redirection to Stripe Checkout
      console.error(result.error.message);
    }
  };

  return (
    <button onClick={handleClick}>
      Donate with Stripe
    </button>
  );
};

export default StripeCheckout;
