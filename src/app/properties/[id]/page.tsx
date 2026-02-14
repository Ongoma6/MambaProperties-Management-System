'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getPropertyById, getUnitsForProperty, getTenanciesForProperty } from '@/lib/db';
import Link from 'next/link';

interface Property {
  id: string;
  name: string;
  location: string;
  plot_id: string;
  total_units: number;
  occupied_units: number;
  status: string;
}

interface Unit {
  id: string;
  unit_number: string;
  unit_type: string;
  monthly_rent: number;
  deposit_amount: number;
  status: string;
  bedrooms: number;
  bathrooms: number;
}

interface Tenancy {
  id: string;
  unit: {
    id: string;
    unit_number: string;
    unit_type: string;
    monthly_rent: number;
  };
  tenant: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
  };
  move_in_date: string;
  monthly_rent: number;
}

export default function PropertyDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.id as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [units, setUnits] = useState<Unit[]>([]);
  const [tenancies, setTenancies] = useState<Tenancy[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (propertyId) {
      fetchData();
    }
  }, [propertyId]);

  async function fetchData() {
    try {
      setLoading(true);
      setError('');

      console.log('Fetching property with ID:', propertyId);

      const prop = await getPropertyById(propertyId);
      console.log('Property result:', prop);

      if (!prop) {
        setError('Property not found');
        setProperty(null);
        return;
      }

      setProperty(prop);

      const unitsData = await getUnitsForProperty(propertyId);
      console.log('Units result:', unitsData);
      setUnits(unitsData);

      const tenanciesData = await getTenanciesForProperty(propertyId);
      console.log('Tenancies result:', tenanciesData);
      setTenancies(tenanciesData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error loading property');
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <p className="text-gray-500">Loading property...</p>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <button
          onClick={() => router.push('/properties')}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back to Properties
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
          {error || 'Property not found'}
        </div>
      </div>
    );
  }

  const occupancyRate = property.total_units > 0 
    ? Math.round((property.occupied_units / property.total_units) * 100)
    : 0;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => router.push('/properties')}
          className="text-blue-600 hover:text-blue-800"
        >
          ← Back to Properties
        </button>
      </div>

      {/* Property Overview */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{property.name}</h1>
            <p className="text-gray-600 text-lg">
              📍 {property.location}
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Plot ID: {property.plot_id}
            </p>
          </div>
          <span
            className={`px-4 py-2 rounded-full font-medium ${
              property.status === 'active'
                ? 'bg-green-100 text-green-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {property.status}
          </span>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Units */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Units</p>
            <p className="text-3xl font-bold text-blue-600">
              {property.total_units}
            </p>
          </div>

          {/* Occupied Units */}
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Occupied</p>
            <p className="text-3xl font-bold text-green-600">
              {property.occupied_units}
            </p>
          </div>

          {/* Occupancy Rate */}
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Occupancy Rate</p>
            <p className="text-3xl font-bold text-purple-600">
              {occupancyRate}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-purple-600 h-2 rounded-full transition"
                style={{ width: `${occupancyRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Units Section */}
      <div className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">Units</h2>
          <button
            onClick={() => router.push(`/properties/${propertyId}/units/new`)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
          >
            + Add Unit
          </button>
        </div>

        {units.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              No units yet. Add your first unit to get started!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {units.map((unit) => (
              <div
                key={unit.id}
                className="bg-white border rounded-lg p-6 hover:shadow-lg transition"
              >
                {/* Unit Header */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-900">
                    Unit {unit.unit_number}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {unit.unit_type}
                  </p>
                </div>

                {/* Unit Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Rent:</span>
                    <span className="font-semibold">
                      KES {unit.monthly_rent.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit:</span>
                    <span className="font-semibold">
                      KES {unit.deposit_amount.toLocaleString()}
                    </span>
                  </div>
                  {unit.bedrooms > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bedrooms:</span>
                      <span className="font-semibold">{unit.bedrooms}</span>
                    </div>
                  )}
                  {unit.bathrooms > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bathrooms:</span>
                      <span className="font-semibold">{unit.bathrooms}</span>
                    </div>
                  )}
                </div>

                {/* Status Badge */}
                <div className="mb-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      unit.status === 'vacant'
                        ? 'bg-green-100 text-green-800'
                        : unit.status === 'occupied'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {unit.status}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() =>
                      router.push(
                        `/properties/${propertyId}/units/${unit.id}/edit`
                      )
                    }
                    className="flex-1 text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    Edit
                  </button>
                  {unit.status === 'vacant' ? (
                    <button
                      onClick={() =>
                        router.push(
                          `/properties/${propertyId}/units/${unit.id}/assign`
                        )
                      }
                      className="flex-1 text-green-600 hover:text-green-800 font-medium text-sm"
                    >
                      Assign Tenant
                    </button>
                  ) : (
                    <button
                      disabled
                      className="flex-1 text-gray-400 font-medium text-sm cursor-not-allowed"
                    >
                      Occupied
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tenancies Section */}
      <div>
        <h2 className="text-3xl font-bold mb-6">Current Tenancies</h2>
        
        {tenancies && tenancies.length > 0 ? (
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            {tenancies.map((tenancy) => (
              <div
                key={tenancy.id}
                className="bg-white border rounded-lg p-6 hover:shadow-lg transition"
              >
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-900">
                    {tenancy.tenant.first_name} {tenancy.tenant.last_name}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Unit {tenancy.unit.unit_number} ({tenancy.unit.unit_type})
                  </p>
                </div>
                
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone:</span>
                    <span className="font-semibold">{tenancy.tenant.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-semibold text-blue-600">{tenancy.tenant.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Move-in Date:</span>
                    <span className="font-semibold">
                      {new Date(tenancy.move_in_date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Monthly Rent:</span>
                    <span className="font-semibold">
                      KES {tenancy.monthly_rent.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    Active Tenancy
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-500 text-lg">
              No active tenancies yet. Assign tenants to units to get started!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}