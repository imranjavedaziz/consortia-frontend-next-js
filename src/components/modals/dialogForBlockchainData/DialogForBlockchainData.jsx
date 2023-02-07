import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import Image from "next/image";
import toast from "react-hot-toast";
import { PROPERTY_NFT_BLOCKCHAIN_DATA } from "../../../constants/endpoints";
import * as Yup from "yup";
import { Formik } from "formik";
import CustomInputField from "../../common/CustomInputField";
import { publicAxios } from "../../../api";
import { useRouter } from "next/router";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const inputFields = [
  { name: "email", label: "Email Address", placeholder: "mail@example.com" },
  //   {
  //     name: "phoneNumber",
  //     label: "Phone Number",
  //     placeholder: "+12345678900",
  //     inputType: "phone",
  //   },
];

function DialogForBlockchainData({
  open,
  setOpen,
  text,
  title,
  endpoint,
  input,
  btnText,
  placeholder,
  inputTypeCode,
  isPractitioner,
  setShowSecondForm,
}) {
  const handleClose = () => {
    setOpen(false);
    // setEmail("");
  };
  const [resData, setResData] = useState({});
  const [fetching, setFetching] = useState(false);
  const [otpModalOpen, setOtpModalOpen] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const { push, query } = useRouter();

  useEffect(() => {
    resetPassword();
  }, [query?.id]);

  const resetPassword = async (values) => {
    // if(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
    try {
      setFetching(true);
      const res = await publicAxios.get(endpoint + `?id=${query?.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
      console.log("resdfsf", res.data.data);
      setFetching(false);
      setResData(res?.data?.data);
      //   toast.success(res?.data?.message);
      //   setOtpModalOpen(true);
      // handleClose();
    } catch (error) {
      setFetching(false);
      if (Array.isArray(error?.data?.message)) {
        toast.error(error?.data?.message?.error?.[0]);
      } else {
        if (typeof error?.data?.message === "string") {
          toast.error(error?.data?.message);
        } else {
          if (error?.data?.message) {
            toast.error(Object.values(error?.data?.message)?.[0]?.[0]);
          }
        }
      }
    }
    // }else{
    // setIsValidEmail(false)
    // toast.error('Please enter a valid email!')
    // }
  };
  const blockchainData = {
    owner: resData?.owner,
    tokenId: resData?.tokenId,
    tokenURI: resData?.tokenURI,
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
        <DialogContent>
          <Box sx={{ width: "100%" }}>{JSON.stringify(resData?.nftDetail)}</Box>
          <Box sx={{ width: "100%" }}>
              {JSON.stringify(blockchainData)}
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default DialogForBlockchainData;
