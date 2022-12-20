import React from "react";
import { Button, Typography } from "@mui/material";
import AuthLayout from "../../src/authLayout/index";
import DialogTextInput from "../../src/components/dialogTextInput/DialogTextInput";

function Login() {
  const [open, setOpen] = React.useState(false);
  const [openVeri, setOpenVeri] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleVeriClickOpen = () => {
    setOpenVeri(true);
  };
  return (
    <>
      <DialogTextInput
        open={open}
        setOpen={setOpen}
        title="Reset Password"
        text="Please enter your email address or username and we will email you a link to reset your password."
        btnText='Send Request'
      />
      <div>
        <Button variant="contained" onClick={handleClickOpen}>
          Modal
        </Button>
      </div>
      <DialogTextInput
        open={openVeri}
        setOpen={setOpenVeri}
        title="Verification Code"
        text="Verification Code has been sent to your mail and mobile number."
        btnText='Submit'
      />
      <div>
        <Button variant="contained" onClick={handleVeriClickOpen}>
          Verification
        </Button>
      </div>
    </>
  );
}

export default Login;
Login.getLayout = function (page) {
  return <AuthLayout>{page}</AuthLayout>;
};
