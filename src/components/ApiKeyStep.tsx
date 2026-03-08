import React, { useState, useEffect } from 'react';

interface Props {
  onSubmit: (apiKey: string) => void;
}

export default function ApiKeyStep({ onSubmit }: Props) {
  const [apiKey, setApiKey] = useState('');
  const [saveKey, setSaveKey] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('gemini_api_key');
    if (saved) {
      setApiKey(saved);
      setSaveKey(true);
    }
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = apiKey.trim();
    if (!trimmed) {
      setError('API 키를 입력해주세요.');
      return;
    }
    if (trimmed.length < 20) {
      setError('올바른 Gemini API 키를 입력해주세요.');
      return;
    }
    if (saveKey) {
      localStorage.setItem('gemini_api_key', trimmed);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
    setError('');
    onSubmit(trimmed);
  }

  return (
    <div className="min-h-screen bg-navy-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="text-6xl mb-4">☯</div>
          <h1 className="text-3xl font-serif font-bold text-gold-500 mb-2">
            AI 사주 풀이
          </h1>
          <p className="text-gray-400 font-sans text-sm">
            Google Gemini AI가 분석하는 한국 전통 명리학
          </p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-2xl p-8">
          <h2 className="text-xl font-serif font-semibold text-gold-400 mb-6">
            Gemini API 키 입력
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-sans text-gray-300 mb-2">
                API 키
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="AIza..."
                className="w-full bg-navy-900 border border-navy-600 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-gold-500 transition-colors font-sans text-sm"
              />
            </div>

            {/* Security notice */}
            <div className="flex items-start gap-2 bg-navy-900 rounded-lg p-3 border border-navy-600">
              <span className="text-green-400 text-base mt-0.5">🔒</span>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                API 키는 브라우저에서만 사용되며 서버로 전송되지 않습니다.
                모든 요청은 귀하의 브라우저에서 직접 Google API로 전달됩니다.
              </p>
            </div>

            {/* Save checkbox */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={saveKey}
                onChange={(e) => setSaveKey(e.target.checked)}
                className="w-4 h-4 accent-gold-500"
              />
              <span className="text-sm text-gray-300 font-sans">
                API 키를 브라우저에 저장 (localStorage)
              </span>
            </label>

            {error && (
              <p className="text-red-400 text-sm font-sans">{error}</p>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-navy-900 font-bold py-3 rounded-lg transition-all font-sans text-sm tracking-wide"
            >
              다음 단계 →
            </button>
          </form>

          <p className="text-center text-xs text-gray-600 mt-6 font-sans">
            API 키가 없으시면{' '}
            <span className="text-gold-600">
              Google AI Studio (aistudio.google.com)
            </span>
            에서 발급받으세요.
          </p>
        </div>

        {/* Disclaimer */}
        <p className="text-center text-xs text-gray-600 mt-6 font-sans">
          본 서비스는 오락 목적이며 실제 의사결정의 근거로 사용하지 마세요.
        </p>
      </div>
    </div>
  );
}
