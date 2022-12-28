import React from 'react'
import NftsLayout from '../../src/nftsLayout';

const MintNFTS = () => {
  return (
    <div>MintNFTS</div>
  )
}

export default MintNFTS;
MintNFTS.getLayout = function (page) {
    return <NftsLayout>{page}</NftsLayout>;
  };