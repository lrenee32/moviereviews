import { FunctionComponent } from 'react';
import Image from 'next/future/image';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import NoSsr from '@mui/material/NoSsr';
import NextLink from 'next/link';
import { SocialLinks } from './socials';
import { FooterLinks } from './footer-links';
import styles from 'assets/styles/footer.module.scss';

export const Footer: FunctionComponent = () => {
  return (
    <AppBar className={styles['footer-container']}>
      <NextLink href="/" passHref>
        <Image
          src="/images/site-logo.png"
          alt="site-logo-footer"
          height="300"
          width="300"
          className={styles['logo']}
        />
      </NextLink>
      <SocialLinks sx={{ mb: '30px' }} />
      <FooterLinks />
      <NoSsr>
        <Typography className={styles['copyright']}>{`Copyright © ${new Date().getFullYear()} Splatter & Scream, LLC`}</Typography>
      </NoSsr>
    </AppBar>
  );
};
