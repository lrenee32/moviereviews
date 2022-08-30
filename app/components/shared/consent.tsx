import { FunctionComponent, useEffect, useState } from 'react';
import { setCookie, hasCookie } from 'cookies-next';

const Consent: FunctionComponent = () => {
  const [consent, setConsent] = useState<boolean>(true);

  useEffect(() => {
    setConsent(hasCookie('acceptCookies'));
  }, []);

  const acceptCookies = () => {
    setConsent(true);
    setCookie('acceptCookies', 'true', { maxAge: 60 * 60 * 24 * 365 });
  };

  const close = () => {
    setConsent(true);
  };

  const denyCookie = () => {
    setConsent(true);
    setCookie('acceptCookies', 'false', { maxAge: 60 * 60 * 24 * 365 });
  };

  return (
    <>
      {consent && (
        <div>Hey</div>
      )}
    </>
  );
};

export default Consent;
