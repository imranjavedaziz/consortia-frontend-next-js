import React from 'react'
import { Box } from '@mui/material'
import Image from 'next/image'

function ComingSoon() {
  return (
    <Box sx={{width:'100%', display:'flex', justifyContent:'center'}}>
    <Image
      src="/assets/images/comingSoon.png"
      alt="Coming Soon"
      height={694}
      width={925}
    />
  </Box>
  )
}

export default ComingSoon