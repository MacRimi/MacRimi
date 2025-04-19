"use client"

import { Github, Mail, MessageCircle } from "lucide-react"
import { forwardRef } from "react"

const Footer = forwardRef<HTMLElement, {}>(function Footer(props, ref) {
  return (
    <footer ref={ref} className="text-white py-12 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Support Section - Left Side */}
          <div className="flex flex-col items-start mb-8 md:mb-0">
            <h4 className="text-lg font-semibold mb-4">Sponsor</h4>
            <p className="text-gray-400 mb-4 max-w-md">If you would like to support my projects and work.</p>
            <a
              href="https://ko-fi.com/G2G313ECAN"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-90 transition-opacity"
            >
              <img
                src="https://raw.githubusercontent.com/MacRimi/ProxMenux/main/images/kofi.png"
                alt="Support me on Ko-fi"
                width={140}
                height={40}
                className="w-[140px]"
                loading="lazy"
              />
            </a>
          </div>

          {/* Contact Section - Right Side */}
          <div className="flex flex-col items-start md:items-end">
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <p className="text-gray-400 mb-4 max-w-md md:text-right">
              Feel free to reach out to me through any of these channels.
            </p>
            <div className="flex flex-col md:items-end gap-3">
              <a
                href="mailto:contact@macrimi.com"
                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
              >
                <Mail className="h-6 w-6" />
                contact@macrimi.com
              </a>
              <a
                href="https://t.me/MacRimi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
              >
                <MessageCircle className="h-6 w-6" />
                Telegram: @MacRimi
              </a>
              <a
                href="https://discord.com/users/Macrimi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-white hover:text-blue-300 transition-colors"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
                Discord: Macrimi
              </a>
            </div>
          </div>
        </div>

        {/* Copyright - Center */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <div className="flex items-center justify-center mb-4">
            <a
              href="https://github.com/MacRimi"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-gray-400 hover:text-blue-400 transition-colors"
            >
              <Github className="mr-2 h-5 w-5" />
              github.com/MacRimi
            </a>
          </div>
          <p>© {new Date().getFullYear()} MacRimi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
})

export default Footer
