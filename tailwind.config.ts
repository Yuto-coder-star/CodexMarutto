// tailwind.config.ts
// 日本語コメント: Tailwind CSSのカスタマイズ設定
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        // 日本語コメント: 桜色を基調とした柔らかいカラーパレット
        sakura: {
          light: '#FFD9E8',
          DEFAULT: '#F9A8D4',
          deep: '#F472B6'
        },
        tsumugi: {
          sky: '#C6ECFF',
          mint: '#B5F5DC'
        }
      },
      boxShadow: {
        // 日本語コメント: 吹き出し向けの柔らかい影
        bubble: '0 10px 30px rgba(249, 168, 212, 0.25)'
      }
    }
  },
  plugins: []
};

export default config;
