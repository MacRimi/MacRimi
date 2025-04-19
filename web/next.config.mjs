/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true, 
  },
  output: 'export', // Habilita la exportación estática para GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '', // Para subdirectorios en GitHub Pages
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '', // Para cargar assets correctamente
}

export default nextConfig