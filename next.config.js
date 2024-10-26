/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      {
        protocol: "https",
        hostname: "liket-for-dev.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "liket.s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "s3.ap-northeast-2.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "dev.liket.site",
      },
      {
        protocol: "https",
        hostname: "liket.site",
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/apis/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_SERVER}/:path*`,
      },
    ];
  },
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg")
    );

    config.externals = [...config.externals, { canvas: "canvas" }];
    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ["@svgr/webpack"],
      }
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};

module.exports = nextConfig;
