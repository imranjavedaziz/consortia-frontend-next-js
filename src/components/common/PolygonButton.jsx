import { Box, CardMedia, Typography } from "@mui/material";
import React from "react";

const PolygonButton = () => {
  return (
    <Box
      sx={{
        marginTop: "30px",
        display: "inline-block",
        position: "relative",
        // width: "310px",
        width: {lg:"310px", sm: '183px'},
        height: {lg:"75px", sm: '45px'},
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        clipPath:
          "polygon(12.5% 0%, 100% 0, 100% 50%, 87.5% 100%, 0 100%, 0% 50%)",
        background: "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "2px" /* equal to border thickness */,
          left: "2.5px",
          width: {lg:"305px", sm: '178px'},
          height: {lg:"71px", sm: '41px'},
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
            width: "30px",
            height: "30px",
          }}
          component="img"
          image="/assets/icons/rocket.svg"
          alt="Rocket Icon"
        />
        <Typography variant="h5" fontWeight={600}>
          {" "}
          EXPLORE MORE
        </Typography>
      </Box>
    </Box>
  );
};

export default PolygonButton;
