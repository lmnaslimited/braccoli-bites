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
  assetPrefix: "/blog",
  // basePath: "/blog",
  reactStrictMode: true,
};

export default nextConfig;
