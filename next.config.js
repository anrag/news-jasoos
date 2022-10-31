const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  register: true,
  skipWaiting: true,
  runtimeCaching,
  // buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
  // next config
  distDir: "build",
});
module.exports = nextConfig;
