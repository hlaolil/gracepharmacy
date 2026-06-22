/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Mostly local webp files, plus a few remote Pexels URLs for category photos
    // on the Products page. unoptimized:true means next/image just renders a
    // plain <img>, so no remotePatterns config is needed for the Pexels URLs.
    unoptimized: true,
  },
}

module.exports = nextConfig
