import React from 'react'
import NftsLayout from '../../src/nftsLayout';

const Practitioner2 = () => {
  return (
    <div>Practitioner 2</div>
  )
}

export default Practitioner2;
Practitioner2.getLayout = function (page) {
    return <NftsLayout>{page}</NftsLayout>;
  };