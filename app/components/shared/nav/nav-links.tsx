import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { VARIABLES } from 'assets/themes/themes';

const Links: { href: string, text: string }[] = [
  { href: '/reviews', text: 'Reviews' },
  { href: '/articles', text: 'Articles' },
];

export const NavLinks: FunctionComponent = () => {
  return (
    <Box sx={{ '> a': { color: '#333333', transition: '.2s', '&:not(:last-of-type)': { mr: '20px' }, '&:hover': { color: VARIABLES.primaryColor } } }}>
      {Links.map((link) => (
        <NextLink key={link.text} href={link.href} passHref>
          <Link underline="none">{link.text}</Link>
        </NextLink>
      ))}
    </Box>
  );
}
