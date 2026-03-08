import { useState } from 'react';
import type { SajuResult as SajuResultType, SajuInput } from '../types/saju';
import FortuneCard from './FortuneCard';
import LuckyItems from './LuckyItems';

interface Props {
  result: SajuResultType;
  rawText?: string;
  input: SajuInput;
  onReset: () => void;
}

const PILLARS = [
  { key: 'year_pillar' as const, label: '年 년주' },
  { key: 'month_pillar' as const, label: '月 월주' },
  { key: 'day_pillar' as const, label: '日 일주' },
  { key: 'time_pillar' as const, label: '時 시주' },
];

const FORTUNE_TABS = [
  { key: 'overall' as const, icon: '☯', label: '총운' },
  { key: 'wealth' as const, icon: '💰', label: '재산운' },
  { key: 'love' as const, icon: '❤️', label: '연애운' },
  { key: 'business' as const, icon: '💼', label: '사업운' },
  { key: 'health' as const, icon: '🏥', label: '건강운' },
];

export default function SajuResult({ result, input, onReset }: Props) {
  const [activeTab, setActiveTab] = useState<typeof FORTUNE_TABS[number]['key']>('overall');

  const info = result.saju_info;
  const activeData = result[activeTab];
  const activeTab_ = FORTUNE_TABS.find((t) => t.key === activeTab)!;

  return (
    <div className="min-h-screen bg-navy-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Title */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-2">☯</div>
          <h1 className="text-2xl font-serif font-bold text-gold-500">
            {input.name ? `${input.name}님의 사주 풀이` : '사주 풀이 결과'}
          </h1>
          <p className="text-gray-400 text-sm font-sans mt-1">
            {input.year}년 {input.month}월 {input.day}일 · {input.time} · {input.gender}
          </p>
        </div>

        {/* Saju Info Card */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-serif font-bold text-gold-400 mb-4">사주팔자 四柱八字</h2>

          {/* Four pillars */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {PILLARS.map(({ key, label }) => (
              <div
                key={key}
                className="bg-navy-900 border border-gold-600 rounded-xl p-3 text-center"
              >
                <p className="text-xs text-gray-500 font-sans mb-1">{label}</p>
                <p className="text-base font-bold text-gold-400 font-serif leading-tight">
                  {info[key]}
                </p>
              </div>
            ))}
          </div>

          {/* Five elements & Yongshin */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="bg-navy-900 rounded-xl p-3">
              <p className="text-xs text-gray-500 font-sans mb-1">오행 분포</p>
              <p className="text-sm text-gray-200 font-sans">{info.five_elements}</p>
            </div>
            <div className="bg-navy-900 rounded-xl p-3">
              <p className="text-xs text-gray-500 font-sans mb-1">용신 用神</p>
              <p className="text-sm text-gray-200 font-sans">{info.yongshin}</p>
            </div>
          </div>
        </div>

        {/* Fortune Tabs */}
        <div className="flex overflow-x-auto gap-2 mb-4 pb-1">
          {FORTUNE_TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-sans text-sm font-semibold whitespace-nowrap transition-all border ${
                activeTab === tab.key
                  ? 'bg-gold-500 text-navy-900 border-gold-500'
                  : 'bg-navy-700 text-gray-300 border-navy-600 hover:border-gold-600'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active fortune card */}
        <div className="mb-6">
          <FortuneCard
            icon={activeTab_.icon}
            title={activeTab_.label}
            data={activeData}
          />
        </div>

        {/* Yearly fortune */}
        <div className="glass-card rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">📅</span>
            <h3 className="text-lg font-serif font-bold text-gold-400">올해의 운세</h3>
          </div>
          <p className="text-sm text-gray-300 font-sans leading-relaxed whitespace-pre-line">
            {result.yearly_fortune}
          </p>
        </div>

        {/* Lucky items */}
        <div className="mb-8">
          <LuckyItems items={result.lucky_items} />
        </div>

        {/* Reset button */}
        <div className="text-center space-y-3">
          <button
            onClick={onReset}
            className="w-full max-w-sm mx-auto block bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-900 font-bold py-3 rounded-lg transition-all font-sans text-sm tracking-wide"
          >
            🔄 다시 분석하기
          </button>
          <p className="text-xs text-gray-600 font-sans">
            본 서비스는 오락 목적이며 실제 의사결정의 근거로 사용하지 마세요.
          </p>
        </div>
      </div>
    </div>
  );
}
