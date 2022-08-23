import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { VARIABLES } from 'assets/themes/themes';

const Links: { href: string, text: string }[] = [
  { href: '/contact', text: 'Contact' },
  { href: '/privacy', text: 'Privacy Policy' },
  { href: '/terms', text: 'Terms Of Use' },
];

export const FooterLinks: FunctionComponent = () => {
  return (
    <Box mb="40px" sx={{ '> a': { color: '#333333', transition: '.2s', '&:not(:last-of-type)': { mr: '10px' }, '&:hover': { color: VARIABLES.primaryColor } } }}>
      {Links.map((link) => (
        <NextLink key={link.text} href={link.href} passHref>
          <Link underline="none">{link.text}</Link>
        </NextLink>
      ))}
    </Box>
  );
}
