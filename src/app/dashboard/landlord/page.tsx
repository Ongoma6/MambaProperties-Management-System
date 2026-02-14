'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import Link from 'next/link';

export default function LandlordDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [properties, setProperties] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) return;

      // Get landlord's properties
      const { data: propsData } = await supabase
        .from('properties')
        .select('*')
        .eq('landlord_id', user.id);

      setProperties(propsData || []);

      // Calculate stats
      if (propsData) {
        const totalUnits = propsData.reduce((sum, p) => sum + p.total_units, 0);
        const occupiedUnits = propsData.reduce((sum, p) => sum + p.occupied_units, 0);

        setStats({
          totalProperties: propsData.length,
          totalUnits,
          occupiedUnits,
          occupancyRate: totalUnits > 0 ? Math.round((occupiedUnits / totalUnits) * 100) : 0,
        });
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div className="p-8">Loading dashboard...</div>;

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold mb-8">Landlord Dashboard</h1>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 p-6 rounded-lg">
            <p className="text-gray-400">Properties</p>
            <p className="text-4xl font-bold text-white">{stats.totalProperties}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <p className="text-gray-400">Total Units</p>
            <p className="text-4xl font-bold text-white">{stats.totalUnits}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <p className="text-gray-400">Occupied</p>
            <p className="text-4xl font-bold text-green-500">{stats.occupiedUnits}</p>
          </div>
          <div className="bg-slate-800 p-6 rounded-lg">
            <p className="text-gray-400">Occupancy Rate</p>
            <p className="text-4xl font-bold text-blue-500">{stats.occupancyRate}%</p>
          </div>
        </div>
      )}

      {/* Properties List */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Your Properties</h2>
          <Link
            href="/properties/new"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
          >
            + Add Property
          </Link>
        </div>

        {properties.length === 0 ? (
          <p className="text-gray-400">No properties yet. Create your first property!</p>
        ) : (
          <div className="bg-slate-800 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-900">
                <tr>
                  <th className="px-6 py-4 text-left">Property</th>
                  <th className="px-6 py-4 text-left">Location</th>
                  <th className="px-6 py-4 text-left">Units</th>
                  <th className="px-6 py-4 text-left">Occupancy</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {properties.map(prop => (
                  <tr key={prop.id} className="border-b border-slate-700 hover:bg-slate-700">
                    <td className="px-6 py-4 font-semibold">{prop.name}</td>
                    <td className="px-6 py-4">{prop.location}</td>
                    <td className="px-6 py-4">{prop.total_units}</td>
                    <td className="px-6 py-4">
                      {prop.occupied_units}/{prop.total_units}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        prop.status === 'active' ? 'bg-green-600' : 'bg-gray-600'
                      }`}>
                        {prop.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        href={`/properties/${prop.id}`}
                        className="text-green-500 hover:text-green-400"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Links */}
      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/invoices"
          className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg border border-slate-700"
        >
          <h3 className="text-xl font-bold text-white mb-2">📄 Invoices</h3>
          <p className="text-gray-400">View and manage invoices</p>
        </Link>
        <Link
          href="/tenants"
          className="bg-slate-800 hover:bg-slate-700 p-6 rounded-lg border border-slate-700"
        >
          <h3 className="text-xl font-bold text-white mb-2">👥 Tenants</h3>
          <p className="text-gray-400">Manage tenant information</p>
        </Link>
      </div>
    </div>
  );
}