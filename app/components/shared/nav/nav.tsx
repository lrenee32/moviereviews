import { FunctionComponent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import styles from 'components/shared/nav/main-nav.module.scss';
import { NavLinks } from './nav-links';
import { SocialLinks } from './socials';
import NextLink from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Theme } from '@mui/material';

interface Props {
  style: 'main' | 'secondary' | 'large',
};

export const Nav: FunctionComponent<Props> = (props: Props) => {
  const { style } = props;
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

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
      {style === 'large' && isLg && (
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
      {style === 'large' && !isLg && (
        <AppBar position="fixed">
          <Toolbar>
            <IconButton onClick={toggleDrawer(!open)}>
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
      )}
      <Drawer open={open}>
        <IconButton onClick={toggleDrawer(false)} sx={{ position: 'absolute', top: '5px', right: '5px', zIndex: '999' }}>
          <CloseIcon />
        </IconButton>
        <List>
          <ListItem>Test</ListItem>
        </List>
      </Drawer>
    </>
  );
};