module.exports = {
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "skillicons.dev" },
      { protocol: "https", hostname: "**.supabase.co" },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};