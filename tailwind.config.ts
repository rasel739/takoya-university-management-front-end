/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{ts,tsx,js,jsx}',
    './components/**/*.{ts,tsx,js,jsx}',
    './src/**/*.{ts,tsx,js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',
        secondary: '#FBBF24',
        accent: '#10B981',
        background: '#36384E',
        text: '#374151',
        muted: '#9CA3AF',
        highlight: '#3B82F6',
        border: '#E5E7EB',
        error: '#EF4444',
        success: '#22C55E',
        warning: '#F59E0B',
        info: '#3B82F6',
      },
    },
  },
  plugins: [],
};
