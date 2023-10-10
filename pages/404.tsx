import { Box, Container, Typography } from "@mui/material";
import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>ANOMI: Page not found</title>
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
          <Typography variant="h3" color="white">
            Page Not Found
          </Typography>
        </Container>
      </Box>
    </>
  );
}
