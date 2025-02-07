import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/site",
        destination: `http://localhost:3000/`,
      },
      {
        source: "/site/:path+",
        destination: `http://localhost:3000/:path+`,
      },
      // {
      //   source: "/blog",
      //   destination: "/", 
      // },

    ];
  },};

export default nextConfig;
