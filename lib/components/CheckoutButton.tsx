import getStripe from "@/utils/get-stripejs";
import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";

export default function CheckoutButton() {
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const stripe = await getStripe();
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { sessionId } = await response.json();
      const { error } = await stripe!.redirectToCheckout({
        sessionId,
      });

      if (error) {
        router.push("/error");
      }
    } catch (err) {
      console.error("Error in creating chekout session:", err);
      router.push("/error");
    }
  };

  return (
    <Button
      variant="contained"
      color="warning"
      size="large"
      onClick={handleCheckout}
    >
      <Typography variant="h5">Get Tickets</Typography>
    </Button>
  );
}
