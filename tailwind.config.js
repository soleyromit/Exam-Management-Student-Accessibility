
export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          hover: 'var(--primary-hover)',
          active: 'var(--primary-active)',
        },
      },
      fontFamily: {
        heading: ['"Source Sans 3"', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
