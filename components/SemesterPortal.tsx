'use client';

import React, { useState } from 'react';
import { useAuth } from '../src/context/AuthContext';

interface SemesterPortalProps {
  semester: number;
  onBackToMain?: () => void;
}

export const SemesterPortal: React.FC<SemesterPortalProps> = ({ semester, onBackToMain }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'subjects' | 'notes' | 'pyq' | 'assignments' | 'labs' | 'important' | 'ai'>('subjects');

  // AI Assistant state
  const [aiQuery, setAiQuery] = useState('');
  const [aiChat, setAiChat] = useState<Array<{ sender: 'user' | 'ai'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello ${user?.name || 'Student'}! I am your Examify AI Assistant for Semester ${semester}. Ask me any question from your syllabus, lab programs, or exam papers.`,
    },
  ]);

  // Semester Specific Data
  const getSemesterDetails = (sem: number) => {
    switch (sem) {
      case 1:
        return {
          title: 'Semester 1 - Foundation & Fundamentals',
          subjects: ['Problem Solving using C', 'Computer Essentials', 'Discrete Mathematics', 'Digital Electronics', 'Communicative English'],
          notes: ['Unit 1: C Syntax & Control Flow', 'Unit 2: Functions & Arrays in C', 'Unit 3: Computer Hardware & Logic Gates', 'Unit 4: Discrete Sets & Logic Statements'],
          pyqs: ['C Programming 2025 University Exam Paper', 'Computer Essentials 2025 Mid-Sem Paper', 'Digital Electronics 2025 Solved Paper'],
          assignments: ['C Programming Assignment 1: Matrix Operations', 'Discrete Math Problem Set: Truth Tables'],
          labs: ['Lab 1: C Program to Check Prime Number', 'Lab 2: C Program for Matrix Multiplication', 'Lab 3: Logic Gate Simulation using Truth Tables'],
          importantQuestions: ['Differentiate between Call by Value & Call by Reference in C. [10 Marks]', 'Explain De Morgan’s Laws with Venn Diagrams. [8 Marks]', 'Draw NAND & NOR logic gate circuits. [6 Marks]'],
        };
      case 2:
        return {
          title: 'Semester 2 - Core Programming & Data Structures',
          subjects: ['Data Structures & Algorithms', 'OOPS using C++', 'Operating Systems', 'Environmental Studies', 'Financial Accounting'],
          notes: ['Unit 1: Singly & Doubly Linked Lists', 'Unit 2: Binary Trees & BST Traversal', 'Unit 3: Process Scheduling & CPU Algorithms', 'Unit 4: OOPS Inheritance & Polymorphism'],
          pyqs: ['Data Structures 2025 End-Sem Exam Paper', 'Operating Systems 2025 Model Solved Paper', 'OOPS using C++ 2025 Paper'],
          assignments: ['Data Structures Assignment: Stack & Queue Applications', 'OS Assignment: Banker’s Algorithm Matrix'],
          labs: ['Lab 1: C++ Program for Binary Search Tree Insertion', 'Lab 2: C++ Program for Inheritance & Virtual Functions', 'Lab 3: OS CPU Scheduling (FCFS & Round Robin)'],
          importantQuestions: ['Explain Banker’s Algorithm for Deadlock Avoidance with matrix example. [10 Marks]', 'Compare Stack vs Queue with Array & Pointer implementations. [8 Marks]'],
        };
      case 3:
        return {
          title: 'Semester 3 - Systems & Databases',
          subjects: ['DBMS & SQL', 'OOPS using Java', 'Software Engineering', 'Computer Networks', 'Fundamentals of Fintech'],
          notes: ['Unit 1: ER Diagrams & Relational Algebra', 'Unit 2: SQL 3NF & BCNF Normalization', 'Unit 3: Java Multi-threading & Interfaces', 'Unit 4: OSI 7-Layer Architecture'],
          pyqs: ['DBMS & SQL 2025 University Exam Paper', 'Java Programming 2025 Model Solutions', 'Computer Networks 2025 Exam Paper'],
          assignments: ['DBMS Assignment: SQL Joins & Subqueries', 'Java Assignment: Exception Handling & Custom Exceptions'],
          labs: ['Lab 1: SQL Schema Creation & INNER/LEFT JOIN Queries', 'Lab 2: Java Multi-threaded Producer-Consumer Application', 'Lab 3: Socket Programming in Java'],
          importantQuestions: ['Explain 3NF vs BCNF Normalization with database tables. [10 Marks]', 'Compare TCP vs UDP protocols in OSI Layer 4. [8 Marks]'],
        };
      case 4:
        return {
          title: 'Semester 4 - Web & Security Systems',
          subjects: ['Full-Stack Web Dev', 'Python Programming', 'Computer Architecture', 'Cyber Security Essentials', 'Cloud Computing'],
          notes: ['Unit 1: React Components & State Management', 'Unit 2: Python Data Analysis with Pandas', 'Unit 3: AES & RSA Cryptography', 'Unit 4: Cloud IaaS vs PaaS vs SaaS'],
          pyqs: ['Web Dev 2025 University Exam Paper', 'Python Programming 2025 Solved Paper', 'Cyber Security 2025 Paper'],
          assignments: ['Web Dev Project Assignment: Responsive React Dashboard', 'Python Assignment: File Handling & Regex'],
          labs: ['Lab 1: React Hooks State & Props Application', 'Lab 2: Python Script for Web Scraping & CSV Export', 'Lab 3: RSA Encryption & Decryption Simulation'],
          importantQuestions: ['Explain React Virtual DOM and Component Lifecycle. [10 Marks]', 'Demonstrate RSA Encryption algorithm with sample prime numbers. [10 Marks]'],
        };
      case 5:
        return {
          title: 'Semester 5 - Advanced Engineering & AI',
          subjects: ['Mobile App Dev (Android)', 'Artificial Intelligence', 'Data Science & Analytics', 'Linux System Admin', 'Mini Project'],
          notes: ['Unit 1: Android Activity Lifecycle & Intents', 'Unit 2: A* Search Algorithm & Heuristics', 'Unit 3: Linear Regression & Classification in Data Science', 'Unit 4: Bash Shell Scripting'],
          pyqs: ['Android App Dev 2025 Exam Paper', 'Artificial Intelligence 2025 Model Paper', 'Data Science 2025 Exam Paper'],
          assignments: ['Android App Assignment: SQLite Database App', 'AI Assignment: Problem Solving using MiniMax Algorithm'],
          labs: ['Lab 1: Android App with RecyclerView & Room DB', 'Lab 2: Python Machine Learning Classification Model', 'Lab 3: Linux Shell Script for System Monitoring'],
          importantQuestions: ['Explain A* Search Algorithm with Admissible Heuristic. [10 Marks]', 'Describe Android Activity Lifecycle state diagram. [8 Marks]'],
        };
      case 6:
        return {
          title: 'Semester 6 - Specialization & Capstone Project',
          subjects: ['Machine Learning', 'DevOps Fundamentals', 'Information Security', 'Major Capstone Project'],
          notes: ['Unit 1: Neural Networks & Deep Learning', 'Unit 2: Docker Containers & Kubernetes Deployment', 'Unit 3: CI/CD Pipelines with GitHub Actions', 'Unit 4: Capstone Documentation Standard'],
          pyqs: ['Machine Learning 2025 University Exam Paper', 'DevOps Fundamentals 2025 Paper'],
          assignments: ['ML Assignment: Neural Network Model Training', 'DevOps Assignment: Dockerizing Full-Stack App'],
          labs: ['Lab 1: Python Neural Network for Image Recognition', 'Lab 2: Dockerfile & Docker Compose Multi-container Setup', 'Lab 3: CI/CD Automated Test Pipeline'],
          importantQuestions: ['Explain Backpropagation Algorithm in Deep Neural Networks. [10 Marks]', 'Describe CI/CD Pipeline Stages for Containerized Deployments. [10 Marks]'],
        };
      default:
        return {
          title: `Semester ${sem} Portal`,
          subjects: ['Core BCA Subject 1', 'Core BCA Subject 2'],
          notes: ['Unit 1 Verified Notes'],
          pyqs: ['2025 Question Paper'],
          assignments: ['Assignment 1'],
          labs: ['Lab Program 1'],
          importantQuestions: ['Important Question 1'],
        };
    }
  };

  const details = getSemesterDetails(semester);

  const handleSendAi = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuery.trim()) return;

    const userText = aiQuery;
    setAiChat((prev) => [...prev, { sender: 'user', text: userText }]);
    setAiQuery('');

    // Generate contextual AI response
    setTimeout(() => {
      let reply = `Here is the explanation for "${userText}" in Semester ${semester} syllabus context:\n\n1. Core Concept: Focus on step-by-step definition and clear exam diagram.\n2. Key Exam Formula / Code: Make sure to list key parameters clearly.\n3. Repeated Pattern: This topic carries 8 to 10 marks in university end-semester papers.`;
      setAiChat((prev) => [...prev, { sender: 'ai', text: reply }]);
    }, 800);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-10">
      {/* Portal Header */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-10 mb-8 border border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange/20 text-brand-orange border border-brand-orange/30 text-xs font-bold uppercase tracking-wider mb-3">
              <span>Verified Semester Portal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">{details.title}</h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 font-medium">
              Student: <span className="text-white font-bold">{user?.name || 'BCA Student'}</span> • USN: <span className="font-mono text-brand-orange">{user?.usn || '1MV23BC042'}</span> • Dept: <span className="text-white font-bold">{user?.department || 'BCA'}</span>
            </p>
          </div>

          {onBackToMain && (
            <button
              onClick={onBackToMain}
              className="bg-white/10 text-white hover:bg-white/20 px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              <span>Back to Overview</span>
            </button>
          )}
        </div>
      </div>

      {/* Portal Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8 border-b border-slate-200 pb-4">
        <button
          onClick={() => setActiveTab('subjects')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'subjects'
              ? 'bg-brand-orange text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-base">auto_stories</span>
          <span>Subjects ({details.subjects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'notes'
              ? 'bg-brand-orange text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-base">description</span>
          <span>Verified Notes</span>
        </button>

        <button
          onClick={() => setActiveTab('pyq')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'pyq'
              ? 'bg-brand-orange text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-base">history_edu</span>
          <span>2025 Papers</span>
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'assignments'
              ? 'bg-brand-orange text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-base">assignment</span>
          <span>Assignments</span>
        </button>

        <button
          onClick={() => setActiveTab('labs')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'labs'
              ? 'bg-brand-orange text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-base">terminal</span>
          <span>Lab Programs</span>
        </button>

        <button
          onClick={() => setActiveTab('important')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'important'
              ? 'bg-brand-orange text-white shadow-md'
              : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
          }`}
        >
          <span className="material-symbols-outlined text-base">quiz</span>
          <span>Important Qs</span>
        </button>

        <button
          onClick={() => setActiveTab('ai')}
          className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-1.5 ${
            activeTab === 'ai'
              ? 'bg-emerald-600 text-white shadow-md'
              : 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
          }`}
        >
          <span className="material-symbols-outlined text-base">smart_toy</span>
          <span>AI Study Assistant</span>
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'subjects' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {details.subjects.map((subj, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-brand-orange/40 hover:shadow-md transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1">{subj}</h3>
              <p className="text-xs text-slate-500 font-medium mb-4">Core Syllabus Module • Sem {semester}</p>
              <div className="flex items-center justify-between text-xs font-semibold text-brand-orange pt-3 border-t border-slate-100">
                <span>Access Course Content</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'notes' && (
        <div className="space-y-4">
          {details.notes.map((note, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-brand-orange/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">description</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{note}</h4>
                  <p className="text-xs text-slate-500">Verified Academic Lecture Note • PDF / Markdown</p>
                </div>
              </div>
              <button className="bg-slate-100 hover:bg-brand-orange hover:text-white text-slate-800 text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">download</span>
                <span>Download</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'pyq' && (
        <div className="space-y-4">
          {details.pyqs.map((paper, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-brand-orange/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-orange-50 text-brand-orange flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">history_edu</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{paper}</h4>
                  <p className="text-xs text-slate-500">Official End-Semester Examination Paper &amp; Solution Key</p>
                </div>
              </div>
              <button className="bg-brand-orange text-white text-xs font-semibold px-4 py-2 rounded-lg hover:brightness-110 transition-all flex items-center gap-1 shadow-sm">
                <span className="material-symbols-outlined text-sm">visibility</span>
                <span>View Paper</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'assignments' && (
        <div className="space-y-4">
          {details.assignments.map((ass, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-brand-orange/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">assignment</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{ass}</h4>
                  <p className="text-xs text-slate-500">Graded Department Assignment • Deadline Active</p>
                </div>
              </div>
              <button className="bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-slate-800 transition-colors">
                Submit Solution
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'labs' && (
        <div className="space-y-4">
          {details.labs.map((lab, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:border-brand-orange/40 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">terminal</span>
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{lab}</h4>
                  <p className="text-xs text-slate-500">Executable Lab Code &amp; Output Verification</p>
                </div>
              </div>
              <button className="bg-slate-100 hover:bg-indigo-600 hover:text-white text-slate-800 text-xs font-semibold px-4 py-2 rounded-lg transition-colors flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">code</span>
                <span>View Code</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'important' && (
        <div className="space-y-4">
          {details.importantQuestions.map((q, index) => (
            <div key={index} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-orange text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <h4 className="text-sm font-bold text-slate-900">{q}</h4>
                </div>
                <span className="text-[10px] font-bold uppercase bg-orange-50 text-brand-orange px-2.5 py-1 rounded-md border border-orange-100 shrink-0">
                  High Probability
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'ai' && (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-6 max-w-3xl mx-auto">
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
            <span className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
              <span className="material-symbols-outlined">smart_toy</span>
            </span>
            <div>
              <h3 className="text-base font-bold text-slate-900">Examify AI Doubt Solver (Sem {semester})</h3>
              <p className="text-xs text-slate-500">Contextualized for your BCA syllabus and lab programs</p>
            </div>
          </div>

          <div className="h-64 overflow-y-auto space-y-3 p-3 bg-slate-50 rounded-xl mb-4 text-xs">
            {aiChat.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-brand-orange text-white rounded-br-none'
                      : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendAi} className="flex gap-2">
            <input
              type="text"
              placeholder="Ask any doubt regarding syllabus, code, or exam questions..."
              value={aiQuery}
              onChange={(e) => setAiQuery(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-emerald-600"
            />
            <button
              type="submit"
              className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1"
            >
              <span>Ask AI</span>
              <span className="material-symbols-outlined text-sm">send</span>
            </button>
          </form>
        </div>
      )}
    </div>
  );
};
