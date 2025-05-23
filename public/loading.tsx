"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/logo"
import { Home, Heart, MessageSquare, Settings, User, LogOut, Menu, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Sidebar() {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: <Home size={20} /> },
    { name: "Discover", href: "/dashboard/discover", icon: <Heart size={20} /> },
    { name: "Messages", href: "/dashboard/messages", icon: <MessageSquare size={20} /> },
    { name: "Profile", href: "/dashboard/profile", icon: <User size={20} /> },
    { name: "Settings", href: "/dashboard/settings", icon: <Settings size={20} /> },
  ]

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          className="bg-gray-900/80 backdrop-blur-sm"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full bg-black border-r border-gray-800 transition-all duration-300 z-40 
        ${isCollapsed ? "w-20" : "w-64"} 
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-gray-800 flex justify-between items-center">
            {isCollapsed ? (
              <div className="mx-auto">
                <Image
                  src="/galatea-ai-logo.png"
                  alt="Galatea.AI Logo"
                  width={30}
                  height={30}
                  className="filter brightness-0 invert"
                />
              </div>
            ) : (
              <Logo size="small" showText={true} />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="hidden md:flex text-gray-400"
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
            </Button>
          </div>

          {/* User Profile */}
          <div className={`p-4 border-b border-gray-800 ${isCollapsed ? "flex justify-center" : ""}`}>
            {isCollapsed ? (
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <User size={20} className="text-teal-400" />
                </div>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                  <User size={20} className="text-teal-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Alex Johnson</h3>
                  <p className="text-xs text-gray-400">Premium Member</p>
                </div>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-6 overflow-y-auto">
            <ul className="space-y-1 px-2">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors
                    ${
                      pathname === item.href
                        ? "bg-teal-500/20 text-teal-400"
                        : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <span>{item.icon}</span>
                    {!isCollapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-800">
            <Link
              href="/logout"
              className={`flex items-center space-x-3 px-3 py-2 rounded-md text-gray-400 hover:bg-gray-800 hover:text-white transition-colors`}
              onClick={() => setIsMobileOpen(false)}
            >
              <LogOut size={20} />
              {!isCollapsed && <span>Logout</span>}
            </Link>
          </div>
        </div>
      </aside>
    </>
  )
}
