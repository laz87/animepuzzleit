import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // ✅ REMOVED eslint config - move it to .eslintrc.json instead
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.pinimg.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Add this to fix the cross-origin warning
  allowedDevOrigins: [
    '9002-firebase-studio-1768070813596.cluster-ikslh4rdsnbqsvu5nw3v4dqjj2.cloudworkstations.dev'
  ],
};

export default nextConfig;