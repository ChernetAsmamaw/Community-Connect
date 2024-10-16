/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // stop running useEffect twice
  images: {
    domains: ["eu-west-2.graphassets.com"],
  },
};

export default nextConfig;
