import React, { useState } from "react";
import { Typography, useMediaQuery } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/system";
import Image from "next/image";
import { publicAxios } from "../../../api";
import toast from "react-hot-toast";
import { LoadingButton } from "@mui/lab";
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

function DialogResetPassword({ open, setOpen, text, title, btnText }) {
  const handleClose = () => {
    setOpen(false);
    setEmail("");
  };
  const [email, setEmail] = useState("");
  const [fetching, setFetching] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);

  const belowSm = useMediaQuery((theme) =>
    theme.breakpoints.between("xs", "sm")
  );

  const resetPassword = async (values) => {
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
        // onClose={handleClose}
        // aria-describedby="alert-dialog-slide-description"
        PaperProps={{
          sx: {
            backgroundColor: "secondary.purpleGray",
            // height: "397px",
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
                height={belowSm ? 12 : 22}
                width={belowSm ? 12 : 22}
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
                <DialogContent sx={{ padding: { xs: "0px 0px", md: "none" } }}>
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
                <DialogActions
                  sx={{ padding: { xs: "16px 0px 0px 0px", md: "16px 0px" } }}
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
