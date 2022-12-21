import React from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, styled, width } from "@mui/system";
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
function DialogTextInput({
  open,
  setOpen,
  text,
  title,
  input,
  btnText,
  placeholder,
  inputTypeCode,
}) {
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Dialog
        open={open}
        onBackdropClick="false"
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
              <Image
                src="/assets/icons/cross.svg"
                height={22}
                width={22}
                alt=""
              />
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
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: "24px",
                  marginTop: "40px",
                }}
              >
                <GradiantTextField
                  variant="standard"
                  placeholder={placeholder}
                  InputProps={{
                    disableUnderline: true,
                    endAdornment: inputTypeCode && (
                      <IconButton
                        aria-label="toggle password visibility"
                        // onClick={handleClickShowPassword}
                        // onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        <Box>
                          <Typography
                            variant="subtitle1"
                            color="secondary.yellow"
                            sx={{ paddingRight: "20px" }}
                          >
                            Resend Code
                          </Typography>
                        </Box>
                      </IconButton>
                    ),
                  }}
                  fullWidth
                  sx={{
                    background: "rgba(29, 6, 104, 0.7)",
                    margin: "3px 3px 3px 3px",
                    borderRadius: "24px",
                  }}
                />
              </div>
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
