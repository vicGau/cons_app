const { createProxyMiddleware } = require('http-proxy-middleware');

const apiUrl = process.env.WEB_API_BASE_URL;

module.exports = (app) => {
  app.use(
    '/api',
    createProxyMiddleware({
      target: apiUrl,
      changeOrigin: true,
    }),
  );
};



