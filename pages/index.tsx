import Head from "next/head";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  return (
    <>
      <Head>
        <title>ANOMI</title>
      </Head>
      <Box
        width="100vw"
        height="100vh"
        bgcolor="black"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
      >
        <Box>
          <Typography variant="h2" color="white" mb={5}>
            ANOMI presents:
          </Typography>
          <Typography variant="h3" color="white" mb={5}>
            EAR SCENARIO
          </Typography>
          <Typography variant="h4" color="white" mb={5}>
            October 21st
            <br />
            8PM - 2AM
            <br />
            Irvine, CA
          </Typography>
          <Button
            variant="contained"
            color="warning"
            size="large"
            href="/tickets/ear-scenario"
          >
            Get Tickets
          </Button>
        </Box>
      </Box>
    </>
  );
}
