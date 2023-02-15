import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect } from "react";
import { useRef } from "react";
import UploadIcon from "@mui/icons-material/Upload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useState } from "react";
import AWS from "aws-sdk";
import toast from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_ACCESS_KEY_SECRET,
});

const CustomFileUpload = ({
  s3Url,
  setS3Url,
  borderRadius,
  width,
  allowPdf = false,
  privateBucket = false,
  practitioner,
  uploadingToS3,
  setUploadingToS3,
  maxUploadSizeMB,
  editFilePayload,
  property
}) => {
  const [file, setFile] = useState("");
  const [userData, setuserData] = useState({});
  const [fileType, setFileType] = useState("");
  // const [uploadingToS3, setUploadingToS3] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const ref = useRef();

  const myBucket = new AWS.S3({
    params: {
      Bucket: privateBucket
        ? process.env.NEXT_PUBLIC_UNLOCKABLE_BUCKET_NAME
        : process.env.NEXT_PUBLIC_BUCKET_NAME,
    },
    region: process.env.REGION,
  });

  const isValidFileType = (fileName) =>
    allowPdf
      ? ["jpg", "png", "pdf"].some((char) => fileName?.endsWith(char))
      : ["jpg", "png"].some((char) => fileName?.endsWith(char));
  // 1MB = 1048576 Bytes
  const isValidFileSize = (fileSize) =>
    fileSize < (maxUploadSizeMB ? maxUploadSizeMB * 1048576 : 1048576);
  useEffect(() => {
    const profileInfo = JSON.parse(localStorage.getItem("profile_info"));
    if (practitioner && profileInfo?.user?.role === "Practitioner") {
      setFile(profileInfo?.user?.headshot);
    }
    if (property && editFilePayload) {
      setFileType("application/pdf")
      setFile(editFilePayload);
    }
    setuserData(profileInfo);
  }, []);

  const handleChange = (e) => {
    if (!isValidFileType(e.target.files[0]?.name)) {
      e.target.value = null;
      allowPdf
        ? toast.error("Only pdf,jpg and png files are allowed")
        : toast.error("Only jpg and png  files are allowed");
      return;
    }

    if (!isValidFileSize(e.target.files[0].size)) {
      e.target.value = null;
      allowPdf
        ? toast.error(
            `Image/File size should be less than ${
              maxUploadSizeMB ? maxUploadSizeMB : 1
            } MB`
          )
        : toast.error("Image size should be less than 1MB");
      return;
    }

    setUploadingToS3(true);
    setFileType(e.target.files[0].type);
    setFile(URL.createObjectURL(e.target.files[0]));
    myBucket.upload(
      {
        Bucket: privateBucket
          ? process.env.NEXT_PUBLIC_UNLOCKABLE_BUCKET_NAME
          : process.env.NEXT_PUBLIC_BUCKET_NAME,
        Key: Date.now() + e.target.files[0].name.replace(/[^./a-zA-Z0-9]/g, ""),
        ContentType: e.target.files[0].type,
        Body: e.target.files[0],
      },
      async (err, data) => {
        if (err) {
          setUploadingToS3(false);
          console.log("err", err);
        } else {
          setS3Url(data?.Location);
          setUploadingToS3(false);
        }
      }
    );
  };

  const handleClick = (e) => {
    ref.current.click();
  };
  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleChange({
      target: {
        files: files,
      },
    });
    // setFiles(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "copy"; // Show "copy" cursor
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <Box
        sx={{
          width: isMobile ? "100%" : width ?? "40vw",
          height: isMobile ? "20vh" : "150px",
          border: "2px dashed #B731FF",
          borderRadius: borderRadius ?? "4px",
        }}
      >
        <Box
          fullWidth
          // onDragOver={(e) => console.log(e.target)}
          // onDrop={(e) => console.log(e)}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
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
            cursor:
              practitioner && userData?.user?.role === "Practitioner"
                ? "arrow"
                : "pointer",
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
          ) : uploadingToS3 ? (
            <CircularProgress color="primary" />
          ) : fileType == "application/pdf" ? (
            <iframe src={file} width="auto" height="100%"></iframe>
          ) : (
            <img src={file} width="auto" height="100%" />
          )}
        </Box>
        <input
          type="file"
          ref={ref}
          disabled={
            practitioner && userData?.user?.role === "Practitioner"
              ? true
              : false
          }
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
