// @ts-nocheck

import { FunctionComponent, useEffect, useState } from 'react';
import { setCookie, hasCookie } from 'cookies-next';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { VARIABLES } from 'assets/themes/themes';

const CookieConsent: FunctionComponent = () => {
  const [consent, setConsent] = useState<boolean>(false);

  useEffect(() => {
    setConsent(hasCookie('acceptCookies'));
  }, []);

  const setCookieState = (state: boolean) => {
    setConsent(true);
    setCookie('acceptCookies', `${state}`, { maxAge: 60 * 60 * 24 * 365 });
    if (state) {
      gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
      });
    }
  };

  return (
    <>
      {!consent && (
        <AppBar position="fixed" sx={{ bottom: '0', top: 'auto', backgroundColor: VARIABLES.bgColor }}>
          <Box display="flex" flexDirection="column" alignItems="center" m="20px 20px 10px 20px">
            <Typography mb="10px" textAlign="center">
              By clicking "Allow All", you agree to the storing of cookies on your device to enhance site navigation and to analyze site usage.
            </Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                '> button': {
                  borderColor: VARIABLES.primaryColor,
                  color: VARIABLES.primaryColor,
                  marginBottom: '10px',
                  '&:not(:last-of-type)': {
                    marginRight: '10px',
                  },
                  '&:hover': {
                    borderColor: VARIABLES.primaryColor,
                    backgroundColor: VARIABLES.primaryColor,
                    color: '#FFF'
                  }
                }
              }}
            >
              <Button variant="outlined" onClick={() => setCookieState(true)}>Allow All</Button>
              <Button variant="outlined" onClick={() => setCookieState(false)}>Deny All</Button>
            </Box>
          </Box>
        </AppBar>
      )}
    </>
  );
};

export default CookieConsent;
