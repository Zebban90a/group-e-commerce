const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = (app) => {
  app.use(
    '/auth',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'http://localhost:3000',
      changeOrigin: true,
    }),
  );
};
