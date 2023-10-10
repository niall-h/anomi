import { Box, Typography } from "@mui/material";
import Head from "next/head";
import { useSearchParams } from "next/navigation";
import background from "@/public/images/VCRbackground.gif";

export default function Success() {
  const searchParams = useSearchParams();
  const confirmationCode = searchParams.get("confirmation");

  return (
    <>
      <Head>
        <title>ANOMI - Order Confirmation</title>
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
        <Box width="70%">
          <Typography variant="h2" color="white" mb={5}>
            ANOMI Presents: EAR Scenario awaits...
          </Typography>
          <Typography variant="h1" color="white" mb={5}>
            {confirmationCode}
          </Typography>
          <Typography variant="h4" color="white" mb={5}>
            This is your check-in code. Please store this code carefully. We
            will be emailing you the code separately as well.
          </Typography>
        </Box>
      </Box>
    </>
  );
}
