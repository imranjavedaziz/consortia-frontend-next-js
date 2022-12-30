import { Typography, Box, Button } from "@mui/material";
import React, { useState } from "react";
import NftsLayout from "../../src/nftsLayout";
import { Formik } from "formik";
import * as Yup from "yup";
import CustomInputField from "../../src/components/common/CustomInputField";
import { publicAxios } from "../../src/api";
import toast, { Toaster } from "react-hot-toast";
import VerifyCodeModal from "../../src/components/modals/verifyCode/VerifyCode";

const inputFields = [
  {
    name: "current_password",
    label: "Current Password",
    placeholder: "Enter Your Current Password",
    sensitive: true,
  },
  {
    name: "password",
    label: "New Password",
    placeholder: "Enter Your New Password",
    sensitive: true,
  },
  {
    name: "confirm_password",
    label: "Confirm New Password",
    placeholder: "Confirm Your New Password",
    sensitive: true,
  },
];

const ChangePassword = () => {
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
      console.log(res?.data?.message);
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
    <Box marginY={5}>
      <Typography variant="h3" marginY={5}>
        Settings
      </Typography>
      <Box
        display="flex"
        paddingY={4}
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
          <Typography variant="h4">Password</Typography>
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
              .min(8, "Password Should have a minimum of 8 characters")
              .matches(
                /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
                "Must contain atleast one lowercase, one uppercase, a number, and a symbol"
              ),
            confirm_password: Yup.string()
              .required("Confirm Password is required")
              .oneOf([Yup.ref("password"), null], "Passwords must match"),
          })}
        >
          {(props) => {
            const { isSubmitting, handleSubmit, values, resetForm } = props;
            return (
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                style={{ width: "80%", maxWidth: "800px" }}
              >
                <Box
                  display="flex"
                  flexDirection="column"
                  boxSizing="border-box"
                  width="80%"
                  margin="auto"
                  // paddingX={2}
                  rowGap={3}
                >
                  {inputFields.map(
                    ({ name, label, placeholder, sensitive }) => (
                      <CustomInputField
                        key={name}
                        name={name}
                        label={label}
                        placeholder={placeholder}
                        sensitive={sensitive}
                      />
                    )
                  )}

                  <Box display="flex" flexDirection="column">
                    <Button
                      variant="gradient"
                      size="large"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Save Settings
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
      <Toaster position="top-center" reverseOrder={false} />
    </Box>
  );
};

export default ChangePassword;
ChangePassword.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
