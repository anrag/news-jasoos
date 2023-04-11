const runtimeCaching = require("next-pwa/cache");
const withPWA = require("next-pwa")({
  register: true,
  skipWaiting: true,
  runtimeCaching,
  disable:process.env.NODE_ENV === 'development'

  // buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = withPWA({
  // next config
  distDir: "build",
  images: {
    domains: ["c.ndtvimg.com","i.ytimg.com",'blogger.googleusercontent.com'],
  },
  experimental:{
    amp: {
      skipValidation: true
    }
  }
});
module.exports = nextConfig;
