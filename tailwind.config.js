/** @type {import('tailwindcss').Config} */
    module.exports = {
      content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Roboto"', 'sans-serif'],
          },
          colors: {
            'blue': {
              50: '#f0f9ff',
              100: '#e0f2fe',
              200: '#bde0fe',
              300: '#96c9fa',
              400: '#6ab6f7',
              500: '#42a5f5',
              600: '#2b8af2',
              700: '#1e70ef',
              800: '#1756c9',
              900: '#134296',
            },
            'gray': {
              50: '#f9fafb',
              100: '#f3f4f6',
              200: '#e5e7eb',
              300: '#d1d5db',
              400: '#9ca3af',
              500: '#6b7280',
              600: '#4b5563',
              700: '#374151',
              800: '#1f2937',
              900: '#111827',
            }
          },
        },
      },
      plugins: [],
    }
