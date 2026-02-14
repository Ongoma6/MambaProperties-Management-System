'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllTenants } from '@/lib/db';

interface Tenant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  occupation: string;
  id_number: string;
  id_type: string;
  created_at: string;
}

export default function TenantsPage() {
  const router = useRouter();
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTenants();
  }, []);

  async function fetchTenants() {
    try {
      setLoading(true);
      const data = await getAllTenants();
      setTenants(data);
    } catch (err) {
      console.error('Error fetching tenants:', err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <p className="text-gray-500">Loading tenants...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Tenants</h1>
          <p className="text-gray-600">
            Manage all your tenants in one place
          </p>
        </div>
        <button
          onClick={() => router.push('/tenants/new')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
        >
          + Add Tenant
        </button>
      </div>

      {/* Tenants Grid */}
      {tenants.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-12 text-center">
          <p className="text-gray-500 text-lg">
            No tenants yet. Add your first tenant to get started!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {tenants.map((tenant) => (
            <div
              key={tenant.id}
              className="bg-white border rounded-lg p-6 hover:shadow-lg transition"
            >
              {/* Tenant Header */}
              <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-900">
                  {tenant.first_name} {tenant.last_name}
                </h2>
              </div>

              {/* Contact Info */}
              <div className="space-y-2 mb-4">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900 break-all">{tenant.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="text-gray-900">{tenant.phone}</p>
                </div>
                {tenant.occupation && (
                  <div>
                    <p className="text-sm text-gray-600">Occupation</p>
                    <p className="text-gray-900">{tenant.occupation}</p>
                  </div>
                )}
              </div>

              {/* ID Info */}
              <div className="bg-gray-50 p-3 rounded mb-4">
                <p className="text-sm text-gray-600">
                  {tenant.id_type}: {tenant.id_number}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t">
                <button
                  onClick={() => router.push(`/tenants/${tenant.id}`)}
                  className="flex-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                >
                  View Details
                </button>
                <button
                  onClick={() => console.log('Assign coming soon')}
                  className="flex-1 text-green-600 hover:text-green-800 font-medium text-sm"
                >
                  Assign Unit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}