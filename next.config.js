/**
 * @type {import('next').NextConfig}
 */
const path = require('path');

const nextConfig = {
  /* config options here */
  asssetPrefix: "/topalbums/",
  basePath: "/topalbums",
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "is2-ssl.mzstatic.com",
        port: "",
        pathname: "/image/thumb/**",
      },
    ],
  },
  sassOptions: {
    includePathjs: [path.join(__dirname, 'styles')],
  }
}

module.exports = nextConfig;