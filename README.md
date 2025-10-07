# AI恋物語 - 紬と過ごす365日

日本語コメント: このリポジトリはNext.js 15 + TypeScript + Tailwind CSS + Framer Motion + Zustandで構築された恋愛シミュレーションWEBゲームです。

## セットアップ手順

1. 依存関係のインストール
   ```bash
   npm install
   ```
2. 環境変数の設定
   ```bash
   cp .env.local.sample .env.local
   ```
   `.env.local` に OpenAI APIキーを設定してください。
3. 開発サーバーの起動
   ```bash
   npm run dev
   ```

## デプロイ

Vercel CLI もしくはダッシュボードから簡単にデプロイできます。
```bash
vercel
```

## アセット配置

- `public/images` ディレクトリに紬の表情差分PNGを配置してください。
- `public/bgm` ディレクトリに `main_theme.mp3` を配置してください。

## ライセンス

日本語コメント: 本プロジェクトはデモ用途を想定しており、商用利用時は別途確認をお願いします。
