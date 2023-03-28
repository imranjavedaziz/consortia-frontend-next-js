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
import { VERIFY_OTP, RESEND_OTP } from "../../../constants/endpoints";

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
function VerifyCodeForProfileUpdate({
  open,
  setOpen,
  text,
  title,
  input,
  btnText,
  placeholder,
  inputTypeCode,
  updatedUserData,
  fetchUpdatedData,
  profileUpdate,
  endPoint,
  email,
  isParentModal,
  editProfileKey,
  handleParentClose,
}) {
  const [code, setCode] = useState("");
  const [fetching, setFetching] = useState(false);
  const { push } = useRouter();

  const handleClose = () => {
    if (profileUpdate) {
      setCode("");
      setOpen(false);
    } else {
      fetchUpdatedData();
      setCode("");
      setOpen(false);
    }
  };
  const changePassword = async () => {
    try {
      if (code.length > 0) {
        setFetching(true);
        const res = await publicAxios.put(
          "user/update",
          {
            ...updatedUserData,
            verificationCode: code,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        setFetching(false);
        toast.success(res?.data?.message);
        handleClose();
      } else {
        toast.error("Please enter OTP");
      }
    } catch (error) {
      setFetching(false);
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error(error?.data?.err?.msg);
      }
    }
  };
  const updateDetails = async () => {
    try {
      if (code.length > 0) {
        setFetching(true);
        const res = await publicAxios.post(
          endPoint || "verify_complete_profile",
          {
            ...updatedUserData,
            otp: code,
            otp_type: "Email",
            ...(editProfileKey
              ? {
                  edit_profile: true,
                }
              : {
                  complete: true,
                }),
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access")}`,
            },
          }
        );
        setFetching(false);
        const user = res?.data?.data?.user;
        toast.success(res?.data?.message);
        fetchUpdatedData();
        const profile_info = JSON.parse(localStorage.getItem("profile_info"));
        const newProfileData = {
          ...profile_info,
          user,
        };
        localStorage.setItem("profile_info", JSON.stringify(newProfileData));
        handleClose();
        isParentModal && handleParentClose();
      } else {
        toast.error("Please enter OTP");
      }
    } catch (error) {
      setFetching(false);
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

  const resendCode = async (
    email = JSON.parse(localStorage.getItem("profile_info"))?.user?.email
  ) => {
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
        // onBackdropClick="false"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
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
          <Box sx={{ width: "100%" }}>
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
              }}
              onClick={profileUpdate ? updateDetails : changePassword}
            >
              {btnText}
            </LoadingButton>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VerifyCodeForProfileUpdate;
