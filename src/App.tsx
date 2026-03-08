import { useState, useCallback } from 'react';
import type { AppStep, SajuInput, SajuResult } from './types/saju';
import { analyzeSaju } from './utils/gemini';
import SajuInputStep from './components/SajuInputStep';
import SajuResultComponent from './components/SajuResult';


function LoadingSpinner() {
  return (
    <div className="min-h-screen bg-navy-800 flex flex-col items-center justify-center gap-6">
      <div className="relative w-24 h-24">
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-navy-600" />
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-gold-500 animate-spin" />
        {/* Inner symbol */}
        <div className="absolute inset-0 flex items-center justify-center text-4xl">
          ☯
        </div>
      </div>
      <div className="text-center">
        <p className="text-gold-400 font-serif text-xl font-bold mb-1">사주 분석 중</p>
        <p className="text-gray-400 font-sans text-sm">AI가 천간지지를 세우고 있습니다...</p>
      </div>
      {/* Streaming preview */}
      <div className="w-full max-w-md px-4">
        <div className="glass-card rounded-xl p-4 min-h-12">
          <p className="text-xs text-gray-500 font-sans animate-pulse">응답 대기 중...</p>
        </div>
      </div>
    </div>
  );
}

function ErrorToast({
  message,
  onRetry,
  onDismiss,
}: {
  message: string;
  onRetry: () => void;
  onDismiss: () => void;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-4">
      <div className="bg-red-900 border border-red-600 rounded-xl p-4 shadow-lg">
        <div className="flex items-start gap-3">
          <span className="text-red-400 text-xl">⚠️</span>
          <div className="flex-1">
            <p className="text-sm text-white font-sans">{message}</p>
            <div className="flex gap-3 mt-3">
              <button
                onClick={onRetry}
                className="text-xs bg-red-600 hover:bg-red-500 text-white px-3 py-1.5 rounded-lg font-sans transition-colors"
              >
                재시도
              </button>
              <button
                onClick={onDismiss}
                className="text-xs text-red-400 hover:text-red-300 font-sans transition-colors"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RawFallback({ text, onReset }: { text: string; onReset: () => void }) {
  return (
    <div className="min-h-screen bg-navy-800 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-xl font-serif font-bold text-gold-400">분석 결과 (원문)</h2>
          <p className="text-sm text-gray-400 font-sans mt-1">
            JSON 파싱에 실패하여 원문을 표시합니다
          </p>
        </div>
        <div className="glass-card rounded-2xl p-6 mb-6">
          <pre className="text-sm text-gray-300 font-sans whitespace-pre-wrap leading-relaxed overflow-auto">
            {text}
          </pre>
        </div>
        <button
          onClick={onReset}
          className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-navy-900 font-bold py-3 rounded-lg font-sans text-sm"
        >
          🔄 다시 시도하기
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState<AppStep>('saju-input');
  const [lastInput, setLastInput] = useState<SajuInput | null>(null);
  const [result, setResult] = useState<SajuResult | null>(null);
  const [rawText, setRawText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showRaw, setShowRaw] = useState(false);

  const handleAnalyze = useCallback(
    async (input: SajuInput) => {
      setLastInput(input);
      setLoading(true);
      setError('');
      setResult(null);
      setRawText('');
      setShowRaw(false);

      try {
        const { result: parsed, rawText: raw } = await analyzeSaju(input);

        setRawText(raw);

        if (parsed) {
          setResult(parsed);
          setStep('result');
        } else {
          setShowRaw(true);
          setStep('result');
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (msg.includes('401') || msg.toLowerCase().includes('api key') || msg.toLowerCase().includes('api_key')) {
          setError('API 키가 올바르지 않습니다. 키를 확인하고 다시 시도해주세요.');
        } else if (msg.toLowerCase().includes('403') || msg.toLowerCase().includes('permission') || msg.toLowerCase().includes('quota')) {
          setError(`API 권한 오류: ${msg}`);
        } else if (msg.toLowerCase().includes('failed to fetch') || msg.toLowerCase().includes('networkerror')) {
          setError(`네트워크 오류: Google API에 연결할 수 없습니다. VPN/방화벽을 확인하거나 브라우저 콘솔(F12)에서 상세 오류를 확인하세요.\n(${msg})`);
        } else {
          setError(`오류가 발생했습니다: ${msg}`);
        }
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleReset = useCallback(() => {
    setStep('saju-input');
    setResult(null);
    setRawText('');
    setShowRaw(false);
    setError('');
  }, []);

  const handleRetry = useCallback(() => {
    if (lastInput) {
      setError('');
      void handleAnalyze(lastInput);
    }
  }, [lastInput, handleAnalyze]);

  if (loading) return <LoadingSpinner />;

  return (
    <>
      {step === 'saju-input' && (
        <SajuInputStep onSubmit={handleAnalyze} loading={loading} />
      )}

      {step === 'result' && showRaw && (
        <RawFallback text={rawText} onReset={handleReset} />
      )}

      {step === 'result' && result && !showRaw && (
        <SajuResultComponent
          result={result}
          rawText={rawText}
          input={lastInput!}
          onReset={handleReset}
        />
      )}

      {error && (
        <ErrorToast
          message={error}
          onRetry={handleRetry}
          onDismiss={() => setError('')}
        />
      )}
    </>
  );
}
