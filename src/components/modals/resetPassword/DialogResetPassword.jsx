import React, { useState } from "react";
import { Button, IconButton, TextField, Typography } from "@mui/material";
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
import { useRouter } from "next/router";
import { FORGET_PASSWORD } from "../../../constants/endpoints";
import * as Yup from "yup";
import { Formik } from "formik";
import CustomInputField from "../../common/CustomInputField";
import DialogOTPSend from "./DialogOTPSend";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const inputFields = [
  { name: "email", label: "Email Address", placeholder: "mail@example.com" },
  {
    name: "phoneNumber",
    label: "Phone Number",
    placeholder: "+12345678900",
    inputType: "phone",
  },
];

function DialogResetPassword({
  open,
  setOpen,
  text,
  title,
  input,
  btnText,
  placeholder,
  inputTypeCode,
  isPractitioner,
  setShowSecondForm,
}) {
  const handleClose = () => {
    setOpen(false);
    setEmail("");
  };
  const [email, setEmail] = useState("");
  const [fetching, setFetching] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const resetPassword = async (values) => {
    // if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    try {
      setFetching(true);
      const res = await publicAxios.post(FORGET_PASSWORD, {
        email: values.email,
        phoneNumber: `+${values.phoneNumber}`,
      });
      setFetching(false);
      setEmail(values.email);
      toast.success(res?.data?.message);
      setOtpModalOpen(true);
      // handleClose();
    } catch (error) {
      setFetching(false);
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
    // }else{
    // setIsValidEmail(false)
    // toast.error('Please enter a valid email!')
    // }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        // onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            backgroundColor: "secondary.purpleGray",
            borderRadius: "24px",
            width: "571px",
            // height: "397px",
            padding: "40px",
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
            <Typography variant="h4" sx={{ fontWeight: 600 }}>
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                ":hover": { cursor: "pointer" },
              }}
              onClick={handleClose}
            >
              <Image
                src="/assets/icons/cross.svg"
                height={22}
                width={22}
                alt=""
              />
            </Box>
          </Box>
        </DialogTitle>
        <Formik
          initialValues={{
            phoneNumber: "",
            email: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            await resetPassword(values);
            setSubmitting(false);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email("Email should be a valid email")
              .required("Email is required"),
            phoneNumber: Yup.string()
              .required("Phone number is required")
              .min(1, "Phone number is required"),
          })}
        >
          {(props) => {
            const { isSubmitting, handleSubmit, setFieldValue } = props;
            return (
              <form
                onSubmit={handleSubmit}
                autoComplete="off"
                style={{ width: { md: "100%", xs: "100%" } }}
              >
                <DialogContent
                // sx={{ padding: "20px 0px" }}
                >
                  <Typography variant="body1">{text}</Typography>
                  <Box>
                    {/* <TextFieldWrapper> */}

                    {/* <TextField
                sx={{
                  "& .MuiInputLabel-root": { color: "green" },
                  borderColor:
                    "linear-gradient(253.4deg, #B731FF 16.47%, #1D2CDF 95.2%)",
                  borderRadius: 1,
                }}
              /> */}
                    {/* </TextFieldWrapper> */}

                    <Box
                      display="flex"
                      flexDirection="column"
                      boxSizing="border-box"
                      width="100%"
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
                          inputType,
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
                            inputType={inputType}
                            setFieldValue={setFieldValue}
                          />
                        )
                      )}
                    </Box>
                  </Box>
                </DialogContent>
                <DialogActions sx={{ padding: "16px 0px" }}>
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
                      }}
                      type="submit"
                      disabled={isSubmitting}

                      // onClick={() => resetPassword(email)}
                    >
                      {btnText}
                    </LoadingButton>
                  </Box>
                </DialogActions>
              </form>
            );
          }}
        </Formik>
      </Dialog>
      <DialogOTPSend
        email={email}
        text="Please enter phone and email otp"
        title="OTP Verification"
        btnText="Verify"
        open={otpModalOpen}
        setOpen={setOtpModalOpen}
      />
    </>
  );
}

export default DialogResetPassword;
