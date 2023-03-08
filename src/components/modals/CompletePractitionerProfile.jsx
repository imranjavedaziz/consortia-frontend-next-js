import React, { useEffect, useState } from "react";
import { InputLabel, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, styled } from "@mui/system";
import CustomFileUpload from "../common/CustomFileUpload";
import { publicAxios } from "../../api";
import toast from "react-hot-toast";
import VerifyCodeForProfileUpdate from "./verifyCodeForProfileUpdate/VerifyCodeForProfileUpdate";
import { EDIT_USER_PROFILE } from "../../constants/endpoints";
import { useAuthContext } from "../../context/AuthContext";
import { LoadingButton } from "@mui/lab";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const GradiantTextField = styled(TextField)(({}) => ({
  "& .MuiInput-root": {
    padding: "0 20px",
  },
  "& input::placeholder": {
    fontSize: "16px",
    fontWeight: 400,
  },
}));

function CompletePractitionerProfile({ open, setOpen, text, title, height }) {
  const { setRefetchFromLocalStorage } = useAuthContext();
  const [date, setDate] = useState(null);
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");

  const [headshot, setHeadshot] = useState("");
  const [uploadingHeadshot, setUploadingHeadshot] = useState(false);
  const [showLicenseSince, setShowLicenseSince] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [verifyCodeOpen, setVerifyCodeOpen] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const handleClose = (e) => {
    setOpen(false);
  };

  const completePractitionerDetails = async () => {
    if (!date && showLicenseSince) {
      toast.error("License Since Date is required");
      return;
    }

    if (bio.length === 0) {
      toast.error("Bio is required");
      return;
    }

    setIsLoading(true);
    try {
      const res = await publicAxios.patch(
        `${EDIT_USER_PROFILE}/${
          JSON.parse(localStorage.getItem("profile_info"))?.user?.id
        }`,
        {
          bio,
          headshot,
          ...(showLicenseSince && {
            licenseSince: dayjs(date).unix(),
          }),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setIsLoading(false);
      debugger;
      const user = res?.data?.data?.user;
      toast.success(res?.data?.message);
      handleClose();
      const profile_info = JSON.parse(localStorage.getItem("profile_info"));
      const newProfileData = {
        ...profile_info,
        user,
      };
      localStorage.setItem("profile_info", JSON.stringify(newProfileData));
      setRefetchFromLocalStorage((prev) => !prev);
      // toast.success("Verification code has been sent to your email");
      // setUpdatedUserData({
      //   bio,
      //   headshot,
      //   ...(showLicenseSince && {
      //     licenseSince: dayjs(date).unix(),
      //   }),
      // });
      // setVerifyCodeOpen(true);
    } catch (error) {
      setIsLoading(false);
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
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("profile_info"))?.user;
    setEmail(user?.email);
    setShowLicenseSince(!!user?.licenseNumber);
  }, []);
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
            padding: { xs: "10px 15px", md: "20px 30px" },
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
            // "&::-webkit-scrollbar-track": {
            //   background: "#f1f1f1",
            // },
            // "&::-webkit-scrollbar-thumb": {
            //   background: "#9f9dc9",
            // },
            "& textarea::-webkit-scrollbar": {
              // display: "none",
              // overflow: "hidden",
              display: "none",
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
                <Box
                  sx={{
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
                    sx={{
                      // overflow: "hidden",
                      "&::-webkit-scrollbar ": {},
                    }}
                    onChange={(e) => setBio(e.target.value)}
                    fullWidth
                    variant="standard"
                    inputProps={{
                      overflow: "hidden",
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
                    InputProps={{
                      disableUnderline: true,
                      style: {
                        overflow: "hidden",

                        "&::-webkit-scrollbar": {
                          width: "6px",
                        },
                        "&::-webkit-scrollbar-track": {
                          background: "#f1f1f1",
                        },
                        "&::-webkit-scrollbar-thumb": {
                          background: "#9f9dc9",
                        },
                      },
                    }}
                    style={{
                      background: "rgba(29, 6, 104, 1)",
                      margin: "2px 2px 2px 2px",
                      borderRadius: "24px",
                    }}
                    rows={3}
                    maxRows={10}
                    multiline={true}
                  />
                </Box>
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
                  uploadingToS3={uploadingHeadshot}
                  setUploadingToS3={setUploadingHeadshot}
                  s3Url={headshot}
                  setS3Url={setHeadshot}
                  width="100%"
                />
              </Box>
              {showLicenseSince && (
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
                            placeholder="mm/dd/yyyy"
                            sx={{
                              "& input::placeholder": {
                                fontSize: "12px",
                                fontWeight: 400,
                              },
                              "& input": {
                                fontSize: "14px",
                                padding: "10px 0px",
                              },
                            }}
                            onKeyDown={(e) => e.preventDefault()}
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
              )}
              <Box display="flex" flexDirection="column" mt={{ md: 4 }}>
                <LoadingButton
                  onClick={completePractitionerDetails}
                  loading={isLoading}
                  disabled={
                    !(
                      headshot.length > 1 &&
                      bio.length > 1 &&
                      !uploadingHeadshot
                    )
                  }
                  variant="gradient"
                  size="large"
                  sx={{ fontSize: { xs: "10px", md: "20px" } }}
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
        isParentModal={true}
        handleParentClose={handleClose}
        email={email}
        inputTypeCode
      />
    </>
  );
}

export default CompletePractitionerProfile;
