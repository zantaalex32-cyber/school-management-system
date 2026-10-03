import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Users,
  DoorOpen,
  UserCheck,
  Edit2,
  Trash2,
  Bookmark,
  Layers,
  AlertTriangle
} from 'lucide-react';
import Modal from './Modal';

export default function ClassManagement({
  classes,
  students,
  teachers,
  subjects,
  onSaveClass,
  onDeleteClass,
  onSaveSubject,
  onDeleteSubject,
  isClassModalOpen,
  setIsClassModalOpen
}) {
  const [activeSubTab, setActiveSubTab] = useState('classes'); // 'classes' | 'subjects'
  const [selectedClass, setSelectedClass] = useState(null);
  const [deletingClassId, setDeletingClassId] = useState(null);

  // Subject Modal State
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [subjectForm, setSubjectForm] = useState({
    title: '',
    code: '',
    department: 'Science',
    credits: 3,
    teacherId: ''
  });

  // Class Form State
  const initialClassForm = {
    name: '',
    gradeLevel: '10',
    section: 'A',
    roomNumber: '',
    capacity: 35,
    classTeacherId: '',
    description: ''
  };
  const [classForm, setClassForm] = useState(initialClassForm);

  const handleOpenAddClass = () => {
    setSelectedClass(null);
    setClassForm({
      ...initialClassForm,
      classTeacherId: teachers[0]?.id || ''
    });
    setIsClassModalOpen(true);
  };

  const handleOpenEditClass = (cls) => {
    setSelectedClass(cls);
    setClassForm({
      name: cls.name || '',
      gradeLevel: cls.gradeLevel || '10',
      section: cls.section || 'A',
      roomNumber: cls.roomNumber || '',
      capacity: cls.capacity || 35,
      classTeacherId: cls.classTeacherId || '',
      description: cls.description || ''
    });
    setIsClassModalOpen(true);
  };

  const handleClassSubmit = (e) => {
    e.preventDefault();
    if (!classForm.name.trim()) return;
    onSaveClass(classForm, selectedClass ? selectedClass.id : null);
    setIsClassModalOpen(false);
  };

  const handleSubjectSubmit = (e) => {
    e.preventDefault();
    if (!subjectForm.title.trim()) return;
    onSaveSubject(subjectForm);
    setIsSubjectModalOpen(false);
    setSubjectForm({ title: '', code: '', department: 'Science', credits: 3, teacherId: '' });
  };

  return (
    <div className="space-y-6">
      {/* Tab Switcher & Action Header */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl w-fit">
          <button
            onClick={() => setActiveSubTab('classes')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'classes'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4 text-brand-600" />
            <span>Class Cohorts ({classes.length})</span>
          </button>
          <button
            onClick={() => setActiveSubTab('subjects')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeSubTab === 'subjects'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Bookmark className="w-4 h-4 text-indigo-600" />
            <span>Subjects & Curriculum ({subjects.length})</span>
          </button>
        </div>

        {activeSubTab === 'classes' ? (
          <button
            onClick={handleOpenAddClass}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm shadow-brand-600/20 self-end sm:self-auto transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create Class</span>
          </button>
        ) : (
          <button
            onClick={() => setIsSubjectModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm shadow-indigo-600/20 self-end sm:self-auto transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Course / Subject</span>
          </button>
        )}
      </div>

      {/* Classes Subtab */}
      {activeSubTab === 'classes' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {classes.map((cls) => {
            const enrolledCount = students.filter((s) => s.classId === cls.id).length;
            const teacher = teachers.find((t) => t.id === cls.classTeacherId);
            const capacity = cls.capacity || 35;
            const percentFilled = Math.min(100, Math.round((enrolledCount / capacity) * 100));

            return (
              <div
                key={cls.id}
                className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded-md">
                        Grade {cls.gradeLevel} • Section {cls.section}
                      </span>
                      <h3 className="font-extrabold text-slate-900 text-base mt-1.5">{cls.name}</h3>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenEditClass(cls)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                        title="Edit Class"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingClassId(cls.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Delete Class"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-slate-500 mb-4 line-clamp-2">
                    {cls.description || 'Standard high school academic curriculum stream.'}
                  </p>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <DoorOpen className="w-4 h-4 text-slate-400" /> Room
                      </span>
                      <span className="font-bold text-slate-800">{cls.roomNumber || 'Room TBA'}</span>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      <span className="flex items-center gap-1.5">
                        <UserCheck className="w-4 h-4 text-slate-400" /> Class Head
                      </span>
                      <span className="font-bold text-slate-800 truncate max-w-[130px]">
                        {teacher ? teacher.name : 'Unassigned'}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" /> Enrolled
                    </span>
                    <span className="text-slate-800">
                      <strong className="text-brand-600">{enrolledCount}</strong> / {capacity} Students
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        percentFilled > 90 ? 'bg-amber-500' : 'bg-brand-500'
                      }`}
                      style={{ width: `${percentFilled}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Subjects Subtab */}
      {activeSubTab === 'subjects' && (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
              Course Catalog & Academic Offerings
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 pl-6">Course Code</th>
                  <th className="py-3.5 px-4">Subject Title</th>
                  <th className="py-3.5 px-4">Department</th>
                  <th className="py-3.5 px-4">Credits</th>
                  <th className="py-3.5 px-4">Assigned Instructor</th>
                  <th className="py-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {subjects.map((sub) => {
                  const teacher = teachers.find((t) => t.id === sub.teacherId);
                  return (
                    <tr key={sub.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 pl-6 font-mono font-bold text-xs text-brand-600">
                        {sub.code}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{sub.title}</td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                          {sub.department}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-xs font-semibold text-slate-600">{sub.credits} Units</td>
                      <td className="py-3.5 px-4 text-xs text-slate-700">
                        {teacher ? teacher.name : 'Unassigned'}
                      </td>
                      <td className="py-3.5 pr-6 text-right">
                        <button
                          onClick={() => onDeleteSubject(sub.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Subject"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Class Modal */}
      <Modal
        isOpen={isClassModalOpen}
        onClose={() => setIsClassModalOpen(false)}
        title={selectedClass ? 'Edit Class Details' : 'Create New Class Cohort'}
      >
        <form onSubmit={handleClassSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Class Name *</label>
              <input
                type="text"
                required
                value={classForm.name}
                onChange={(e) => setClassForm({ ...classForm, name: e.target.value })}
                placeholder="e.g. Grade 10 - Alpha"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Grade Level</label>
              <select
                value={classForm.gradeLevel}
                onChange={(e) => setClassForm({ ...classForm, gradeLevel: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="9">Grade 9</option>
                <option value="10">Grade 10</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Section</label>
              <input
                type="text"
                value={classForm.section}
                onChange={(e) => setClassForm({ ...classForm, section: e.target.value })}
                placeholder="A, B, C, etc."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Room Number</label>
              <input
                type="text"
                value={classForm.roomNumber}
                onChange={(e) => setClassForm({ ...classForm, roomNumber: e.target.value })}
                placeholder="Room 101"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Max Capacity</label>
              <input
                type="number"
                min="10"
                max="60"
                value={classForm.capacity}
                onChange={(e) => setClassForm({ ...classForm, capacity: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Class Teacher / Advisor</label>
              <select
                value={classForm.classTeacherId}
                onChange={(e) => setClassForm({ ...classForm, classTeacherId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="">No teacher assigned</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.department})
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Description / Focus</label>
              <textarea
                rows={2}
                value={classForm.description}
                onChange={(e) => setClassForm({ ...classForm, description: e.target.value })}
                placeholder="Brief summary of syllabus focus, e.g. STEM accelerated cohort"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsClassModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm shadow-brand-600/20"
            >
              {selectedClass ? 'Update Class' : 'Create Class'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Add Subject Modal */}
      <Modal
        isOpen={isSubjectModalOpen}
        onClose={() => setIsSubjectModalOpen(false)}
        title="Add Course / Subject"
      >
        <form onSubmit={handleSubjectSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Subject Title *</label>
              <input
                type="text"
                required
                value={subjectForm.title}
                onChange={(e) => setSubjectForm({ ...subjectForm, title: e.target.value })}
                placeholder="e.g. Modern Chemistry"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Course Code</label>
              <input
                type="text"
                value={subjectForm.code}
                onChange={(e) => setSubjectForm({ ...subjectForm, code: e.target.value })}
                placeholder="e.g. CHEM101"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Department</label>
              <select
                value={subjectForm.department}
                onChange={(e) => setSubjectForm({ ...subjectForm, department: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Mathematics">Mathematics</option>
                <option value="Science">Science</option>
                <option value="Languages">Languages</option>
                <option value="Humanities">Humanities</option>
                <option value="Arts">Arts</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Credits / Units</label>
              <input
                type="number"
                min="1"
                max="6"
                value={subjectForm.credits}
                onChange={(e) => setSubjectForm({ ...subjectForm, credits: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Instructor</label>
              <select
                value={subjectForm.teacherId}
                onChange={(e) => setSubjectForm({ ...subjectForm, teacherId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="">Select faculty member</option>
                {teachers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.department})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsSubjectModalOpen(false)}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-sm shadow-indigo-600/20"
            >
              Save Course
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete Class Confirmation */}
      <Modal
        isOpen={!!deletingClassId}
        onClose={() => setDeletingClassId(null)}
        title="Remove Class Cohort"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800">
            <AlertTriangle className="w-6 h-6 shrink-0 text-rose-600" />
            <p className="text-xs font-medium">
              Are you sure you want to delete this class? Students currently enrolled in this class will need to be reassigned.
            </p>
          </div>
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={() => setDeletingClassId(null)}
              className="px-4 py-2 rounded-xl border border-slate-200 text-slate-700 text-xs font-medium"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onDeleteClass(deletingClassId);
                setDeletingClassId(null);
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

