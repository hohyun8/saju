import type { SajuInput, SajuResult } from '../types/saju';

export async function analyzeSaju(
  input: SajuInput,
): Promise<{ result: SajuResult | null; rawText: string }> {
  const response = await fetch('/api/saju', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({ error: response.statusText }));
    throw new Error(err.error ?? `HTTP ${response.status}`);
  }

  return response.json() as Promise<{ result: SajuResult | null; rawText: string }>;
}
