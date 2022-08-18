import { API } from "../api-service";
import { getCookie, setCookie, deleteCookie } from 'cookies-next';

const keyPrefix = 'CognitoIdentityServiceProvider';

const cacheTokens = ({ idToken, accessToken }: { idToken: string, accessToken: string }) => {
  const idTokenKey = `${keyPrefix}.idToken`;
  const accessTokenKey = `${keyPrefix}.accessToken`;

  setCookie(idTokenKey, idToken);
  setCookie(accessTokenKey, accessToken);
};

export const clearCache = () => {
  deleteCookie(`${keyPrefix}.idToken`);
  deleteCookie(`${keyPrefix}.accessToken`);
};

export const getIdToken = () => {
  return getCookie(`${keyPrefix}.idToken`);
};

export const getUserInfo = ({ req, res }) => {
  const idToken = getCookie(`${keyPrefix}.idToken`, { req, res });
  return JSON.parse(Buffer.from(idToken.split('.')[1], 'base64').toString());
}

export const authenticate = (body: { email: string, password: string }) => {
  return API({
    method: 'POST',
    path: '/admin/authenticate',
    body,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      const tokens = {
        idToken: res.IdToken,
        accessToken: res.AccessToken,
      };
      cacheTokens(tokens);
      return JSON.parse(window.atob(res.IdToken.split('.')[1]))
    })
    .catch(err => {
      throw new Error(err);
    });
};

export const authenticated = async ({ req, res }) => {
  const accessToken = getCookie(`${keyPrefix}.accessToken`, { req, res });
  const idToken = getCookie(`${keyPrefix}.idToken`, { req, res });

  if (!accessToken || !idToken) {
    clearCache();
    return false;
  }

  return API({
    method: 'POST',
    path: '/admin/authenticated',
    headers: {
      'Authorization': `Bearer: ${accessToken}`,
    },
  })
    .then(res => res)
    .catch(() => {
      clearCache();
      return false;
    });
};

export const logout = (email: string) => {
  return API({
    method: 'POST',
    path: '/admin/logout',
    body: { email },
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(() => {
      return clearCache();
    })
    .catch(err => {
      throw new Error(err);
    });
};
