import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8081',
                pathname: '/api/republic/files/**',
            },
        ],
    },
};
module.exports = {
    allowedDevOrigins: ['local-origin.dev', '*.local-origin.dev'],
}

export default nextConfig;
