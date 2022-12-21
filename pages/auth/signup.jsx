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
import AuthLayout from "../../src/authLayout/index"
import TextAndDoubleButtons from "../../src/components/modals/textAndDoubleButtons/TextAndDoubleButtons";


const SignUp = () => {
  const [open, setOpen] = useState(true)
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);

  return (
   <>
   <TextAndDoubleButtons
        open={open}
        title="This Account is for?"
        text="Please select your category if you are a practitioner then select practitioner otherwise select consumer."
        btnText1="consumer"
        btnText2="practitionar"
        setOpen={setOpen}
        height='333px'
      />
   <Grid container sx={{height:'100%',minHeight:'100vh'}}>
      <Grid
        item
        xs={6}
        sx={{
          background: " url(/assets/images/signupbackground.png) no-repeat",
          backgroundSize: "100%",
          // minHeight: "100vh",
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
        // paddingY={8}
        display="flex"
        flexDirection="column"
        alignItems="center"
        rowGap={3}
        justifyContent="center"
      >
        <Typography variant="h3">User Registration</Typography>

        <Formik
          initialValues={{
            email: "",
            password: "",
            remember: true,
          }}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(true);
            console.log(values);
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Email should be a valid email")
              .required("Email is Required"),
            password: Yup.string().required("Password is required"),
          })}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form onSubmit={handleSubmit} autoComplete='off'>
                <Box
                  display="flex"
                  flexDirection="column"
                  boxSizing="border-box"
                  width="80%"
                  margin="auto"
                  // paddingX={2}
                  rowGap={2}
                >
                  <Box>
                    <InputLabel shrink htmlFor="first-name-input">
                      Enter your Name:
                    </InputLabel>
                    <Box
                      display="flex"
                      // alignItems="center"
                      // justifyContent="center"
                      gap={2}
                    >
                      <TextField
                        inputProps={{
                          style: {
                            height: "15px",
                          },
                        }}
                        sx={{
                          "& legend": { display: "none" },
                          "& fieldset": {
                            top: 0,
                            borderRadius: "24px",
                          },
                        }}
                        id="first-name-input"
                        error={errors.name && touched.name}
                        label=""
                        name="first-name-input"
                        // className={classes.textField}
                        value={values.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={errors.name && touched.name && errors.name}
                      />
                      <TextField
                        inputProps={{
                          style: {
                            height: "15px",
                          },
                        }}
                        sx={{
                          "& legend": { display: "none" },
                          "& fieldset": {
                            top: 0,
                            borderRadius: "24px",
                          },
                        }}
                        id="last-name-input"
                        error={errors.last_name && touched.last_name}
                        label=""
                        name="last-name-input"
                        // className={classes.textField}
                        value={values.last_name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        helperText={
                          errors.last_name &&
                          touched.last_name &&
                          errors.last_name
                        }
                      />
                    </Box>
                  </Box>
                  <Box>
                    <InputLabel shrink htmlFor="email-input">
                      Enter your Email:
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: "15px",
                        },
                      }}
                      sx={{
                        "& legend": { display: "none" },
                        "& fieldset": {
                          top: 0,
                          borderRadius: "24px",
                        },
                      }}
                      id="email-input"
                      error={errors.email && touched.email}
                      label=""
                      name="email"
                      // className={classes.textField}
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.email && touched.email && errors.email}
                    />
                  </Box>

                  <Box>
                    <InputLabel shrink htmlFor="phone-input">
                      Phone Number:
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: "15px",
                        },
                      }}
                      sx={{
                        "& legend": { display: "none" },
                        "& fieldset": {
                          top: 0,
                          borderRadius: "24px",
                        },
                      }}
                      id="phone-input"
                      error={errors.phone && touched.phone}
                      label=""
                      name="phone"
                      // className={classes.textField}
                      value={values.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={errors.phone && touched.phone && errors.phone}
                    />
                  </Box>

                  <Box>
                    <InputLabel shrink htmlFor="password-input">
                      Password:
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: "15px",
                        },
                      }}
                      sx={{
                        "& legend": { display: "none" },
                        "& fieldset": {
                          top: 0,
                          borderRadius: "24px",
                        },
                      }}
                      id="password-input"
                      label=""
                      name="password"
                      error={errors.password && touched.password}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.password && touched.password && errors.password
                      }
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? (
                              <VisibilityOff opacity={0.8} />
                            ) : (
                              <Visibility opacity={0.8} />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </Box>

                  <Box>
                    <InputLabel shrink htmlFor="confirm-password-input">
                      Confirm Password:
                    </InputLabel>
                    <TextField
                      fullWidth
                      inputProps={{
                        style: {
                          height: "15px",
                        },
                      }}
                      sx={{
                        "& legend": { display: "none" },
                        "& fieldset": {
                          top: 0,
                          borderRadius: "24px",
                        },
                      }}
                      id="confirm-password-input"
                      label=""
                      name="confirm_password"
                      error={
                        errors.confirm_password && touched.confirm_password
                      }
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      helperText={
                        errors.confirm_password &&
                        touched.confirm_password &&
                        errors.confirm_password
                      }
                      type={showConfirmPassword ? "text" : "password"}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowConfirmPassword}
                            edge="end"
                          >
                            {showConfirmPassword ? (
                              <VisibilityOff opacity={0.8} />
                            ) : (
                              <Visibility opacity={0.8} />
                            )}
                          </IconButton>
                        ),
                      }}
                    />
                  </Box>

                  <Box display="flex" flexDirection="column">
                    <Button
                      variant="gradient"
                      size="large"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Create Account
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

SignUp.getLayout = function(page) {
    return <AuthLayout>{page}</AuthLayout>;
  };