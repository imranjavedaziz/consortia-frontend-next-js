import React, { useState } from "react";
import ComingSoon from "../src/components/common/comingSoon/ComingSoon";
import NftsLayout from "../src/nftsLayout";
import DialogTextInput from "../src/components/modals/dialogTextInput/DialogTextInput"


function Community() {
  return (
    <>
      {/* <ComingSoon /> */} nft
    </>
  );
}

export default Community;
Community.getLayout = function (page) {
  return <NftsLayout>{page}</NftsLayout>;
};