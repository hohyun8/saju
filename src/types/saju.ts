export interface SajuInfo {
  year_pillar: string;
  month_pillar: string;
  day_pillar: string;
  time_pillar: string;
  five_elements: string;
  yongshin: string;
}

export interface FortuneCategory {
  score: number;
  summary: string;
  detail: string;
  advice: string;
}

export interface LuckyItems {
  color: string;
  number: string;
  direction: string;
  element: string;
}

export interface SajuResult {
  saju_info: SajuInfo;
  overall: Omit<FortuneCategory, 'advice'> & { advice?: string };
  wealth: FortuneCategory;
  love: FortuneCategory;
  business: FortuneCategory;
  health: FortuneCategory;
  yearly_fortune: string;
  lucky_items: LuckyItems;
}

export interface SajuInput {
  name: string;
  gender: '남' | '여';
  calendarType: '양력' | '음력';
  year: number;
  month: number;
  day: number;
  time: string;
}

export type AppStep = 'api-key' | 'saju-input' | 'result';
