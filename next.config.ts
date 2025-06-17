import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  rewrites: async () => {
    return {
      beforeFiles: [
        // České URL
        {
          source: '/darkove-predmety/:path*',
          destination: '/gifts/:path*'
        },
        {
          source: '/keramika/:path*',
          destination: '/ceramics/:path*'
        },
        {
          source: '/sklo/:path*',
          destination: '/glass/:path*'
        },
        {
          source: '/obrazy/:path*',
          destination: '/artworks/:path*'
        },
        {
          source: '/kontakt/:path*',
          destination: '/contact/:path*'
        },
        {
          source: '/o-nas/:path*',
          destination: '/about/:path*'
        }
      ],
      afterFiles: [],
      fallback: []
    }
  }
};

export default nextConfig;
