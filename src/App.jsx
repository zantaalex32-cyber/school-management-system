import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardOverview from './components/DashboardOverview';
import StudentManagement from './components/StudentManagement';
import TeacherManagement from './components/TeacherManagement';
import ClassManagement from './components/ClassManagement';
import AttendanceTracker from './components/AttendanceTracker';
import Toast from './components/Toast';
import { api } from './services/api';

export default function App() {
  const [currentTab, setCurrentTab] = useState('dashboard');
  const [stats, setStats] = useState(null);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Student Modal state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Teacher Modal state
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);

  // Class Modal state
  const [isClassModalOpen, setIsClassModalOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [statsData, studentsData, teachersData, classesData, subjectsData, attendanceData] =
        await Promise.all([
          api.getStats(),
          api.getStudents(),
          api.getTeachers(),
          api.getClasses(),
          api.getSubjects(),
          api.getAttendance()
        ]);

      setStats(statsData);
      setStudents(studentsData);
      setTeachers(teachersData);
      setClasses(classesData);
      setSubjects(subjectsData);
      setAttendanceRecords(attendanceData);
    } catch (err) {
      console.error('Failed to load school data', err);
      showToast(err.message || 'Could not connect to backend server', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Student Operations
  const handleSaveStudent = async (formData, studentId) => {
    try {
      if (studentId) {
        await api.updateStudent(studentId, formData);
        showToast('Student profile updated successfully', 'success');
      } else {
        await api.createStudent(formData);
        showToast('Student enrolled successfully', 'success');
      }
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save student', 'error');
    }
  };

  const handleDeleteStudent = async (id) => {
    try {
      await api.deleteStudent(id);
      showToast('Student removed from school records', 'info');
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to delete student', 'error');
    }
  };

  // Teacher Operations
  const handleSaveTeacher = async (formData, teacherId) => {
    try {
      if (teacherId) {
        await api.updateTeacher(teacherId, formData);
        showToast('Faculty profile updated successfully', 'success');
      } else {
        await api.createTeacher(formData);
        showToast('New faculty member added', 'success');
      }
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save faculty record', 'error');
    }
  };

  const handleDeleteTeacher = async (id) => {
    try {
      await api.deleteTeacher(id);
      showToast('Faculty record removed', 'info');
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to delete teacher', 'error');
    }
  };

  // Class Operations
  const handleSaveClass = async (formData, classId) => {
    try {
      if (classId) {
        await api.updateClass(classId, formData);
        showToast('Class details updated', 'success');
      } else {
        await api.createClass(formData);
        showToast('New class cohort established', 'success');
      }
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save class', 'error');
    }
  };

  const handleDeleteClass = async (id) => {
    try {
      await api.deleteClass(id);
      showToast('Class cohort removed', 'info');
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to delete class', 'error');
    }
  };

  // Subject Operations
  const handleSaveSubject = async (formData) => {
    try {
      await api.createSubject(formData);
      showToast('Curriculum course added', 'success');
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to add subject', 'error');
    }
  };

  const handleDeleteSubject = async (id) => {
    try {
      await api.deleteSubject(id);
      showToast('Subject removed from catalog', 'info');
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to delete subject', 'error');
    }
  };

  // Attendance Operations
  const handleSaveAttendance = async (payload) => {
    try {
      await api.recordAttendance(payload);
      showToast('Daily register saved to records', 'success');
      loadData();
    } catch (err) {
      showToast(err.message || 'Failed to save attendance', 'error');
    }
  };

  // Demo Reset
  const handleResetDemo = async () => {
    try {
      await api.resetDemoData();
      showToast('System data reset to default demo roster', 'info');
      loadData();
    } catch (err) {
      showToast('Could not reset demo data', 'error');
    }
  };

  const handleQuickAdd = () => {
    if (currentTab === 'students' || currentTab === 'dashboard') {
      setSelectedStudent(null);
      setIsStudentModalOpen(true);
    } else if (currentTab === 'teachers') {
      setIsTeacherModalOpen(true);
    } else if (currentTab === 'classes') {
      setIsClassModalOpen(true);
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onResetDemo={handleResetDemo}
        stats={stats}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header currentTab={currentTab} onQuickAdd={handleQuickAdd} />

        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          {isLoading && !stats ? (
            <div className="h-full flex flex-col items-center justify-center space-y-3">
              <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-semibold text-slate-500">Connecting to school database...</p>
            </div>
          ) : (
            <>
              {currentTab === 'dashboard' && (
                <DashboardOverview
                  stats={stats}
                  classes={classes}
                  students={students}
                  teachers={teachers}
                  onNavigate={(tab) => setCurrentTab(tab)}
                  onOpenStudentModal={() => {
                    setSelectedStudent(null);
                    setIsStudentModalOpen(true);
                  }}
                />
              )}

              {currentTab === 'students' && (
                <StudentManagement
                  students={students}
                  classes={classes}
                  onSaveStudent={handleSaveStudent}
                  onDeleteStudent={handleDeleteStudent}
                  isModalOpen={isStudentModalOpen}
                  setIsModalOpen={setIsStudentModalOpen}
                  selectedStudent={selectedStudent}
                  setSelectedStudent={setSelectedStudent}
                />
              )}

              {currentTab === 'teachers' && (
                <TeacherManagement
                  teachers={teachers}
                  classes={classes}
                  onSaveTeacher={handleSaveTeacher}
                  onDeleteTeacher={handleDeleteTeacher}
                  isModalOpen={isTeacherModalOpen}
                  setIsModalOpen={setIsTeacherModalOpen}
                />
              )}

              {currentTab === 'classes' && (
                <ClassManagement
                  classes={classes}
                  students={students}
                  teachers={teachers}
                  subjects={subjects}
                  onSaveClass={handleSaveClass}
                  onDeleteClass={handleDeleteClass}
                  onSaveSubject={handleSaveSubject}
                  onDeleteSubject={handleDeleteSubject}
                  isClassModalOpen={isClassModalOpen}
                  setIsClassModalOpen={setIsClassModalOpen}
                />
              )}

              {currentTab === 'attendance' && (
                <AttendanceTracker
                  classes={classes}
                  students={students}
                  attendanceRecords={attendanceRecords}
                  onSaveAttendance={handleSaveAttendance}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Global Notifications */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}

