"use client"

import { useEffect, useRef, useState } from "react"

interface Star {
  x: number
  y: number
  size: number
  opacity: number
  blinkSpeed: number
  blinkDirection: number
  // Propiedades para el efecto de hiperespacio
  originalX: number
  originalY: number
  speedFactor: number
  color: string // Propiedad para color personalizado
}

interface StarFieldProps {
  blurAmount?: number
  hyperSpaceFactor?: number // Prop para controlar la intensidad del efecto
}

export function StarField({ blurAmount = 0, hyperSpaceFactor = 0 }: StarFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<Star[]>([])
  const animationRef = useRef<number>()
  const lastWidthRef = useRef<number>(0)
  const lastHeightRef = useRef<number>(0)
  const initialHeightRef = useRef<number>(0)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const centerXRef = useRef<number>(0)
  const centerYRef = useRef<number>(0)

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Función para actualizar el tamaño del canvas
    const updateCanvasSize = () => {
      if (!canvas) return

      // Usar el 100% de la altura visible actual
      const viewportHeight = window.innerHeight
      canvas.height = viewportHeight
      canvas.width = window.innerWidth

      // Actualizar referencias
      lastWidthRef.current = window.innerWidth
      lastHeightRef.current = viewportHeight
      initialHeightRef.current = viewportHeight

      // Actualizar centro para efectos
      centerXRef.current = canvas.width / 2
      centerYRef.current = canvas.height / 2

      // Regenerar estrellas para el nuevo tamaño
      generateStars()
    }

    // Generate stars with density based on device type
    const generateStars = () => {
      if (!canvas) return

      // Set center point for the hyperspace effect
      centerXRef.current = canvas.width / 2
      centerYRef.current = canvas.height / 2

      // Aumentar la densidad de estrellas en móvil para un efecto más impresionante
      const densityFactor = isMobile ? 800 : 1000
      const starCount = Math.floor((canvas.width * canvas.height) / densityFactor)
      const stars: Star[] = []

      // Colores para las estrellas - más variedad para un efecto más realista
      const starColors = [
        "255, 255, 255", // Blanco
        "200, 220, 255", // Azul claro
        "255, 240, 200", // Amarillo suave
        "220, 220, 255", // Azul muy claro
      ]

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        stars.push({
          x: x,
          y: y,
          originalX: x, // Store original position for hyperspace effect
          originalY: y, // Store original position for hyperspace effect
          size: Math.random() * (isMobile ? 2 : 2) + 0.5,
          opacity: Math.random() * 0.5 + 0.5, // Mayor opacidad base para mejor visibilidad
          blinkSpeed: Math.random() * 0.015 + 0.005, // Aumentado para un centelleo más visible como al principio
          blinkDirection: Math.random() > 0.5 ? 1 : -1,
          speedFactor: Math.random() * 0.8 + 0.4, // Mayor variación en la velocidad
          color: starColors[Math.floor(Math.random() * starColors.length)], // Color aleatorio
        })
      }

      starsRef.current = stars
    }

    // Inicializar tamaño
    updateCanvasSize()

    // Manejar cambios de orientación y tamaño
    const handleResize = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }

      resizeTimeoutRef.current = setTimeout(updateCanvasSize, isMobile ? 250 : 100)
    }

    // Añadir listener para orientationchange específicamente
    window.addEventListener("orientationchange", () => {
      // Pequeño retraso para permitir que el navegador actualice las dimensiones
      setTimeout(updateCanvasSize, 300)
    })

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", updateCanvasSize)
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current)
      }
    }
  }, [isMobile])

  // Draw stars with hyperspace effect
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawStars = () => {
      if (!ctx || !canvas) return

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      starsRef.current.forEach((star) => {
        // Update star blinking
        star.opacity += star.blinkSpeed * star.blinkDirection

        // Change direction if opacity reaches limits
        if (star.opacity >= 0.9 || star.opacity <= 0.4) {
          star.blinkDirection *= -1
        }

        // Apply hyperspace effect based on hyperSpaceFactor
        if (hyperSpaceFactor > 0) {
          // Calculate distance from center
          const dx = star.originalX - centerXRef.current
          const dy = star.originalY - centerYRef.current
          const distance = Math.sqrt(dx * dx + dy * dy)

          // Calculate angle from center
          const angle = Math.atan2(dy, dx)

          // Mejorar el factor de estiramiento para un efecto más dramático
          // Aumentamos significativamente el multiplicador para estrellas más alejadas del centro
          const distanceFactor = Math.min(4, distance / (canvas.width / 10)) // Aumentado para mayor estiramiento
          const stretchFactor = (distance / 40) * hyperSpaceFactor * star.speedFactor * distanceFactor // Reducido el divisor para mayor estiramiento

          // Update star position with hyperspace effect - estiramiento más dramático
          star.x = star.originalX + Math.cos(angle) * stretchFactor
          star.y = star.originalY + Math.sin(angle) * stretchFactor

          // Adjust star size based on hyperspace effect
          const dynamicSize = star.size * (1 + hyperSpaceFactor * 0.3)

          // Calcular un punto de inicio más desplazado para eliminar completamente el punto de origen
          // Esto hace que la línea comience más adelante del punto original
          const startOffsetFactor = Math.min(1.5, hyperSpaceFactor / 10) // Aumentado para mayor desplazamiento
          const startX = star.originalX + Math.cos(angle) * (distance * startOffsetFactor * 0.08) // Aumentado el multiplicador
          const startY = star.originalY + Math.sin(angle) * (distance * startOffsetFactor * 0.08)

          // Crear un gradiente para las líneas de estrellas para un efecto más realista
          const gradient = ctx.createLinearGradient(startX, startY, star.x, star.y)

          // El gradiente comienza con un color más brillante y termina desvaneciéndose
          gradient.addColorStop(0, `rgba(${star.color}, ${star.opacity * 0.95})`)
          gradient.addColorStop(1, `rgba(${star.color}, ${star.opacity * 0.6})`)

          // Draw elongated star (line) for hyperspace effect - sin punto de origen
          ctx.beginPath()
          ctx.moveTo(startX, startY)
          ctx.lineTo(star.x, star.y)

          // Usar el gradiente para la línea
          ctx.strokeStyle = gradient
          ctx.lineWidth = dynamicSize * 0.4 // Reducido para líneas más finas
          ctx.stroke()

          // Add a small dot at the end for mejor efecto visual
          ctx.beginPath()
          ctx.arc(star.x, star.y, dynamicSize * 0.3, 0, Math.PI * 2) // Punto final más pequeño
          ctx.fillStyle = `rgba(${star.color}, ${star.opacity * 0.8})`
          ctx.fill()
        } else {
          // Reset star position when not in hyperspace
          star.x = star.originalX
          star.y = star.originalY

          // Draw normal star
          ctx.beginPath()
          ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(${star.color}, ${star.opacity})`
          ctx.fill()
        }
      })

      animationRef.current = requestAnimationFrame(drawStars)
    }

    drawStars()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [hyperSpaceFactor])

  // Apply blur filter based on the blur amount with a smoother transition
  const blurStyle = {
    filter: `blur(${blurAmount}px)`,
    transition: "filter 0.2s ease-out", // Slightly longer transition for smoother effect
  }

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{
        ...blurStyle,
      }}
      aria-hidden="true"
    />
  )
}
