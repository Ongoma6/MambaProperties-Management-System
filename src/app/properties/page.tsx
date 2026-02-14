'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getProperties } from '@/lib/db';
import Link from 'next/link';

interface Property {
  id: string;
  name: string;
  location: string;
  plot_id: string;
  total_units: number;
  occupied_units: number;
  status: string;
  created_at: string;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchProperties();
  }, []);

  async function fetchProperties() {
    try {
      setLoading(true);
      const data = await getProperties();
      setProperties(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <p className="text-gray-500">Loading properties...</p>
      </div>
    );
  }

  return (
  <div className="space-y-8">
    {/* Header */}
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-4xl font-bold mb-2">Properties</h1>
        <p className="text-dark-400">
          Manage all your rental properties in one place
        </p>
      </div>
      <button
        onClick={() => router.push('/properties/new')}
        className="bg-gradient-primary text-white px-6 py-3 rounded-lg hover:shadow-card transition-all font-medium"
      >
        + Add Property
      </button>
    </div>

    {/* Properties Grid */}
    {properties.length === 0 ? (
      <div className="bg-dark-800 rounded-xl p-12 text-center border border-dark-700">
        <p className="text-dark-400 text-lg">
          No properties yet. Create your first property to get started!
        </p>
      </div>
    ) : (
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => (
          <div
            key={property.id}
            onClick={() => router.push(`/properties/${property.id}`)}
            className="bg-dark-800 border border-dark-700 rounded-xl p-6 hover:border-primary-500 cursor-pointer transition-all hover:shadow-card"
          >
            {/* Property Header */}
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-bold">
                  {property.name}
                </h2>
                <p className="text-sm text-dark-400 mt-1">
                  {property.plot_id}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                property.status === 'active'
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-dark-700 text-dark-300'
              }`}>
                {property.status}
              </span>
            </div>

            {/* Location */}
            <p className="text-dark-300 mb-4">
              📍 {property.location}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="bg-dark-700 p-3 rounded-lg text-center">
                <p className="text-xs text-dark-400 mb-1">Units</p>
                <p className="text-xl font-bold text-primary-400">
                  {property.total_units}
                </p>
              </div>
              <div className="bg-dark-700 p-3 rounded-lg text-center">
                <p className="text-xs text-dark-400 mb-1">Occupied</p>
                <p className="text-xl font-bold text-green-400">
                  {property.occupied_units}
                </p>
              </div>
              <div className="bg-dark-700 p-3 rounded-lg text-center">
                <p className="text-xs text-dark-400 mb-1">Rate</p>
                <p className="text-xl font-bold text-blue-400">
                  {Math.round((property.occupied_units / property.total_units) * 100)}%
                </p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-dark-700 rounded-full h-2">
              <div
                className="bg-gradient-primary h-2 rounded-full"
                style={{
                  width: `${(property.occupied_units / property.total_units) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
)};