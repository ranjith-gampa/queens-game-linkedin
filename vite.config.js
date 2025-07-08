import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./tests/setupTests.js'],
    },
    // Define environment variables that should be available at build time
    define: {
      // For development, use loaded env variables
      // For production, use process.env (Vercel will inject these)
      // Use fallback values if environment variables are not available (for CI)
      'import.meta.env.VITE_SUPABASE_URL': JSON.stringify(
        command === 'serve' 
          ? (env.VITE_SUPABASE_URL || 'https://dummy-supabase-url.supabase.co') 
          : (process.env.VITE_SUPABASE_URL || 'https://dummy-supabase-url.supabase.co')
      ),
      'import.meta.env.VITE_SUPABASE_ANON_KEY': JSON.stringify(
        command === 'serve' 
          ? (env.VITE_SUPABASE_ANON_KEY || 'dummy-anon-key-for-ci-testing') 
          : (process.env.VITE_SUPABASE_ANON_KEY || 'dummy-anon-key-for-ci-testing')
      ),
    }
  };
});
