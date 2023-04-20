/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BACKEND_ENDPOINT: "http://localhost:5000/api",
    // BACKEND_ENDPOINT: "https://ethermionsv2.onrender.com/api",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ipfs.io",
        port: "",
      },
    ],
  },

  reactStrictMode: true,
};

module.exports = nextConfig;
