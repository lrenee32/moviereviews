import { FunctionComponent } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import NextLink from 'next/link';
import { VARIABLES } from 'assets/themes/themes';

export const SiteLinks: FunctionComponent = () => {
  return (
    <Box mb="40px" sx={{ '> a': { color: '#333333', transition: '.2s', '&:not(:last-of-type)': { mr: '10px' }, '&:hover': { color: VARIABLES.primaryColor } } }}>
      <NextLink href="/about" passHref>
        <Link underline="none">About</Link>
      </NextLink>
      <NextLink href="/contact" passHref>
        <Link underline="none">Contact</Link>
      </NextLink>
      <NextLink href="/privacy" passHref>
        <Link underline="none">Privacy Policy</Link>
      </NextLink>
      <NextLink href="/terms" passHref>
        <Link underline="none">Terms Of Use</Link>
      </NextLink>
    </Box>
  );
}
