import React from 'react';
import { Calendar, Plus, User, Shield } from 'lucide-react';

export default function Header({ currentTab, onQuickAdd }) {
  const titles = {
    dashboard: { title: 'Academic Dashboard', subtitle: 'Overview of school operations, student enrollment, and metrics' },
    students: { title: 'Student Directory', subtitle: 'Manage student admissions, profiles, and academic records' },
    teachers: { title: 'Faculty & Teachers', subtitle: 'Directory of academic staff, qualifications, and class assignments' },
    classes: { title: 'Classes & Curriculum', subtitle: 'Classrooms, course allocations, and capacity tracking' },
    attendance: { title: 'Attendance Register', subtitle: 'Record and track student daily attendance and absence logs' }
  };

  const current = titles[currentTab] || titles.dashboard;

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <header className="bg-white border-b border-slate-200 px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sticky top-0 z-10">
      <div>
        <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{current.title}</h1>
        <p className="text-xs text-slate-500 mt-0.5">{current.subtitle}</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Date badge */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-slate-600 text-xs font-medium border border-slate-200/60">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{today}</span>
          <span className="w-1 h-1 rounded-full bg-slate-400"></span>
          <span className="text-brand-600 font-semibold">Term 2</span>
        </div>

        {/* Quick Add Button if applicable */}
        {onQuickAdd && (
          <button
            onClick={onQuickAdd}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-brand-600 hover:bg-brand-700 text-white rounded-lg text-xs font-semibold shadow-sm shadow-brand-600/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>
              {currentTab === 'students' && 'New Student'}
              {currentTab === 'teachers' && 'New Teacher'}
              {currentTab === 'classes' && 'New Class'}
              {currentTab === 'attendance' && 'Mark Attendance'}
              {currentTab === 'dashboard' && 'Quick Enroll'}
            </span>
          </button>
        )}

        {/* Admin profile */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-semibold text-xs">
            AD
          </div>
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-800 leading-tight">Admin Portal</p>
            <p className="text-[10px] text-emerald-600 font-medium flex items-center gap-1">
              <Shield className="w-2.5 h-2.5" /> Full Access
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

