import { supabase } from './supabase';

// Get all properties for a landlord
export async function getProperties() {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select(`
        id,
        name,
        location,
        plot_id,
        total_units,
        occupied_units,
        status,
        created_at
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching properties:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Database error:', err);
    return [];
  }
}

// Create a new property
export async function createProperty(property: {
  name: string;
  location: string;
  plot_id: string;
  total_units: number;
  landlord_id: string;
}) {
  try {
    console.log('Creating property with data:', property);

    const { data, error } = await supabase
      .from('properties')
      .insert([{
        name: property.name,
        location: property.location,
        plot_id: property.plot_id,
        total_units: property.total_units,
        landlord_id: property.landlord_id,
        occupied_units: 0,
        status: 'active'
      }])
      .select();

    console.log('Supabase response:', { data, error });

    if (error) {
      console.error('Supabase error creating property:', error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      console.error('No data returned from insert');
      throw new Error('No data returned from database');
    }

    console.log('Property created successfully:', data[0]);
    return data[0];
  } catch (err: any) {
    console.error('Error in createProperty:', err);
    throw err;
  }
}

// Get single property by ID
export async function getPropertyById(id: string) {
  try {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching property:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Database error:', err);
    return null;
  }
}

// Update a property
export async function updateProperty(
  id: string,
  updates: {
    name?: string;
    location?: string;
    total_units?: number;
    status?: string;
  }
) {
  try {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating property:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Database error:', err);
    return null;
  }
}

// Delete a property
export async function deleteProperty(id: string) {
  try {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting property:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Database error:', err);
    return false;
  }
}

// ============================================
// UNITS FUNCTIONS
// ============================================

export async function getUnitsForProperty(propertyId: string) {
  try {
    const { data, error } = await supabase
      .from('units')
      .select('*')
      .eq('property_id', propertyId)
      .order('unit_number', { ascending: true });

    if (error) {
      console.error('Error fetching units:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Database error:', err);
    return [];
  }
}

export async function createUnit(unit: {
  property_id: string;
  landlord_id: string;
  unit_number: string;
  unit_type: string;
  monthly_rent: number;
  deposit_amount?: number;
  bedrooms?: number;
  bathrooms?: number;
}) {
  try {
    const { data, error } = await supabase
      .from('units')
      .insert([{
        property_id: unit.property_id,
        landlord_id: unit.landlord_id,
        unit_number: unit.unit_number,
        unit_type: unit.unit_type,
        monthly_rent: unit.monthly_rent,
        deposit_amount: unit.deposit_amount || 0,
        bedrooms: unit.bedrooms || 0,
        bathrooms: unit.bathrooms || 0,
        status: 'vacant',
        amenities: [],
        features: [],
        photos: []
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error('No data returned');
    }

    return data[0];
  } catch (err: any) {
    console.error('Error creating unit:', err);
    throw err;
  }
}

export async function updateUnit(
  id: string,
  updates: {
    unit_type?: string;
    monthly_rent?: number;
    deposit_amount?: number;
    bedrooms?: number;
    bathrooms?: number;
    status?: string;
  }
) {
  try {
    const { data, error } = await supabase
      .from('units')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating unit:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Database error:', err);
    return null;
  }
}

export async function deleteUnit(id: string) {
  try {
    const { error } = await supabase
      .from('units')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting unit:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Database error:', err);
    return false;
  }
}

// ============================================
// TENANTS & TENANCIES FUNCTIONS
// ============================================

export async function getAllTenants() {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('user_type', 'tenant')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching tenants:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Database error:', err);
    return [];
  }
}

export async function createTenant(tenant: {
  email: string;
  phone: string;
  first_name: string;
  last_name: string;
  id_number: string;
  id_type: string;
  occupation?: string;
}) {
  try {
    const { data, error } = await supabase
      .from('users')
      .insert([{
        email: tenant.email,
        phone: tenant.phone,
        first_name: tenant.first_name,
        last_name: tenant.last_name,
        user_type: 'tenant',
        status: 'active',
        is_verified: false,
        occupation: tenant.occupation || '',
        id_number: tenant.id_number,
        id_type: tenant.id_type,
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error('No data returned');
    }

    return data[0];
  } catch (err: any) {
    console.error('Error creating tenant:', err);
    throw err;
  }
}

export async function getTenantById(id: string) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching tenant:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Database error:', err);
    return null;
  }
}

export async function createTenancy(tenancy: {
  property_id: string;
  unit_id: string;
  tenant_id: string;
  move_in_date: string;
  monthly_rent: number;
  deposit_amount?: number;
}) {
  try {
    const { data, error } = await supabase
      .from('tenancies')
      .insert([{
        property_id: tenancy.property_id,
        unit_id: tenancy.unit_id,
        tenant_id: tenancy.tenant_id,
        move_in_date: tenancy.move_in_date,
        lease_start_date: tenancy.move_in_date,
        monthly_rent: tenancy.monthly_rent,
        deposit_amount: tenancy.deposit_amount || 0,
        status: 'active',
      }])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    if (!data || data.length === 0) {
      throw new Error('No data returned');
    }

    // Update unit status to occupied
    await updateUnit(tenancy.unit_id, { status: 'occupied' });

    return data[0];
  } catch (err: any) {
    console.error('Error creating tenancy:', err);
    throw err;
  }
}

export async function getTenanciesForUnit(unitId: string) {
  try {
    const { data, error } = await supabase
      .from('tenancies')
      .select(`
        *,
        tenant:users(id, first_name, last_name, email, phone, occupation)
      `)
      .eq('unit_id', unitId)
      .eq('status', 'active')
      .order('move_in_date', { ascending: false });

    if (error) {
      console.error('Error fetching tenancies:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Database error:', err);
    return [];
  }
}

export async function getTenanciesForProperty(propertyId: string) {
  try {
    const { data, error } = await supabase
      .from('tenancies')
      .select(`
        *,
        unit:units(id, unit_number, unit_type, monthly_rent),
        tenant:users(id, first_name, last_name, email, phone)
      `)
      .eq('property_id', propertyId)
      .eq('status', 'active')
      .order('move_in_date', { ascending: false });

    if (error) {
      console.error('Error fetching tenancies:', error);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Database error:', err);
    return [];
  }
}

export async function endTenancy(tenancyId: string) {
  try {
    const { data, error } = await supabase
      .from('tenancies')
      .update({ status: 'ended', move_out_date: new Date().toISOString().split('T')[0] })
      .eq('id', tenancyId)
      .select()
      .single();

    if (error) {
      console.error('Error ending tenancy:', error);
      return null;
    }

    return data;
  } catch (err) {
    console.error('Database error:', err);
    return null;
  }
}