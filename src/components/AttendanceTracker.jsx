import React, { useState, useEffect } from 'react';
import {
  CalendarCheck,
  Check,
  Clock,
  X,
  FileQuestion,
  Save,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';

export default function AttendanceTracker({
  classes,
  students,
  attendanceRecords,
  onSaveAttendance
}) {
  const [selectedClassId, setSelectedClassId] = useState(classes[0]?.id || '');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [studentStatuses, setStudentStatuses] = useState({});
  const [isSaved, setIsSaved] = useState(false);

  // Get enrolled students for the selected class
  const classStudents = students.filter((s) => s.classId === selectedClassId);

  // Sync statuses from existing attendance records or default to "Present"
  useEffect(() => {
    const existing = attendanceRecords.find(
      (a) => a.date === selectedDate && a.classId === selectedClassId
    );

    const initial = {};
    classStudents.forEach((s) => {
      const recorded = existing?.records?.find((r) => r.studentId === s.id);
      initial[s.id] = recorded ? recorded.status : 'Present';
    });

    setStudentStatuses(initial);
    setIsSaved(false);
  }, [selectedClassId, selectedDate, attendanceRecords, students]);

  const handleStatusChange = (studentId, status) => {
    setStudentStatuses((prev) => ({
      ...prev,
      [studentId]: status
    }));
    setIsSaved(false);
  };

  const handleMarkAll = (status) => {
    const updated = {};
    classStudents.forEach((s) => {
      updated[s.id] = status;
    });
    setStudentStatuses(updated);
    setIsSaved(false);
  };

  const handleSave = () => {
    const records = Object.entries(studentStatuses).map(([studentId, status]) => ({
      studentId,
      status
    }));

    onSaveAttendance({
      date: selectedDate,
      classId: selectedClassId,
      records
    });
    setIsSaved(true);
  };

  // Metrics
  const totalCount = classStudents.length;
  const presentCount = Object.values(studentStatuses).filter((st) => st === 'Present').length;
  const lateCount = Object.values(studentStatuses).filter((st) => st === 'Late').length;
  const absentCount = Object.values(studentStatuses).filter((st) => st === 'Absent').length;
  const excusedCount = Object.values(studentStatuses).filter((st) => st === 'Excused').length;
  const attendanceRate = totalCount > 0 ? Math.round(((presentCount + lateCount) / totalCount) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs">
            <Calendar className="w-4 h-4 text-slate-400" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent text-slate-800 font-semibold focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-2 rounded-xl text-xs">
            <Layers className="w-4 h-4 text-slate-400" />
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="bg-transparent text-slate-800 font-semibold focus:outline-none"
            >
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={() => handleMarkAll('Present')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Mark All Present</span>
          </button>

          <button
            onClick={handleSave}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
              isSaved
                ? 'bg-emerald-600 text-white shadow-emerald-600/20'
                : 'bg-brand-600 hover:bg-brand-700 text-white shadow-brand-600/20'
            }`}
          >
            {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            <span>{isSaved ? 'Attendance Saved' : 'Save Register'}</span>
          </button>
        </div>
      </div>

      {/* Attendance Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-sm text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total Roster</span>
          <p className="text-xl font-extrabold text-slate-900 mt-0.5">{totalCount}</p>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Present</span>
          <p className="text-xl font-extrabold text-emerald-700 mt-0.5">{presentCount}</p>
        </div>
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">Late</span>
          <p className="text-xl font-extrabold text-amber-700 mt-0.5">{lateCount}</p>
        </div>
        <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600">Absent</span>
          <p className="text-xl font-extrabold text-rose-700 mt-0.5">{absentCount}</p>
        </div>
        <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 text-center col-span-2 sm:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600">Rate</span>
          <p className="text-xl font-extrabold text-purple-700 mt-0.5">{attendanceRate}%</p>
        </div>
      </div>

      {/* Register Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Daily Attendance Roll Call
          </h3>
          <span className="text-xs text-slate-400">
            Click status to mark individually
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 pl-6">Student</th>
                <th className="py-3.5 px-4">Adm #</th>
                <th className="py-3.5 px-4 text-center">Attendance Status</th>
                <th className="py-3.5 pr-6 text-right">Remarks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {classStudents.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-12 text-center text-slate-400">
                    No students currently enrolled in this class cohort.
                  </td>
                </tr>
              ) : (
                classStudents.map((s) => {
                  const status = studentStatuses[s.id] || 'Present';
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 pl-6">
                        <div className="font-bold text-slate-900">{s.name}</div>
                        <div className="text-xs text-slate-400">{s.gender}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-slate-600">
                        {s.admissionNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.id, 'Present')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              status === 'Present'
                                ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            <Check className="w-3.5 h-3.5" /> Present
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.id, 'Late')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              status === 'Late'
                                ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            <Clock className="w-3.5 h-3.5" /> Late
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.id, 'Absent')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              status === 'Absent'
                                ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            <X className="w-3.5 h-3.5" /> Absent
                          </button>

                          <button
                            type="button"
                            onClick={() => handleStatusChange(s.id, 'Excused')}
                            className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                              status === 'Excused'
                                ? 'bg-purple-600 text-white shadow-sm shadow-purple-600/30'
                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                            }`}
                          >
                            <FileQuestion className="w-3.5 h-3.5" /> Excused
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 pr-6 text-right text-xs text-slate-400">
                        {status === 'Present' && 'On-time arrival'}
                        {status === 'Late' && 'Tardy note checked'}
                        {status === 'Absent' && 'Guardian notified'}
                        {status === 'Excused' && 'Medical note on file'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

