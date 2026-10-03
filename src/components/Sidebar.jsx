import React from 'react';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  UserCheck,
  BookOpen,
  CalendarCheck,
  Database,
  ChevronRight
} from 'lucide-react';

export default function Sidebar({ currentTab, setCurrentTab, onResetDemo, stats }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
    { id: 'students', label: 'Students', icon: Users, badge: stats?.totalStudents },
    { id: 'teachers', label: 'Teachers', icon: UserCheck, badge: stats?.totalTeachers },
    { id: 'classes', label: 'Classes & Courses', icon: BookOpen, badge: stats?.totalClasses },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck, badge: null },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-6 border-b border-slate-800/80 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-white font-bold text-base tracking-tight leading-tight">Apex Academy</h1>
          <p className="text-xs text-slate-400 font-medium">Management Portal</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="px-3 py-6 flex-1 space-y-1">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Main Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-150 ${
                isActive
                  ? 'bg-brand-600 text-white shadow-md shadow-brand-600/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && item.badge !== null ? (
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                    isActive ? 'bg-brand-700 text-white' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {item.badge}
                </span>
              ) : (
                isActive && <ChevronRight className="w-3.5 h-3.5 text-white/70" />
              )}
            </button>
          );
        })}
      </div>

      {/* Quick Database / Demo Reset Actions */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/40">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
          <span>System Storage</span>
          <span className="text-emerald-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            Synced
          </span>
        </div>
        <button
          onClick={onResetDemo}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors border border-slate-700/60"
        >
          <Database className="w-3.5 h-3.5 text-slate-400" />
          <span>Reset Demo Data</span>
        </button>
      </div>
    </aside>
  );
}

