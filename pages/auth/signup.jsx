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
import { ImageLogo } from "../../src/layout/header/Header";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import AuthLayout from "../../src/authLayout/index";
import TextAndDoubleButtons from "../../src/components/modals/textAndDoubleButtons/TextAndDoubleButtons";
import CustomInputField from "../../src/components/common/CustomInputField";

const inputFields = [
  { name: "email", label: "Email Address", placeholder: "mail@example.com" },
  {
    name: "phone",
    label: "Phone Number",
    placeholder: "Enter your phone number",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Minimum of 8 characters",
    sensitive: true,
  },
  {
    name: "confirm_password",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    sensitive: true,
  },
];

const SignUp = () => {
  const [open, setOpen] = useState(true);
  const [isPractitioner, setIsPractitioner] = useState(false);

  return (
    <>
      <TextAndDoubleButtons
        open={open}
        setIsPractitioner={setIsPractitioner}
        title="This Account is for?"
        text="Please select your category if you are a practitioner then select practitioner otherwise select consumer."
        btnText1="consumer"
        btnText2="practitioner"
        setOpen={setOpen}
        height="333px"
      />
      {console.log(isPractitioner)}
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
            <Image
              src="/assets/images/consortiaLogo.svg"
              width={390}
              height={89}
              alt="Logo"
            />
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
          <Typography variant="h3">User Registration</Typography>
          <Formik
            initialValues={{
              isPractitioner: isPractitioner,
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              confirm_password: "",
            }}
            onSubmit={(values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values);
              setSubmitting(false);
            }}
            validationSchema={Yup.object().shape({
              first_name: Yup.string().required("First Name is required"),
              last_name: Yup.string().required("Last Name is required"),
              email: Yup.string()
                .email("Should be a valid email")
                .required("Email is required"),
              phone: Yup.string().required("Phone number is required"),
              password: Yup.string()
                .required("Password is required")
                .min(8, "Password Should have a minimum of 8 characters"),
              confirm_password: Yup.string()
                .required("Confirm Password is required")
                .oneOf([Yup.ref("password"), null], "Passwords must match"),
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
                    <Box>
                      <InputLabel shrink htmlFor="first_name">
                        Name
                      </InputLabel>
                      <Box
                        display="flex"
                        alignItems="start"
                        columnGap={3}
                        justifyContent="space-between"
                      >
                        <CustomInputField
                          name="first_name"
                          placeholder="First Name"
                        />
                        <CustomInputField
                          name="last_name"
                          placeholder="Last Name"
                        />
                      </Box>
                    </Box>
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
                      {isPractitioner ? (
                        <Button
                          variant="gradient"
                          size="large"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          variant="gradient"
                          size="large"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Create Account
                        </Button>
                      )}
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
