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
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
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
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  const Links: { href: string, text: string }[] = [
    { href: '/reviews', text: 'Reviews' },
    { href: '/articles', text: 'Articles' },
  ];

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      {style === 'main' && (
        <AppBar position="absolute" color="transparent">
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
        <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center', mb: '10px' }}>
          <Box display="flex" alignItems="center" ml="-200px">
            <SocialLinks />
            <NextLink href="/" passHref>
              <Box
                component="img"
                alt="site-logo-header"
                src="../../images/site-logo-main.png"
                sx={{ height: '200px', m: '16px 16px 16px 32px', '&:hover': { cursor: 'pointer' } }}
              />
            </NextLink>
          </Box>
          <NavLinks />
        </AppBar>
      )}
      {style === 'large' && !isLg && (
        <>
          <AppBar position="fixed">
            <Box display="flex" justifyContent="space-between" m="7.5px">
              <IconButton onClick={toggleDrawer(!open)}>
                <MenuIcon />
              </IconButton>
              <NextLink href="/" passHref>
                <Box component="img" alt="site-logo-header" src="../../images/site-logo-main.png" sx={{ height: '50px', '&:hover': { cursor: 'pointer' } }} />
              </NextLink>
              <Box></Box>
            </Box>
          </AppBar>
          <Drawer open={open} ModalProps={{ onBackdropClick: toggleDrawer(false) }} sx={{ width: '100%', '.MuiDrawer-paper': { width: isXs ? '100%' : '370px' } }}>
            <Box display="flex" justifyContent="space-between" m="10px">
              <Box></Box>
              <NextLink href="/" passHref>
                <Box component="img" alt="site-logo-header" src="../../images/site-logo-main.png" sx={{ height: '50px', '&:hover': { cursor: 'pointer' } }} />
              </NextLink>
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <List>
              {Links.map(i => (
                <Box key={i.text}>
                  <NextLink href={i.href} passHref>
                    <ListItemButton>
                      <ListItem>{i.text}</ListItem>
                    </ListItemButton>
                  </NextLink>
                  <Divider variant="middle" />
                </Box>
              ))}
            </List>
          </Drawer>
        </>
      )}
    </>
  );
};