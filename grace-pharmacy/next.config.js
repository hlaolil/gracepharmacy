/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Using local webp files only; no remote image optimization needed.
    unoptimized: true,
  },
}

module.exports = nextConfig
