import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Generates a standalone build for deployment environments like Docker.
  // output: "standalone",

  // Rewrites are commented out due to circular dependency issues
  // between the main site and blog application.
  // async rewrites() {
  //   return [
  //     {
  //       // Routes /site requests to the main application.
  //       source: "/site",
  //       destination: `http://localhost:3000/`,
  //     },
  //     {
  //       // Routes all nested /site pages dynamically.
  //       source: "/site/:path+",
  //       destination: `http://localhost:3000/:path+`,
  //     },

  //     // Example blog route rewrite.
  //     // {
  //     //   source: "/blog",
  //     //   destination: "/",
  //     // },
  //   ];
  // },

  // Used to load static blog assets correctly when the blog
  // is accessed through rewrite proxy routes in production.
  // assetPrefix: "/en/blog",

  // Prefix for serving blog static assets through rewrite proxy.
  assetPrefix: "/blog-static",

  // Enables additional React validation checks in development mode.
  reactStrictMode: true,

  images: {
    // Allows optimized image loading from trusted external domains.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "media.licdn.com" },
    ],
  },
};

export default nextConfig;