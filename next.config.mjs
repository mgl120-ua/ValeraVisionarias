/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  images: {
    remotePatterns: [
      // Supabase público
      {
        protocol: 'https',
        hostname: '**.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Google (fotos de tu ficha y reseñas)
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'maps.gstatic.com' },
      { protocol: 'https', hostname: 'yt3.ggpht.com' },
    ],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 24, 32, 48, 64, 96, 128],
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
