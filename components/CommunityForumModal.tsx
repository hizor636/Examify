'use client';

import React, { useState } from 'react';
import { useAuth } from '../src/context/AuthContext';

interface ForumPost {
  id: string;
  author: string;
  usn: string;
  semester: number;
  subject: string;
  title: string;
  content: string;
  upvotes: number;
  replies: { author: string; text: string; time: string }[];
  time: string;
}

interface CommunityForumModalProps {
  isOpen: boolean;
  onClose: () => void;
  semester: number;
}

export const CommunityForumModal: React.FC<CommunityForumModalProps> = ({
  isOpen,
  onClose,
  semester,
}) => {
  const { user } = useAuth();
  const [posts, setPosts] = useState<ForumPost[]>([
    {
      id: 'p1',
      author: 'Aarav Sharma',
      usn: '1NC22CS014',
      semester: 4,
      subject: 'Full-Stack Web Dev',
      title: 'How does React Virtual DOM handle diffing performance during list re-renders?',
      content: 'I get confused between keys in React lists and how virtual DOM computes minimal patches. Any simple analogy?',
      upvotes: 12,
      replies: [
        { author: 'Priya N.', text: 'Think of keys like unique roll numbers! Without keys, React inspects every row. With keys, it skips untouched rows.', time: '2 hours ago' },
      ],
      time: '4 hours ago',
    },
    {
      id: 'p2',
      author: 'Kavya R.',
      usn: '1NC22CS089',
      semester: 1,
      subject: 'Problem Solving using C',
      title: 'When to use malloc vs calloc in exam lab code?',
      content: 'In end-sem lab exams, do we get marks deducted if we use malloc instead of calloc for arrays?',
      upvotes: 8,
      replies: [],
      time: '1 day ago',
    },
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newSubject, setNewSubject] = useState('General BCA Discussion');
  const [replyText, setReplyText] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newP: ForumPost = {
      id: 'p_' + Date.now(),
      author: user?.name || 'Student',
      usn: user?.usn || '1NC22CS123',
      semester: semester,
      subject: newSubject,
      title: newTitle,
      content: newContent,
      upvotes: 1,
      replies: [],
      time: 'Just now',
    };

    setPosts([newP, ...posts]);
    setNewTitle('');
    setNewContent('');
  };

  const handleUpvote = (id: string) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, upvotes: p.upvotes + 1 } : p))
    );
  };

  const handleAddReply = (postId: string) => {
    const text = replyText[postId];
    if (!text || !text.trim()) return;

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              replies: [
                ...p.replies,
                { author: user?.name || 'Student', text, time: 'Just now' },
              ],
            }
          : p
      )
    );

    setReplyText((prev) => ({ ...prev, [postId]: '' }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-3xl w-full p-6 sm:p-8 relative overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-xs font-bold uppercase tracking-wider mb-1">
              <span className="material-symbols-outlined text-sm">forum</span>
              <span>BCA Student Community &amp; Doubt Exchange</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">Peer Discussion Forum</h3>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Forum Body */}
        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Ask Question Form */}
          <form onSubmit={handleCreatePost} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <span className="material-symbols-outlined text-brand-orange text-base">add_comment</span>
              <span>Post a Question or Doubt</span>
            </h4>

            <input
              type="text"
              required
              placeholder="Question Title (e.g. Differentiate 3NF vs BCNF)..."
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-orange"
            />

            <textarea
              required
              rows={2}
              placeholder="Describe your doubt in detail..."
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:outline-none focus:border-brand-orange"
            />

            <div className="flex justify-between items-center">
              <select
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-white focus:outline-none"
              >
                <option value="General BCA Discussion">General Discussion</option>
                <option value="Problem Solving using C">C Programming</option>
                <option value="Data Structures & Algorithms">Data Structures</option>
                <option value="DBMS & SQL">DBMS &amp; SQL</option>
                <option value="Full-Stack Web Dev">Full-Stack Web Dev</option>
              </select>

              <button
                type="submit"
                className="bg-brand-orange text-white px-5 py-2 rounded-xl text-xs font-bold btn-primary-glow flex items-center gap-1"
              >
                <span>Post Doubt</span>
                <span className="material-symbols-outlined text-sm">send</span>
              </button>
            </div>
          </form>

          {/* Posts Feed */}
          <div className="space-y-4">
            {posts.map((post) => (
              <div key={post.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-xs text-slate-900">{post.author}</span>
                      <span className="font-mono text-[10px] text-slate-400">({post.usn})</span>
                      <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-semibold">
                        Sem {post.semester} • {post.subject}
                      </span>
                    </div>
                    <h5 className="font-bold text-slate-900 text-sm">{post.title}</h5>
                  </div>
                  <span className="text-[10px] text-slate-400 shrink-0">{post.time}</span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">{post.content}</p>

                {/* Upvotes & Replies Counter */}
                <div className="flex items-center gap-4 pt-2 border-t border-slate-100 text-xs">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="flex items-center gap-1 font-bold text-brand-orange hover:bg-orange-50 px-2.5 py-1 rounded-lg transition-colors"
                  >
                    <span className="material-symbols-outlined text-sm">thumb_up</span>
                    <span>{post.upvotes} Upvotes</span>
                  </button>

                  <span className="text-slate-400 font-medium">{post.replies.length} Replies</span>
                </div>

                {/* Replies Thread */}
                {post.replies.length > 0 && (
                  <div className="space-y-2 bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs">
                    {post.replies.map((r, ri) => (
                      <div key={ri} className="border-b border-slate-200/60 pb-2 last:border-none last:pb-0">
                        <span className="font-bold text-slate-900">{r.author}: </span>
                        <span className="text-slate-700">{r.text}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Add Reply */}
                <div className="flex gap-2 pt-1">
                  <input
                    type="text"
                    placeholder="Write a reply..."
                    value={replyText[post.id] || ''}
                    onChange={(e) => setReplyText({ ...replyText, [post.id]: e.target.value })}
                    className="flex-1 px-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:outline-none focus:border-brand-orange"
                  />
                  <button
                    onClick={() => handleAddReply(post.id)}
                    className="bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-900"
                  >
                    Reply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 mt-4 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 font-bold text-xs"
          >
            Close Community Forum
          </button>
        </div>
      </div>
    </div>
  );
};
