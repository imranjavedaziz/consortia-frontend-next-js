import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useRef } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";
import AWS from "aws-sdk";
import toast from "react-hot-toast";

const S3_BUCKET = "consortiamedia";
const REGION = "us-east-1";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY_SECRET,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

const validImage = (img) =>
  ["jpg", "png", "gif", "svg"].some((char) => img.endsWith(char));

const CustomFileUpload = ({ s3Url, setS3Url, borderRadius, width }) => {
  const [file, setFile] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const ref = useRef();
  const handleChange = (e) => {
    if (validImage(e.target.files[0].name)) {
      if (e.target.files[0].size < 5242880) {
        setFile(URL.createObjectURL(e.target.files[0]));
        myBucket.upload(
          {
            Bucket: S3_BUCKET,
            Key: e.target.files[0].name,
            Body: e.target.files[0],
          },
          async (err, data) => {
            if (err) {
              console.log(err);
            } else {
              setS3Url(data?.Location);
            }
          }
        );
      } else {
        toast.error("Image size should be less than 5MB");
      }
    } else {
      toast.error("Only jpg, png, gif and svg files are allowed");
    }
  };

  const handleClick = (e) => {
    ref.current.click();
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: isMobile ? "100%" : width ?? "40vw",
          height: isMobile ? "30vh" : "150px",
          border: "2px dashed #B731FF",
          borderRadius: borderRadius ?? "4px",
        }}
      >
        <Box
          // component="label"
          fullWidth
          sx={{
            height: "100%",
            width: "100%",
            padding: "0px",
            fontSize: "24px",
            background:
              "linear-gradient(94.09deg, #12134D 3.97%, #10053C 51.03%, #12134D 95.99%)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: borderRadius ?? "4px",
            cursor: "pointer",
          }}
          onClick={handleClick}
        >
          {file == "" ? (
            <Stack alignItems={"center"} spacing={1} direction="row">
              <UploadIcon
                color="#FAFBFC"
                sx={{ fontSize: 30, color: "#FAFBFC", opacity: 0.5 }}
              />
              <Typography
                variant="subtitle1"
                sx={{ color: "#FAFBFC", opacity: 0.5 }}
              >
                Click to upload photo
              </Typography>
            </Stack>
          ) : (
            <img src={file} width="auto" height="100%" />
          )}
        </Box>
        <input
          type="file"
          ref={ref}
          hidden
          width={"100%"}
          height="100%"
          onChange={handleChange}
        />
      </Box>
    </div>
  );
};

export default CustomFileUpload;
