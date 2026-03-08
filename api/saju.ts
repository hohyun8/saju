import { GoogleGenerativeAI } from '@google/generative-ai';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SYSTEM_PROMPT = `당신은 한국의 전통 명리학(사주팔자)에 정통한 최고 수준의 역술가입니다.
사용자의 생년월일시를 바탕으로 사주팔자(년주·월주·일주·시주)를 세우고,
오행(목·화·토·금·수)의 균형, 용신, 일간의 강약 등을 분석하여
각 운세 항목을 구체적이고 실용적으로 풀이합니다.
반드시 아래 JSON 형식으로만 응답하세요 (마크다운 코드블록 없이 순수 JSON):
{
  "saju_info": {
    "year_pillar": "년주 (천간지지)",
    "month_pillar": "월주 (천간지지)",
    "day_pillar": "일주 (천간지지)",
    "time_pillar": "시주 (천간지지 또는 미상)",
    "five_elements": "오행 분포 요약",
    "yongshin": "용신 설명"
  },
  "overall": {
    "score": 1~100 사이 숫자,
    "summary": "총운 한 줄 요약",
    "detail": "총운 상세 풀이 (300자 이상)"
  },
  "wealth": {
    "score": 1~100,
    "summary": "재산운 한 줄 요약",
    "detail": "재산운 상세 풀이 (300자 이상)",
    "advice": "재물 관련 실천 조언"
  },
  "love": {
    "score": 1~100,
    "summary": "연애운 한 줄 요약",
    "detail": "연애/결혼운 상세 풀이 (300자 이상)",
    "advice": "인간관계 실천 조언"
  },
  "business": {
    "score": 1~100,
    "summary": "사업운 한 줄 요약",
    "detail": "사업/직업운 상세 풀이 (300자 이상)",
    "advice": "커리어 실천 조언"
  },
  "health": {
    "score": 1~100,
    "summary": "건강운 한 줄 요약",
    "detail": "건강 상세 풀이 - 주의할 신체 부위 포함 (300자 이상)",
    "advice": "건강 실천 조언"
  },
  "yearly_fortune": "올해(현재 연도) 운세 흐름 요약 (200자 이상)",
  "lucky_items": {
    "color": "행운의 색",
    "number": "행운의 숫자",
    "direction": "행운의 방향",
    "element": "행운의 오행"
  }
}`;

function buildUserPrompt(input: {
  name: string;
  gender: string;
  calendarType: string;
  year: number;
  month: number;
  day: number;
  time: string;
}): string {
  return `이름: ${input.name || '미입력'}
성별: ${input.gender}
양력/음력: ${input.calendarType}
생년월일: ${input.year}년 ${input.month}월 ${input.day}일
출생시간: ${input.time}
위 정보로 사주를 분석해주세요.`;
}

function extractJson(text: string): string {
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) return codeBlockMatch[1].trim();
  const jsonMatch = text.match(/\{[\s\S]*\}/);
  if (jsonMatch) return jsonMatch[0];
  return text;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Server configuration error: API key missing' });
  }

  const input = req.body;
  if (!input || !input.year || !input.month || !input.day) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    });

    const prompt = buildUserPrompt(input);
    const response = await model.generateContent(prompt);
    const rawText = response.response.text();

    try {
      const jsonStr = extractJson(rawText);
      const parsed = JSON.parse(jsonStr);
      return res.status(200).json({ result: parsed, rawText });
    } catch {
      return res.status(200).json({ result: null, rawText });
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: msg });
  }
}
