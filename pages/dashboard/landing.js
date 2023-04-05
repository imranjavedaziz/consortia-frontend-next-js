import React, { useState, useEffect } from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import { useRouter } from "next/router";
import { useTitle } from "../../src/utils/Title";
import { publicAxios } from "../../src/api";
import { VIDEO_WATCHED } from "../../src/constants/endpoints";

function Landing() {
  useTitle("Dasboard");
  const { push, asPath } = useRouter();
  const [profileInfo, setProfileInfo] = useState({});
  const [videoCount, setVideoCount] = useState(0);
  const [player, setPlayer] = useState({});

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem("videos"))) getVideos();
  }, []);
  useEffect(() => {
    const profile_info = JSON.parse(localStorage.getItem("profile_info"));
    setProfileInfo(profile_info);
    if (!profile_info?.user?.isConfirmed) {
      updateVideoStatus();
      let updatedData = structuredClone(profile_info);
      updatedData.user.isConfirmed = true;
      localStorage.setItem("profile_info", JSON.stringify(updatedData));
    }

    let videoCountLocal = JSON.parse(localStorage.getItem("video_count"));
    const videosList = JSON.parse(localStorage.getItem("videos"));
    localStorage.setItem(
      "video_count",
      JSON.stringify(
        videoCountLocal === videosList?.length - 1 ? 0 : videoCountLocal + 1
      )
    );

    videoCountLocal === videosList?.length - 1
      ? setPlayer(videosList?.[0])
      : setPlayer(videosList?.[videoCountLocal + 1]);
  }, [asPath]);

  const updateVideoStatus = async () => {
    try {
      const res = await publicAxios.get(VIDEO_WATCHED, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getVideos = async () => {
    const res = await publicAxios.get(
      "https://content-youtube.googleapis.com/youtube/v3/playlistItems?playlistId=PL0fdpt9qgI7lPBOwI9GdnZ9leeU5b5v9B&part=snippet&key=AIzaSyBFcsX8Ye6MM42TsUtbEIWnj7sSpmmYwLE&maxResults=50",
      {}
    );

    if (res.status == 200) {
      localStorage.setItem("video_count", JSON.stringify(0));
      const updatedVideosData = res.data.items.map((item) => ({
        position: item.snippet.position,
        resourceId: item.snippet.resourceId,
      }));
      setPlayer(updatedVideosData?.[0]);
      localStorage.setItem("videos", JSON.stringify(updatedVideosData));
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: { xs: "10px", md: "40px" } }}>
        <Typography variant="h3">
          {profileInfo?.user?.role === "Practitioner"
            ? "Practitioner "
            : "Consumer "}
          Dashboard
        </Typography>
      </Box>
      <Box>
        {profileInfo?.user?.isConfirmed ? (
          <CardMedia
            component="iframe"
            src={`https://www.youtube.com/embed/${player?.resourceId?.videoId}`}
            controls
            title="title"
            image={`https://www.youtube.com/embed/${player?.resourceId?.videoId}`}
            autoPlay
            allow="autoPlay"
            sx={{ height: { xs: "150px", md: "373px" }, border: "none" }}
          />
        ) : (
          <CardMedia
            component="iframe"
            src="https://consortiamedia.s3.amazonaws.com/Getting+Started+-+WITH+CAPTIONS.mp4"
            controls
            title="title"
            image="https://consortiamedia.s3.amazonaws.com/Getting+Started+-+WITH+CAPTIONS.mp4"
            autoPlay
            allow="autoPlay"
            sx={{ height: { xs: "150px", md: "373px" }, border: "none" }}
          />
        )}
        {/* <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${player?.resourceId?.videoId}`}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe> */}
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "40px",
          columnGap: { xs: 2, md: 5 },
        }}
      >
        {profileInfo?.user?.role === "Practitioner" && (
          <Box
            width={230}
            // mr={5}
            onClick={() => push("/practitionerNfts/mint-nft")}
          >
            <Button
              variant="gradient"
              size="large"
              sx={{ fontSize: { xs: "10px", md: "20px" } }}
            >
              Mint Practitioner
            </Button>
          </Box>
        )}
        <Box width={230} onClick={() => push("/property/mint-nft")}>
          <Button
            variant="gradient"
            size="large"
            sx={{ fontSize: { xs: "10px", md: "20px" } }}
          >
            Mint Property NFT
          </Button>
        </Box>
        {/*
        <Box width={230} onClick={handleDownload}>
          <Button
            variant="gradient"
            size="large"
            sx={{ fontSize: { xs: "10px", md: "20px" } }}
          >
            Download
          </Button>
        </Box>
        */}
      </Box>
    </>
  );
}

export default Landing;
Landing.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};
export async function getServerSideProps(context) {
  const { access, profile_info = JSON.stringify({}) } = context.req.cookies;
  let profileInfoData = JSON.parse(profile_info);
  if (
    (profileInfoData?.user?.role == "Practitioner" &&
      profileInfoData?.user?.practitionerType &&
      access) ||
    (profileInfoData?.user?.role == "Consumer" && access)
  ) {
    return { props: { access } };
  } else {
    return { redirect: { destination: "/auth/login", permanent: false } };
  }
  // if (!access) {
  //   return { redirect: { destination: "/auth/login", permanent: false } };
  // }

  // return { props: { access } };
}
