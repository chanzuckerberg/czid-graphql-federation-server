import { ResolveUserFn, useGenericAuth, ValidateUserFn } from '@envelop/generic-auth'
import { MeshPlugin } from '@graphql-mesh/types';

type UserType = {
  id: string
}
const resolveUserFn: ResolveUserFn<UserType> = async context => {
  const parseCookie = cookieStr =>
    cookieStr
      .split(';')
      .map((v: string) => v.split('='))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {});
  const headers = context.request.headers;
  const cookie = headers.get('cookie');
  const { czid_services_token: czidServicesToken } = parseCookie(cookie);

  try {
    const enrichTokenURL = `${process.env.LEGACY_API_URL}/enrich_token`;
    const enrichedToken = await fetch(enrichTokenURL, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${czidServicesToken}`,
      },
    });
  } catch (e) {
    console.error('Failed to validate token')
    return null
  }
}
const validateUser: ValidateUserFn<UserType> = params => {
  /* ... */
}

const plugins: MeshPlugin<any>[] = [
  useGenericAuth({
    resolveUserFn,
    validateUser,
    mode: 'protect-all',
  })
];

export default plugins;
