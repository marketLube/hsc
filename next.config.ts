import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Redirect apex domain to www
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'thethealthysugarcompany.com',
          },
        ],
        destination: 'https://www.thethealthysugarcompany.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
