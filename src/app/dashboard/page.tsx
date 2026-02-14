'use client';

import { useEffect, useState } from 'react';
import { createBrowserClient } from '@supabase/ssr';

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    loadUser();
  }, []);

  async function loadUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      if (user) {
        const { data } = await supabase
          .from('users')
          .select('*')
          .eq('id', user.id)
          .single();

        setUserProfile(data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Welcome back! 👋</h1>
      <p className="text-gray-600 mb-8">
        You have 3 properties with 18 units and 12 active tenants
      </p>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-medium mb-1">Total Properties</p>
          <p className="text-3xl font-bold">3</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-medium mb-1">Active Units</p>
          <p className="text-3xl font-bold">18</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-medium mb-1">Active Tenants</p>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-600 text-sm font-medium mb-1">Monthly Revenue</p>
          <p className="text-3xl font-bold text-green-600">KES 245K</p>
        </div>
      </div>

      {/* Main Features */}
      <h2 className="text-2xl font-bold mb-6">Main Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">🏢 Properties</h3>
          <p className="text-gray-600 mb-4">Manage all your rental properties</p>
          <a href="/properties" className="text-blue-600 font-semibold">Learn More →</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">👥 Tenants</h3>
          <p className="text-gray-600 mb-4">Track and manage tenant information</p>
          <a href="/tenants" className="text-blue-600 font-semibold">Learn More →</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">📄 Invoices</h3>
          <p className="text-gray-600 mb-4">Generate and track rent invoices</p>
          <a href="/invoices" className="text-blue-600 font-semibold">Learn More →</a>
        </div>
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
          <h3 className="text-xl font-bold mb-2">💰 Payments</h3>
          <p className="text-gray-600 mb-4">Track rent payments and receipts</p>
          <a href="/payments" className="text-blue-600 font-semibold">Learn More →</a>
        </div>
      </div>

      {/* Recent Activity */}
      <h2 className="text-2xl font-bold mb-6">Recent Activity</h2>
      <div className="bg-white p-6 rounded-lg shadow">
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-semibold">Invoice generated for Ongoma Moses</p>
              <p className="text-sm text-gray-600">2 hours ago</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm">New</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <div>
              <p className="font-semibold">New tenant assigned to Unit 101</p>
              <p className="text-sm text-gray-600">1 day ago</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">Done</span>
          </div>
          <div className="flex justify-between items-center py-3">
            <div>
              <p className="font-semibold">Payment received - KES 15,000</p>
              <p className="text-sm text-gray-600">3 days ago</p>
            </div>
            <span className="bg-green-100 text-green-800 px-3 py-1 rounded text-sm">Paid</span>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <h2 className="text-2xl font-bold mt-8 mb-6">Quick Stats</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-600 text-sm">Occupancy Rate</p>
          <p className="text-2xl font-bold mt-2">75%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-600 text-sm">Collection Rate</p>
          <p className="text-2xl font-bold mt-2">92%</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-600 text-sm">Pending Payments</p>
          <p className="text-2xl font-bold mt-2">5</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <p className="text-gray-600 text-sm">Arrears</p>
          <p className="text-2xl font-bold mt-2">KES 45K</p>
        </div>
      </div>
    </div>
  );
}