import { Typography, Box, Button, useMediaQuery } from "@mui/material";
import React, { useState } from "react";
import NftsLayout from "../../src/nftsLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInputField from "../../src/components/common/CustomInputField";
import { publicAxios } from "../../src/api";
import toast, { Toaster } from "react-hot-toast";
import VerifyCodeModal from "../../src/components/modals/verifyCode/VerifyCode";
import { useTitle } from "../../src/utils/Title";

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

const ChangePassword = () => {
  useTitle("Change Password");
  const isMobile = useMediaQuery("(max-width:600px)");

  const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);
  const changePassword = async ({ current_password, password }) => {
    try {
      const res = await publicAxios.post(
        "user/change-password",
        {
          oldPassword: current_password,
          newPassword: password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      toast.success(res?.data?.message);
      setEmailVerificationOpen(true);
    } catch (error) {
      if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else {
        toast.error(error?.data?.err?.msg);
      }
    }
  };
  return (
    <Box marginY={{ xs: 0, md: 5 }}>
      <Typography variant="h3" marginY={{ md: 5 }}>
        Settings
      </Typography>
      <Box
        sx={{
          background:
            "linear-gradient(253.4deg, #B731FF 16.47%, #1D2CDF 95.2%)",
          padding: "1px",
          borderRadius: "24px",
          boxShadow: 2,
          boxSizing: "content-box",
        }}
      >
        <Box
          display="flex"
          paddingY={{ xs: 1, md: 4 }}
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          sx={{
            background:
              "linear-gradient(94.09deg, #12134D 3.97%, #10053C 51.03%, #12134D 95.99%)",
            borderRadius: "24px",
          }}
        >
          <Box>
            <Typography variant="h3">Password</Typography>
          </Box>
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
                  style={{
                    width: isMobile ? "100%" : "80%",
                    maxWidth: "800px",
                  }}
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    boxSizing="border-box"
                    width={{ xs: "90%", sm: "80%" }}
                    margin="auto"
                    // paddingX={2}
                    rowGap={3}
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

                    <Box
                      display="flex"
                      flexDirection="column"
                      mt={{ xs: 2, sm: 7 }}
                    >
                      <Button
                        variant="gradient"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Change Password
                      </Button>
                    </Box>
                  </Box>
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
                  />
                </form>
              );
            }}
          </Formik>
        </Box>
      </Box>
      <Toaster position="top-center" reverseOrder={false} />
    </Box>
  );
};

export default ChangePassword;
ChangePassword.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
