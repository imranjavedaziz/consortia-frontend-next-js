import React from 'react'
import NftsLayout from '../../src/nftsLayout';

const CreditsChild = () => {
  return (
    <div>CreditsChild 1</div>
  )
}

export default CreditsChild;
CreditsChild.getLayout = function (page) {
    return <NftsLayout>{page}</NftsLayout>;
  };