'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';
import { useRouter } from 'next/navigation';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push('/auth/login');
  }

  return (
    <header className="bg-white shadow-tc sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">MP</span>
            </div>
            <span className="font-bold text-xl text-gray-900">MambaProperties</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-primary-500 font-medium">
              Dashboard
            </Link>
            <Link href="/properties" className="text-gray-700 hover:text-primary-500 font-medium">
              Properties
            </Link>
            <Link href="/invoices" className="text-gray-700 hover:text-primary-500 font-medium">
              Invoices
            </Link>
            <Link href="/reports" className="text-gray-700 hover:text-primary-500 font-medium">
              Reports
            </Link>
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={handleLogout}
              className="btn btn-secondary btn-sm"
            >
              Sign Out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-primary-500"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            <Link href="/dashboard" className="block py-2 px-4 text-gray-700 hover:bg-gray-50">
              Dashboard
            </Link>
            <Link href="/properties" className="block py-2 px-4 text-gray-700 hover:bg-gray-50">
              Properties
            </Link>
            <Link href="/invoices" className="block py-2 px-4 text-gray-700 hover:bg-gray-50">
              Invoices
            </Link>
            <Link href="/reports" className="block py-2 px-4 text-gray-700 hover:bg-gray-50">
              Reports
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}