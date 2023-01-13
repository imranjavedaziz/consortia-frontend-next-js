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
function VerifyCodeModal({
  open,
  setOpen,
  text,
  title,
  input,
  btnText,
  placeholder,
  inputTypeCode,
  oldPassword,
  newPassword,
  resetForm,
}) {
  const handleClose = () => {
    resetForm();
    setOpen(false);
  };
  const [code, setCode] = useState("");
  const [fetching, setFetching] = useState(false);
  const { push } = useRouter();

  const changePassword = async () => {
    if (code.length < 1) {
      toast.error("Please enter verification code");
      return;
    }

    try {
      setFetching(true);

      const res = await publicAxios.post(
        "user/change-password",
        {
          oldPassword,
          newPassword,
          verificationCode: code,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      setFetching(false);
      toast.success(res?.data?.message);
      handleClose();
    } catch (error) {
      setFetching(false);
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error(error?.data?.err?.msg);
      }
    }
  };

  const resendCode = async () => {
    const res = await publicAxios.post("auth/resend", {
      email: JSON.parse(localStorage.getItem("profile_info"))?.user?.email,
    });
    toast.success(res?.data?.message);
  };
  return (
    <>
      <Dialog
        open={open}
        onBackdropClick="false"
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            backgroundColor: "secondary.purpleGray",
            borderRadius: { xs: "12px", md: "24px" },
            width: "571px",
            // height: "397px",
            padding: { xs: "10px 15px", sm: "20px", md: "40px" },
          },
        }}
      >
        <DialogTitle sx={{ padding: { xs: "0px", md: "0px 0px 16px 0px" } }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" sx={{ fontWeight: { xs: 400, md: 600 } }}>
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
        <DialogContent>
          <Typography variant="body1" sx={{ padding: "16px 0px" }}>
            {text}
          </Typography>
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
                marginTop: { xs: "5px", md: "40px" },
              }}
            >
              <GradiantTextField
                variant="standard"
                placeholder={placeholder}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                InputProps={{
                  disableUnderline: true,
                  endAdornment: (
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => resendCode()}
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
                  background: "rgba(29, 6, 104, 1)",
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
              onClick={() => changePassword()}
            >
              {btnText}
            </LoadingButton>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default VerifyCodeModal;
