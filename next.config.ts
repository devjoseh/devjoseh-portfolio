module.exports = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "skillicons.dev" },
      { protocol: "https", hostname: `${process.env.NEXT_PUBLIC_SUPABASE_ID}.supabase.co` },
    ],
    dangerouslyAllowSVG: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '5mb',
    },
  },
};