import type { NextConfig } from "next";
import { siteUrl } from "./data/site";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/northiron/:path*",
          destination:
            "https://northiron-autonomy-dillon-nagars-projects.vercel.app/northiron/:path*",
        },
      ],
    };
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www\\.dillonnagar\\.com" }],
        destination: siteUrl + "/:path*",
        permanent: true,
      },
      {
        source: "/datascience",
        destination:
          "https://colab.research.google.com/drive/1MTMDQDecRFC50iANNrg5OKbsDExvGw9R?usp=sharing",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
