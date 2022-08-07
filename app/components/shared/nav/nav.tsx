import { FunctionComponent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from 'components/shared/nav/main-nav.module.scss';
import { NavLinks } from './nav-links';
import { SocialLinks } from './socials';

interface Props {
  style: 'main' | 'secondary' | 'large',
};

export const Nav: FunctionComponent<Props> = (props: Props) => {
  const { style } = props;
  return (
    <>
      {style === 'main' && (
        <AppBar position="absolute" color="transparent">
          <Typography className={styles.logo}>
            Splatter
          </Typography>
        </AppBar>
      )}
      {style === 'secondary' && (
        <AppBar position="sticky" className={styles["small-nav"]}>
          <Typography className={styles["small-logo"]}>
            Splatter
          </Typography>
          <NavLinks />
        </AppBar>
      )}
      {style === 'large' && (
        <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', display: 'flex', alignItems: 'center' }}>
          <Box display="flex" alignItems="center" ml="-220px">
            <SocialLinks />
            <Typography ml="40px" className={styles["large-logo"]}>
              Splatter
            </Typography>
          </Box>
          <NavLinks />
        </AppBar>
      )}
    </>
  );
};