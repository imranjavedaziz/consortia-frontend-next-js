import { Box, Typography,styled } from "@mui/material";
import React from "react";
import NftsLayout from "../../src/nftsLayout";

const MintPropertyNfts = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  width: "100%",
  paddingBottom: "80px",
  borderRight: `0.5px solid ${theme.palette.secondary.darkGray}`,
}));
const MintNFTS = () => {
  return (
    <>
      <Box>
        <Box>
          <Typography variant="h3">Mint Property NFT</Typography>
        </Box>
        <Box>

        </Box>
      </Box>
    </>
  );
};

export default MintNFTS;
MintNFTS.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
