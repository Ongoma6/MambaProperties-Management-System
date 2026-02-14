'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProperty } from '@/lib/db';

export default function AddPropertyPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    plot_id: '',
    total_units: '',
    landlord_id: '550e8400-e29b-41d4-a716-446655440000', // Demo landlord ID
  });

  // Handle input changes
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  // Validate form
  function validateForm(): string | null {
    if (!formData.name.trim()) return 'Property name is required';
    if (!formData.location.trim()) return 'Location is required';
    if (!formData.plot_id.trim()) return 'Plot ID is required';
    if (!formData.total_units) return 'Number of units is required';
    if (parseInt(formData.total_units) < 1) return 'Units must be at least 1';
    return null;
  }

  // Handle form submission
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // Validate
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      // Create property
      const result = await createProperty({
        name: formData.name,
        location: formData.location,
        plot_id: formData.plot_id,
        total_units: parseInt(formData.total_units),
        landlord_id: formData.landlord_id,
      });

      if (!result) {
        setError('Failed to create property. Please try again.');
        return;
      }

      setSuccess(true);
      
      // Redirect after 1 second
      setTimeout(() => {
        router.push('/properties');
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
        <h1 className="text-4xl font-bold mb-2">Add New Property</h1>
        <p className="text-gray-600">
          Fill in the details below to create a new property
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
          ✅ Property created successfully! Redirecting...
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
        {/* Property Name */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Property Name *
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g., Riverside Apartments"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Give your property a memorable name
          </p>
        </div>

        {/* Location */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Location *
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="e.g., Westlands, Nairobi"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            City, area, or specific address
          </p>
        </div>

        {/* Plot ID */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Plot ID *
          </label>
          <input
            type="text"
            name="plot_id"
            value={formData.plot_id}
            onChange={handleChange}
            placeholder="e.g., PLOT-WLD-001"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Unique identifier for this property
          </p>
        </div>

        {/* Number of Units */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Number of Units *
          </label>
          <input
            type="number"
            name="total_units"
            value={formData.total_units}
            onChange={handleChange}
            placeholder="e.g., 12"
            min="1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={loading}
          />
          <p className="text-xs text-gray-500 mt-1">
            Total number of houses/units in this property
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Creating...' : 'Create Property'}
          </button>
          <button
            type="button"
            onClick={() => router.push('/properties')}
            disabled={loading}
            className="flex-1 bg-gray-200 text-gray-900 py-3 rounded-lg hover:bg-gray-300 transition font-medium disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </form>

      {/* Help Text */}
      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="font-bold text-blue-900 mb-2">💡 Tips</h3>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Property names should be descriptive (e.g., "Riverside Apartments")</li>
          <li>• Plot IDs must be unique across your properties</li>
          <li>• You can edit units and other details after creation</li>
        </ul>
      </div>
    </div>
  );
}