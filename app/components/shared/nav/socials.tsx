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

const SocialAccounts = [
  {
    site: 'Facebook',
    href: 'https://facebook.com/splatterandscream',
    icon: <Facebook />,
  },
  {
    site: 'Twitter',
    href: 'https://twitter.com/splatternscream',
    icon: <Twitter />,
  },
  {
    site: 'Instagram',
    href: 'https://instagram.com/splatternscream',
    icon: <Instagram />,
  },
  {
    site: 'Youtube',
    href: 'https://www.youtube.com/channel/UCaNDv_alOiNj1hQ4mUiILeA',
    icon: <Youtube />,
  },
];

interface Props {
  sx?: SxProps<Theme>,
};

export const SocialLinks: FunctionComponent<Props> = (props: Props) => {
  return (
    <Box sx={{ ...props.sx, '> a': { backgroundColor: 'rgba(255, 255, 255, 0.08)', '&:not(:last-of-type)': { mr: '10px' }, '&:hover': { backgroundColor: VARIABLES.primaryColor } } }}>
      {SocialAccounts.map(i => (
        <NextLink key={i.site} href={i.href} passHref>
          <IconButton aria-label={`${i.site}-icon`}>
            {i.icon}
          </IconButton>
        </NextLink>
      ))}
    </Box>
  );
};
