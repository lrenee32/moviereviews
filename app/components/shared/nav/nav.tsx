import { FunctionComponent, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import Backdrop from '@mui/material/Backdrop';
import TextField from '@mui/material/TextField';
import styles from 'components/shared/nav/main-nav.module.scss';
import { NavLinks } from './nav-links';
import { SocialLinks } from './socials';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Slide, Theme, useScrollTrigger } from '@mui/material';

interface Props {
  style: 'main' | 'secondary' | 'large',
};

export const Nav: FunctionComponent<Props> = (props: Props) => {
  const { style } = props;
  const isLg = useMediaQuery((theme: Theme) => theme.breakpoints.up('md'));
  const isXs = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const router = useRouter();

  const Links: { href: string, text: string }[] = [
    { href: '/reviews', text: 'Reviews' },
    { href: '/articles', text: 'Articles' },
  ];

  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState('');

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  
  const toggleSearch = (newOpen: boolean) => () => {
    if (!newOpen) {
      setSearch('');
    }
    setSearchOpen(newOpen);
  };

  const keyPress = (e) => {
    if(e.key == 'Enter' && search !== ''){
      setSearchOpen(false);
      router.push({
        pathname: '/search',
        query: { s: search },
      });
      setSearch('');
    }
  };

  const AppearOnScroll = (props) => {
    const { children } = props;
    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 300,
    });

    return (
      <Slide appear={false} direction="down" in={trigger}>
        {children}
      </Slide>
    )
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
          <Box display="flex" justifyContent="space-between" width="100%">
            <IconButton onClick={toggleDrawer(!open)}>
              <MenuIcon />
            </IconButton>
            <NextLink href="/" passHref>
              <Box
                component="img"
                alt="site-logo-header"
                src="../../images/site-logo-main.png"
                sx={{ height: '50px', m: '10px 32px 10px 16px', '&:hover': { cursor: 'pointer' } }}
              />
            </NextLink>
            <IconButton onClick={toggleSearch(!searchOpen)}>
              {searchOpen ? (
                <CloseIcon />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          </Box>
        </AppBar>
      )}
      {style === 'large' && isLg && (
        <>
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
            <Box display="flex" justifyContent="space-between" width="100%">
              <IconButton onClick={toggleDrawer(!open)}>
                <MenuIcon />
              </IconButton>
              <NavLinks />
              <IconButton onClick={toggleSearch(!searchOpen)}>
                {searchOpen ? (
                  <CloseIcon />
                ) : (
                  <SearchIcon />
                )}
              </IconButton>
            </Box>
          </AppBar>
          <AppearOnScroll {...props}>
            <AppBar position="fixed" className={styles['small-nav']}>
              <Box display="flex" justifyContent="space-between" width="100%" m="7.5px">
                <IconButton onClick={toggleDrawer(!open)}>
                  <MenuIcon />
                </IconButton>
                <NextLink href="/" passHref>
                  <Box component="img" alt="site-logo-header" src="../../images/site-logo-main.png" sx={{ height: '50px', '&:hover': { cursor: 'pointer' } }} />
                </NextLink>
                
                <IconButton onClick={toggleSearch(!searchOpen)}>
                  {searchOpen ? (
                    <CloseIcon />
                  ) : (
                    <SearchIcon />
                  )}
                </IconButton>
              </Box>
            </AppBar>
          </AppearOnScroll>
        </>
      )}
      {style === 'large' && !isLg && (
        <AppBar position="fixed" className={styles['small-nav']}>
          <Box display="flex" justifyContent="space-between" width="100%" m="7.5px">
            <IconButton onClick={toggleDrawer(!open)}>
              <MenuIcon />
            </IconButton>
            <NextLink href="/" passHref>
              <Box component="img" alt="site-logo-header" src="../../images/site-logo-main.png" sx={{ height: '50px', '&:hover': { cursor: 'pointer' } }} />
            </NextLink>
            
            <IconButton onClick={toggleSearch(!searchOpen)}>
              {searchOpen ? (
                <CloseIcon />
              ) : (
                <SearchIcon />
              )}
            </IconButton>
          </Box>
        </AppBar>
      )}
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
        <Box display="flex" justifyContent="center" position="absolute" bottom="0" mb="20px" width="100%">
          <SocialLinks />
        </Box>
      </Drawer>
      <Backdrop open={searchOpen} sx={{ zIndex: '1999', backgroundColor: 'rgba(0,0,0,.9)' }}>
      <CloseIcon sx={{ position: 'absolute', top: '0', right: '0', m: '20px', zIndex: '2000', '&:hover': { cursor: 'pointer' } }} onClick={() => setSearchOpen(false)} />
        <TextField variant="standard" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} sx={{ fontSize: '32px', '.MuiInput-root': { fontSize: 'inherit' } }} onKeyPress={keyPress} />
      </Backdrop>
    </>
  );
};