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
  // Ya no necesitas estas líneas cuando usas un dominio personalizado
  // basePath: '/MacRimi', 
  // assetPrefix: '/MacRimi/',
  trailingSlash: true, // Mantener esto para compatibilidad
}

export default nextConfig