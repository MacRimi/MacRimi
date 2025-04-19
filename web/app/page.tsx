"use client"
import { StarField } from "@/components/star-field"
import type React from "react"

import { ChevronDown, Github } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { cn } from "@/lib/utils"
import Footer from "@/components/footer"

import { Brain, FolderKanban, Code2, BadgeHelp } from "lucide-react"

export default function Home() {
  const [isAboutVisible, setIsAboutVisible] = useState(false)
  const [isProjectsVisible, setIsProjectsVisible] = useState(false)
  const [isProjectsTitleVisible, setIsProjectsTitleVisible] = useState(false)
  const [isGithubVisible, setIsGithubVisible] = useState(false)
  const [blurAmount, setBlurAmount] = useState(0)
  const [hyperSpaceFactor, setHyperSpaceFactor] = useState(0)
  const [isJumping, setIsJumping] = useState(false) // Estado para controlar si estamos en medio de un salto
  const [jumpTarget, setJumpTarget] = useState<HTMLElement | null>(null) // Objetivo del salto
  const [initialHeight, setInitialHeight] = useState(0)
  const [isHeroVisible, setIsHeroVisible] = useState(true) // Estado para controlar si la sección hero está visible
  const [showNavbar, setShowNavbar] = useState(false) // Estado para controlar la visibilidad de la navbar
  const heroSectionRef = useRef<HTMLElement>(null) // Referencia a la sección hero
  const aboutSectionRef = useRef<HTMLElement>(null)
  const aboutContentRef = useRef<HTMLDivElement>(null)
  const projectsSectionRef = useRef<HTMLElement>(null)
  const projectsContentRef = useRef<HTMLDivElement>(null)
  const projectsTitleRef = useRef<HTMLHeadingElement>(null)
  const githubSectionRef = useRef<HTMLElement>(null)
  const proxmenuxRef = useRef<HTMLDivElement>(null)
  const hwencoderxRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef(0)
  const lastScrollRef = useRef(0)
  const scrollSpeedRef = useRef(0)
  const scrollDirectionRef = useRef<"up" | "down">("down")
  const lastScrollTimeRef = useRef(Date.now())
  const ticking = useRef(false)
  const hyperSpaceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scrollThrottleRef = useRef<NodeJS.Timeout | null>(null)
  const sectionsRef = useRef<HTMLElement[]>([])
  const footerRef = useRef<HTMLElement>(null)
  const touchStartY = useRef<number | null>(null)
  const touchMoveY = useRef<number | null>(null)
  const touchThrottleRef = useRef<NodeJS.Timeout | null>(null)

  // Store initial height on first render
  useEffect(() => {
    if (initialHeight === 0) {
      setInitialHeight(window.innerHeight)
    }
  }, [initialHeight])

  // Populate sections ref when all refs are available
  useEffect(() => {
    // Collect all section refs that are not null
    const sections: HTMLElement[] = []

    if (document.documentElement) sections.push(document.documentElement) // Add top of page
    if (aboutSectionRef.current) sections.push(aboutSectionRef.current)
    if (projectsSectionRef.current) sections.push(projectsSectionRef.current)
    if (githubSectionRef.current) sections.push(githubSectionRef.current)

    // Sort sections by their position from top to bottom
    sections.sort((a, b) => {
      const aRect = a.getBoundingClientRect()
      const bRect = b.getBoundingClientRect()
      return aRect.top - bRect.top
    })

    sectionsRef.current = sections
  }, [])

  // Detectar si la sección hero está visible y controlar la navbar
  useEffect(() => {
    const checkHeroVisibility = () => {
      if (heroSectionRef.current) {
        const rect = heroSectionRef.current.getBoundingClientRect()
        // La sección hero está visible si su parte superior está visible
        // y no ha desaparecido completamente de la vista
        const isVisible = rect.top >= -100 && rect.bottom > 0
        setIsHeroVisible(isVisible)

        // Mostrar la navbar solo cuando la sección hero no está visible
        setShowNavbar(!isVisible)
      }
    }

    // Comprobar la visibilidad inicial
    checkHeroVisibility()

    // Comprobar la visibilidad al hacer scroll
    window.addEventListener("scroll", checkHeroVisibility, { passive: true })

    return () => {
      window.removeEventListener("scroll", checkHeroVisibility)
    }
  }, [])

  // Find the next or previous section based on scroll direction
  const findTargetSection = (direction: "up" | "down"): HTMLElement | null => {
    const sections = sectionsRef.current
    if (sections.length === 0) return null

    // Obtener la posición actual de la ventana
    const viewportMiddle = window.scrollY + window.innerHeight / 2

    if (direction === "down") {
      // Encontrar la primera sección cuyo inicio esté por debajo de la mitad de la ventana
      for (const section of sections) {
        const sectionTop = section.getBoundingClientRect().top + window.scrollY
        if (sectionTop > viewportMiddle + 50) {
          // Añadir un pequeño margen
          return section
        }
      }
      // Si ya estamos en la última sección, no hacer nada
      return null
    } else {
      // Encontrar la primera sección cuyo final esté por encima de la mitad de la ventana (en orden inverso)
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        const sectionBottom = section.getBoundingClientRect().bottom + window.scrollY
        if (sectionBottom < viewportMiddle - 50) {
          // Añadir un pequeño margen
          return section
        }
      }
      // Si ya estamos en la primera sección, no hacer nada
      return null
    }
  }

  // Función para iniciar el salto al hiperespacio
  const initiateHyperSpaceJump = () => {
    // Si estamos en la sección hero y queremos ir hacia abajo, ir a la sección about
    if (aboutSectionRef.current && !isJumping) {
      setIsJumping(true)
      setJumpTarget(aboutSectionRef.current)
    }
  }

  // Handle scroll events to calculate blur amount and hyperspace effect
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      // Si no estamos en la sección hero, permitir el scroll normal
      if (!isHeroVisible) {
        return
      }

      // Si estamos en la sección hero, prevenir el scroll normal
      e.preventDefault()

      // Si estamos en medio de un salto al hiperespacio, no procesamos nada más
      if (isJumping) {
        return
      }

      // Store the current scroll position
      const currentScroll = window.scrollY
      const now = Date.now()
      const timeDelta = now - lastScrollTimeRef.current

      // Determine scroll direction based on the wheel delta
      scrollDirectionRef.current = e.deltaY > 0 ? "down" : "up"

      // Solo activar el hiperespacio si la dirección es hacia abajo
      if (scrollDirectionRef.current === "down") {
        // Throttle hyperspace jumps to prevent multiple triggers
        if (scrollThrottleRef.current) {
          clearTimeout(scrollThrottleRef.current)
        }

        scrollThrottleRef.current = setTimeout(() => {
          initiateHyperSpaceJump()
        }, 50)
      }

      // Update last scroll time
      lastScrollTimeRef.current = now
    }

    // Use passive: false to be able to prevent default
    window.addEventListener("wheel", handleScroll, { passive: false })

    return () => {
      window.removeEventListener("wheel", handleScroll)
    }
  }, [initialHeight, isJumping, isHeroVisible])

  // Manejar eventos táctiles para dispositivos móviles
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      // Si no estamos en la sección hero, permitir el comportamiento normal
      if (!isHeroVisible || isJumping) {
        return
      }

      // Guardar la posición inicial del toque
      touchStartY.current = e.touches[0].clientY
      touchMoveY.current = null
    }

    const handleTouchMove = (e: TouchEvent) => {
      // Si no estamos en la sección hero o no tenemos posición inicial, permitir el comportamiento normal
      if (!isHeroVisible || touchStartY.current === null || isJumping) {
        return
      }

      // Actualizar la posición actual del toque
      touchMoveY.current = e.touches[0].clientY

      // Calcular la dirección del deslizamiento
      const touchDelta = touchStartY.current - (touchMoveY.current || 0)

      // Si el deslizamiento es hacia abajo (delta positivo), prevenir el comportamiento por defecto
      if (touchDelta > 10) {
        e.preventDefault()
      }
    }

    const handleTouchEnd = (e: TouchEvent) => {
      // Si no estamos en la sección hero o no tenemos posiciones, permitir el comportamiento normal
      if (!isHeroVisible || touchStartY.current === null || touchMoveY.current === null || isJumping) {
        touchStartY.current = null
        touchMoveY.current = null
        return
      }

      // Calcular la direccin y distancia del deslizamiento
      const touchDelta = touchStartY.current - touchMoveY.current

      // Si el deslizamiento es hacia abajo (delta positivo) y es lo suficientemente grande
      if (touchDelta > 50) {
        // Throttle para evitar múltiples activaciones
        if (touchThrottleRef.current) {
          clearTimeout(touchThrottleRef.current)
        }

        touchThrottleRef.current = setTimeout(() => {
          initiateHyperSpaceJump()
        }, 50)
      }

      // Resetear las posiciones
      touchStartY.current = null
      touchMoveY.current = null
    }

    // Añadir event listeners para eventos táctiles
    window.addEventListener("touchstart", handleTouchStart, { passive: true })
    window.addEventListener("touchmove", handleTouchMove, { passive: false })
    window.addEventListener("touchend", handleTouchEnd, { passive: true })

    return () => {
      window.removeEventListener("touchstart", handleTouchStart)
      window.removeEventListener("touchmove", handleTouchMove)
      window.removeEventListener("touchend", handleTouchEnd)
    }
  }, [isHeroVisible, isJumping])

  // Efecto para manejar la secuencia de salto al hiperespacio
  useEffect(() => {
    if (isJumping && jumpTarget) {
      // Limpiar cualquier timeout anterior
      if (hyperSpaceTimeoutRef.current) {
        clearTimeout(hyperSpaceTimeoutRef.current)
      }

      // Iniciar la secuencia de hiperespacio
      const maxHyperSpace = 8 // Mantenemos el máximo para un efecto dramático

      // Animación de aceleración al hiperespacio
      let step = 0
      const totalSteps = 30 // Aumentamos los pasos para una animación más lenta
      const accelerate = () => {
        if (step < totalSteps) {
          const progress = step / totalSteps
          // Función de aceleración no lineal para un efecto más dramático
          const easedProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

          setHyperSpaceFactor(maxHyperSpace * easedProgress)
          step++
          // Ralentizamos la animación añadiendo un pequeño retraso entre frames
          setTimeout(() => requestAnimationFrame(accelerate), 20)
        } else {
          // Mantener el efecto máximo por un momento más largo
          hyperSpaceTimeoutRef.current = setTimeout(() => {
            // Realizar el salto a la sección de destino
            jumpTarget.scrollIntoView({
              behavior: "auto", // Usamos "auto" en lugar de "smooth" para un salto instantáneo
              block: "start",
            })

            // Iniciar la desaceleración
            let decelerateStep = 0
            const decelerate = () => {
              if (decelerateStep < totalSteps) {
                const progress = 1 - decelerateStep / totalSteps
                // Función de desaceleración no lineal
                const easedProgress = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2

                setHyperSpaceFactor(maxHyperSpace * easedProgress)
                decelerateStep++
                // Ralentizamos también la desaceleración
                setTimeout(() => requestAnimationFrame(decelerate), 20)
              } else {
                // Finalizar la secuencia
                setHyperSpaceFactor(0)
                setIsJumping(false)
                setJumpTarget(null)
              }
            }

            requestAnimationFrame(decelerate)
          }, 800) // Aumentamos el tiempo que se mantiene el efecto máximo
        }
      }

      requestAnimationFrame(accelerate)
    }

    return () => {
      if (hyperSpaceTimeoutRef.current) {
        clearTimeout(hyperSpaceTimeoutRef.current)
      }
    }
  }, [isJumping, jumpTarget])

  // Intersection observer for visibility
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
    }

    // Función para crear un observer
    const createObserver = (
      ref: React.RefObject<HTMLElement>,
      setVisibleState: React.Dispatch<React.SetStateAction<boolean>>,
    ) => {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setVisibleState(true)
          // Once visible, no need to observe anymore
          if (ref.current) {
            observer.unobserve(ref.current)
          }
        }
      }, observerOptions)

      if (ref.current) {
        observer.observe(ref.current)
      }

      return observer
    }

    // Crear observers para cada sección
    const aboutObserver = createObserver(aboutContentRef, setIsAboutVisible)
    const projectsObserver = createObserver(projectsContentRef, setIsProjectsVisible)
    const projectsTitleObserver = createObserver(projectsTitleRef, setIsProjectsTitleVisible)
    const githubObserver = createObserver(githubSectionRef, setIsGithubVisible)

    // Cleanup
    return () => {
      if (aboutContentRef.current) aboutObserver.unobserve(aboutContentRef.current)
      if (projectsContentRef.current) projectsObserver.unobserve(projectsContentRef.current)
      if (projectsTitleRef.current) projectsTitleObserver.unobserve(projectsTitleRef.current)
      if (githubSectionRef.current) githubObserver.unobserve(githubSectionRef.current)
    }
  }, [])

  // Calculate scale factor based on blur amount
  // Maintain the same scaling effect even with reduced blur
  const scaleFactor = 1 + blurAmount / 16 // Adjusted to maintain similar scaling with reduced blur

  // Add a warp speed effect to stars based on blur amount
  const warpSpeedStyle = {
    transform: `scale(${scaleFactor})`,
    transition: "transform 0.2s ease-out", // Slightly longer transition for smoother effect
  }

  // Función para iniciar un salto al hiperespacio hacia una sección
  const hyperSpaceJumpTo = (targetRef: React.RefObject<HTMLElement>) => {
    if (targetRef.current && !isJumping) {
      setIsJumping(true)
      setJumpTarget(targetRef.current)
    }
  }

  // Scroll to sections with hyperspace effect
  const scrollToAbout = () => hyperSpaceJumpTo(aboutSectionRef)
  const scrollToProjects = () => hyperSpaceJumpTo(projectsSectionRef)
  const scrollToGithub = () => hyperSpaceJumpTo(githubSectionRef)
  const scrollToProxMenux = () => hyperSpaceJumpTo(proxmenuxRef)
  const scrollToHWEncoderX = () => hyperSpaceJumpTo(hwencoderxRef)
  const scrollToContact = () => hyperSpaceJumpTo(footerRef)
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  // Añadir nuevas funciones para scroll suave sin efecto de hiperespacio
  // Añadir estas funciones después de las funciones de hyperSpaceJumpTo existentes

  // Scroll suave normal para los botones de la navbar
  const smoothScrollTo = (targetRef: React.RefObject<HTMLElement>) => {
    if (targetRef.current) {
      targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  // Funciones de navegación suave para la navbar
  const navScrollToAbout = () => smoothScrollTo(aboutSectionRef)
  const navScrollToProjects = () => smoothScrollTo(projectsSectionRef)
  const navScrollToGithub = () => smoothScrollTo(githubSectionRef)
  const navScrollToContact = () => smoothScrollTo(footerRef)

  // Use fixed height for hero section based on initial viewport height
  const heroStyle = {
    height: initialHeight ? `${initialHeight}px` : "100vh",
  }

  // Clase común para los títulos de sección
  const sectionTitleClass = "mb-12 text-center text-3xl font-bold font-heading transition-all duration-1000 ease-out"

  // Clase común para los contenedores de sección
  const sectionContentClass = "max-w-5xl mx-auto transition-all duration-1000 ease-out"

  return (
    <div className="min-h-screen">
      {/* Navbar fija que aparece cuando no estamos en la sección hero */}
      <nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out",
          showNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
        )}
      >
        <div className="bg-gray-900 bg-opacity-90 backdrop-blur-sm shadow-lg">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center">
                <img
                  src="https://raw.githubusercontent.com/MacRimi/MacRimi/main/images/logo.png"
                  alt="MacRimi Logo"
                  className="h-8 w-auto cursor-pointer"
                  onClick={scrollToTop}
                />
              </div>

              {/* Links de navegación */}
              <div className="flex items-center space-x-1 sm:space-x-4">
                <button
                  onClick={navScrollToAbout}
                  className="px-2 sm:px-3 py-2 text-sm sm:text-base text-white hover:text-blue-300 transition-colors"
                  disabled={isJumping}
                >
                  About
                </button>
                <button
                  onClick={navScrollToProjects}
                  className="px-2 sm:px-3 py-2 text-sm sm:text-base text-white hover:text-blue-300 transition-colors"
                  disabled={isJumping}
                >
                  Projects
                </button>
                <button
                  onClick={navScrollToGithub}
                  className="px-2 sm:px-3 py-2 text-sm:text-base text-white hover:text-blue-300 transition-colors"
                  disabled={isJumping}
                >
                  GitHub
                </button>
                <button
                  onClick={navScrollToContact}
                  className="px-2 sm:px-3 py-2 text-sm:text-base text-white hover:text-blue-300 transition-colors"
                  disabled={isJumping}
                >
                  Contact
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <section ref={heroSectionRef} className="relative w-full overflow-hidden bg-black" style={heroStyle}>
        <div className="absolute inset-0" style={warpSpeedStyle}>
          <StarField blurAmount={blurAmount} hyperSpaceFactor={hyperSpaceFactor} />
        </div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <div
              className="px-4 sm:px-6 py-6 sm:py-8 rounded-lg inline-block relative w-[90%] sm:w-auto"
              style={{
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <div className="flex justify-center items-center">
                <img
                  src="https://raw.githubusercontent.com/MacRimi/MacRimi/main/images/logo.png"
                  alt="MacRimi Logo"
                  className="max-w-full h-auto w-48 sm:w-64 md:w-80 lg:w-96"
                  style={{ filter: "drop-shadow(0 0 10px rgba(255,255,255,0.3))" }}
                />
              </div>
            </div>
          </div>

          <div
            className={cn("absolute bottom-20 cursor-pointer", isJumping ? "opacity-0" : "animate-bounce")}
            onClick={scrollToAbout}
            role="button"
            aria-label="Scroll to about section"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                scrollToAbout()
              }
            }}
          >
            <ChevronDown className="h-8 w-8 text-white" />
          </div>
        </div>
      </section>

      <section
        ref={aboutSectionRef}
        id="about"
        className="py-20 text-white"
        style={{
          background: "linear-gradient(to bottom, #111827, #1f2937)",
        }}
      >
        <div className="container mx-auto px-4">
          <div
            ref={aboutContentRef}
            className={cn(
              "max-w-4xl mx-auto transition-all duration-1000 ease-out",
              isAboutVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gray-700 flex-shrink-0">
                <img
                  src="/MacRimi.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-6 text-left px-4 md:px-0">
                <h2 className="text-4xl font-bold font-heading mb-4">👋 Hello there! I'm MacRimi</h2>

                <p className="text-gray-300">
                  <strong>Enthusiast of technology</strong>, servers, Proxmox VE, computers, home automation, retro
                  games, <em>The Goonies</em>, <em>Star Wars</em>…
                </p>
                <p className="text-gray-300">
                  And now, back to what brings us here: <strong>app development</strong>. That’s where I truly enjoy
                  myself and where I feel most at home.
                </p>
                <p className="text-gray-300">
                  All my projects are born from my own needs, and I’ve always believed that if something is useful to
                  me, it might also be useful to others. That’s why everything I build is crafted with care, attention
                  to detail, and genuine love—because at the end of the day, I build it for myself first.
                </p>

                <div className="border-t border-gray-600 my-6"></div>

                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Code2 className="w-5 h-5 text-blue-400" />
                  My Journey into Programming
                </h3>
                <p className="text-gray-300">
                  My journey into programming started in 2009, when I got my first Mac and began exploring development
                  and programming logic. My first steps were with FileMaker, writing scripts connected to a database.
                </p>
                <p className="text-gray-300">
                  In 2014, I built a complete management, invoicing, and maintenance system for the company I work
                  for—and it's still working like a charm to this day!
                </p>
                <p className="text-gray-300">
                  Although if I go further back, around the year 2000, I created my first website: an online portal with
                  news and tools for my city. Since then, I’ve never stopped learning—React, Next.js, Bash, Python… My
                  curious mind just can’t sit still.
                </p>

                <div className="border-t border-gray-600 my-6"></div>

                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <BadgeHelp className="w-5 h-5 text-blue-400" />
                  How I See the World
                </h3>
                <p className="text-gray-300">
                  I’ve never been satisfied just using things—I’ve always needed to know how they work. Games,
                  computers, tools, systems... I enjoy digging into the logic behind them, the hidden layers that make
                  them tick. For me, understanding is where the real fun begins.
                </p>

                <div className="border-t border-gray-600 my-6"></div>

                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <FolderKanban className="w-5 h-5 text-blue-400" />
                  Projects I'm Proud Of
                </h3>
                <div className="mt-2 p-4 bg-gray-800 rounded-md border border-gray-700">
                  <p className="text-gray-300">
                    I'm particularly proud of tools I've built like{" "}
                    <button
                      onClick={scrollToProxMenux}
                      className="font-semibold text-blue-400 underline hover:text-blue-300 transition-colors focus:outline-none"
                      disabled={isJumping}
                    >
                      ProxMenux
                    </button>{" "}
                    and{" "}
                    <button
                      onClick={scrollToHWEncoderX}
                      className="font-semibold text-blue-400 underline hover:text-blue-300 transition-colors focus:outline-none"
                      disabled={isJumping}
                    >
                      HWEncoderX
                    </button>
                    . You can learn more about them below.
                  </p>
                </div>

                <div className="border-t border-gray-600 my-6"></div>

                <h3 className="text-2xl font-semibold text-white flex items-center gap-2">
                  <Brain className="w-5 h-5 text-blue-400" />
                  My Philosophy
                </h3>
                <div className="mt-4 p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg border-l-4 border-blue-400 shadow-lg">
                  <blockquote className="text-xl italic text-gray-200 mb-4 relative pl-6">
                    <span className="absolute left-0 top-0 text-3xl text-blue-400">“</span>
                    What we do in life echoes in eternity.
                    <span className="block mt-2 text-right">— Maximus Decimus Meridius</span>
                  </blockquote>
                  <p className="text-gray-200">
                    I always try to help others in any way I can—enjoying the journey along the way. And that’s how it
                    will always be.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={projectsSectionRef}
        id="projects"
        className="py-20 text-white"
        style={{
          background: "linear-gradient(to bottom, #1f2937, #111827)",
        }}
      >
        <div className="container mx-auto px-4">
          <h2
            ref={projectsTitleRef}
            className={cn(
              sectionTitleClass,
              isProjectsTitleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            Projects I'm Proud Of
          </h2>
          <div
            ref={projectsContentRef}
            className={cn(
              sectionContentClass,
              isProjectsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* ProxMenux */}
              <a
                href="https://github.com/MacRimi/ProxMenux"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div
                  ref={proxmenuxRef}
                  id="proxmenux"
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer h-full group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src="https://raw.githubusercontent.com/MacRimi/ProxMenux/main/images/logo.png"
                      alt="ProxMenux Logo"
                      className="h-10 w-10"
                    />
                    <h3 className="text-xl font-semibold font-heading text-gray-900 group-hover:text-gray-800">
                      ProxMenux
                    </h3>
                  </div>
                  <p className="text-gray-600 group-hover:text-gray-700">
                    An interactive menu designed to make using, managing, and maintaining Proxmox VE easier for any
                    user, regardless of their experience or technical knowledge.
                  </p>
                </div>
              </a>

              {/* HWEncoderX */}
              <a
                href="https://github.com/MacRimi/HWEncoderX"
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div
                  ref={hwencoderxRef}
                  id="hwencoderx"
                  className="bg-white rounded-lg p-6 border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 cursor-pointer h-full group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <img
                      src="https://raw.githubusercontent.com/MacRimi/HWEncoderX/main/images/logo.png"
                      alt="HWEncoderX Logo"
                      className="h-10 w-10"
                    />
                    <h3 className="text-xl font-semibold font-heading text-gray-900 group-hover:text-gray-800">
                      HWEncoderX
                    </h3>
                  </div>
                  <p className="text-gray-600 group-hover:text-gray-700">
                    A Docker-based app for transcoding video files using GPU acceleration. Super powerful, yet simple
                    and easy to use. Just the way I like it: practical and efficient.
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        ref={githubSectionRef}
        id="github"
        className="py-20 text-white"
        style={{
          background: "linear-gradient(to bottom, #111827, #0f172a)",
        }}
      >
        <div className="container mx-auto px-4">
          <h2
            className={cn(
              sectionTitleClass,
              isGithubVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            GitHub
          </h2>
          <div
            className={cn(
              sectionContentClass,
              isGithubVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
            )}
          >
            <div className="bg-indigo-600 rounded-lg p-8 text-center hover:bg-indigo-700 transition-colors">
              <Github className="h-16 w-16 mx-auto mb-4 text-white" />
              <h3 className="text-xl font-semibold mb-4 text-white">Check out my repositories</h3>
              <p className="text-gray-200 mb-6">
                Explore my open-source projects and contributions on GitHub. Feel free to fork, star, or contribute to
                any project that interests you.
              </p>
              <a
                href="https://github.com/MacRimi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-indigo-700 font-bold py-2 px-6 rounded-lg transition-colors hover:bg-gray-100"
              >
                Visit GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer ref={footerRef} />

      {/* Indicador de hiperespacio activo */}
      {isJumping && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-black bg-opacity-70 text-white px-4 py-2 rounded-full text-sm font-medium">
          Jumping to lightspeed...
        </div>
      )}
    </div>
  )
}
