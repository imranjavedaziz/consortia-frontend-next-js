import React from "react";
import { Typography } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { Box } from "@mui/system";
import Image from "next/image";
import { useRouter } from "next/router";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function VerificationModal({ open, setOpen, text, title, imageSrc }) {
  const { push } = useRouter();

  const handleClose = () => {
    setOpen(false);
    push("/nftWallet/NftWallet");
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: "secondary.purpleGray",
            borderRadius: "24px",
            width: "571px",
            // height: "397px",
            padding: "24px 38px 40px 38px",
          },
        }}
      >
        <DialogTitle
          sx={{
            padding: "0px 0px 16px 0px",
            display: "block",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center" }}
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <Box sx={{ paddingRight: 5 }}>
              <Image src={imageSrc} height={147} width={160} alt="" />
            </Box>
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
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ padding: "20px 10px 0px 10px" }}>
          <Typography variant="body1" textAlign="center">
            {text}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default VerificationModal;
