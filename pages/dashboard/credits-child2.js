import React from 'react'
import NftsLayout from '../../src/nftsLayout';

const CreditsChild2 = () => {
  return (
    <div>CreditsChild 2</div>
  )
}

export default CreditsChild2;
CreditsChild2.getLayout = function (page) {
    return <NftsLayout>{page}</NftsLayout>;
  };