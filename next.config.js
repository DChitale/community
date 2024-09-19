/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['encrypted-tbn0.gstatic.com', 'upload.wikimedia.org','i.ibb.co'], 
    // Add allowed domains here
  },
};

module.exports = nextConfig;
