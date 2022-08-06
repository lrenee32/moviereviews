import { FunctionComponent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from 'components/shared/nav/main-nav.module.scss';

interface Props {
  style: 'main' | 'large',
};

export const Nav: FunctionComponent<Props> = (props: Props) => {
  const { style } = props;
  return (
    <>
      {style === 'main' && (
        <AppBar position="absolute" color="transparent">
          <Box ml="16px" mt="16px">
            <Typography className={styles.logo}>
              Splatter
            </Typography>
          </Box>
        </AppBar>
      )}
      {style === 'large' && (
        <AppBar position="static" sx={{ background: 'transparent', boxShadow: 'none', mb: '70px' }}>
          <Typography className={styles["large-logo"]}>
            Splatter
          </Typography>
        </AppBar>
      )}
    </>
  );
};