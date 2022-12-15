import React from "react";
import Button from "@mui/material/Button";

const GradientButton = () => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{
        background: "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
        borderRadius: "24px",
        
      }}
    >
      Login
    </Button>
  );
};

export default GradientButton;
