import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if we have dummy values (CI/testing environment)
const isDummyEnvironment = supabaseUrl?.includes('dummy-supabase-url') || 
                           supabaseKey?.includes('dummy-anon-key');

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables. Check .env file and Vercel settings.');
}

// Create a mock client for dummy environment to prevent actual API calls
const supabase = isDummyEnvironment 
  ? createMockSupabaseClient() 
  : createClient(supabaseUrl, supabaseKey);

// Mock Supabase client for testing/CI environments
function createMockSupabaseClient() {
  return {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: [], error: null }),
      update: () => ({ data: [], error: null }),
      delete: () => ({ data: [], error: null }),
      upsert: () => ({ data: [], error: null }),
    }),
    auth: {
      getUser: () => ({ data: { user: null }, error: null }),
      signIn: () => ({ data: { user: null }, error: null }),
      signOut: () => ({ error: null }),
    },
    storage: {
      from: () => ({
        upload: () => ({ data: null, error: null }),
        download: () => ({ data: null, error: null }),
        remove: () => ({ data: null, error: null }),
      }),
    },
  };
}

export default supabase;
