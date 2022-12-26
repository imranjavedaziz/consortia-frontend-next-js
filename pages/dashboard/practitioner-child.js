import React from 'react'
import NftsLayout from '../../src/nftsLayout';

const Practitioner = () => {
  return (
    <div>Practitioner</div>
  )
}

export default Practitioner;
Practitioner.getLayout = function (page) {
    return <NftsLayout>{page}</NftsLayout>;
  };