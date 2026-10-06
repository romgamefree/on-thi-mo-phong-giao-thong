import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HomeMode } from './components/HomeMode';
import { StudyMode } from './components/StudyMode';
import { ExamSelectMode } from './components/ExamSelectMode';
import { ExamTestMode } from './components/ExamTestMode';
import { EXAM_SETS } from './data/examData';

export type AppMode = 'home' | 'study' | 'select_exam' | 'exam';

export interface ExamHistoryItem {
  score: number;
  passed: boolean;
  timestamp: number;
}

export default function App() {
  const [mode, setMode] = useState<AppMode>('home');
  const [selectedExamId, setSelectedExamId] = useState<number>(1);
  const [history, setHistory] = useState<Record<number, ExamHistoryItem>>({});

  // Load history from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('thgt_exam_history');
      if (saved) {
        setHistory(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSaveHistory = (maDe: number, score: number, passed: boolean) => {
    const updated = {
      ...history,
      [maDe]: {
        score,
        passed,
        timestamp: Date.now(),
      },
    };
    setHistory(updated);
    try {
      localStorage.setItem('thgt_exam_history', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleStartExam = (maDe: number) => {
    setSelectedExamId(maDe);
    setMode('exam');
  };

  const handleStartRandomExam = () => {
    const randomMaDe = Math.floor(Math.random() * EXAM_SETS.length) + 1;
    setSelectedExamId(randomMaDe);
    setMode('exam');
  };

  const historyValues = Object.values(history);
  const historyCount = historyValues.length;
  const passedCount = historyValues.filter((h) => h.passed).length;
  const highestScore = historyValues.length > 0 ? Math.max(...historyValues.map((h) => h.score)) : 0;

  return (
    <div className="min-h-screen flex flex-col font-sans text-slate-800 bg-[#f4f7fa] antialiased">
      {/* Top Header */}
      <Header onGoHome={() => setMode('home')} />

      {/* Main Body per Active View */}
      <main className="flex-1 flex flex-col">
        {mode === 'home' && (
          <HomeMode
            onGoToStudy={() => setMode('study')}
            onGoToExamSelect={() => setMode('select_exam')}
            onQuickStartExam={() => handleStartExam(1)}
            historyCount={historyCount}
            passedCount={passedCount}
            highestScore={highestScore}
          />
        )}

        {mode === 'study' && (
          <StudyMode
            onBack={() => setMode('home')}
            onGoToExams={() => setMode('select_exam')}
          />
        )}

        {mode === 'select_exam' && (
          <ExamSelectMode
            onBackHome={() => setMode('home')}
            onSelectExam={handleStartExam}
            onSelectRandomExam={handleStartRandomExam}
            examHistory={history}
          />
        )}

        {mode === 'exam' && (
          <ExamTestMode
            maDe={selectedExamId}
            onBackToSelect={() => setMode('select_exam')}
            onSaveHistory={handleSaveHistory}
          />
        )}
      </main>
    </div>
  );
}
