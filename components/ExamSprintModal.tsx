'use client';

import React, { useState, useEffect } from 'react';
import { RapidFireQuizItem } from '../src/data/bcaData';
import { useAuth } from '../src/context/AuthContext';

interface ExamSprintModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizzes: RapidFireQuizItem[];
  subjectName: string;
}

export const ExamSprintModal: React.FC<ExamSprintModalProps> = ({
  isOpen,
  onClose,
  quizzes,
  subjectName,
}) => {
  const { markItemCompleted } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setSelectedIndex(null);
      setScore(0);
      setTimeLeft(20);
      setIsFinished(false);
    }
  }, [isOpen]);

  // Question Timer
  useEffect(() => {
    if (!isOpen || isFinished || selectedIndex !== null) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleNextQuestion();
          return 20;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen, currentIndex, selectedIndex, isFinished]);

  if (!isOpen || !quizzes || quizzes.length === 0) return null;

  const currentQ = quizzes[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedIndex !== null) return;
    setSelectedIndex(idx);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex + 1 < quizzes.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIndex(null);
      setTimeLeft(20);
    } else {
      setIsFinished(true);
      markItemCompleted('quizzes', quizzes[0].id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col">
        {/* Top Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-50 text-brand-orange border border-orange-200 text-xs font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-sm">bolt</span>
              <span>Exam Sprint — Rapid Fire Quiz</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900">{subjectName}</h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {!isFinished ? (
          <div>
            {/* Progress & Timer Bar */}
            <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-3">
              <span>Question {currentIndex + 1} of {quizzes.length}</span>
              <span className={`px-2.5 py-1 rounded-md font-mono ${timeLeft < 5 ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-slate-100 text-slate-800'}`}>
                ⏱️ {timeLeft}s remaining
              </span>
            </div>

            <div className="w-full bg-slate-100 h-2 rounded-full mb-6 overflow-hidden">
              <div
                className="bg-brand-orange h-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / quizzes.length) * 100}%` }}
              />
            </div>

            {/* Question Box */}
            <h4 className="text-base font-bold text-slate-900 mb-6 leading-relaxed">
              {currentQ.question}
            </h4>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, idx) => {
                let btnStyle = 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100 hover:border-slate-300';
                if (selectedIndex !== null) {
                  if (idx === currentQ.correctIndex) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold';
                  } else if (idx === selectedIndex) {
                    btnStyle = 'bg-red-50 border-red-500 text-red-900 font-bold';
                  } else {
                    btnStyle = 'bg-slate-50 border-slate-200 opacity-50';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={selectedIndex !== null}
                    className={`w-full p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedIndex !== null && idx === currentQ.correctIndex && (
                      <span className="material-symbols-outlined text-emerald-600 text-base">check_circle</span>
                    )}
                    {selectedIndex !== null && idx === selectedIndex && idx !== currentQ.correctIndex && (
                      <span className="material-symbols-outlined text-red-600 text-base">cancel</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation box after selection */}
            {selectedIndex !== null && (
              <div className="mb-6 p-4 rounded-2xl bg-slate-900 text-white text-xs leading-relaxed animate-fade-in">
                <span className="font-bold text-brand-orange uppercase block mb-1">Explanation:</span>
                <p>{currentQ.explanation}</p>
              </div>
            )}

            {/* Action button */}
            {selectedIndex !== null && (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-brand-orange text-white py-3 rounded-xl font-bold text-xs btn-primary-glow flex items-center justify-center gap-2"
              >
                <span>{currentIndex + 1 < quizzes.length ? 'Next Question' : 'Complete Sprint'}</span>
                <span className="material-symbols-outlined text-base">arrow_forward</span>
              </button>
            )}
          </div>
        ) : (
          /* Finished Screen */
          <div className="text-center py-6 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 text-3xl font-bold">
              🏆
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Exam Sprint Completed!</h3>
            <p className="text-xs text-slate-600 mb-6">
              You scored <span className="font-bold text-brand-orange">{score} / {quizzes.length}</span> in {subjectName}.
            </p>

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4 text-xs text-orange-950 font-medium mb-6">
              🎉 <strong>Exam Readiness Score Boosted!</strong><br />
              Your Prep Confidence score has increased by <strong>+15%</strong> for completing this speed sprint!
            </div>

            <button
              onClick={onClose}
              className="bg-brand-orange text-white px-6 py-3 rounded-xl font-bold text-xs btn-primary-glow w-full"
            >
              Return to Dashboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
