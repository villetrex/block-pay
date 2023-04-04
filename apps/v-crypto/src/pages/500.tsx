import { Box, Typography } from '@villetrex/ui';
import Image from 'next/image';

export default function Custom500() {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        p: 4,
      }}
    >
      <Image src={'/svg/superpicks_logo.svg'} alt={'SuperPicks logo'} width={262} height={64} />
      <Typography textAlign="center" sx={{ mt: 4 }}>
        We are facing some technical issues. Please check again in sometime. Apologies for inconvenience!
      </Typography>
    </Box>
  );
}
