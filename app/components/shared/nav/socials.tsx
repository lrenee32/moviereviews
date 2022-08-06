import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Facebook from '@mui/icons-material/Facebook';
import Twitter from '@mui/icons-material/Twitter';
import Instagram from '@mui/icons-material/Instagram';
import Youtube from '@mui/icons-material/Youtube';
import NextLink from 'next/link';
import { VARIABLES } from 'assets/themes/themes';
import { SxProps, Theme } from '@mui/material/styles';

interface Props {
  sx?: SxProps<Theme>,
};

export const SocialLinks: FunctionComponent<Props> = (props: Props) => {
  return (
    <Box sx={{ ...props.sx, '> a': { backgroundColor: 'rgba(255, 255, 255, 0.08)', '&:not(:last-of-type)': { mr: '10px' }, '&:hover': { backgroundColor: VARIABLES.primaryColor } } }}>
      <NextLink href="/" passHref>
        <IconButton>
          <Facebook />
        </IconButton>
      </NextLink>
      <NextLink href="/" passHref>
        <IconButton>
          <Twitter />
        </IconButton>
      </NextLink>
      <NextLink href="/" passHref>
        <IconButton>
          <Instagram />
        </IconButton>
      </NextLink>
      <NextLink href="/" passHref>
        <IconButton>
          <Youtube />
        </IconButton>
      </NextLink>
    </Box>
  );
};
