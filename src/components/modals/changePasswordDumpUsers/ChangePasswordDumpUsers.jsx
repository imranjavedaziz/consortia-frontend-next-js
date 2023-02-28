import React, { useState } from "react";
import {
  Button,
  IconButton,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
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
import { CHANGE_PASSWORD, VERIFY_OTP_MFA } from "../../../constants/endpoints";
import * as Yup from "yup";
import { Formik } from "formik";
import CustomInputField from "../../common/CustomInputField";
import { useRouter } from "next/router";
import VerifyCodeModal from "../verifyCode/VerifyCode";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const inputFields = [
  {
    name: "current_password",
    label: "Current Password",
    placeholder: "Enter Your Current Password",
    sensitive: true,
    onCutCopyPaste: (e) => e.preventDefault(),
  },
  {
    name: "password",
    label: "New Password",
    placeholder: "Enter Your New Password",
    sensitive: true,
    onCutCopyPaste: (e) => e.preventDefault(),
  },
  {
    name: "confirm_password",
    label: "Confirm New Password",
    placeholder: "Confirm Your New Password",
    sensitive: true,
    onCutCopyPaste: (e) => e.preventDefault(),
  },
];

function ChangePasswordDumpUsers({
  open,
  setOpen,
  text,
  title,
  btnText,
  email,
}) {
  const isMobile = useMediaQuery("(max-width:600px)");

  const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);

  const belowSm = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "sm")
  );

  const handleClose = () => {
    setOpen(false);
  };
  const [fetching, setFetching] = useState(false);

  const changePassword = async ({
    current_password,
    password,
    confirm_password,
  }) => {
    try {
      setFetching(true);
      const res = await publicAxios.post(
        CHANGE_PASSWORD,
        {
          current_password: current_password,
          password: password,
          confirm_password: confirm_password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        }
      );
      toast.success(res?.data?.message);
      setEmailVerificationOpen(true);
      //   setOpen(false);
      setFetching(false);
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

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        PaperProps={{
          sx: {
            backgroundColor: "secondary.purpleGray",
            borderRadius: { xs: "12px", md: "24px" },
            width: { xs: "272px", md: "571px" },
            padding: { xs: "16px", md: "40px" },
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
              Password
            </Typography>
            {/* <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ":hover": { cursor: "pointer" },
              }}
              onClick={handleClose}
            >
              <Image
                src="/assets/icons/cross.svg"
                height={belowSm ? 12 : 22}
                width={belowSm ? 12 : 22}
                alt=""
              />
            </Box> */}
          </Box>
        </DialogTitle>
        <Formik
          initialValues={{
            current_password: "",
            password: "",
            confirm_password: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await changePassword(values);
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            current_password: Yup.string().required(
              "Current Password is required"
            ),
            password: Yup.string()
              .required("Password is required")
              .min(8, "Password should have a minimum of 8 characters")
              .matches(
                /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
                "Must contain atleast one lowercase, one uppercase, a number, and a symbol"
              )
              .notOneOf(
                [Yup.ref("current_password"), null],
                "New password should be different from previous password"
              ),
            confirm_password: Yup.string()
              .required("Confirm Password is required")
              .oneOf([Yup.ref("password"), null], "Password must match"),
          })}
        >
          {(props) => {
            const { isSubmitting, handleSubmit, values, resetForm } = props;
            return (
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                style={{ width: { md: "100%", xs: "100%" } }}
              >
                <DialogContent sx={{ padding: "20px 0px" }}>
                  <Typography variant="body1" sx={{ paddingBottom: "10px" }}>
                    {text}
                  </Typography>
                  <Box>
                    <Box
                      display="flex"
                      flexDirection="column"
                      boxSizing="border-box"
                      width="100%"
                      margin="auto"
                      // paddingX={2}
                      rowGap={{ xs: 2, md: 3 }}
                    >
                      {inputFields.map(
                        ({
                          name,
                          label,
                          placeholder,
                          sensitive,
                          onCutCopyPaste,
                        }) => (
                          <CustomInputField
                            key={name}
                            name={name}
                            label={label}
                            placeholder={placeholder}
                            sensitive={sensitive}
                            onCutHandler={onCutCopyPaste}
                            onCopyHandler={onCutCopyPaste}
                            onPasteHandler={onCutCopyPaste}
                          />
                        )
                      )}
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions
                  sx={{ padding: { xs: "0px 0px 0px 0px", md: "16px 0px" } }}
                >
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
                      type="submit"
                      disabled={isSubmitting}

                      // onClick={() => resetPassword(email)}
                    >
                      Send
                    </LoadingButton>
                  </Box>
                </DialogActions>
                <VerifyCodeModal
                  open={emailVerificationOpen}
                  setOpen={setEmailVerificationOpen}
                  title="Verification Code"
                  text="Verification code has been sent to your email"
                  btnText="Submit"
                  inputTypeCode
                  placeholder="Enter your verification code"
                  oldPassword={values.current_password}
                  newPassword={values.password}
                  resetForm={resetForm}
                  dumpUser={true}
                />
              </form>
            );
          }}
        </Formik>
      </Dialog>
    </>
  );
}

export default ChangePasswordDumpUsers;
