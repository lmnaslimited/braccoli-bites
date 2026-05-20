import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: "standalone",
  //commented this part due to circular dependancy
  // async rewrites() {
  //   return [
  //     {
  //       source: "/site",
  //       destination: `http://localhost:3000/`,
  //     },
  //     {
  //       source: "/site/:path+",
  //       destination: `http://localhost:3000/:path+`,
  //     },
  //     // {
  //     //   source: "/blog",
  //     //   destination: "/", 
  //     // },

  //   ];
  // },

  //assetPrefix is need to get static asset of blog on rewrite from site 
  //during production mode
  // assetPrefix: "/en/blog",
 //css and js files are not loading in production mode due to basePath, so commenting basePath and adding assetPrefix to load static assets from blog-static folder 
assetPrefix: "/blog-static",
  // basePath: "/blog",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com"},
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
      { protocol: "https", hostname: "pbs.twimg.com" },
      { protocol: "https", hostname: "media.licdn.com" },
    ],
  },
};

export default nextConfig;
