module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "skillicons.dev" },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**'
      },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};