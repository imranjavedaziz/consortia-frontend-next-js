import React from 'react'
import NftsLayout from '../../src/nftsLayout';

const TagNFTS = () => {
  return (
    <div>TagNFT</div>
  )
}

export default TagNFTS;
TagNFTS.getLayout = function (page) {
    return <NftsLayout>{page}</NftsLayout>;
  };