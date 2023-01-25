import React, { useState, useEffect } from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import GradientButton from "../../src/components/common/GradientButton";
import { useRouter } from "next/router";
import { useTitle } from "../../src/utils/Title";
import VerifyIdentity from "../../src/components/stripeIntegration/VerifyIdentity";
// import AWS from "aws-sdk";
{
  /* 
AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY_SECRET,
});

const myBucket = new AWS.S3({
  params: {
    Bucket: true
      ? process.env.NEXT_PUBLIC_UNLOCKABLE_BUCKET_NAME
      : process.env.NEXT_PUBLIC_BUCKET_NAME,
  },
  region: process.env.REGION,
});

const handleDownload = () => {
  myBucket.getObject(
    {
      Bucket: "consortialockablecontent",
      Key: "1674563359663Warranty_Deed.pdf",
    },
    async (err, data) => {
      if (err) {
        console.log(err);
      } else {
        const file = data.Body;
        console.log({ data });
        const blob = new Blob([arr], { type: "application/pdf" });
        const url = URL.createObjectURL(file);
        console.log({ url });
      }
    }
  );
};
*/
}
function Landing() {
  useTitle("Dasboard");

  const { push } = useRouter();
  const [profileInfo, setProfileInfo] = useState({});
  useEffect(() => {
    const profile_info = JSON.parse(localStorage.getItem("profile_info"));
    setProfileInfo(profile_info);
  }, []);

  return (
    <>
      <Box sx={{ marginBottom: { xs: "10px", md: "40px" } }}>
        <Typography variant="h3">
          {profileInfo?.user?.role === "Practitioner"
            ? "Practitioner"
            : "Consumer"}
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
          sx={{ height: { xs: "150px", md: "373px" }, border: "none" }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          columnGap: { xs: 2, md: 5 },
        }}
      >
        {profileInfo?.user?.role === "Practitioner" && (
          <Box
            width={230}
            // mr={5}
            onClick={() => push("/practitionerNfts/mint-nft")}
          >
            <Button
              variant="gradient"
              size="large"
              sx={{ fontSize: { xs: "10px", md: "20px" } }}
            >
              Mint Practitioner
            </Button>
          </Box>
        )}
        <Box width={230} onClick={() => push("/property/mint-nft")}>
          <Button
            variant="gradient"
            size="large"
            sx={{ fontSize: { xs: "10px", md: "20px" } }}
          >
            Mint Property NFT
          </Button>
        </Box>
        {/*
        <Box width={230} onClick={handleDownload}>
          <Button
            variant="gradient"
            size="large"
            sx={{ fontSize: { xs: "10px", md: "20px" } }}
          >
            Download
          </Button>
        </Box>
        */}
      </Box>
    </>
  );
}

export default Landing;
Landing.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
