import React, { useState, useEffect } from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import GradientButton from "../../src/components/common/GradientButton";
import { useRouter } from "next/router";

function Landing() {
  const { push } = useRouter();
  const [profileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    const profile_info = JSON.parse(localStorage.getItem("profile_info"));
    setProfileInfo(profile_info);
  }, []);

  return (
    <>
      <Box sx={{ marginBottom: "40px" }}>
        <Typography variant="h3">
          {profileInfo?.user?.role === "practitioner"
            ? "Practitioner"
            : "Consumer"}{" "}
          Dashboard
        </Typography>
      </Box>
      <Box>
        <CardMedia
          component="iframe"
          src="https://www.youtube.com/embed/A16G29d0dQ0"
          controls
          title="title"
          image="https://www.youtube.com/embed/A16G29d0dQ0"
          autoPlay
          allow="autoPlay"
          sx={{ height: "373px", border: "none" }}
        />
      </Box>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "40px" }}
      >
        {profileInfo?.user?.role === "practitioner" && (
          <Box width={230} mr={5}>
            <Button variant="gradient" size="large" sx={{ fontSize: "20px" }}>
              Mint Practitioner
            </Button>
          </Box>
        )}

        <Box width={230} onClick={() => push("/property/mint-nft")}>
          <Button variant="gradient" size="large" sx={{ fontSize: "20px" }}>
            Mint Property NFT
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Landing;
Landing.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
