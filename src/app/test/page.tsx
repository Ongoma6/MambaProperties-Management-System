'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function TestPage() {
  const [connected, setConnected] = useState(false);
  const [error, setError] = useState('');
  const [tableCount, setTableCount] = useState(0);

  useEffect(() => {
    testConnection();
  }, []);

  async function testConnection() {
    try {
      // Try to fetch from users table
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .limit(1);

      if (fetchError) {
        throw fetchError;
      }

      // Count tables
      const { data: tables, error: tableError } = await supabase
        .from('information_schema.tables')
        .select('*')
        .eq('table_schema', 'public');

      if (!tableError && tables) {
        setTableCount(tables.length);
      }

      setConnected(true);
    } catch (err: any) {
      setError(err.message);
      setConnected(false);
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Database Connection Test</h1>

      {connected ? (
        <div className="bg-green-100 border border-green-400 p-4 rounded">
          <h2 className="text-xl font-bold text-green-800">✅ Connected!</h2>
          <p className="text-green-700 mt-2">
            Your website is connected to Supabase
          </p>
          <p className="text-green-700 mt-2">
            Tables found: <strong>{tableCount}</strong>
          </p>
        </div>
      ) : (
        <div className="bg-red-100 border border-red-400 p-4 rounded">
          <h2 className="text-xl font-bold text-red-800">❌ Connection Failed</h2>
          <p className="text-red-700 mt-2">{error}</p>
          <p className="text-red-700 mt-4">
            Check your .env.local file has correct Supabase credentials
          </p>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-bold mb-4">Checklist:</h3>
        <ul className="space-y-2">
          <li>✓ Supabase project created</li>
          <li>✓ Database schema loaded</li>
          <li>✓ Environment variables set</li>
          <li className={connected ? '✓' : '✗'}>
            {connected ? 'Connected to database' : 'Waiting for connection...'}
          </li>
        </ul>
      </div>
    </div>
  );
}