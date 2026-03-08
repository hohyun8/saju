import React, { useState } from 'react';
import type { SajuInput } from '../types/saju';

const BIRTH_TIMES = [
  { label: '모름', value: '모름' },
  { label: '자시 (23:00~01:00)', value: '자시' },
  { label: '축시 (01:00~03:00)', value: '축시' },
  { label: '인시 (03:00~05:00)', value: '인시' },
  { label: '묘시 (05:00~07:00)', value: '묘시' },
  { label: '진시 (07:00~09:00)', value: '진시' },
  { label: '사시 (09:00~11:00)', value: '사시' },
  { label: '오시 (11:00~13:00)', value: '오시' },
  { label: '미시 (13:00~15:00)', value: '미시' },
  { label: '신시 (15:00~17:00)', value: '신시' },
  { label: '유시 (17:00~19:00)', value: '유시' },
  { label: '술시 (19:00~21:00)', value: '술시' },
  { label: '해시 (21:00~23:00)', value: '해시' },
];

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const DAYS = Array.from({ length: 31 }, (_, i) => i + 1);
const YEARS = Array.from({ length: 81 }, (_, i) => 2010 - i);

interface Props {
  onSubmit: (input: SajuInput) => void;
  loading: boolean;
}

export default function SajuInputStep({ onSubmit, loading }: Props) {
  const [input, setInput] = useState<SajuInput>({
    name: '',
    gender: '남',
    calendarType: '양력',
    year: 1990,
    month: 1,
    day: 1,
    time: '모름',
  });

  function handleChange<K extends keyof SajuInput>(key: K, value: SajuInput[K]) {
    setInput((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(input);
  }

  return (
    <div className="min-h-screen bg-navy-800 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌟</div>
          <h1 className="text-2xl font-serif font-bold text-gold-500 mb-1">
            사주 정보 입력
          </h1>
          <p className="text-gray-400 text-sm font-sans">
            정확한 생년월일시를 입력할수록 분석이 정밀해집니다
          </p>
        </div>

        <div className="glass-card rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-sans text-gray-300 mb-2">
                이름 <span className="text-gray-500">(선택)</span>
              </label>
              <input
                type="text"
                value={input.name}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="이름을 입력하세요"
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors font-sans text-sm"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-sans text-gray-300 mb-2">
                성별
              </label>
              <div className="flex gap-3">
                {(['남', '여'] as const).map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => handleChange('gender', g)}
                    className={`flex-1 py-3 rounded-lg font-sans text-sm font-semibold transition-all border ${
                      input.gender === g
                        ? 'bg-gold-500 text-navy-900 border-gold-500'
                        : 'bg-navy-900 text-gray-300 border-navy-600 hover:border-gold-600'
                    }`}
                  >
                    {g === '남' ? '♂ 남성' : '♀ 여성'}
                  </button>
                ))}
              </div>
            </div>

            {/* Calendar type */}
            <div>
              <label className="block text-sm font-sans text-gray-300 mb-2">
                달력 유형
              </label>
              <div className="flex gap-3">
                {(['양력', '음력'] as const).map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => handleChange('calendarType', c)}
                    className={`flex-1 py-3 rounded-lg font-sans text-sm font-semibold transition-all border ${
                      input.calendarType === c
                        ? 'bg-gold-500 text-navy-900 border-gold-500'
                        : 'bg-navy-900 text-gray-300 border-navy-600 hover:border-gold-600'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
              {input.calendarType === '음력' && (
                <p className="mt-2 text-xs text-yellow-400 font-sans">
                  ※ 음력 기준으로 계산됩니다. 실제 양력 변환은 AI가 처리합니다.
                </p>
              )}
            </div>

            {/* Birth date */}
            <div>
              <label className="block text-sm font-sans text-gray-300 mb-2">
                생년월일
              </label>
              <div className="grid grid-cols-3 gap-2">
                <select
                  value={input.year}
                  onChange={(e) => handleChange('year', Number(e.target.value))}
                  className="bg-navy-900 border border-navy-600 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-sans text-sm"
                >
                  {YEARS.map((y) => (
                    <option key={y} value={y}>{y}년</option>
                  ))}
                </select>
                <select
                  value={input.month}
                  onChange={(e) => handleChange('month', Number(e.target.value))}
                  className="bg-navy-900 border border-navy-600 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-sans text-sm"
                >
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>{m}월</option>
                  ))}
                </select>
                <select
                  value={input.day}
                  onChange={(e) => handleChange('day', Number(e.target.value))}
                  className="bg-navy-900 border border-navy-600 rounded-lg px-3 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-sans text-sm"
                >
                  {DAYS.map((d) => (
                    <option key={d} value={d}>{d}일</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Birth time */}
            <div>
              <label className="block text-sm font-sans text-gray-300 mb-2">
                출생 시간
              </label>
              <select
                value={input.time}
                onChange={(e) => handleChange('time', e.target.value)}
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold-500 transition-colors font-sans text-sm"
              >
                {BIRTH_TIMES.map((t) => (
                  <option key={t.value} value={t.value}>{t.label}</option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 disabled:opacity-60 disabled:cursor-not-allowed text-navy-900 font-bold py-4 rounded-lg transition-all font-sans text-base tracking-wide"
            >
              {loading ? '사주 분석 중...' : '✨ 사주 분석하기'}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6 font-sans">
          본 서비스는 오락 목적이며 실제 의사결정의 근거로 사용하지 마세요.
        </p>
      </div>
    </div>
  );
}
