import React, { useState, useMemo, useCallback } from 'react';
import { RAW_DATA, MAX_SCORE, BUCKET_SIZE } from './constants';
import { AnalysisResult, DistributionBucket } from './types';
import { DistributionChart } from './components/DistributionChart';

const App: React.FC = () => {
  const [inputId, setInputId] = useState('');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Memoize sorted data for performance optimization
  const sortedData = useMemo(() => {
    return [...RAW_DATA].sort((a, b) => b.score - a.score);
  }, []);

  const calculateDistribution = useCallback((userScore: number) => {
    const buckets: DistributionBucket[] = [];
    // Ensure we cover up to 25. If bucket size is 1, we need 25 buckets (0-1, ... 24-25)
    // Actually if max is 25, 25/1 = 25.
    const numBuckets = Math.ceil(MAX_SCORE / BUCKET_SIZE);

    for (let i = 0; i < numBuckets; i++) {
      const min = i * BUCKET_SIZE;
      const max = (i + 1) * BUCKET_SIZE;
      
      const count = RAW_DATA.filter(s => {
        // Special case for the final bucket to include the absolute max score
        if (i === numBuckets - 1) {
           return s.score >= min && s.score <= MAX_SCORE;
        }
        return s.score >= min && s.score < max;
      }).length;

      const isUserBucket = (i === numBuckets - 1) 
        ? (userScore >= min && userScore <= MAX_SCORE)
        : (userScore >= min && userScore < max);

      buckets.push({
        range: `${min}-${max}`,
        min,
        max,
        count,
        isUserBucket
      });
    }
    return buckets;
  }, []);

  const handleSearch = () => {
    setError(null);
    setResult(null);

    const trimmedId = inputId.trim();
    if (!trimmedId) return;

    const foundRecord = RAW_DATA.find(r => r.id === trimmedId);

    if (!foundRecord) {
      setError(`ID '${trimmedId}' not found in database.`);
      return;
    }

    const rank = sortedData.findIndex(s => s.score === foundRecord.score) + 1;
    const totalParticipants = RAW_DATA.length;
    const percentile = (rank / totalParticipants) * 100;

    const distribution = calculateDistribution(foundRecord.score);

    setResult({
      record: foundRecord,
      rank,
      totalParticipants,
      percentile,
      distribution
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const reset = () => {
    setResult(null);
    setInputId('');
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center p-6 selection:bg-black selection:text-white font-sans antialiased overflow-hidden">
      
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 md:p-10 flex justify-between items-start z-50 pointer-events-none">
        <div className="flex flex-col gap-1 pointer-events-auto">
          <h1 className="text-[10px] uppercase tracking-[0.2em] font-bold">Univ. Mannheim</h1>
          <span className="text-[9px] text-gray-400 tracking-widest">Econ Dept. // 2024</span>
        </div>
        <div className="pointer-events-auto">
             <div className="text-[9px] font-mono border border-gray-200 px-3 py-1 rounded-full text-gray-400 tracking-wider">
              PUBLIC_ACCESS
            </div>
        </div>
      </header>

      <main className="w-full max-w-lg relative z-10">
        
        {!result ? (
          <div className="animate-fade-in-up space-y-20">
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-light tracking-tighter leading-[0.85]">
                Academic <br/> <span className="font-medium">Performance</span>
              </h2>
              <p className="text-sm text-gray-500 max-w-xs leading-relaxed font-normal tracking-wide">
                Please authenticate using your 3-digit identifier suffix to access the midterm grade distribution ledger.
              </p>
            </div>

            <div className="space-y-8">
              <div className="relative group">
                <input
                  type="text"
                  maxLength={3}
                  value={inputId}
                  onChange={(e) => setInputId(e.target.value.replace(/\D/g, ''))} 
                  onKeyDown={handleKeyDown}
                  placeholder="ID Suffix"
                  className="w-full bg-transparent border-b border-gray-200 py-4 text-4xl md:text-5xl font-light placeholder:text-gray-100 focus:outline-none focus:border-black transition-all duration-500 font-mono tracking-tighter"
                />
                <div className="absolute right-0 bottom-6 text-[9px] tracking-[0.2em] uppercase text-gray-300 opacity-0 group-focus-within:opacity-100 transition-opacity duration-500">
                  Enter Digits
                </div>
              </div>

              {error && (
                <div className="text-black text-[10px] font-mono mt-4 flex items-center gap-3 bg-gray-50 p-4 border-l-2 border-red-500">
                  {error}
                </div>
              )}

              <button
                onClick={handleSearch}
                className="group w-full bg-black text-white h-14 flex items-center justify-between px-6 hover:bg-neutral-900 transition-all duration-500"
              >
                <span className="text-[10px] uppercase tracking-[0.25em] font-medium">Retrieve Data</span>
                <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in w-full">
            
            {/* Top Navigation / Reset */}
            <div className="mb-12 flex justify-between items-end border-b border-gray-100 pb-4">
               <div className="space-y-1">
                  <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400">Identity</p>
                  <p className="font-mono text-xl tracking-tight text-gray-600">ID: ...{result.record.id}</p>
               </div>
               <button onClick={reset} className="text-[9px] uppercase tracking-widest text-black hover:opacity-50 transition-opacity pb-1">
                 ← Return
               </button>
            </div>

            {/* Main Stats */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-12 mb-12">
              <div className="col-span-1">
                <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-2">Score</p>
                <div className="flex items-start gap-1">
                  <span className="text-6xl md:text-7xl font-medium tracking-tighter leading-none">{result.record.score}</span>
                  <span className="text-xs font-mono text-gray-400 mt-2">/ {MAX_SCORE}</span>
                </div>
              </div>

              <div className="col-span-1 flex flex-col justify-end items-start">
                 <p className="text-[9px] uppercase tracking-[0.2em] text-gray-400 mb-3">Ranking</p>
                 <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-normal tracking-tight">#{result.rank}</span>
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider">of {result.totalParticipants}</span>
                 </div>
                 <div className="w-full bg-gray-100 h-0.5 overflow-hidden rounded-full">
                    <div 
                      className="bg-black h-full transition-all duration-1000 ease-out" 
                      style={{ width: `${100 - result.percentile}%` }}
                    ></div>
                 </div>
              </div>
            </div>

            {/* Chart */}
            <div className="relative">
               <div className="absolute top-0 right-0 z-10">
                  <span className="text-[9px] uppercase tracking-widest bg-black text-white px-2 py-1">
                    Top {result.percentile.toFixed(1)}%
                  </span>
               </div>
               <DistributionChart data={result.distribution} />
            </div>
          </div>
        )}

      </main>

      <footer className="absolute bottom-6 w-full text-center pointer-events-none">
        <p className="text-[8px] text-gray-300 uppercase tracking-[0.3em]">Confidential / Internal Use Only</p>
      </footer>
    </div>
  );
};

export default App;