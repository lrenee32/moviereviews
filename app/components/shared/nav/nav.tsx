import { FunctionComponent } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface Props {
  styles: { readonly [key: string]: string; },
};

export const Nav: FunctionComponent<Props> = (props: Props) => {
  const { styles } = props;
  return (
    <AppBar position="absolute" color="transparent">
      <Box ml="16px" mt="16px">
        <Typography className={styles.logo}>
          Splatter
        </Typography>
      </Box>
    </AppBar>
  );
};