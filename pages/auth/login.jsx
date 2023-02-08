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
  useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { ImageLogo } from "../../src/layout/header/Header";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import AuthLayout from "../../src/authLayout/index";
import CustomInputField from "../../src/components/common/CustomInputField";
import toast, { Toaster } from "react-hot-toast";
import { publicAxios } from "../../src/api";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import DialogTextInput from "../../src/components/modals/dialogTextInput/DialogTextInput";
import DialogResetPassword from "../../src/components/modals/resetPassword/DialogResetPassword";
import { useTitle } from "../../src/utils/Title";
import { useAuthContext } from "../../src/context/AuthContext";
import { AUTH_LOGIN } from "../../src/constants/endpoints";

function Login() {
  useTitle("Login");

  const { push } = useRouter();
  const [emailVerificationOpen, setEmailVerificationOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const { setShowSecondForm, setChoosePractitionerOpen } = useAuthContext();

  const belowSm = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "sm")
  );

  const login = async ({ email, password, remember }) => {
    try {
      const res = await publicAxios.post(`${AUTH_LOGIN}`, {
        email: email.toLowerCase(),
        password,
        rememberMe: remember,
      });
      console.log(res?.data?.data);
      localStorage.setItem("profile_info", JSON.stringify(res?.data?.data));
      localStorage.setItem("access", res?.data?.data?.access);
      toast.success("Welcome Back!");
      if (
        res?.data?.data?.user?.practitionerType ||
        res?.data?.data?.user?.role == "Consumer"
      ) {
        push("/dashboard/landing");
      } else {
        setShowSecondForm(true);
        setChoosePractitionerOpen(false);
        push("signup");
      }
    } catch (error) {
      if (error?.data?.email_verified === false) {
        if (Array.isArray(error?.data?.message)) {
          toast.error(error?.data?.message?.error?.[0]);
        } else {
          if(typeof(error?.data?.message) === 'string'){
            toast.error(error?.data?.message);
          }else{
            toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
          }
        }
        setEmail(email);
        setEmailVerificationOpen(true);
        return;
      }

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
      <DialogTextInput
        open={emailVerificationOpen}
        setOpen={setEmailVerificationOpen}
        title="Verification Code"
        text="Verification code has been sent to your email"
        btnText="Submit"
        inputTypeCode
        placeholder="Enter your verification code"
        email={email}
      />
      <DialogResetPassword
        open={resetPasswordOpen}
        setOpen={setResetPasswordOpen}
        title="Reset Password"
        text="Please enter your email address and we will email you a link to reset your password."
        btnText="Send Request"
        placeholder="Mail@example.com"
      />

      <Grid container sx={{ height: "100%", minHeight: "100vh" }}>
        <Grid
          item
          md={6}
          xs={12}
          display="flex"
          flexDirection="column"
          gap={3}
          alignItems="center"
          justifyContent="center"
        >
          <ImageLogo
            sx={{
              ":hover": { cursor: "pointer" },
              padding: { xs: "24px 0px 32px 0px", md: "0px" },
            }}
            onClick={() => push("/")}
          >
            <Image
              src="/assets/images/consortiaLogo.svg"
              width={belowSm ? 104 : 217}
              height={belowSm ? 54 : 125}
              alt="Logo"
            />
          </ImageLogo>
          <Typography variant="h3">Hello! Welcome Back</Typography>
          <Typography variant="h4">Login to your account</Typography>

          <Formik
            initialValues={{
              email: "",
              password: "",
              remember: true,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              await login(values);
            }}
            validationSchema={Yup.object().shape({
              email: Yup.string()
                .email("Email should be a valid email")
                .required("Email is required"),
              password: Yup.string().required("Password is required"),
            })}
          >
            {(props) => {
              const { values, isSubmitting, handleChange, handleSubmit } =
                props;
              return (
                <form onSubmit={handleSubmit} style={{ width: "70%" }}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    rowGap={5}
                    sx={{ width: "100%" }}
                  >
                    <CustomInputField
                      name="email"
                      label="Enter Your Email"
                      placeholder="mail@example.com"
                    />
                    <CustomInputField
                      name="password"
                      label="Password"
                      placeholder="Password"
                      sensitive
                      onCutHandler={(e) => e.preventDefault()}
                      onCopyHandler={(e) => e.preventDefault()}
                      onPasteHandler={(e) => e.preventDefault()}
                    />

                    <Box display="flex" flexDirection="column">
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="space-between"
                      >
                        <FormControlLabel
                          name="remember"
                          onChange={handleChange}
                          control={
                            <Checkbox
                              checked={values.remember}
                              sx={{
                                color: "#3DB8D1",
                                "&.Mui-checked": {
                                  color: "#3DB8D1",
                                },
                              }}
                            />
                          }
                          label={
                            <Typography variant="body2">Remember Me</Typography>
                          }
                        />
                        <Button
                          variant="text"
                          onClick={() => setResetPasswordOpen(true)}
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              color: "#AC61D7",
                              textTransform: "none",
                              textDecoration: "underline",
                            }}
                          >
                            Forgot Password?
                          </Typography>
                        </Button>
                      </Box>
                      <LoadingButton
                        variant="contained"
                        color="primary"
                        type="submit"
                        loading={isSubmitting}
                        sx={{
                          background:
                            "linear-gradient(90deg, #1D2CDF 2.38%, #B731FF 100%)",
                          borderRadius: "24px",
                          width: { xs: "90%", md: "100%" },
                          textTransform: "capitalize",
                        }}
                      >
                        Login
                      </LoadingButton>
                      <Typography
                        variant="body2"
                        textAlign="center"
                        fontWeight={500}
                      >
                        Don&apos;t have an account yet?{" "}
                        <Button
                          variant="text"
                          onClick={() => push("signup")}
                          sx={{
                            textDecoration: "underline",
                            textTransform: "none",
                            fontSize: "16px",
                            color: "#6720FF",
                          }}
                        >
                          Signup
                        </Button>
                      </Typography>
                    </Box>
                  </Box>
                </form>
              );
            }}
          </Formik>
        </Grid>
        <Grid
          item
          xs={6}
          display={{ md: "flex", xs: "none" }}
          alignItems="center"
          justifyContent="center"
        >
          <Card
            sx={{ background: "inherit", width: "80%", margin: "auto" }}
            elevation={0}
          >
            <CardMedia
              title="Laptop"
              image="/assets/images/loginLaptopImage.png"
              component="img"
            />
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Login;
Login.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};
