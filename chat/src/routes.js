const apiPath = '/api/v1';

const routes = {
  loginPath: () => [apiPath, 'login'].join('/'),
  signupPath: () => [apiPath, 'signup'].join('/'),
  dataPath: () => [apiPath, 'data'].join('/'),
  chatPage: () => '/',
  loginPage: () => '/login',
  signupPage: () => '/signup',
  emptyPage: () => '*',
};

export default routes;
