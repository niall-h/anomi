import type { AppProps } from "next/app";
import "@/public/global.css";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/public/theme";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
