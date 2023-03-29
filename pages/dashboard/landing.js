import React, { useState, useEffect } from "react";
import { Box, Button, CardMedia, Typography } from "@mui/material";
import NftsLayout from "../../src/nftsLayout";
import { useRouter } from "next/router";
import { useTitle } from "../../src/utils/Title";
import { publicAxios } from "../../src/api";
import { VIDEO_WATCHED } from "../../src/constants/endpoints";
import YouTube from "react-youtube";

function Landing() {
  useTitle("Dasboard");
  const { push } = useRouter();
  const [profileInfo, setProfileInfo] = useState({});

  useEffect(() => {
    const profile_info = JSON.parse(localStorage.getItem("profile_info"));
    setProfileInfo(profile_info);
    if (profile_info?.user?.isConfirmed) {
      updateVideoStatus();
    }
  }, []);
  const [player, setPlayer] = useState(null);
  const onReady = (event) => {
    setPlayer(event.target);
    event.target.addEventListener("onStateChange", onStateChange);
  };
  console.log("player.getPlaylist()", player.getPlaylist());
  const onStateChange = (event) => {
    console.log("event.data", event);
    if (event?.data === 0) {
      const nextVideoId = player.getPlaylist()?.[player.getPlaylistIndex() + 1];
      player.loadVideoById(nextVideoId);
    }
  };
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
  const opts = {
    height: "373px",
    width: "640",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
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
        {/* <CardMedia
          component="iframe"
          src="https://consortiamedia.s3.amazonaws.com/Getting+Started+-+WITH+CAPTIONS.mp4"
          controls
          title="title"
          image="https://consortiamedia.s3.amazonaws.com/Getting+Started+-+WITH+CAPTIONS.mp4"
          autoPlay
          allow="autoPlay"
          sx={{ height: { xs: "150px", md: "373px" }, border: "none" }}
        /> */}
        <YouTube
          videoId="gebQXkAhSUk"
          channelId="UCfRUkwXM-NBejbQBJXR8U6w"
          onReady={onReady}
          opts={{
            playerVars: {
              autoplay: 1,
              listType: "playlist",
              list: "UCfRUkwXM-NBejbQBJXR8U6w",
            },
          }}
        />
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
