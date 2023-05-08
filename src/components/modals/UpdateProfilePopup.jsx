import React, {useState } from "react";
import { InputLabel, TextField, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box, styled } from "@mui/system";
import ProfileUpdate from "../common/ProfileUpdate";
import { publicAxios } from "../../api";
import toast from "react-hot-toast";
import { EDIT_USER_PROFILE } from "../../constants/endpoints";
import { useAuthContext } from "../../context/AuthContext";
import { LoadingButton } from "@mui/lab";

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

function UpdateProfilePopup({ open, setOpen, text, title, height }) {
  const { setRefetchFromLocalStorage } = useAuthContext();

  const [headshot, setHeadshot] = useState("");
  const [uploadingHeadshot, setUploadingHeadshot] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [verifyCodeOpen, setVerifyCodeOpen] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const handleClose = (e) => {
    setOpen(false);
  };

  const completePractitionerDetails = async () => {
    
    setIsLoading(true);
    try {
      const res = await publicAxios.patch(
        `${EDIT_USER_PROFILE}/${
          JSON.parse(localStorage.getItem("profile_info"))?.user?.id
        }`,
        {
          headshot
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );

      setIsLoading(false);
      const user = res?.data?.data;
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

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
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
            "& textarea::-webkit-scrollbar": {
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
                <InputLabel shrink>Headshot:</InputLabel>
                <Typography
                  variant="subtitle1"
                  sx={{ color: "#FAFBFC", opacity: 0.5, marginBottom: 1 }}
                >
                  Files types supported: JPG, PNG, GIF, SVG, Max Size: 5MB
                </Typography>
                <ProfileUpdate
                  uploadingToS3={uploadingHeadshot}
                  setUploadingToS3={setUploadingHeadshot}
                  s3Url={headshot}
                  setS3Url={setHeadshot}
                  width="100%"
                />
              </Box>
              <Box display="flex" flexDirection="column" mt={{ md: 4 }}>
                <LoadingButton
                  onClick={completePractitionerDetails}
                  loading={isLoading}
                  disabled={
                    !(
                      headshot.length > 1 &&
                      !uploadingHeadshot
                    )
                  }
                  variant="gradient"
                  size="large"
                  sx={{ fontSize: { xs: "10px", md: "20px" } }}
                >
                  Update Headshot
                </LoadingButton>
              </Box>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateProfilePopup;
