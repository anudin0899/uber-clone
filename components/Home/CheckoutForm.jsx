import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React from 'react';

const CheckoutForm = ({ amount }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!elements || !stripe) {
            return;
        }

        // First, confirm the payment element
        const { error: submitError } = await elements.submit();
        if (submitError) {
            // console.error(submitError);
            return;
        }

        // Create a payment intent on the server
        const res = await fetch('/api/create-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                amount: amount // Stripe expects amount in cents
            }),
        });
        

        if (!res.ok) {
            console.error('Failed to create payment intent');
            return;
        }

        const { clientSecret } = await res.json();

        // Confirm the payment with Stripe
        const { error } = await stripe.confirmPayment({
            clientSecret,
            elements,
            confirmParams: {
                return_url: 'http://localhost:3000/payment-confirm', // Adjust this as needed
            },
        });

        if (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center w-full mt-10">
            <h2 className="m-5 font-bold">Amount to Pay: ${amount}</h2>
            <form className="max-w-md" onSubmit={handleSubmit}>
                <PaymentElement />
                <button className="w-full bg-black text-white p-2 rounded-lg mt-5">
                    Pay
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;
