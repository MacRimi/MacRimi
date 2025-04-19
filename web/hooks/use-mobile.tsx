"use client"

import { useState, useEffect } from "react"

export function useMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Función para comprobar si es un dispositivo móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // Comprobar al inicio
    checkMobile()

    // Comprobar al cambiar el tamaño de la ventana
    window.addEventListener("resize", checkMobile)

    // Limpiar el event listener
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}
