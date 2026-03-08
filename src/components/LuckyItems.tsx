import type { LuckyItems as LuckyItemsType } from '../types/saju';

interface Props {
  items: LuckyItemsType;
}

const LUCKY_CONFIG = [
  { key: 'color' as const, icon: '🎨', label: '행운의 색' },
  { key: 'number' as const, icon: '🔢', label: '행운의 숫자' },
  { key: 'direction' as const, icon: '🧭', label: '행운의 방향' },
  { key: 'element' as const, icon: '⚡', label: '행운의 오행' },
];

export default function LuckyItems({ items }: Props) {
  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center gap-3 mb-5">
        <span className="text-3xl">🍀</span>
        <h3 className="text-xl font-serif font-bold text-gold-400">행운 아이템</h3>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {LUCKY_CONFIG.map(({ key, icon, label }) => (
          <div
            key={key}
            className="bg-navy-900 border border-navy-600 rounded-xl p-4 text-center"
          >
            <div className="text-2xl mb-1">{icon}</div>
            <p className="text-xs text-gray-500 font-sans mb-1">{label}</p>
            <p className="text-base font-bold text-gold-400 font-serif">{items[key]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
