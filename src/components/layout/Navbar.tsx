'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/' },
  { label: 'Properties', href: '/properties' },
  { label: 'Units', href: '/units' },
  { label: 'Tenants', href: '/tenants' },
  { label: 'Invoices', href: '/invoices' },
  { label: 'Payments', href: '/payments' },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 font-bold text-xl min-w-fit">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center text-lg">
              🏠
            </div>
            <span className="hidden sm:inline">MambaProperties</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 flex-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg transition-all text-sm font-medium whitespace-nowrap ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-dark-300 hover:bg-dark-700 hover:text-white'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4 min-w-fit">
            {/* Notifications */}
            <button className="p-2 hover:bg-dark-700 rounded-lg transition relative text-lg">
              🔔
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile */}
            <div className="flex items-center gap-2 pl-4 border-l border-dark-700">
              <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center font-bold text-sm">
                T
              </div>
              <div className="hidden sm:block">
                <p className="text-xs text-dark-400">landlord@test.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}