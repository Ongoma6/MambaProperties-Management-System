'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: '📊' },
  { name: 'Properties', href: '/properties', icon: '🏠' },
  { name: 'Units', href: '/units', icon: '🏢' },
  { name: 'Tenants', href: '/tenants', icon: '👥' },
  { name: 'Invoices', href: '/invoices', icon: '📄' },
  { name: 'Payments', href: '/payments', icon: '💰' },
  { name: 'Settings', href: '/settings', icon: '⚙️' },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-64 bg-dark-900 text-white h-screen fixed left-0 top-0 border-r border-dark-700">
        <div className="p-6 border-b border-dark-700">
          <div className="flex items-center gap-3 font-bold text-xl">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              🏠
            </div>
            <span>Mamba</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} bg-dark-900 text-white h-screen fixed left-0 top-0 border-r border-dark-700 overflow-y-auto`}>
      {/* Logo */}
      <div className="p-6 border-b border-dark-700">
        <Link href="/" className="flex items-center gap-3 font-bold text-xl">
          {isOpen ? (
            <>
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                🏠
              </div>
              <span>Mamba</span>
            </>
          ) : (
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              🏠
            </div>
          )}
        </Link>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                isActive
                  ? 'bg-primary-600 text-white'
                  : 'text-dark-300 hover:bg-dark-800'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {isOpen && <span className="text-sm font-medium">{item.name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute bottom-6 left-4 p-2 hover:bg-dark-800 rounded-lg transition"
      >
        {isOpen ? '◀' : '▶'}
      </button>
    </div>
  );
}

export default Sidebar;