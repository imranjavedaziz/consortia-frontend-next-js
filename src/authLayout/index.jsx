import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

function index({ children }) {
  const router = useRouter()
  console.log('router.sdplit(/',router.pathname.split('/'))
  return (
    <>
      <Head>
        <title>{router.pathname.slice(1)}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>{children}</div>
    </>
  );
}

export default index;
