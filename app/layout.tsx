// app/layout.tsx
// 日本語コメント: アプリ全体のレイアウトとフォント定義を担うルートレイアウト
import './globals.css';
import type { Metadata } from 'next';
import { Zen_Maru_Gothic } from 'next/font/google';

// 日本語コメント: 丸ゴシックの優しい印象を演出するフォントを読み込み
const zenMaruGothic = Zen_Maru_Gothic({
  weight: ['400', '500', '700'],
  
  // 日本語コメント: Google Fontsの提供サブセットに合わせてlatinを指定しつつ、フォールバックで日本語を描画
  subsets: ['latin'],
  display: 'swap',

  variable: '--font-zen-maru-gothic'
});

export const metadata: Metadata = {
  title: 'AI恋物語 - 紬と過ごす365日',
  description: '紬との会話を通じて心温まる日々を紡ぐ恋愛シミュレーションWEBゲーム'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // 日本語コメント: 全ページ共通のHTML骨組みとフォント適用を定義
  return (
    <html lang="ja" className={zenMaruGothic.variable}>
      <body className="min-h-screen antialiased selection:bg-sakura-light/70 selection:text-gray-900">
        {children}
      </body>
    </html>
  );
}
