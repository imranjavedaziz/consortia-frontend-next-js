import React, { useEffect, useState } from "react";
import { Box, CardMedia, Typography } from "@mui/material";
import { useRouter } from "next/router";

const PolygonButton = () => {
  const { push } = useRouter();
  const [profileInfo, setProfileInfo] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("access");
    setProfileInfo(token);
  }, []);

  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "inline-block",
        position: "relative",
        cursor: "pointer",
        // width: "310px",
        width: { lg: "310px", xs: "183px" },
        height: { lg: "75px", xs: "45px" },
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath:
          "polygon(12.5% 0%, 100% 0, 100% 50%, 87.5% 100%, 0 100%, 0% 50%)",
        background: "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
      }}
      onClick={() => push(profileInfo ? "/property/mint-nft" : "/auth/login")}
    >
      <Box
        sx={{
          position: "absolute",
          top: "2px" /* equal to border thickness */,
          left: "2.5px",
          width: { lg: "305px", xs: "178px" },
          height: { lg: "71px", xs: "41px" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          clipPath:
            "polygon(12.5% 0%, 100% 0, 100% 50%, 87.5% 100%, 0 100%, 0% 50%)",
          backgroundColor: "#210A5E",
          gap: 2,
        }}
      >
        <CardMedia
          sx={{
            width: { xs: "20px", md: "30px" },
            height: { xs: "20px", md: "30px" },
          }}
          component="img"
          image="/assets/icons/mainProperty.svg"
          alt="Rocket Icon"
        />
        <Typography variant="body1" fontWeight={600}>
          {" "}
          Create Property NFT
        </Typography>
      </Box>
    </Box>
  );
};

export default PolygonButton;
