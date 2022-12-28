import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Box } from "@mui/material";
import { Toaster } from "react-hot-toast";

function Index({ children }) {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>{router.pathname.slice(1)}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Toaster position="top-center" reverseOrder={false} />

      <Box sx={{ height: "100%", minHeight: "100vh" }}>{children}</Box>
    </>
  );
}

export default Index;
