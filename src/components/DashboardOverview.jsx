import React from 'react';
import {
  Users,
  UserCheck,
  BookOpen,
  TrendingUp,
  ArrowUpRight,
  PlusCircle,
  CalendarCheck,
  Award
} from 'lucide-react';

export default function DashboardOverview({ stats, classes, students, teachers, onNavigate, onOpenStudentModal }) {
  const statCards = [
    {
      title: 'Enrolled Students',
      value: stats?.totalStudents || 0,
      subtext: `${stats?.activeStudents || 0} currently active`,
      icon: Users,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      badge: '+12% this term'
    },
    {
      title: 'Faculty Members',
      value: stats?.totalTeachers || 0,
      subtext: 'Across 4 academic departments',
      icon: UserCheck,
      color: 'bg-emerald-500',
      textColor: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      badge: 'Full Staff'
    },
    {
      title: 'Active Classrooms',
      value: stats?.totalClasses || 0,
      subtext: `${classes?.length || 0} cohorts assigned`,
      icon: BookOpen,
      color: 'bg-indigo-500',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      badge: 'Capacity 92%'
    },
    {
      title: 'Average Attendance',
      value: `${stats?.avgAttendance || 95}%`,
      subtext: 'Calculated across all grades',
      icon: TrendingUp,
      color: 'bg-amber-500',
      textColor: 'text-amber-600',
      bgColor: 'bg-amber-50',
      badge: 'Exceeding target'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl ${card.bgColor} ${card.textColor} flex items-center justify-center font-bold`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 flex items-center gap-0.5">
                  <ArrowUpRight className="w-3 h-3" />
                  {card.badge}
                </span>
              </div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{card.title}</p>
              <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{card.value}</h3>
              <p className="text-xs text-slate-400 mt-1">{card.subtext}</p>
            </div>
          );
        })}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Enrollment & Capacity Breakdown */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-base font-bold text-slate-900">Class Cohorts & Capacity</h3>
              <p className="text-xs text-slate-500">Student enrollment against room capacities</p>
            </div>
            <button
              onClick={() => onNavigate('classes')}
              className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
            >
              View all classes <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-4">
            {classes.map((cls) => {
              const count = students.filter(s => s.classId === cls.id).length;
              const capacity = cls.capacity || 35;
              const percentage = Math.min(100, Math.round((count / capacity) * 100));

              return (
                <div key={cls.id} className="p-4 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 transition-colors">
                  <div className="flex items-center justify-between text-sm mb-2 font-medium">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-800">{cls.name}</span>
                      <span className="text-xs px-2 py-0.5 bg-slate-200/70 text-slate-600 rounded-md font-medium">
                        {cls.roomNumber}
                      </span>
                    </div>
                    <div className="text-xs font-semibold text-slate-600">
                      <span className="text-brand-600 font-bold">{count}</span> / {capacity} Enrolled ({percentage}%)
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percentage > 90 ? 'bg-amber-500' : 'bg-brand-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between mt-2 text-[11px] text-slate-400">
                    <span>Teacher: {cls.classTeacherName || 'Assigned'}</span>
                    <span>Section: {cls.section}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions & School Highlights */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
            <h3 className="text-base font-bold text-slate-900 mb-3">Quick Operations</h3>
            <p className="text-xs text-slate-500 mb-4">Common administrative workflows</p>
            
            <div className="space-y-2.5">
              <button
                onClick={onOpenStudentModal}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-brand-100 bg-brand-50/60 hover:bg-brand-50 text-brand-900 font-medium text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <PlusCircle className="w-4 h-4 text-brand-600" />
                  <span>Enroll New Student</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-brand-600" />
              </button>

              <button
                onClick={() => onNavigate('attendance')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-medium text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  <span>Mark Today's Attendance</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </button>

              <button
                onClick={() => onNavigate('teachers')}
                className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-800 font-medium text-xs transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <UserCheck className="w-4 h-4 text-indigo-600" />
                  <span>Assign Faculty to Class</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </button>
            </div>
          </div>

          {/* Academic Highlights */}
          <div className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white p-6 rounded-2xl shadow-sm relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/30 flex items-center justify-center text-indigo-300 mb-3">
                <Award className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold">Academic Performance Target</h4>
              <p className="text-xs text-indigo-200 mt-1">
                Apex Academy is currently tracking at an average 96.5% attendance and full faculty retention this semester.
              </p>
            </div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-brand-500/10 blur-xl pointer-events-none"></div>
          </div>
        </div>
      </div>

      {/* Recent Enrolled Students Preview */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Student Admissions</h3>
            <p className="text-xs text-slate-500">Newly registered students and active rosters</p>
          </div>
          <button
            onClick={() => onNavigate('students')}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1"
          >
            Manage all students <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="pb-3 pl-2">Student</th>
                <th className="pb-3">Adm No.</th>
                <th className="pb-3">Assigned Class</th>
                <th className="pb-3">Guardian</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right pr-2">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {students.slice(0, 5).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3 pl-2">
                    <div className="font-semibold text-slate-900">{s.name}</div>
                    <div className="text-[11px] text-slate-400">{s.email || 'No email registered'}</div>
                  </td>
                  <td className="py-3 font-mono text-xs text-slate-600">{s.admissionNumber}</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded-md text-xs font-medium bg-slate-100 text-slate-700">
                      {s.className}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-slate-600">
                    <div>{s.guardianName}</div>
                    <div className="text-[11px] text-slate-400">{s.guardianPhone}</div>
                  </td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-100">
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3 text-right pr-2 font-semibold text-slate-800 text-xs">
                    {s.attendanceRate || 95}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

