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
  const response = await fetch('https://api.dentalink.healthatom.com/api/v1/patients', {
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