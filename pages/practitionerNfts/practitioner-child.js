import React, { useEffect, useState } from "react";
import { Box, Typography, styled } from "@mui/material";
import NftsLayout from "../../src/nftsLayout";

const GradientMintPropertyNfts = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.border.default,
  borderRadius: "24px",
  padding: "1px",
  marginTop: "40px",
  marginBottom: "120px",
}));
const MintPropertyNfts = styled(Box)(({ theme }) => ({
  width: "100%",
  background: theme.palette.background.default,
  borderRadius: "24px",
  padding: "40px 281px",
}));

const Practitioner = () => {
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3">Mint Practitioner NFT</Typography>
        </Box>
        <GradientMintPropertyNfts>
          <MintPropertyNfts>
            <Box>
              <Typography variant="h4" fontWeight={600}>
                Detail page
              </Typography>
            </Box>
            <Box>gsggsg</Box>
          </MintPropertyNfts>
        </GradientMintPropertyNfts>
      </Box>
    </>
  );
};

export default Practitioner;
Practitioner.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
