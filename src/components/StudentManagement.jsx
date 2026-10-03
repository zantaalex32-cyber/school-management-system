import React, { useState } from 'react';
import {
  Search,
  Plus,
  Filter,
  Download,
  Edit2,
  Trash2,
  Eye,
  User,
  Phone,
  Mail,
  Home,
  CheckCircle,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import Modal from './Modal';

export default function StudentManagement({
  students,
  classes,
  onSaveStudent,
  onDeleteStudent,
  isModalOpen,
  setIsModalOpen,
  selectedStudent,
  setSelectedStudent
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [viewingStudent, setViewingStudent] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  // Form State
  const initialForm = {
    name: '',
    admissionNumber: '',
    classId: classes[0]?.id || '',
    gender: 'Male',
    dateOfBirth: '',
    email: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    address: '',
    status: 'Active',
    bloodGroup: 'O+'
  };
  const [formData, setFormData] = useState(initialForm);

  const handleOpenAdd = () => {
    setSelectedStudent(null);
    setFormData({
      ...initialForm,
      admissionNumber: `ADM-${Math.floor(100000 + Math.random() * 900000)}`,
      classId: classes[0]?.id || ''
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name || '',
      admissionNumber: student.admissionNumber || '',
      classId: student.classId || classes[0]?.id || '',
      gender: student.gender || 'Male',
      dateOfBirth: student.dateOfBirth || '',
      email: student.email || '',
      guardianName: student.guardianName || '',
      guardianPhone: student.guardianPhone || '',
      guardianEmail: student.guardianEmail || '',
      address: student.address || '',
      status: student.status || 'Active',
      bloodGroup: student.bloodGroup || 'O+'
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;
    onSaveStudent(formData, selectedStudent ? selectedStudent.id : null);
    setIsModalOpen(false);
  };

  // Filtered Students
  const filteredStudents = students.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.admissionNumber && s.admissionNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.guardianName && s.guardianName.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesClass = !classFilter || s.classId === classFilter;
    const matchesStatus = !statusFilter || s.status === statusFilter;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const exportCSV = () => {
    const headers = ['ID', 'Name', 'Admission No', 'Class', 'Gender', 'Status', 'Guardian', 'Phone'];
    const rows = filteredStudents.map((s) => [
      s.id,
      `"${s.name}"`,
      s.admissionNumber,
      `"${s.className}"`,
      s.gender,
      s.status,
      `"${s.guardianName}"`,
      `"${s.guardianPhone}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `students_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Top Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student, adm no, guardian..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              value={classFilter}
              onChange={(e) => setClassFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="">All Classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          <button
            onClick={exportCSV}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={handleOpenAdd}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold shadow-sm shadow-brand-600/20 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Student</span>
          </button>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
            Showing {filteredStudents.length} of {students.length} Students
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/70 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="py-3.5 pl-6">Student Info</th>
                <th className="py-3.5 px-4">Adm #</th>
                <th className="py-3.5 px-4">Assigned Class</th>
                <th className="py-3.5 px-4">Gender</th>
                <th className="py-3.5 px-4">Guardian Contact</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 pr-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    <User className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                    <p className="font-semibold text-sm text-slate-600">No students found</p>
                    <p className="text-xs text-slate-400">Try adjusting your search query or filters</p>
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 pl-6">
                      <div className="font-bold text-slate-900">{s.name}</div>
                      <div className="text-xs text-slate-400">{s.email || 'No email registered'}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs font-semibold text-slate-600">
                      {s.admissionNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-50 text-brand-700 border border-brand-100">
                        {s.className}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-xs text-slate-600">{s.gender}</td>
                    <td className="py-3.5 px-4 text-xs">
                      <div className="font-medium text-slate-800">{s.guardianName}</div>
                      <div className="text-slate-400 font-mono text-[11px]">{s.guardianPhone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                          s.status === 'Active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}
                      >
                        {s.status === 'Active' ? (
                          <CheckCircle className="w-3 h-3 text-emerald-500" />
                        ) : (
                          <XCircle className="w-3 h-3 text-slate-400" />
                        )}
                        {s.status}
                      </span>
                    </td>
                    <td className="py-3.5 pr-6 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setViewingStudent(s)}
                          className="p-1.5 text-slate-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleOpenEdit(s)}
                          className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                          title="Edit Student"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingId(s.id)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Student Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedStudent ? 'Edit Student Details' : 'Student Admission Form'}
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
                placeholder="e.g. John Doe"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Admission Number</label>
              <input
                type="text"
                value={formData.admissionNumber}
                onChange={(e) => setFormData({ ...formData, admissionNumber: e.target.value })}
                placeholder="ADM-XXXXXX"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Assigned Class *</label>
              <select
                value={formData.classId}
                onChange={(e) => setFormData({ ...formData, classId: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                {classes.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.roomNumber})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Date of Birth</label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Blood Group</label>
              <select
                value={formData.bloodGroup}
                onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Student Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@apexacademy.edu"
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">Guardian Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Guardian Name</label>
                <input
                  type="text"
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  placeholder="Primary Guardian Name"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Guardian Phone</label>
                <input
                  type="tel"
                  value={formData.guardianPhone}
                  onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Residential Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Street address, City, Postal Code"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
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
              {selectedStudent ? 'Save Changes' : 'Complete Admission'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Student View Details Modal */}
      <Modal
        isOpen={!!viewingStudent}
        onClose={() => setViewingStudent(null)}
        title="Student Profile & Record"
      >
        {viewingStudent && (
          <div className="space-y-5">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white font-black text-xl flex items-center justify-center shadow-md">
                {viewingStudent.name.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">{viewingStudent.name}</h3>
                <p className="text-xs text-slate-500">
                  Admission No: <span className="font-mono font-bold text-slate-700">{viewingStudent.admissionNumber}</span>
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-brand-100 text-brand-700 font-semibold">
                    {viewingStudent.className}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-semibold">
                    {viewingStudent.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl border border-slate-100 bg-white">
                <span className="text-slate-400 block mb-0.5 font-medium">Gender</span>
                <span className="font-bold text-slate-800">{viewingStudent.gender}</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-white">
                <span className="text-slate-400 block mb-0.5 font-medium">Blood Group</span>
                <span className="font-bold text-slate-800">{viewingStudent.bloodGroup || 'N/A'}</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-white">
                <span className="text-slate-400 block mb-0.5 font-medium">Date of Birth</span>
                <span className="font-bold text-slate-800">{viewingStudent.dateOfBirth || 'Not provided'}</span>
              </div>
              <div className="p-3 rounded-xl border border-slate-100 bg-white">
                <span className="text-slate-400 block mb-0.5 font-medium">Enrollment Date</span>
                <span className="font-bold text-slate-800">{viewingStudent.enrollmentDate || '2024-09-01'}</span>
              </div>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/80 space-y-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2">Guardian & Contact</h4>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <User className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Guardian: <strong>{viewingStudent.guardianName || 'N/A'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Phone: <strong className="font-mono">{viewingStudent.guardianPhone || 'N/A'}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Email: {viewingStudent.email || 'None'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-700">
                <Home className="w-4 h-4 text-slate-400 shrink-0" />
                <span>Address: {viewingStudent.address || 'N/A'}</span>
              </div>
            </div>

            <div className="flex justify-end pt-3">
              <button
                onClick={() => setViewingStudent(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        title="Confirm Student Removal"
        maxWidth="max-w-md"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-rose-50 border border-rose-100 rounded-xl text-rose-800">
            <AlertTriangle className="w-6 h-6 shrink-0 text-rose-600" />
            <p className="text-xs font-medium">
              Are you sure you want to remove this student? This action will permanently remove their records from the current roster.
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
                onDeleteStudent(deletingId);
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

