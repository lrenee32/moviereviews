import { FunctionComponent, useState } from 'react';
import Image from 'next/future/image';
import AppBar, { AppBarProps } from '@mui/material/AppBar';
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
import { NavLinks } from './nav-links';
import { SocialLinks } from './socials';
import { useRouter } from 'next/router';
import NextLink from 'next/link';
import { Slide, useScrollTrigger } from '@mui/material';
import styles from 'assets/styles/nav.module.scss';

interface Props {
  style: 'hero' | 'main' | 'large',
};

export const Nav: FunctionComponent<Props> = (props: Props) => {
  const { style } = props;
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

  const keyPress = (e: { key: string; }) => {
    if(e.key == 'Enter' && search !== ''){
      setSearchOpen(false);
      router.push({
        pathname: '/search',
        query: { s: search },
      });
      setSearch('');
    }
  };

  const AppearOnScroll = (props: { children: any; }) => {
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

  const generateMainNav = (position: AppBarProps["position"], size: string) => {
    return (
      <AppBar position={position} className={styles[`main-nav-${size}`]}>
        <Box className={styles['main-nav-container']}>
          <IconButton onClick={toggleDrawer(!open)}>
            <MenuIcon />
          </IconButton>
          <NextLink href="/" passHref>
            <Image
              src="/images/site-logo-main.png"
              alt="site-logo-header"
              fill
              className={styles['logo']}
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
    );
  };

  return (
    <>
      {style === 'hero' && (
        <AppBar className={styles['hero-nav']}>
          <NextLink href="/" passHref>
            <Image
              src="/images/site-logo-main.png"
              alt="site-logo-header"
              fill
              className={styles['logo']}
            />
          </NextLink>
        </AppBar>
      )}
      {style === 'main' && generateMainNav('sticky', 'sticky')}
      {style === 'large' && (
        <>
          <AppBar className={styles['large-nav']}>
            <Box className={styles['large-nav-logo-container']}>
              <SocialLinks />
              <NextLink href="/" passHref>
              <Image
                src="/images/site-logo-main.png"
                alt="site-logo-header"
                fill
                className={styles['logo']}
              />
              </NextLink>
            </Box>
            <Box className={styles['large-nav-container']}>
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
            {generateMainNav('fixed', '')}
          </AppearOnScroll>
          {generateMainNav('fixed', 'small')}
        </>
      )}
      <Drawer open={open} ModalProps={{ onBackdropClick: toggleDrawer(false) }} className={styles['nav-drawer']}>
        <Box className={styles['drawer-logo-container']}>
          <Box></Box>
          <NextLink href="/" passHref>
            <Image
              src="/images/site-logo-main.png"
              alt="site-logo-header"
              fill
              className={styles['logo']}
            />
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
        <Box className={styles['drawer-social-container']}>
          <SocialLinks />
        </Box>
      </Drawer>
      <Backdrop open={searchOpen} className={styles['site-search-backdrop']}>
      <CloseIcon className={styles['site-search-close-icon']} onClick={() => setSearchOpen(false)} />
      <TextField variant="standard" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className={styles['site-search-input']} onKeyPress={keyPress} />
      </Backdrop>
    </>
  );
};