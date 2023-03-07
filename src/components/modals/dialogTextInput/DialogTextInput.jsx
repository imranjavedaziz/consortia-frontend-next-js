import React, { useState } from "react";
import {
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, styled } from "@mui/system";
import Image from "next/image";
import { publicAxios } from "../../../api";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import { useAuthContext } from "../../../context/AuthContext";
import { RESEND_OTP, VERIFY_OTP } from "../../../constants/endpoints";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GradiantTextField = styled(TextField)(({}) => ({
  "& .MuiInput-root": {
    paddingLeft: "15px",
  },
  "& input::placeholder": {
    fontSize: { xs: "8px", md: "16px" },
    fontWeight: 400,
  },
}));
function DialogTextInput({
  open,
  setOpen,
  text,
  title,
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
  const { setShowSecondForm } = useAuthContext();
  const belowSm = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "sm")
  );

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
        if (
          res?.data?.data?.user?.role === "Practitioner" &&
          !res.data?.data?.user?.practitionerType
        ) {
          setShowSecondForm(true);
          push("/auth/signup");
        } else {
          if (!isPractitioner) {
            return setTimeout(() => {
              // window.open(res?.data?.data?.accountLink?.url);
              push("/dashboard/landing");
            }, 2500);
          }
        }
        setShowSecondForm(true);
        push("/auth/signup");

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
        if (typeof error?.data?.message === "string") {
          toast.error(error?.data?.message);
        } else {
          toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
        }
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
        if (typeof error?.data?.message === "string") {
          toast.error(error?.data?.message);
        } else {
          toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
        }
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
            borderRadius: { xs: "12px", md: "24px" },
            width: { xs: "272px", md: "571px" },
            // height: "397px",
            padding: { xs: "16px", md: "40px 38px" },
            margin: { xs: "16px", md: "32px" },
          },
        }}
      >
        <DialogTitle
          sx={{ padding: { xs: "0px 0px 12px 0px", md: "0px 0px 16px 0px" } }}
        >
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
                height={belowSm ? 12 : 22}
                width={belowSm ? 12 : 22}
                alt=""
              />
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{ padding: { xs: "0px 0px 20px 0px", md: "0px 10px 20px 10px" } }}
        >
          <Typography variant="body1">{text}</Typography>
          <Box sx={{ width: "100%", paddingTop: { xs: "16px", md: "40px" } }}>
            <div
              style={{
                background:
                  "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                display: "flex",
                justifyContent: "center",
                borderRadius: "24px",
                // marginTop: "40px",
                width: "95%",
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
        <DialogActions sx={{ padding: { xs: "0px 0px", md: "16px 0px" } }}>
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
                fontSize: { xs: "10px", md: "15px" },
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
