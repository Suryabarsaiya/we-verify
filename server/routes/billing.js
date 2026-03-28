const express = require('express');

module.exports = function () {
    const router = express.Router();
    
    // Initialize stripe safely
    let stripe = null;
    if (process.env.STRIPE_SECRET_KEY) {
        stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
        console.log('  Stripe: ✅ initialized');
    } else {
        console.warn('  Stripe: ⚠️ STRIPE_SECRET_KEY missing. Fake checkout URLs will be generated.');
    }

    router.post('/checkout', async (req, res) => {
        const { idea_title, email } = req.body;
        
        try {
            if (stripe) {
                // Generate a real Stripe Checkout Session
                const session = await stripe.checkout.sessions.create({
                    payment_method_types: ['card'],
                    customer_email: email || undefined,
                    line_items: [
                        {
                            price_data: {
                                currency: 'usd',
                                product_data: {
                                    name: `Deep-Dive Premium Validation Report`,
                                    description: `Extended competitive analysis + pitch deck outline for: ${idea_title || 'Your Startup Idea'}`,
                                },
                                unit_amount: 499, // $4.99
                            },
                            quantity: 1,
                        },
                    ],
                    mode: 'payment',
                    success_url: `${req.headers.origin || 'http://localhost:5173'}/?payment=success`,
                    cancel_url: `${req.headers.origin || 'http://localhost:5173'}/?payment=cancelled`,
                });
                
                res.json({ url: session.url });
            } else {
                // Mock behavior for testing without Stripe Keys
                console.log(`[Mock Stripe] Generated payment deep-dive for: ${email}`);
                res.json({ 
                    url: `${req.headers.origin || 'http://localhost:5173'}/?mock_payment=success`,
                    mock: true 
                });
            }
        } catch (error) {
            console.error('Stripe error:', error.message);
            res.status(500).json({ error: 'Failed to initialize checkout session' });
        }
    });

    return router;
};
