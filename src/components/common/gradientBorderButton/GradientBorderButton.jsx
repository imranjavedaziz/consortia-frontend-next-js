import React from "react";
import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

const RoundGradientButton = styled(Button)({
  position: "relative",
  border: "5px solid transparent",
  backgroundClip: "padding-box",
  borderRadius: "60px",

  "&:after": {
    position: "absolute",
    top: -5,
    left: -5,
    right: -5,
    bottom: -5,
    background: `linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)`,
    content: '""',
    zIndex: -1,
    borderRadius: "60px",
  },
});
function GradientBorderButton({btnText}) {
  return (
    <>
      <RoundGradientButton
        variant="contained"
        sx={{ backgroundColor: "#fff", color: "yellow" }}>{btnText}</RoundGradientButton>
    </>
  );
}

export default GradientBorderButton;
