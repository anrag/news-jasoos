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
  images: {
    domains: ["my-usa-cricket.s3.amazonaws.com"],
  },
});
module.exports = nextConfig;
