import { Stack, Typography } from "@mui/material";
import React from "react";
import NftSection from "./common/NftSection";

const NftLandingPageSection = () => {
  return (
    <Stack gap={{lg:3,sm:2}} marginY={{lg:3,xs:2}}>
      <Typography variant="h3" textAlign="center">
        BLOCKCHAIN FOR REAL ESTATE
      </Typography>
      <Typography variant="h5" textAlign="center" sx={{ color: "#FAFBFC" }}>
        The future of real estate NOW
      </Typography>
      <NftSection title="Luxury Home NFTs" />
      <NftSection title="Practitioner NFTs" />
    </Stack>
  );
};

export default NftLandingPageSection;
