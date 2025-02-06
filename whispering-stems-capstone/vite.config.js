import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [[react()],[tailwindcss()]],
  define: {
    'import.meta.env.VITE_OPENAI_API_KEY': JSON.stringify(process.env.VITE_OPENAI_API_KEY),
  }
})
