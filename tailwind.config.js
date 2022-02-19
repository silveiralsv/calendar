module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          from: { transform: 'translateY(100%)', opacity: 0 },
          to: { transform: 'translateY(0%)', opacity: 1 },
        },
        blur: {
          from: { 'background-color': 'rgb(249, 250, 251)', opacity: 0 },
          to: { 'background-color': 'rgb(55, 65, 81)', opacity: 0.6 },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        blur: 'blur 0.5s ease-in-out',
      },
    },
  },
  plugins: [],
};
