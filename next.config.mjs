/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [375, 640, 768, 1024, 1280, 1440],
    imageSizes: [64, 96, 128, 256, 384],
  },
  webpack: (config, { dev }) => {
    // Avoid corrupted filesystem webpack packs on Windows when .next is cleared mid-dev.
    if (dev) {
      config.cache = { type: "memory" };
    }
    return config;
  },
};

export default nextConfig;
