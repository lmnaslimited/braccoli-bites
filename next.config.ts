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
  env: {
    // Uses different Google reCAPTCHA site keys based on the environment.
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY:
      process.env.NODE_ENV === "development"
        ? "6LeHPQ0rAAAAAHTN_Ya-NIc5M4lScSP3vu6OCYYy"
        : "6LfALd4qAAAAACBjDTQWkmyh-WqbLb6yhbcm-UUA",
  },
};

export default nextConfig;