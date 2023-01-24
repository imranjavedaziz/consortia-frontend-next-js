import React, { useState } from "react";
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
import { publicAxios } from "../../../api";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../context/AuthContext";
import { RESEND_OTP, VERIFY_OTP } from "../../../constants/endpoints";

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
  email,
  isPractitioner,
}) {
  const handleClose = () => {
    setOpen(false);
    setCode("");
  };
  const [code, setCode] = useState("");
  const [fetching, setFetching] = useState(false);
  const { push } = useRouter();
  const { showSecondForm, setShowSecondForm } = useAuthContext();

  const verifyCode = async (email) => {
    try {
      if (code.length > 0) {
        setFetching(true);
        const res = await publicAxios.post(VERIFY_OTP, {
          email,
          otp: code,
          otp_type: "Email",
        });
        setFetching(false);
        localStorage.setItem("access", res?.data?.access);
        localStorage.setItem("profile_info", JSON.stringify(res?.data?.data));
        toast.success(res?.data?.message);
        if (!isPractitioner) {
          return setTimeout(() => {
            // window.open(res?.data?.data?.accountLink?.url);
            push('/dashboard/landing')
          }, 2500);
        }
        setShowSecondForm(true);
        handleClose();
      } else {
        toast.error("Please enter OTP");
      }
    } catch (error) {
      setFetching(false);
      console.log(error);
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
      }
    }
  };
  const resendCode = async (email) => {
    try {
      const res = await publicAxios.post(RESEND_OTP, {
        email,
      });
      toast.success(res?.data?.message);
    } catch (error) {
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
      }
    }
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
            // height: "397px",
            padding: "40px 38px",
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
        <DialogContent sx={{ padding: "20px 10px" }}>
          <Typography variant="body1">{text}</Typography>
          <Box sx={{ width: "100%", paddingTop: "40px" }}>
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
                // marginTop: "40px",
              }}
            >
              <GradiantTextField
                variant="standard"
                placeholder={placeholder}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: inputTypeCode && (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => resendCode(email)}
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
        </DialogContent>
        <DialogActions sx={{ padding: "16px 0px" }}>
          <Box sx={{ width: "100%" }}>
            <LoadingButton
              loading={fetching}
              variant="contained"
              color="primary"
              sx={{
                background:
                  "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                borderRadius: "24px",
                width: "100%",
                padding: "10px 0px",
                textTransform: "capitalize",
              }}
              onClick={() => verifyCode(email)}
            >
              {btnText}
            </LoadingButton>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default DialogTextInput;
