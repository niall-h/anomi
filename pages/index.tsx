import Head from "next/head";
import { Box, Button, Typography } from "@mui/material";
import background from "@/public/images/VCRbackground.gif";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

export default function Home() {
  const [typingStatus, setTypingStatus] = useState("typing");

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
        sx={{
          background: `url(${background.src}) center / cover`,
        }}
      >
        <Box>
          <Typography variant="h2" color="white" mb={5}>
            <TypeAnimation
              style={{ whiteSpace: "pre-line" }}
              sequence={[
                `ANOMI presents:\nEAR Scenario\n`,
                500,
                `ANOMI presents:\nEAR Scenario\n\nOctober 21st\n8PM - 2AM\nIrvine, CA`,
                () => setTypingStatus("done"),
              ]}
            />
          </Typography>
          {typingStatus === "done" && (
            <Button
              variant="contained"
              color="warning"
              size="large"
              href="/tickets/ear-scenario"
            >
              Get Tickets
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}
