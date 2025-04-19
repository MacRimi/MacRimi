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
  basePath: '/MacRimi', // Nombre de tu repositorio
  assetPrefix: '/MacRimi/', // Nombre de tu repositorio con barra al final
  trailingSlash: true, // Añadir barra al final de las URLs
}

export default nextConfig