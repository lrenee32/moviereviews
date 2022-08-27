import { FunctionComponent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import NoSsr from '@mui/material/NoSsr';
import NextLink from 'next/link';
import { SocialLinks } from './socials';
import { FooterLinks } from './footer-links';

export const Footer: FunctionComponent = () => {
  return (
    <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', mt: '120px' }}>
      <NextLink href="/" passHref>
        <Box
          component="img"
          alt="site-logo-footer"
          src="../../images/site-logo.png"
          sx={{ width: '300px', mb: '30px', '&:hover': { cursor: 'pointer' } }}
        />
      </NextLink>
      <SocialLinks sx={{ mb: '30px' }} />
      <FooterLinks />
      <NoSsr>
        <Typography paddingY="20px">{`Copyright © ${new Date().getFullYear()} Splatter & Scream, LLC`}</Typography>
      </NoSsr>
    </AppBar>
  );
};
