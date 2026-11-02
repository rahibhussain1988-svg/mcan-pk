'use client';

import React, { useState, useEffect } from 'react';
import { Search, Command, X, ArrowRight, LayoutDashboard, Banknote, Receipt, HeartPulse, User, FileText, Users, GraduationCap, BookOpen, Boxes, Stethoscope, ShieldCheck } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTab: (tabId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectTab,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open palette
        }
      } else if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const items = [
    { id: 'owner', title: 'Owner Executive Command Suite', category: 'Finance', icon: LayoutDashboard },
    { id: 'academics', title: 'Curriculum, Syllabi & Exam Grading', category: 'Academic', icon: GraduationCap },
    { id: 'finance', title: 'Double-Entry General Ledger (COA & Trial Balance)', category: 'Finance', icon: BookOpen },
    { id: 'fees', title: 'Fast-Cashier Fee Collection Desk', category: 'Finance', icon: Banknote },
    { id: 'expenses', title: 'Smart Expenses & Vendor Ledger', category: 'Finance', icon: Receipt },
    { id: 'inventory', title: 'Central Stores, Stock & GRN Receipts', category: 'Operations', icon: Boxes },
    { id: 'clinical', title: 'IMC Hospital Clinical Governance & Preceptorship', category: 'Hospital', icon: Stethoscope },
    { id: 'triage', title: 'Emergency Patient Triage (NEWS2/ESI)', category: 'Hospital', icon: HeartPulse },
    { id: 'student', title: 'Student Portal & PNC Logbook', category: 'Academic', icon: User },
    { id: 'drafting', title: 'Official Correspondence Drafting Studio', category: 'Registry', icon: FileText },
    { id: 'hr', title: 'HR, Staff & PKR Payroll Engine', category: 'HR', icon: Users },
    { id: 'audit', title: 'Regulatory Audit Trail & Compliance Log', category: 'Governance', icon: ShieldCheck },
    { id: 'profile', title: 'Profile & PWA Preferences', category: 'Settings', icon: User },
  ];

  const filtered = items.filter(
    (i) =>
      i.title.toLowerCase().includes(query.toLowerCase()) ||
      i.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <div className="p-3.5 border-b border-slate-200 flex items-center gap-3">
          <Search size={18} className="text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Type a command or module name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-sm font-sans focus:outline-none text-slate-800"
            autoFocus
          />
          <kbd className="hidden sm:inline-block bg-slate-100 text-slate-500 font-mono text-[10px] px-1.5 py-0.5 rounded border border-slate-200">
            ESC
          </kbd>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-72 overflow-y-auto p-2 space-y-1">
          {filtered.length === 0 ? (
            <div className="text-center py-6 text-xs text-slate-400">No results found</div>
          ) : (
            filtered.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onSelectTab(item.id);
                    onClose();
                  }}
                  className="w-full text-left p-2.5 rounded-xl hover:bg-slate-100 flex items-center justify-between transition group text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-slate-100 group-hover:bg-imam-blue group-hover:text-white transition text-slate-600">
                      <Icon size={16} />
                    </div>
                    <div>
                      <strong className="block text-slate-800 group-hover:text-imam-blue">
                        {item.title}
                      </strong>
                      <span className="text-[10px] text-slate-400 uppercase font-bold">
                        {item.category}
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={14} className="text-slate-400 group-hover:text-imam-blue" />
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
