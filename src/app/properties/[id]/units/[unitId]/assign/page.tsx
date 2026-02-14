'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getUnitsForProperty, getAllTenants, createTenancy, getPropertyById } from '@/lib/db';

interface Unit {
  id: string;
  unit_number: string;
  unit_type: string;
  monthly_rent: number;
  deposit_amount: number;
}

interface Tenant {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface Property {
  id: string;
  name: string;
}

export default function AssignTenantPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.id as string;
  const unitId = params?.unitId as string;

  const [property, setProperty] = useState<Property | null>(null);
  const [unit, setUnit] = useState<Unit | null>(null);
  const [tenants, setTenants] = useState<Tenant[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    tenant_id: '',
    move_in_date: '',
    monthly_rent: '',
    deposit_amount: '',
  });

  useEffect(() => {
    if (propertyId && unitId) {
      fetchData();
    }
  }, [propertyId, unitId]);

  async function fetchData() {
    try {
      setLoading(true);
      setError('');

      // Fetch property
      const propData = await getPropertyById(propertyId);
      setProperty(propData);

      // Fetch units
      const unitsData = await getUnitsForProperty(propertyId);
      const foundUnit = unitsData.find(u => u.id === unitId);
      if (foundUnit) {
        setUnit(foundUnit);
        // Set default monthly rent from unit
        setFormData(prev => ({
          ...prev,
          monthly_rent: foundUnit.monthly_rent.toString(),
          deposit_amount: foundUnit.deposit_amount.toString(),
        }));
      }

      // Fetch tenants
      const tenantsData = await getAllTenants();
      setTenants(tenantsData);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Error loading data');
    } finally {
      setLoading(false);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm(): string | null {
    if (!formData.tenant_id) return 'Please select a tenant';
    if (!formData.move_in_date) return 'Move-in date is required';
    if (!formData.monthly_rent) return 'Monthly rent is required';
    if (parseFloat(formData.monthly_rent) < 1) return 'Rent must be greater than 0';
    return null;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSubmitting(true);

      await createTenancy({
        property_id: propertyId,
        unit_id: unitId,
        tenant_id: formData.tenant_id,
        move_in_date: formData.move_in_date,
        monthly_rent: parseFloat(formData.monthly_rent),
        deposit_amount: formData.deposit_amount
          ? parseFloat(formData.deposit_amount)
          : 0,
      });

      setSuccess(true);

      setTimeout(() => {
        router.push(`/properties/${propertyId}`);
      }, 1500);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!property || !unit) {
    return (
      <div className="p-8 max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 p-4 rounded">
          Property or unit not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 mb-4"
        >
          ← Back
        </button>
        <h1 className="text-4xl font-bold mb-2">Assign Tenant to Unit</h1>
        <p className="text-gray-600">
          Link a tenant to this unit and set the tenancy details
        </p>
      </div>

      {/* Property & Unit Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-sm text-gray-600">Property: <span className="font-semibold text-gray-900">{property?.name}</span></p>
        <p className="text-sm text-gray-600">Unit: <span className="font-semibold text-gray-900">{unit?.unit_number} ({unit?.unit_type})</span></p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          ✅ Tenant assigned successfully! Redirecting...
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          ❌ {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-8">
        {/* Select Tenant */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Select Tenant *
          </label>
          <select
            name="tenant_id"
            value={formData.tenant_id}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={submitting}
            required
          >
            <option value="">Choose a tenant...</option>
            {tenants.map((tenant) => (
              <option key={tenant.id} value={tenant.id}>
                {tenant.first_name} {tenant.last_name} ({tenant.email})
              </option>
            ))}
          </select>
          <p className="text-xs text-gray-500 mt-1">
            {tenants.length === 0 ? 'No tenants available. Add a tenant first.' : 'Select a tenant to assign'}
          </p>
        </div>

        {/* Move-in Date */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Move-in Date *
          </label>
          <input
            type="date"
            name="move_in_date"
            value={formData.move_in_date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={submitting}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            When the tenant will move in
          </p>
        </div>

        {/* Monthly Rent */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Monthly Rent (KES) *
          </label>
          <input
            type="number"
            name="monthly_rent"
            value={formData.monthly_rent}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={submitting}
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Amount tenant will pay monthly
          </p>
        </div>

        {/* Deposit Amount */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Deposit Amount (KES)
          </label>
          <input
            type="number"
            name="deposit_amount"
            value={formData.deposit_amount}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={submitting}
          />
          <p className="text-xs text-gray-500 mt-1">
            Security deposit (optional)
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={submitting || tenants.length === 0}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Assigning...' : 'Assign Tenant'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={submitting}
            className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 About Tenancies</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Once assigned, the unit status will change to "occupied"</li>
          <li>• The tenant will receive invoices on the specified date</li>
          <li>• You can end a tenancy anytime</li>
          <li>• Move-out date is optional</li>
        </ul>
      </div>
    </div>
  );
}