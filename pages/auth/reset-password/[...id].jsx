import Image from "next/image";
import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthLayout from "../../../src/authLayout/index";
import toast, { Toaster } from "react-hot-toast";

import { useRouter } from "next/router";
import CustomInputField from "../../../src/components/common/CustomInputField";
import { publicAxios } from "../../../src/api";
import { useTitle } from "../../../src/utils/Title";
import { RESET_PASSWORD } from "../../../src/constants/endpoints";

const inputFields = [
  {
    name: "password",
    label: "Password",
    placeholder: "Minimum of 8 characters",
    sensitive: true,
    onCutCopyPaste: (e) => e.preventDefault(),
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    sensitive: true,
    onCutCopyPaste: (e) => e.preventDefault(),
  },
];

const SignUp = () => {
  const {
    push,
    query: { id },
    route,
    asPath,
  } = useRouter();
  useTitle("Reset Password");
  console.log(id, route, asPath);
  const resetPassword = async ({ password, confirm_password }) => {
    try {
      const res = await publicAxios.post(`${RESET_PASSWORD}/${id.join("/")}`, {
        password,
        confirm_password,
      });
      toast.success("Password set successfully");
      // localStorage.getItem("access", res?.data?.data?.token);
      setTimeout(() => push("/auth/login"), 2500);
    } catch (error) {
      // toast.error(error?.data?.message);
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        if(typeof(error?.data?.message) === 'string'){
            toast.error(error?.data?.message);
          }else{
            toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
          }
      }
    }
  };

  return (
    <>
      <Grid container sx={{ height: "100%", minHeight: "100vh" }}>
        <Grid
          item
          xs={6}
          sx={{
            background: " url(/assets/images/signupbackground.png) no-repeat",
            backgroundSize: "cover",
          }}
        >
          <Box
            height="100%"
            paddingY={5}
            sx={{
              background: "rgba(24, 10, 91, 0.8)",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Box sx={{ ":hover": { cursor: "pointer" } }}>
              <Image
                onClick={() => push("/")}
                src="/assets/images/consortiaLogo.svg"
                width={390}
                height={89}
                alt="Logo"
              />
            </Box>
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          display="flex"
          flexDirection="column"
          alignItems="center"
          rowGap={3}
          justifyContent="center"
        >
          <Typography variant="h3">Enter New Password</Typography>
          <Formik
            initialValues={{
              password: "",
              confirm_password: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              await resetPassword(values);
              setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              password: Yup.string()
                .required("Password is required")
                .min(8, "Password should have a minimum of 8 characters")
                .matches(
                  /(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$/,
                  "Must contain atleast one lowercase, one uppercase, a number, and a symbol"
                ),
              confirm_password: Yup.string()
                .required("Confirm Password is required")
                .oneOf([Yup.ref("password"), null], "Password must match"),
            })}
          >
            {(props) => {
              const { isSubmitting, handleSubmit } = props;
              return (
                <form
                  onSubmit={handleSubmit}
                  autoComplete="off"
                  style={{ width: "80%" }}
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
                      ({ name, label, placeholder, sensitive,onCutCopyPaste }) => (
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

                    <Box display="flex" flexDirection="column">
                      <Button
                        variant="gradient"
                        size="large"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Reset Password
                      </Button>
                    </Box>
                  </Box>
                </form>
              );
            }}
          </Formik>
          <Box></Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SignUp;

SignUp.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};
