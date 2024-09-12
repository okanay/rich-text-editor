/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: "/assets/**",
      },
      {
        protocol: "https",
        hostname: "file.pdfrouters.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
