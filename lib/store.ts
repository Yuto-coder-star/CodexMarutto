// lib/store.ts
// 日本語コメント: 紬との会話体験に必要なグローバル状態をZustandで管理
'use client';

import { create } from 'zustand';

// 日本語コメント: 感情タグの型定義
export type EmotionTag = 'happy' | 'sad' | 'blush' | 'neutral';

// 日本語コメント: 会話履歴に使用するメッセージ型
export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  emotion?: EmotionTag;
  timestamp: number;
}

// 日本語コメント: Zustandストアのインターフェース定義
interface ChatStore {
  affection: number;
  history: ChatMessage[];
  currentEmotion: EmotionTag;
  addMessage: (message: ChatMessage) => void;
  adjustAffection: (delta: number) => void;
  setEmotion: (emotion: EmotionTag) => void;
  reset: () => void;
}

// 日本語コメント: 好感度変動の最小・最大範囲を宣言
const MIN_AFFECTION = -100;
const MAX_AFFECTION = 100;

// 日本語コメント: Zustandストアの生成
export const useChatStore = create<ChatStore>((set) => ({
  affection: 0,
  history: [],
  currentEmotion: 'neutral',
  addMessage: (message) =>
    set((state) => ({
      history: [...state.history, message]
    })),
  adjustAffection: (delta) =>
    set((state) => {
      const next = Math.max(MIN_AFFECTION, Math.min(MAX_AFFECTION, state.affection + delta));
      return { affection: next };
    }),
  setEmotion: (emotion) => set({ currentEmotion: emotion }),
  reset: () => set({ affection: 0, history: [], currentEmotion: 'neutral' })
}));
