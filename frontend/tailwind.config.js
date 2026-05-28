/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        nunito: ['Nunito', 'sans-serif'],
        fredoka: ['"Fredoka One"', 'cursive'],
      },
      keyframes: {
        coinBounce: {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(10deg)' },
        },
        firePulse: {
          '0%,100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
        },
        shine: {
          '0%': { left: '-100%' },
          '100%': { left: '200%' },
        },
        slideUp: {
          '0%': { transform: 'translateY(24px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        popIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '80%': { transform: 'scale(1.04)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        toastIn: {
          '0%': { transform: 'translateY(-50px) scale(0.9)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        twinkle: {
          '0%,100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.3)' },
        },
        bgPulse: {
          '0%': { transform: 'translate(0,0) scale(1)' },
          '100%': { transform: 'translate(2%,2%) scale(1.05)' },
        },
      },
      animation: {
        coinBounce: 'coinBounce 2s ease-in-out infinite',
        firePulse: 'firePulse 1.5s ease-in-out infinite',
        shine: 'shine 2.5s ease-in-out infinite',
        slideUp: 'slideUp 0.45s ease forwards',
        popIn: 'popIn 0.35s cubic-bezier(.4,0,.2,1) forwards',
        toastIn: 'toastIn 0.35s cubic-bezier(.4,0,.2,1) forwards',
        twinkle: 'twinkle 3s ease-in-out infinite',
        bgPulse: 'bgPulse 8s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
};
