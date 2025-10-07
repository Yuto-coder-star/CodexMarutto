// components/CharacterAvatar.tsx
// 日本語コメント: 紬の表情アバターを感情タグに応じて切り替えるコンポーネント
'use client';

import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore, EmotionTag } from '@/lib/store';

// 日本語コメント: 表情タグと画像パスの対応表
const emotionToImage: Record<EmotionTag, { src: string; alt: string }> = {
  happy: {
    src: '/images/tsumugi_happy.png',
    alt: '紬の嬉しそうな表情'
  },
  sad: {
    src: '/images/tsumugi_sad.png',
    alt: '紬の切なげな表情'
  },
  blush: {
    src: '/images/tsumugi_blush.png',
    alt: '紬の照れた表情'
  },
  neutral: {
    src: '/images/tsumugi_neutral.png',
    alt: '紬の穏やかな表情'
  }
};

export function CharacterAvatar() {
  // 日本語コメント: Zustandストアから現在の表情を購読
  const emotion = useChatStore((state) => state.currentEmotion);
  const { src, alt } = emotionToImage[emotion];

  return (
    <div className="relative flex h-56 w-56 items-center justify-center md:h-64 md:w-64">
      <AnimatePresence mode="wait">
        <motion.div
          key={emotion}
          initial={{ opacity: 0.2, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full w-full drop-shadow-2xl"
        >
          <Image
            src={src}
            alt={alt}
            fill
            priority
            className="rounded-3xl object-contain"
          />
        </motion.div>
      </AnimatePresence>
      <motion.div
        className="absolute inset-0 -z-10 rounded-full bg-white/50 blur-3xl"
        animate={{
          scale: [0.95, 1.05, 0.95],
          opacity: [0.45, 0.65, 0.45]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}
