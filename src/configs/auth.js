export default {
  meEndpoint: '/auth/profile',
  loginEndpoint: '/auth/login',
  registerEndpoint: '/jwt/register',
  storageTokenKeyName: 'accessToken',
  onTokenExpiration: 'refreshToken' // logout | refreshToken
}
