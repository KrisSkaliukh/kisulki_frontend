import { UserAgentApplication } from 'msal';

export function getUserAgentApp({
  clientId,
  tenantUrl,
  redirectUri,
  postLogoutRedirectUri,
  useLocalStorageCache,
}: {
  clientId: string;
  tenantUrl?: string;
  redirectUri?: string;
  postLogoutRedirectUri?: string;
  useLocalStorageCache?: boolean;
}) {
  if (clientId) {
    return new UserAgentApplication({
      auth: {
        ...(redirectUri && { redirectUri }),
        ...(tenantUrl && { authority: tenantUrl }),
        ...(postLogoutRedirectUri && { postLogoutRedirectUri }),

        clientId,
        validateAuthority: true,
        navigateToLoginRequestUrl: false,
      },
      cache: {
        ...(useLocalStorageCache
          ? { cacheLocation: 'localStorage' }
          : { cacheLocation: 'sessionStorage' }),
      },
    });
  } return undefined;
}

export const getScopes = (graphScopes?: string[]) => {
  const scopes = graphScopes || [];
  if (!scopes.find((el: string) => el.toLowerCase() === 'user.read')) {
    scopes.push('user.read');
  }
  return scopes;
};

export const checkToIE = (): boolean => {
  const ua = window.navigator.userAgent;
  const msie = ua.indexOf('MSIE ');
  const msie11 = ua.indexOf('Trident/');
  const msedge = ua.indexOf('Edge/');
  const isIE = msie > 0 || msie11 > 0;
  const isEdge = msedge > 0;
  return isIE || isEdge;
};
