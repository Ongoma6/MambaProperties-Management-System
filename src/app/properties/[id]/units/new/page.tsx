'use client';

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { createUnit } from '@/lib/db';

export default function AddUnitPage() {
  const router = useRouter();
  const params = useParams();
  const propertyId = params?.id as string;

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    unit_number: '',
    unit_type: 'bedsitter',
    monthly_rent: '',
    deposit_amount: '',
    bedrooms: '',
    bathrooms: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function validateForm(): string | null {
    if (!formData.unit_number.trim()) return 'Unit number is required';
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
      setLoading(true);

      await createUnit({
        property_id: propertyId,
        landlord_id: '550e8400-e29b-41d4-a716-446655440000', // Test user
        unit_number: formData.unit_number,
        unit_type: formData.unit_type,
        monthly_rent: parseFloat(formData.monthly_rent),
        deposit_amount: formData.deposit_amount
          ? parseFloat(formData.deposit_amount)
          : 0,
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : 0,
        bathrooms: formData.bathrooms ? parseFloat(formData.bathrooms) : 0,
      });

      setSuccess(true);

      setTimeout(() => {
        router.push(`/properties/${propertyId}`);
      }, 1000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-4xl font-bold mb-2">Add New Unit</h1>
        <p className="text-gray-600">
          Fill in the details to add a new unit to this property
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          ✅ Unit created successfully! Redirecting...
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
        {/* Unit Number */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Unit Number *
          </label>
          <input
            type="text"
            name="unit_number"
            value={formData.unit_number}
            onChange={handleChange}
            placeholder="e.g., 101, A1, Shop-01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Unique identifier for this unit
          </p>
        </div>

        {/* Unit Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Unit Type *
          </label>
          <select
            name="unit_type"
            value={formData.unit_type}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          >
            <option value="bedsitter">Bedsitter</option>
            <option value="1BR">1 Bedroom</option>
            <option value="2BR">2 Bedroom</option>
            <option value="3BR">3 Bedroom</option>
            <option value="4BR">4 Bedroom</option>
            <option value="shop">Shop</option>
            <option value="office">Office</option>
            <option value="warehouse">Warehouse</option>
          </select>
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
            placeholder="e.g., 15000"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
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
            placeholder="e.g., 30000"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {/* Bedrooms */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Bedrooms
          </label>
          <input
            type="number"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            placeholder="e.g., 2"
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {/* Bathrooms */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Bathrooms
          </label>
          <input
            type="number"
            name="bathrooms"
            value={formData.bathrooms}
            onChange={handleChange}
            placeholder="e.g., 1"
            min="0"
            step="0.5"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Unit'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            disabled={loading}
            className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}