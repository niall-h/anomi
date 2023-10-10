import { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";
import Stripe from "stripe";
import { sql } from "@vercel/postgres";
import { customAlphabet } from "nanoid";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

const webhookSecret: string = process.env.STRIPE_WEBHOOK_SECRET!;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handleWebhookEvent(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const sig = req.headers["stripe-signature"]!;
    const buf = await buffer(req);

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        webhookSecret
      );
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return res
        .status(400)
        .send(`Webhook signature verification failed: ${err.message}`);
    }

    switch (event.type) {
      case "checkout.session.completed":
        const session: any = event.data.object;
        const email = session.customer_email;
        const {
          confirmationCode,
          firstName,
          lastName,
          phoneNumber,
          ticketCount,
        } = session.metadata;

        try {
          console.log(
            `INSERT INTO ear VALUES (${confirmationCode}, ${firstName}, ${lastName}, ${email}, ${phoneNumber}, ${ticketCount});`
          );
          const result =
            await sql`INSERT INTO ear VALUES (${confirmationCode}, ${firstName}, ${lastName}, ${email}, ${phoneNumber}, ${ticketCount});`;
          return res.status(200).json({ result });
        } catch (err) {
          return res.status(500).json({ err });
        }

      default:
        console.warn(`Unhandled event type: ${event.type}`);
    }

    res.status(200).end();
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
