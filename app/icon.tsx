// app/icon.tsx
// 日本語コメント: Next.jsのApp Routerで利用されるファビコンをSVGベースで動的生成するエンドポイント
import { ImageResponse } from 'next/og';

// 日本語コメント: アイコンのサイズを宣言し、ビルド時の最適化に利用
export const size = {
  width: 256,
  height: 256
};

// 日本語コメント: 出力形式をPNGとして明示
export const contentType = 'image/png';

export default function Icon() {
  // 日本語コメント: SVGのみで構成することでフォント取得が不要な柔らかな桜モチーフアイコンを描画
  return new ImageResponse(
    (
      <svg
        width={size.width}
        height={size.height}
        viewBox="0 0 256 256"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="bg" cx="30%" cy="30%" r="80%">
            <stop offset="0%" stopColor="#ffe3f1" stopOpacity="1" />
            <stop offset="55%" stopColor="#f2c8e4" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#bfe6ff" stopOpacity="0.9" />
          </radialGradient>
          <radialGradient id="petal" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#ffd4e6" stopOpacity="0.98" />
            <stop offset="70%" stopColor="#ff99c6" stopOpacity="0.88" />
            <stop offset="100%" stopColor="#ff6fa5" stopOpacity="0.82" />
          </radialGradient>
          <linearGradient id="stem" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#9be0d5" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#53b6a9" stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <rect width="256" height="256" rx="64" fill="url(#bg)" />
        <g transform="translate(28 22)">
          <g fill="url(#petal)">
            <path d="M100 0 C136 32 172 56 172 98 C172 132 136 160 100 160 C64 160 28 132 28 98 C28 56 64 32 100 0" />
            <path d="M64 92 C74 112 102 130 130 130 C136 130 144 128 150 124 C140 150 118 170 94 176 C70 182 50 174 36 160 C50 142 58 118 64 92" opacity="0.85" />
            <circle cx="98" cy="132" r="24" fill="#fff3f8" />
          </g>
          <path d="M100 160 C100 160 88 198 82 216 C104 212 132 200 148 176 C126 182 108 174 100 160" fill="url(#stem)" />
          <circle cx="98" cy="132" r="14" fill="#ffe2ef" />
        </g>
        <g transform="translate(62 182)">
          <path
            d="M0 26 C18 8 40 0 70 0 C100 0 122 8 140 26 C118 32 98 34 70 34 C42 34 22 32 0 26"
            fill="rgba(255, 255, 255, 0.6)"
          />
        </g>
      </svg>
    ),
    {
      ...size
    }
  );
}
