import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
