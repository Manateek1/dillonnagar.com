import type { NextConfig } from "next";

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
        source: "/datascience",
        destination:
          "https://colab.research.google.com/drive/1MTMDQDecRFC50iANNrg5OKbsDExvGw9R?usp=sharing",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
