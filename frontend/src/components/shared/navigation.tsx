'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Package, MapPin, User, LogOut, Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface NavigationProps {
  role?: 'customer' | 'staff' | 'admin';
}

export function CustomerNavigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/customer', icon: Home, label: 'Home' },
    { href: '/customer/orders', icon: Package, label: 'Orders' },
    { href: '/customer/new-order', icon: Package, label: 'New Order' },
    { href: '/customer/track', icon: MapPin, label: 'Track' },
    { href: '/customer/profile', icon: User, label: 'Profile' },
  ];

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/customer">
              <div className="flex items-center gap-2 cursor-pointer interactive">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">FC</span>
                </div>
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  FreshClean
                </span>
              </div>
            </Link>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative touch-target">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  2
                </Badge>
              </Button>

              <Avatar className="w-9 h-9 cursor-pointer interactive">
                <AvatarFallback className="bg-blue-100 text-blue-700">CO</AvatarFallback>
              </Avatar>

              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden touch-target"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Navigation (Mobile) */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 safe-area-inset">
        <div className="flex justify-around items-center h-16">
          {navItems.slice(0, 5).map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="flex-1">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className={`flex flex-col items-center justify-center gap-1 py-2 touch-target ${
                    isActive ? 'text-blue-600' : 'text-gray-500'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
                  <span className="text-xs font-medium">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Desktop Side Navigation */}
      <aside className="hidden lg:flex fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-gray-200 flex-col p-4">
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all touch-target ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-medium'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="pt-4 border-t border-gray-200">
          <Link href="/auth/logout">
            <motion.div
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 transition-all touch-target"
            >
              <LogOut className="w-5 h-5" />
              <span>Logout</span>
            </motion.div>
          </Link>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="lg:hidden fixed inset-0 bg-black/50 z-50"
          onClick={() => setMobileMenuOpen(false)}
        >
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-white p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="text-lg font-bold">Menu</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setMobileMenuOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            <nav className="space-y-2">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href} onClick={() => setMobileMenuOpen(false)}>
                    <div
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl touch-target ${
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </nav>

            <div className="absolute bottom-4 left-4 right-4">
              <Link href="/auth/logout" onClick={() => setMobileMenuOpen(false)}>
                <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50 touch-target">
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </div>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

export function StaffNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/staff/dashboard', icon: Home, label: 'Dashboard' },
    { href: '/staff/tasks', icon: Package, label: 'Tasks' },
    { href: '/staff/history', icon: Package, label: 'History' },
    { href: '/staff/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold">FC</span>
            </div>
            <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
              FreshClean Staff
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div className={`flex items-center gap-2 py-2 touch-target ${
                    isActive ? 'text-purple-700 font-medium' : 'text-gray-600 hover:text-gray-900'
                  }`}>
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          <Link href="/auth/logout">
            <Button variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function AdminNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin/dashboard', icon: Package, label: 'Dashboard' },
    { href: '/admin/orders', icon: Package, label: 'Orders' },
    { href: '/admin/customers', icon: User, label: 'Customers' },
    { href: '/admin/staff', icon: User, label: 'Staff' },
    { href: '/admin/analytics', icon: Package, label: 'Analytics' },
    { href: '/admin/settings', icon: Package, label: 'Settings' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">FC</span>
              </div>
              <span className="text-lg font-bold text-white">Admin</span>
            </div>

            <div className="hidden lg:flex items-center gap-6">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link key={item.href} href={item.href}>
                    <div className={`flex items-center gap-2 py-2 touch-target ${
                      isActive ? 'text-white font-medium' : 'text-gray-400 hover:text-gray-200'
                    }`}>
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          <Link href="/auth/logout">
            <Button variant="outline" size="sm" className="bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
