// app/page.tsx
// 日本語コメント: ゲーム全体のレイアウトや背景演出、BGM再生制御を行うトップページ
'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CharacterAvatar } from '@/components/CharacterAvatar';
import { ChatWindow } from '@/components/ChatWindow';
import { useChatStore } from '@/lib/store';

export default function HomePage() {
  // 日本語コメント: アバターの感情に合わせて背景の揺らぎを変化させるために現在の感情を取得
  const currentEmotion = useChatStore((state) => state.currentEmotion);
  const affection = useChatStore((state) => state.affection);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isBgmReady, setIsBgmReady] = useState(false);

  // 日本語コメント: 初回ユーザー操作後にBGMを再生
  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && !isBgmReady) {
        audioRef.current.volume = 0.4;
        audioRef.current.loop = true;
        audioRef.current.play().catch(() => {
          // 日本語コメント: 自動再生がブロックされた場合は後続の操作で再挑戦
        });
        setIsBgmReady(true);
      }
    };

    window.addEventListener('pointerdown', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('pointerdown', handleInteraction);
    };
  }, [isBgmReady]);

  // 日本語コメント: 感情に応じた背景アニメーションの設定
  const emotionVariants = {
    happy: {
      background: 'radial-gradient(circle at 20% 20%, rgba(255,230,240,0.9), rgba(198,236,255,0.6))'
    },
    blush: {
      background: 'radial-gradient(circle at 80% 30%, rgba(255,210,230,0.95), rgba(245,181,220,0.6))'
    },
    sad: {
      background: 'radial-gradient(circle at 50% 50%, rgba(180,200,230,0.8), rgba(120,140,200,0.5))'
    },
    neutral: {
      background: 'radial-gradient(circle at 50% 20%, rgba(240,240,255,0.85), rgba(181,245,220,0.55))'
    }
  } as const;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-6 md:px-12 md:py-10">
      <motion.div
        className="absolute inset-0 -z-20"
        animate={emotionVariants[currentEmotion]}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute inset-0 -z-10 opacity-70"
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{
          backgroundImage:
            'linear-gradient(135deg, rgba(255, 182, 193, 0.25) 0%, rgba(181, 245, 220, 0.25) 50%, rgba(198, 236, 255, 0.25) 100%)',
          backgroundSize: '200% 200%'
        }}
      />

      <audio ref={audioRef} src="/bgm/main_theme.mp3" aria-label="春の優しいBGM" />

      <motion.section
        className="relative flex w-full max-w-5xl flex-col gap-6 rounded-[40px] bg-white/60 p-6 shadow-2xl shadow-sakura-light/50 backdrop-blur-2xl dark:bg-slate-900/70 md:flex-row md:gap-10 md:p-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="flex flex-1 flex-col items-center justify-center text-center md:items-start md:text-left">
          <motion.div
            className="rounded-full bg-white/70 px-4 py-2 text-xs font-medium text-sakura-deep shadow-inner"
            animate={{
              y: [0, -4, 0]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            紬と過ごす365日の始まり
          </motion.div>
          <h1 className="mt-4 text-3xl font-bold text-gray-900 drop-shadow-sm dark:text-gray-100 md:text-4xl">
            AI恋物語 - 紬と過ごす365日
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-gray-700 dark:text-gray-200 md:text-base">
            春の風が吹くオフィスで、AI秘書「紬」とあなたの特別な日々が始まります。心を込めた言葉で紬の感情を揺らし、好感度を育てていきましょう。
          </p>
          <motion.div
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-sakura-light/80 px-4 py-2 text-xs font-semibold text-sakura-deep shadow-bubble"
            animate={{
              scale: [1, 1.03, 1],
              opacity: [0.9, 1, 0.9]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          >
            現在の好感度: <span className="text-base">{affection}</span>
          </motion.div>
        </div>

        <div className="flex flex-1 flex-col items-center gap-6">
          <CharacterAvatar />
          <ChatWindow />
        </div>
      </motion.section>
    </main>
  );
}
