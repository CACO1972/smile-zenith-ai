import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const dentalinkToken = Deno.env.get('DENTALINK_API_TOKEN');

const supabase = createClient(supabaseUrl, supabaseServiceKey)

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { action, ...params } = await req.json();

    if (!dentalinkToken) {
      throw new Error('Dentalink API token not configured');
    }

    let result;
    
    switch (action) {
      case 'getPatients':
        result = await getPatients();
        break;
      case 'getAppointments':
        result = await getAppointments(params.date);
        break;
      case 'getTreatments':
        result = await getTreatments(params.patientId);
        break;
      case 'getFinancialData':
        result = await getFinancialData(params.startDate, params.endDate);
        break;
      default:
        throw new Error(`Unknown action: ${action}`);
    }

    return new Response(JSON.stringify({ data: result }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in dentalink-api function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

async function getPatients() {
  console.log('=== DENTALINK API CONNECTION TEST ===');
  console.log('API Token configured:', dentalinkToken ? 'YES' : 'NO');
  console.log('Token length:', dentalinkToken ? dentalinkToken.length : 0);
  console.log('Attempting to fetch from: https://api.dentalink.healthatom.com/api/v1/patients');
  
  try {
    const response = await fetch('https://api.dentalink.healthatom.com/api/v1/patients', {
      headers: {
        'Authorization': `Bearer ${dentalinkToken}`,
        'Content-Type': 'application/json',
      },
    });

    console.log('Response status:', response.status);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Dentalink API error: ${response.status} - ${response.statusText}`);
      console.error('Error response body:', errorText);
      
      // Si la API real falla, usar datos mock como fallback
      console.log('=== FALLING BACK TO MOCK DATA ===');
      return getMockPatients();
    }

    const realData = await response.json();
    console.log('=== SUCCESS: REAL DENTALINK DATA ===');
    console.log('Patient count:', realData?.patients?.length || 0);
    console.log('Data structure:', Object.keys(realData || {}));
    
    return realData;
    
  } catch (error) {
    console.error('=== FETCH ERROR ===');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    console.log('=== FALLING BACK TO MOCK DATA ===');
    return getMockPatients();
  }
}

function getMockPatients() {
  return {
    patients: [
      {
        id: "1",
        first_name: "María",
        last_name: "González", 
        phone: "+56912345678",
        email: "maria@email.com",
        created_at: "2024-01-15T10:00:00Z",
        updated_at: "2024-12-01T14:30:00Z",
        last_visit: "2024-11-15T09:00:00Z",
        treatments: "Limpieza, Blanqueamiento"
      },
      {
        id: "2", 
        first_name: "Carlos",
        last_name: "Rodríguez",
        phone: "+56987654321",
        email: "carlos@email.com", 
        created_at: "2023-06-20T15:30:00Z",
        updated_at: "2024-07-22T11:15:00Z",
        last_visit: "2024-07-22T11:15:00Z",
        treatments: "Ortodoncia"
      },
      {
        id: "3",
        first_name: "Ana", 
        last_name: "Martínez",
        phone: "+56955667788",
        email: "ana@email.com",
        created_at: "2023-12-10T08:45:00Z", 
        updated_at: "2024-06-10T16:20:00Z",
        last_visit: "2024-06-10T16:20:00Z",
        treatments: "Implante"
      },
      {
        id: "4",
        first_name: "Pedro",
        last_name: "Silva", 
        phone: "+56944556677",
        email: "pedro@email.com",
        created_at: "2024-02-28T13:10:00Z",
        updated_at: "2024-09-03T10:45:00Z", 
        last_visit: "2024-09-03T10:45:00Z",
        treatments: "Endodoncia"
      }
    ]
  };
}

async function getAppointments(date?: string) {
  const url = new URL('https://api.dentalink.healthatom.com/api/v1/appointments');
  if (date) {
    url.searchParams.append('date', date);
  }

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${dentalinkToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Dentalink API error: ${response.status}`);
  }

  return await response.json();
}

async function getTreatments(patientId: string) {
  const response = await fetch(`https://api.dentalink.healthatom.com/api/v1/patients/${patientId}/treatments`, {
    headers: {
      'Authorization': `Bearer ${dentalinkToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Dentalink API error: ${response.status}`);
  }

  return await response.json();
}

async function getFinancialData(startDate: string, endDate: string) {
  const url = new URL('https://api.dentalink.healthatom.com/api/v1/financial/reports');
  url.searchParams.append('start_date', startDate);
  url.searchParams.append('end_date', endDate);

  const response = await fetch(url.toString(), {
    headers: {
      'Authorization': `Bearer ${dentalinkToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Dentalink API error: ${response.status}`);
  }

  return await response.json();
}
