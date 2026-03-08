import type { FortuneCategory } from '../types/saju';

interface Props {
  icon: string;
  title: string;
  data: FortuneCategory | (Omit<FortuneCategory, 'advice'> & { advice?: string });
}

function ScoreBar({ score }: { score: number }) {
  const color =
    score >= 80
      ? 'from-green-500 to-emerald-400'
      : score >= 60
      ? 'from-gold-600 to-gold-400'
      : score >= 40
      ? 'from-orange-500 to-amber-400'
      : 'from-red-600 to-red-400';

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-400 font-sans">운세 지수</span>
        <span className="text-lg font-bold text-gold-400 font-serif">{score}</span>
      </div>
      <div className="h-2 bg-navy-900 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${color} rounded-full transition-all duration-1000`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

export default function FortuneCard({ icon, title, data }: Props) {
  return (
    <div className="glass-card rounded-2xl p-6">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl">{icon}</span>
        <h3 className="text-xl font-serif font-bold text-gold-400">{title}</h3>
      </div>

      {/* Score bar */}
      <ScoreBar score={data.score} />

      {/* Summary */}
      <p className="text-base font-semibold text-white font-sans mb-3 leading-relaxed">
        {data.summary}
      </p>

      {/* Detail */}
      <p className="text-sm text-gray-300 font-sans leading-relaxed mb-4 whitespace-pre-line">
        {data.detail}
      </p>

      {/* Advice */}
      {data.advice && (
        <div className="bg-navy-900 border-l-4 border-gold-500 rounded-r-lg px-4 py-3">
          <p className="text-xs text-gold-400 font-semibold font-sans mb-1">💡 실천 조언</p>
          <p className="text-sm text-gray-300 font-sans leading-relaxed">{data.advice}</p>
        </div>
      )}
    </div>
  );
}
