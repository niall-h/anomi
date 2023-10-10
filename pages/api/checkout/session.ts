import { customAlphabet } from "nanoid";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

const isInputValid = (
  firstName: string,
  lastName: string,
  email: string,
  phoneNumber: string,
  ticketCount: number
) => {
  return firstName && lastName && email && phoneNumber && ticketCount > 0;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { firstName, lastName, email, phoneNumber, ticketCount, basePrice } =
    req.body;
  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    6
  );
  const confirmationCode = nanoid();

  // make sure input values are not empty
  if (!isInputValid(firstName, lastName, email, phoneNumber, ticketCount)) {
    res.status(500).json({ message: "One of the input values is invalid" });
  }

  const cost: number = Math.round((100 * (basePrice + 0.3)) / 0.971);
  console.log(cost);

  if (req.method === "POST") {
    try {
      const params: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ["card"],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: "ANOMI Presents: EAR Scenario - GA Tickets",
              },
              unit_amount: cost,
            },
            quantity: ticketCount,
          },
        ],
        customer_email: email!,
        metadata: {
          confirmationCode: confirmationCode,
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
          ticketCount: ticketCount,
        },
        mode: "payment",
        success_url: `${req.headers.origin}/success?confirmation=${confirmationCode}`,
        cancel_url: `${req.headers.origin}/tickets/ear-scenario`,
      };

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(params);

      res.status(200).json({ sessionId: checkoutSession.id });
    } catch (err) {
      res.status(500).json({ message: "Error creating checkout session" });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
