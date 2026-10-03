import React, { useState } from 'react';
import {
  Search,
  Plus,
  Mail,
  Phone,
  BookOpen,
  GraduationCap,
  Calendar,
  Edit2,
  Trash2,
  UserCheck,
  AlertTriangle
} from 'lucide-react';
import Modal from './Modal';

export default function TeacherManagement({
  teachers,
  classes,
  onSaveTeacher,
  onDeleteTeacher,
  isModalOpen,
  setIsModalOpen
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const departments = ['Mathematics', 'Science', 'Languages', 'Humanities', 'General'];

  // Form State
  const initialForm = {
    name: '',
    email: '',
    phone: '',
    department: 'Mathematics',
    qualification: '',
    status: 'Active',
    assignedClassIds: [],
    subjects: ''
  };
  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setSelectedTeacher(null);
    setFormData(initialForm);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (teacher) => {
    setSelectedTeacher(teacher);
    setFormData({
      name: teacher.name || '',
      email: teacher.email || '',
      phone: teacher.phone || '',
      department: teacher.department || 'Mathematics',
      qualification: teacher.qualification || '',
      status: teacher.status || 'Active',
      assignedClassIds: teacher.assignedClassIds || [],
      subjects: Array.isArray(teacher.subjects) ? teacher.subjects.join(', ') : teacher.subjects || ''
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const subjectsArray = formData.subjects
      ? formData.subjects.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    onSaveTeacher(
      {
        ...formData,
        subjects: subjectsArray
      },
      selectedTeacher ? selectedTeacher.id : null
    );
    setIsModalOpen(false);
  };

  const filteredTeachers = teachers.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.department.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDept = !departmentFilter || t.department === departmentFilter;

    return matchesSearch && matchesDept;
  });

  return (
    <div className="space-y-6">
      {/* Top Filter and Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search teachers by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 focus:outline-none"
            />
          </div>

          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:ring-2 focus:ring-brand-500/20 focus:outline-none"
          >
            <option value="">All Departments</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleOpenAdd}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm shadow-brand-600/20 self-end md:self-auto transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Faculty Member</span>
        </button>
      </div>

      {/* Teachers Grid Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTeachers.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 text-white font-black text-lg flex items-center justify-center shadow-md">
                    {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{t.name}</h3>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                      {t.department}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                    title="Edit Teacher"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(t.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Delete Teacher"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Qualification */}
              <div className="flex items-center gap-2 text-xs text-slate-600 mb-3 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                <GraduationCap className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium truncate">{t.qualification || 'Faculty Staff'}</span>
              </div>

              {/* Contact Info */}
              <div className="space-y-1.5 text-xs text-slate-500 mb-4">
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate">{t.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span className="font-mono">{t.phone || '+1 (555) 000-0000'}</span>
                </div>
              </div>

              {/* Subjects Taught */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block mb-1.5">
                  Subjects Taught
                </span>
                <div className="flex flex-wrap gap-1">
                  {(t.subjects || []).map((sub, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-100"
                    >
                      {sub}
                    </span>
                  ))}
                  {(!t.subjects || t.subjects.length === 0) && (
                    <span className="text-xs text-slate-400 italic">None assigned</span>
                  )}
                </div>
              </div>
            </div>

            {/* Assigned Classes footer */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                {t.assignedClassNames?.length || 0} Assigned Class(es)
              </span>
              <span className="text-[11px] text-slate-400">Since {t.joiningDate ? t.joiningDate.slice(0, 4) : '2022'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Teacher Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedTeacher ? 'Edit Faculty Member' : 'Add New Faculty Member'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Dr. Evelyn Marcus"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department *</label>
              <select
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                {departments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="teacher@apexacademy.edu"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Academic Qualifications</label>
              <input
                type="text"
                value={formData.qualification}
                onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                placeholder="e.g. Ph.D. in Applied Mathematics"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subjects (Comma separated)</label>
              <input
                type="text"
                value={formData.subjects}
                onChange={(e) => setFormData({ ...formData, subjects: e.target.value })}
                placeholder="e.g. Advanced Calculus, Linear Algebra"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-2">Assigned Class Cohorts</label>
              <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200">
                {classes.map((c) => {
                  const isChecked = formData.assignedClassIds.includes(c.id);
                  return (
                    <label key={c.id} className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({ ...formData, assignedClassIds: [...formData.assignedClassIds, c.id] });
                          } else {
                            setFormData({
                              ...formData,
                              assignedClassIds: formData.assignedClassIds.filter((id) => id !== c.id)
                            });
                          }
                        }}
                        className="rounded text-brand-600 focus:ring-brand-500"
                      />
                      <span>{c.name}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm shadow-brand-600/20"
            >
              {selectedTeacher ? 'Update Profile' : 'Add Faculty Member'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Remove Faculty Member"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800">
            <AlertTriangle className="w-6 h-6 shrink-0 text-rose-600" />
            <p className="text-xs font-medium">
              Are you sure you want to remove this faculty record? They will also be unassigned from their respective classes.
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setDeletingId(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDeleteTeacher(deletingId);
                setDeletingId(null);
              }}
              className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold"
            >
              Confirm Removal
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

