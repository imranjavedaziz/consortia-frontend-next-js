import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'next/image'

function ComingSoon() {
  return (
    <Box sx={{width:'100%', display:'flex',flexDirection:'column', justifyContent:'center'}}>
      <Box >
        <Box sx={{display:'flex', justifyContent:'center',width:'100%'}}><Image src='/assets/icons/speaker.svg' height={43} width={48} alt='speaker' />
        <Typography variant='h3' sx={{paddingLeft:'28px'}}>
        List for Sale coming soon
        </Typography>
        </Box>
      </Box>
      <Box sx={{display:'flex', justifyContent:'center',width:'100%'}}>
      <Image
      src="/assets/images/comingSoon.svg"
      alt="Coming Soon"
      height={676}
      width={601}
    />
      </Box>
    
  </Box>
  )
}

export default ComingSoon