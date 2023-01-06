import React, { useState } from "react";
import {
  Button,
  IconButton,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, height, styled, width } from "@mui/system";
import Image from "next/image";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInputField from "../common/CustomInputField";
import CustomFileUpload from "../common/CustomFileUpload";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import dayjs from "dayjs";
import { LoadingButton } from "@mui/lab";
import { publicAxios } from "../../api";
import toast from "react-hot-toast";
import VerifyCodeForProfileUpdate from "./verifyCodeForProfileUpdate/VerifyCodeForProfileUpdate";

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
    padding: "0 20px",
  },
  "& input::placeholder": {
    fontSize: "16px",
    fontWeight: 400,
  },
}));

const inputFields = [
  { name: "bio", label: "Bio", placeholder: "Enter your bio" },
];
const TextFieldWrapper = styled(TextField)(() => ({}));
function CompletePractitionerProfile({
  open,
  setIsPractitioner,
  setOpen,
  text,
  title,
  height,
  crossButtonEbable,
}) {
  const [date, setDate] = useState(dayjs(new Date()));
  const [bio, setBio] = useState("");
  const [headShot, setHeadshot] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [verifyCodeOpen, setVerifyCodeOpen] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const handleClose = (e) => {
    setOpen(false);
  };

  const completePractitionerDetails = async () => {
    setIsLoading(true);
    try {
      const res = await publicAxios.put(
        "user/update",
        {
          bio,
          headShot,
          licenseSince: dayjs(date).unix(),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      setIsLoading(false);
      toast.success("Verification code has been sent to your email");
      setUpdatedUserData({
        bio,
        headShot,
        licenseSince: dayjs(date).unix(),
      });
      setVerifyCodeOpen(true);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      toast.error(error?.data?.message);
    }
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        // onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "secondary.purpleGray",
            borderRadius: "24px",
            width: "571px",
            height: height,
            padding: "20px 30px",
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
            <Typography variant="h4" sx={{ fontWeight: 400 }}>
              {title}
            </Typography>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            padding: "16px 0px",
            "&::-webkit-scrollbar": {
              width: "6px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#f1f1f1",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#9f9dc9",
            },
          }}
        >
          <DialogContentText id="alert-dialog-slide-description">
            <Typography variant="body1">{text}</Typography>
          </DialogContentText>
          <Box
            width="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
            marginTop="20px"
          >
            <Box
              display="flex"
              flexDirection="column"
              boxSizing="border-box"
              width="80%"
              margin="auto"
              rowGap={3}
            >
              <Box>
                <InputLabel shrink>Bio</InputLabel>
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "24px",
                    alignItems: "center",
                  }}
                >
                  <GradiantTextField
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    fullWidth
                    variant="standard"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    style={{
                      background: "rgba(29, 6, 104, 1)",
                      margin: "2px 2px 2px 2px",
                      borderRadius: "24px",
                    }}
                  />
                </div>
              </Box>
              <Box>
                <InputLabel shrink>Headshot:</InputLabel>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#FAFBFC", opacity: 0.5, marginBottom: 1 }}
                >
                  Files types supported: JPG, PNG, GIF, SVG, Max Size: 5MB
                </Typography>
                <CustomFileUpload
                  s3Url={headShot}
                  setS3Url={setHeadshot}
                  width="100%"
                />
              </Box>
              <Box>
                <InputLabel shrink>License Since Date:</InputLabel>
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                    display: "flex",
                    justifyContent: "center",
                    borderRadius: "24px",
                    alignItems: "center",
                  }}
                >
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      label=""
                      InputProps={{
                        disableUnderline: true,
                      }}
                      disableFuture
                      value={date}
                      onChange={(newValue) => {
                        setDate(newValue);
                      }}
                      renderInput={(params) => (
                        <GradiantTextField
                          variant="standard"
                          fullWidth
                          style={{
                            background: "rgba(29, 6, 104, 1)",
                            margin: "2px 2px 2px 2px",
                            borderRadius: "24px",
                          }}
                          {...params}
                        />
                      )}
                    />
                  </LocalizationProvider>
                </div>
              </Box>
              <Box display="flex" flexDirection="column" mt={4}>
                <LoadingButton
                  onClick={completePractitionerDetails}
                  loading={isLoading}
                  disabled={!(headShot.length > 1 && bio.length > 1)}
                  variant="gradient"
                  size="large"
                  sx={{
                    fontSize: "20px",
                    fontWeight: 600,
                  }}
                >
                  Complete Profile
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
      <VerifyCodeForProfileUpdate
        open={verifyCodeOpen}
        setOpen={setVerifyCodeOpen}
        title="Verification Code"
        text="Verification code has been sent to your email"
        btnText="Submit"
        placeholder="Enter your verification code"
        updatedUserData={updatedUserData}
        profileUpdate={true}
        handleParentClose={handleClose}
      />
    </>
  );
}

export default CompletePractitionerProfile;
