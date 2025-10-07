// components/ChatWindow.tsx
// 日本語コメント: 紬との会話履歴と入力UIを司るメインコンポーネント
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore, EmotionTag } from '@/lib/store';

interface ChatResponse {
  message: string;
}

// 日本語コメント: 好感度調整のための簡易評価ロジック
const evaluateAffectionDelta = (text: string, emotion: EmotionTag): number => {
  const positiveKeywords = ['ありがとう', '嬉', '楽しい', '大好き', '好き', '素敵'];
  const negativeKeywords = ['忙しい', '疲れた', '嫌', '無理', '悲しい'];
  let delta = 0;

  if (positiveKeywords.some((keyword) => text.includes(keyword))) {
    delta += 8;
  }

  if (negativeKeywords.some((keyword) => text.includes(keyword))) {
    delta -= 6;
  }

  if (emotion === 'happy' || emotion === 'blush') {
    delta += 4;
  } else if (emotion === 'sad') {
    delta -= 3;
  }

  return delta;
};

export function ChatWindow() {
  // 日本語コメント: グローバル状態から必要な値と操作関数を取得
  const { history, addMessage, adjustAffection, setEmotion, affection } = useChatStore((state) => ({
    history: state.history,
    addMessage: state.addMessage,
    adjustAffection: state.adjustAffection,
    setEmotion: state.setEmotion,
    affection: state.affection
  }));

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);

  // 日本語コメント: 新規メッセージが追加されたら自動スクロール
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [history]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();

    addMessage({
      role: 'user',
      content: userMessage,
      timestamp: Date.now()
    });

    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: userMessage, affection })
      });

      if (!response.ok) {
        throw new Error('APIリクエストに失敗しました');
      }

      const data: ChatResponse = await response.json();
      const emotionMatch = data.message.match(/^\[(happy|sad|blush|neutral)\]\s*/i);
      const emotion: EmotionTag = emotionMatch ? (emotionMatch[1].toLowerCase() as EmotionTag) : 'neutral';
      const cleanMessage = emotionMatch ? data.message.replace(emotionMatch[0], '') : data.message;

      setEmotion(emotion);

      addMessage({
        role: 'assistant',
        content: cleanMessage,
        emotion,
        timestamp: Date.now()
      });

      adjustAffection(evaluateAffectionDelta(cleanMessage, emotion));
    } catch (error) {
      console.error(error);
      addMessage({
        role: 'assistant',
        content: 'ごめんなさい、少し通信が不安定みたい。もう一度送ってもらえるかな？',
        emotion: 'sad',
        timestamp: Date.now()
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center justify-between rounded-3xl bg-white/80 px-4 py-3 shadow-bubble backdrop-blur-md dark:bg-slate-900/70">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-300">好感度</p>
          <p className="text-2xl font-semibold text-sakura-deep">{affection}</p>
        </div>
        <motion.div
          className="rounded-full bg-sakura-light px-4 py-2 text-sm font-medium text-sakura-deep shadow-inner"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.85, 1, 0.85]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        >
          紬との春色ダイアリー
        </motion.div>
      </div>

      <div
        ref={listRef}
        className="mt-4 flex-1 space-y-3 overflow-y-auto px-2 py-2"
      >
        <AnimatePresence initial={false}>
          {history.map((message) => (
            <motion.div
              key={message.timestamp}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className={`flex w-full ${message.role === 'assistant' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[80%] rounded-3xl px-4 py-3 text-sm leading-relaxed shadow-bubble backdrop-blur-sm md:text-base ${
                  message.role === 'assistant'
                    ? 'bg-white/90 text-gray-800 dark:bg-slate-800/80 dark:text-gray-100'
                    : 'bg-sakura-light/90 text-gray-900'
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 rounded-3xl bg-white/85 p-4 shadow-bubble backdrop-blur-md dark:bg-slate-900/70">
        <div className="flex items-center gap-2">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder="今日の気持ちを紬に伝えてみよう..."
            rows={2}
            className="w-full resize-none rounded-2xl border border-transparent bg-white/70 px-4 py-3 text-sm text-gray-800 shadow-inner focus:border-sakura-deep focus:bg-white dark:bg-slate-800/60 dark:text-gray-100"
          />
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500 dark:text-gray-300">返信は1秒以内を目指して最適化中...</p>
          <motion.button
            type="submit"
            className="rounded-full bg-sakura-deep px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-sakura-light/50 hover:bg-sakura transition-colors dark:bg-pink-500 dark:hover:bg-pink-400"
            whileTap={{ scale: 0.95 }}
            whileHover={{ scale: 1.03 }}
            disabled={isLoading}
          >
            {isLoading ? '紬が考え中...' : '紬に伝える'}
          </motion.button>
        </div>
      </form>
    </div>
  );
}
