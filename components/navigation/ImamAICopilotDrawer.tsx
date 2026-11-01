'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  X,
  Send,
  Bot,
  User,
  ShieldAlert,
  HeartPulse,
  DollarSign,
  Award,
  ChevronRight,
  Database,
  Languages,
} from 'lucide-react';
import { askImamCopilot } from '@/app/actions/copilot';
import { ImamCrestLogo } from '@/components/brand/ImamCrestLogo';

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  source?: 'gemini' | 'deterministic';
  timestamp: string;
}

interface ImamAICopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentLang?: 'en' | 'ur' | 'sd';
}

export const ImamAICopilotDrawer: React.FC<ImamAICopilotDrawerProps> = ({
  isOpen,
  onClose,
  currentLang = 'en',
}) => {
  const [lang, setLang] = useState<'en' | 'ur' | 'sd'>(currentLang);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'assistant',
      text: `السلام علیکم! I am the **Imam AI Copilot**, your real-time academic & clinical assistant grounded in the live SQLite database.

How can I assist you today? You can tap any of the quick radar checks below or type your inquiry.`,
      source: 'deterministic',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLang(currentLang);
  }, [currentLang]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsLoading(true);

    try {
      const res = await askImamCopilot(query, lang);
      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: res.text,
        source: res.source,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: 'Unable to connect to database engine. Please try again.',
          source: 'deterministic',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickChips = [
    {
      label: '⚠️ Attendance Danger Radar',
      query: 'List all students in the PNC 85%-87% danger zone or barred',
      icon: ShieldAlert,
    },
    {
      label: '🏥 Live Triage & Student Pairing',
      query: 'What is the current triage queue status at Imam Medical Center?',
      icon: HeartPulse,
    },
    {
      label: '💰 Cash Vault & Fees Recovery',
      query: 'Show me today cash in hand and monthly fee collections',
      icon: DollarSign,
    },
    {
      label: '🩺 Faculty License Compliance',
      query: 'Are there any faculty or preceptor licenses expiring within 30 days?',
      icon: Award,
    },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-Over Drawer */}
      <div
        data-testid="imam-copilot-drawer"
        className="relative z-10 w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-200"
      >
        {/* Drawer Header */}
        <div className="p-4 bg-gradient-to-r from-imam-navy via-[#004f91] to-imam-navy text-white flex items-center justify-between border-b border-white/10 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/10 p-1 flex items-center justify-center border border-white/20">
              <Sparkles size={18} className="text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-black text-sm text-white tracking-tight">Imam AI Copilot</h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[9px] font-bold px-1.5 py-0.2 rounded border border-emerald-400/30 flex items-center gap-1">
                  <Database size={8} /> Live DB
                </span>
              </div>
              <p className="text-[10px] text-sky-200">
                Hybrid Intelligence • Deterministic + Gemini 2.5 Flash
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Lang switcher */}
            <div className="bg-black/20 p-0.5 rounded-lg flex items-center text-[10px] font-bold border border-white/10">
              <button
                onClick={() => setLang('en')}
                className={`px-1.5 py-0.5 rounded ${lang === 'en' ? 'bg-imam-blue text-white' : 'text-slate-300'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('ur')}
                className={`px-1.5 py-0.5 rounded font-urdu ${lang === 'ur' ? 'bg-imam-blue text-white' : 'text-slate-300'}`}
              >
                اردو
              </button>
              <button
                onClick={() => setLang('sd')}
                className={`px-1.5 py-0.5 rounded font-sindhi ${lang === 'sd' ? 'bg-imam-blue text-white' : 'text-slate-300'}`}
              >
                سنڌي
              </button>
            </div>

            <button
              onClick={onClose}
              data-testid="close-copilot-btn"
              className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Quick Intelligence Chips */}
        <div className="p-3 bg-slate-50 border-b border-slate-200 overflow-x-auto no-scrollbar shrink-0">
          <div className="flex gap-2">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(chip.query)}
                className="whitespace-nowrap px-2.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-[11px] font-bold text-slate-700 shadow-2xs flex items-center gap-1.5 transition active:scale-95"
              >
                <chip.icon size={12} className="text-imam-blue shrink-0" />
                <span>{chip.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/50">
          {messages.map((m) => {
            const isUser = m.sender === 'user';
            const isRtl = lang === 'ur' || lang === 'sd';

            return (
              <div
                key={m.id}
                className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-7 h-7 rounded-lg bg-imam-navy text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                    <Bot size={14} className="text-amber-300" />
                  </div>
                )}

                <div
                  className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed shadow-2xs ${
                    isUser
                      ? 'bg-imam-blue text-white rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200/90 rounded-tl-xs'
                  }`}
                >
                  <div
                    className={`whitespace-pre-line font-sans ${
                      !isUser && isRtl ? 'font-urdu text-right text-sm' : ''
                    }`}
                  >
                    {m.text}
                  </div>

                  <div
                    className={`mt-1.5 flex items-center justify-between text-[9px] ${
                      isUser ? 'text-blue-100' : 'text-slate-400'
                    }`}
                  >
                    <span>{m.timestamp}</span>
                    {m.source && (
                      <span className="font-mono uppercase font-semibold text-[8px] bg-slate-100 px-1 py-0.2 rounded text-slate-600">
                        {m.source === 'gemini' ? 'Gemini 2.5 Flash' : 'Clinical Deterministic'}
                      </span>
                    )}
                  </div>
                </div>

                {isUser && (
                  <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
                    <User size={14} />
                  </div>
                )}
              </div>
            );
          })}

          {isLoading && (
            <div className="flex gap-2.5 items-center text-xs text-slate-500 bg-white p-3 rounded-2xl border border-slate-200 max-w-[70%]">
              <Sparkles size={14} className="text-amber-500 animate-spin" />
              <span>Analyzing live database state...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="p-3 bg-white border-t border-slate-200 shrink-0"
        >
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === 'ur'
                  ? 'کیمپس یا ہسپتال کے بارے میں سوال پوچھیں...'
                  : lang === 'sd'
                  ? 'ڪيمپس يا اسپتال بابت سوال پڇو...'
                  : 'Ask about cash, attendance, triage, or licenses...'
              }
              data-testid="copilot-input"
              className="flex-1 bg-slate-100 text-slate-900 placeholder:text-slate-400 text-xs rounded-xl px-3.5 py-2.5 border border-slate-200 focus:outline-none focus:border-imam-blue"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              data-testid="copilot-send-btn"
              className="bg-imam-blue hover:bg-imam-navy disabled:opacity-40 text-white p-2.5 rounded-xl shadow-xs transition active:scale-95"
            >
              <Send size={15} />
            </button>
          </div>
          <div className="mt-1.5 flex items-center justify-between text-[10px] text-slate-400 px-1">
            <span>Press Enter to send</span>
            <span>Shortcut: <kbd className="font-mono bg-slate-100 px-1 rounded border border-slate-200">Ctrl+I</kbd></span>
          </div>
        </form>
      </div>
    </div>
  );
};
