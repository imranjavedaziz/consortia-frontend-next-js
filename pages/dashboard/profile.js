import { Box } from "@mui/material";
import Image from "next/image";
import React from "react";
import ComingSoon from "../../src/components/common/comingSoon/ComingSoon";
import NftsLayout from "../../src/nftsLayout";

const Profile = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Image
        src="/assets/images/comingSoon.svg"
        alt="Coming Soon"
        height={400}
        width={600}
      />
    </Box>
  );
};

export default Profile;
Profile.getLayout = function (page) {
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
