import React from "react";
import { Button, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, styled, width } from "@mui/system";
import Image from "next/image";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
//   export const TextFieldWrapper = styled(TextField)`
//   fieldset {
//     border-radius: 50px;
//   }
// `;
const GradiantTextField = styled(TextField)(() => ({
  background: '',
  padding: "5px 0",
  "& .MuiInput-root": {
    marginLeft: "5px",
  },
  borderRadius: "24px",
  "&:after": {
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    background: `linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)`,
    content: '""',
    zIndex: -1,
    borderRadius: "24px",
  },
}));
const TextFieldWrapper = styled(TextField)(() => ({}));
function DialogTextInput({ open, setOpen, text, title, input, btnText }) {
  const handleClose = () => {
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
            height: "397px",
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
            <Box
              sx={{ display: "flex", alignItems: "center" }}
              onClick={handleClose}
            >
              <Image src="/assets/icons/cross.svg" height={22} width={22} />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ padding: "16px 0px" }}>
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="body1">{text}</Typography>
            <Box>
              {/* <TextFieldWrapper> */}

              {/* <TextField
                sx={{
                  "& .MuiInputLabel-root": { color: "green" },
                  borderColor:
                    "linear-gradient(253.4deg, #B731FF 16.47%, #1D2CDF 95.2%)",
                  borderRadius: 1,
                }}
              /> */}
              {/* </TextFieldWrapper> */}
              <GradiantTextField
                id="filled-basic"
                variant="standard"
                background="#bdbdbd"
                InputProps={{
                  disableUnderline: true,
                }}
                placeholder="Enter text here.."
                // fullWidth
              />
              
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "16px 0px" }}>
          <Box sx={{ width: "100%" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                background:
                  "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                borderRadius: "24px",
                width: "100%",
                padding: "10px 0px",
              }}
              onClick={handleClose}
            >
              {btnText}
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
     
    </>
  );
}

export default DialogTextInput;
