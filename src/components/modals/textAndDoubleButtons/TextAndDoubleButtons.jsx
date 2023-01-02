import React from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, height, styled, width } from "@mui/system";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//   export const TextFieldWrapper = styled(TextField)`
//   fieldset {
//     border-radius: 50px;
//   }
// `;
const GradiantTextField = styled(TextField)(({}) => ({
  "& .MuiInput-root": {
    paddingLeft: "15px",
  },
  "& input::placeholder": {
    fontSize: "16px",
    fontWeight: 400,
  },
}));
const TextFieldWrapper = styled(TextField)(() => ({}));
function TextAndDoubleButtons({
  open,
  setIsPractitioner,
  setOpen,
  text,
  title,
  btnText1,
  btnText2,
  height,
  crossButtonEbable,
}) {
  const handleClose = (e) => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            backgroundColor: "secondary.purpleGray",
            borderRadius: "24px",
            width: "571px",
            height: height,
            padding: "40px",
          },
        }}
      >
        <DialogTitle sx={{ padding: "0px 0px 16px 0px" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            {crossButtonEbable && (
              <Box
                sx={{ display: "flex", alignItems: "center" }}
                onClick={handleClose}
              >
                <Image
                  src="/assets/icons/cross.svg"
                  height={22}
                  width={22}
                  alt=""
                />
              </Box>
            )}
          </Box>
        </DialogTitle>
        <DialogContent sx={{ padding: "16px 0px" }}>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="body1">{text}</Typography>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 0px" }}>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              variant="contained"
              color="primary"
              sx={{
                background:
                  "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                borderRadius: "24px",
                fontSize: "20px",
                textTransform: "capitalize",
                // width: "100%",
                width: "230px",
                padding: "13px 61px",
              }}
              onClick={() => {
                setIsPractitioner(false);
                handleClose();
              }}
            >
              {btnText1}
            </Button>
            <Button
              variant="contained"
              color="primary"
              sx={{
                background:
                  "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                borderRadius: "24px",
                fontSize: "20px",
                textTransform: "capitalize",
                // width: "100%",
                width: "230px",
                padding: "13px 61px",
              }}
              onClick={() => {
                setIsPractitioner(true);
                handleClose();
              }}
            >
              {btnText2}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TextAndDoubleButtons;
