import React from "react";
import NftsLayout from "../../src/nftsLayout";

const TagNFTS = () => {
  return <div>TagNFT</div>;
};

export default TagNFTS;
TagNFTS.getLayout = function (page) {
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
