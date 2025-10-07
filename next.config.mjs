// next.config.mjs
// 日本語コメント: Next.js全体の設定を管理するファイル
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 日本語コメント: 将来の機能フラグを必要に応じて追加するためのプレースホルダ
  experimental: {
    // 日本語コメント: App Routerはデフォルトで有効だが、将来的な拡張に備えて記述
    serverActions: {
      bodySizeLimit: '2mb'
    }
  }
};

export default nextConfig;
