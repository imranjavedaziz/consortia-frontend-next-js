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
        src="/assets/images/comingSoon.png"
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
