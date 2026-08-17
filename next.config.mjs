/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    localPatterns: [
      {
        pathname: "/images/**",
        search: ""
      }
    ]
  },
  async rewrites() {
    return [
      {
        source: "/images/abridor-beijinho/beijinho-02",
        destination: "/images/abridor-beijinho/beijinho-02.png"
      },
      {
        source: "/images/abridor-beijinho/img-01",
        destination: "/images/abridor-beijinho/img-01.png"
      },
      {
        source: "/images/abridor-beijinho/img-02",
        destination: "/images/abridor-beijinho/img-02.png"
      },
      {
        source: "/images/abridor-beijinho/img-03",
        destination: "/images/abridor-beijinho/img-03.png"
      }
    ];
  }
};

export default nextConfig;
