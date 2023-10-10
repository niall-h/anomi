import getStripe from "@/utils/get-stripejs";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import EVENT_POSTER from "@/public/images/Oct_21_Rave_Merged_Square.jpg";
import Image from "next/image";
import axios from "axios";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function EAR() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [ticketCount, setTicketCount] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const stripe = await getStripe();
      const response = await fetch("/api/checkout/session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
          email: email,
          phoneNumber: phoneNumber,
          ticketCount: ticketCount,
        }),
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

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>ANOMI</title>
      </Head>
      <Box
        width="100vw"
        height={{ md: "100vh", xs: "fit-content" }}
        bgcolor="black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Container maxWidth="md">
          <Card sx={{ py: 2, my: { md: 0, xs: 2 } }}>
            <CardHeader title="Tickets" subheader={"$" + ticketCount * 15} />
            <CardContent>
              <Grid container>
                <Grid item xs={12} md={6}>
                  <Image src={EVENT_POSTER} width={300} alt="event-poster" />
                  <Typography variant="h6" sx={{ mt: 1 }}>
                    Number of tickets:
                  </Typography>
                  <Box
                    width="100%"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                  >
                    <IconButton
                      onClick={() => setTicketCount(ticketCount - 1)}
                      disabled={ticketCount <= 1}
                    >
                      <RemoveCircleOutlineIcon />
                    </IconButton>
                    <Typography variant="h4" color="primary" sx={{ mx: 3 }}>
                      {ticketCount}
                    </Typography>
                    <IconButton
                      onClick={() => setTicketCount(ticketCount + 1)}
                      disabled={ticketCount >= 8}
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6} sx={{ pr: { md: 3, xs: 0 } }}>
                  <form onSubmit={handleCheckout}>
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      label="First Name"
                      margin="normal"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setFirstName(e.target.value)
                      }
                    />
                    <TextField
                      fullWidth
                      required
                      variant="outlined"
                      label="Last Name"
                      margin="normal"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setLastName(e.target.value)
                      }
                    />
                    <TextField
                      fullWidth
                      required
                      type="email"
                      variant="outlined"
                      label="Email"
                      margin="normal"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                    />
                    <TextField
                      fullWidth
                      required
                      type="tel"
                      variant="outlined"
                      label="Phone Number"
                      margin="normal"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPhoneNumber(e.target.value)
                      }
                    />
                    {loading ? (
                      <LoadingButton
                        fullWidth
                        loading
                        variant="contained"
                        size="large"
                        sx={{ textTransform: "none", mt: 3 }}
                      >
                        <Typography variant="body1">
                          Proceed to Payment
                        </Typography>
                      </LoadingButton>
                    ) : (
                      <Button
                        fullWidth
                        variant="contained"
                        type="submit"
                        size="large"
                        color="success"
                        sx={{ textTransform: "none", mt: 3 }}
                      >
                        <Typography variant="body1">
                          Proceed to Payment
                        </Typography>
                      </Button>
                    )}
                  </form>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </>
  );
}
