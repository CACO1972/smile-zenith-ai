import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

interface DentallinkAPIResponse {
  data: any;
  error?: string;
}

export const useDentallinkAPI = () => {
  const [loading, setLoading] = useState(false);

  const callAPI = async (action: string, params: any = {}): Promise<DentallinkAPIResponse> => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('dentalink-api', {
        body: { action, ...params }
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error: any) {
      console.error('Dentalink API error:', error);
      return { data: null, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getPatients = () => callAPI('getPatients');
  const getAppointments = (date?: string) => callAPI('getAppointments', { date });
  const getTreatments = (patientId: string) => callAPI('getTreatments', { patientId });
  const getFinancialData = (startDate: string, endDate: string) => 
    callAPI('getFinancialData', { startDate, endDate });

  return {
    loading,
    getPatients,
    getAppointments,
    getTreatments,
    getFinancialData
  };
};