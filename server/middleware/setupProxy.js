const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'https://group-e-commerce-client.herokuapp.com',
      changeOrigin: false,
    }),
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://group-e-commerce-client.herokuapp.com',
      changeOrigin: false,
    }),
  );
};
