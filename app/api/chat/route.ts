// app/api/chat/route.ts
// 日本語コメント: OpenAI ChatGPT-5 APIと通信し感情タグ付きの返答を生成するエンドポイント
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// 日本語コメント: 感情タグの候補を定義
const EMOTIONS = ['happy', 'sad', 'blush', 'neutral'] as const;

type Emotion = (typeof EMOTIONS)[number];



// 日本語コメント: OpenAIクライアントを初期化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});



export async function POST(request: Request) {
  try {
    const { message, affection } = await request.json();


    // 日本語コメント: ビルド時エラーを避けるため、APIキー存在確認とクライアント初期化を遅延実行
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEYが設定されていません');
    }

    const openai = new OpenAI({
      apiKey
    });


    const prompt = `あなたは優しいAI秘書「紬」です。舞台は春の日本、相手は新社会人。必ず以下の形式で応答してください。
1. 返答冒頭に感情タグを半角で一つ記載 (happy, sad, blush, neutral)。例: [happy]
2. タグ以降は日本語で200文字以内の会話文。温かく、自然で、相手の気持ちに寄り添う。
3. 好感度が高いほど親密な言葉遣いに、低いと励まし中心に。
現在の好感度: ${affection}。`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-5.0-chat',
      messages: [
        {
          role: 'system',
          content:
            'あなたはAI秘書「紬」。春の柔らかな雰囲気で会話し、ユーザーの心に寄り添い、感情タグを必ず一つ付けること。'
        },
        {
          role: 'user',
          content: `${prompt}\nユーザー: ${message}`
        }
      ],
      temperature: 0.8,
      max_tokens: 300,
      presence_penalty: 0.2,
      frequency_penalty: 0.2
    });

    const aiMessage = completion.choices[0]?.message?.content ?? '[neutral] 紬はそっと微笑んでいます。';
    const emotionMatch = aiMessage.match(/^\[(happy|sad|blush|neutral)\]/i);
    const emotion: Emotion = emotionMatch ? (emotionMatch[1].toLowerCase() as Emotion) : 'neutral';

    if (!EMOTIONS.includes(emotion)) {
      return NextResponse.json({ message: `[neutral] ${aiMessage}` });
    }

    return NextResponse.json({ message: aiMessage });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        message: '[sad] 少し調子が悪いみたい……でも、またすぐに笑顔を届けるね。'
      },
      { status: 500 }
    );
  }
}
