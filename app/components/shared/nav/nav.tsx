import { FunctionComponent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import styles from 'components/shared/nav/main-nav.module.scss';
import { NavLinks } from './nav-links';
import { SocialLinks } from './socials';
import NextLink from 'next/link';

interface Props {
  style: 'main' | 'secondary' | 'large',
};

export const Nav: FunctionComponent<Props> = (props: Props) => {
  const { style } = props;
  return (
    <>
      {style === 'main' && (
        <AppBar position="absolute" color="transparent" id="back-to-top-anchor">
          <NextLink href="/" passHref>
            <Box
              component="img"
              alt="site-logo-header"
              src="../../images/site-logo-main.png"
              sx={{ width: '150px', m: '16px', '&:hover': { cursor: 'pointer' } }}
            />
          </NextLink>
        </AppBar>
      )}
      {style === 'secondary' && (
        <AppBar position="sticky" className={styles["small-nav"]}>
          <NextLink href="/" passHref>
            <Box
              component="img"
              alt="site-logo-header"
              src="../../images/site-logo-main.png"
              sx={{ height: '50px', m: '10px 32px 10px 16px', '&:hover': { cursor: 'pointer' } }}
            />
          </NextLink>
          <NavLinks />
        </AppBar>
      )}
      {style === 'large' && (
        <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', mb: '10px' }} id="back-to-top-anchor">
          <Box display="flex" alignItems="center" ml="-200px">
            <SocialLinks />
            <Box
              component="img"
              alt="site-logo-header"
              src="../../images/site-logo-main.png"
              sx={{ height: '200px', m: '16px 16px 16px 32px', '&:hover': { cursor: 'pointer' } }}
            />
          </Box>
          <NavLinks />
        </AppBar>
      )}
    </>
  );
};