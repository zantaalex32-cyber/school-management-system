import express from 'express';
import cors from 'cors';
import { readDatabase, writeDatabase, resetDatabase } from './storage.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Dashboard Statistics
app.get('/api/stats', (req, res) => {
  const db = readDatabase();
  const totalStudents = db.students.length;
  const activeStudents = db.students.filter(s => s.status === 'Active').length;
  const totalTeachers = db.teachers.length;
  const totalClasses = db.classes.length;
  const totalSubjects = db.subjects.length;

  const avgAttendance = db.students.length > 0
    ? Math.round(db.students.reduce((acc, s) => acc + (s.attendanceRate || 95), 0) / db.students.length)
    : 100;

  // Gender breakdown
  const genderBreakdown = db.students.reduce((acc, s) => {
    acc[s.gender] = (acc[s.gender] || 0) + 1;
    return acc;
  }, {});

  // Grade level breakdown
  const gradeBreakdown = db.classes.reduce((acc, c) => {
    const count = db.students.filter(s => s.classId === c.id).length;
    acc[c.name] = count;
    return acc;
  }, {});

  res.json({
    totalStudents,
    activeStudents,
    totalTeachers,
    totalClasses,
    totalSubjects,
    avgAttendance,
    genderBreakdown,
    gradeBreakdown
  });
});

// ========================
// STUDENTS ENDPOINTS
// ========================
app.get('/api/students', (req, res) => {
  const db = readDatabase();
  let results = [...db.students];
  const { search, classId, status } = req.query;

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(s =>
      s.name.toLowerCase().includes(q) ||
      (s.admissionNumber && s.admissionNumber.toLowerCase().includes(q)) ||
      (s.email && s.email.toLowerCase().includes(q)) ||
      (s.guardianName && s.guardianName.toLowerCase().includes(q))
    );
  }

  if (classId) {
    results = results.filter(s => s.classId === classId);
  }

  if (status) {
    results = results.filter(s => s.status.toLowerCase() === status.toLowerCase());
  }

  // Populate class name
  const populated = results.map(s => {
    const cls = db.classes.find(c => c.id === s.classId);
    return {
      ...s,
      className: cls ? cls.name : 'Unassigned'
    };
  });

  res.json(populated);
});

app.get('/api/students/:id', (req, res) => {
  const db = readDatabase();
  const student = db.students.find(s => s.id === req.params.id);
  if (!student) {
    return res.status(404).json({ error: 'Student not found' });
  }
  const cls = db.classes.find(c => c.id === student.classId);
  res.json({
    ...student,
    className: cls ? cls.name : 'Unassigned'
  });
});

app.post('/api/students', (req, res) => {
  const db = readDatabase();
  const {
    name,
    admissionNumber,
    classId,
    gender = 'Other',
    dateOfBirth = '',
    email = '',
    guardianName = '',
    guardianPhone = '',
    guardianEmail = '',
    address = '',
    status = 'Active',
    bloodGroup = 'O+'
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Student name is required' });
  }

  const newId = `STU-${Date.now().toString().slice(-6)}`;
  const autoAdm = admissionNumber || `ADM-${Math.floor(100000 + Math.random() * 900000)}`;

  const newStudent = {
    id: newId,
    name: name.trim(),
    admissionNumber: autoAdm,
    classId: classId || '',
    gender,
    dateOfBirth,
    enrollmentDate: new Date().toISOString().split('T')[0],
    email: email.trim(),
    guardianName: guardianName.trim(),
    guardianPhone: guardianPhone.trim(),
    guardianEmail: guardianEmail.trim(),
    address: address.trim(),
    status,
    bloodGroup,
    attendanceRate: 100
  };

  db.students.unshift(newStudent);
  writeDatabase(db);
  res.status(201).json(newStudent);
});

app.put('/api/students/:id', (req, res) => {
  const db = readDatabase();
  const idx = db.students.findIndex(s => s.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Student not found' });
  }

  db.students[idx] = {
    ...db.students[idx],
    ...req.body,
    id: req.params.id // Prevent ID tampering
  };

  writeDatabase(db);
  res.json(db.students[idx]);
});

app.delete('/api/students/:id', (req, res) => {
  const db = readDatabase();
  const exists = db.students.some(s => s.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'Student not found' });
  }

  db.students = db.students.filter(s => s.id !== req.params.id);
  writeDatabase(db);
  res.json({ message: 'Student successfully deleted', id: req.params.id });
});

// ========================
// TEACHERS ENDPOINTS
// ========================
app.get('/api/teachers', (req, res) => {
  const db = readDatabase();
  let results = [...db.teachers];
  const { search, department } = req.query;

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.email.toLowerCase().includes(q) ||
      (t.department && t.department.toLowerCase().includes(q))
    );
  }

  if (department) {
    results = results.filter(t => t.department.toLowerCase() === department.toLowerCase());
  }

  // Populate assigned class names
  const populated = results.map(t => {
    const assignedClasses = (t.assignedClassIds || []).map(cid => {
      const c = db.classes.find(cls => cls.id === cid);
      return c ? c.name : cid;
    });
    return {
      ...t,
      assignedClassNames: assignedClasses
    };
  });

  res.json(populated);
});

app.post('/api/teachers', (req, res) => {
  const db = readDatabase();
  const {
    name,
    email,
    phone = '',
    department = 'General',
    qualification = '',
    status = 'Active',
    assignedClassIds = [],
    subjects = []
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Teacher name is required' });
  }

  const newId = `TCH-${Date.now().toString().slice(-4)}`;
  const newTeacher = {
    id: newId,
    name: name.trim(),
    email: email ? email.trim() : `${name.toLowerCase().replace(/\s+/g, '.')}@apexacademy.edu`,
    phone: phone.trim(),
    department,
    qualification,
    joiningDate: new Date().toISOString().split('T')[0],
    status,
    assignedClassIds,
    subjects: Array.isArray(subjects) ? subjects : [subjects].filter(Boolean)
  };

  db.teachers.push(newTeacher);
  writeDatabase(db);
  res.status(201).json(newTeacher);
});

app.put('/api/teachers/:id', (req, res) => {
  const db = readDatabase();
  const idx = db.teachers.findIndex(t => t.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Teacher not found' });
  }

  db.teachers[idx] = {
    ...db.teachers[idx],
    ...req.body,
    id: req.params.id
  };

  writeDatabase(db);
  res.json(db.teachers[idx]);
});

app.delete('/api/teachers/:id', (req, res) => {
  const db = readDatabase();
  const exists = db.teachers.some(t => t.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'Teacher not found' });
  }

  db.teachers = db.teachers.filter(t => t.id !== req.params.id);
  writeDatabase(db);
  res.json({ message: 'Teacher deleted successfully', id: req.params.id });
});

// ========================
// CLASSES ENDPOINTS
// ========================
app.get('/api/classes', (req, res) => {
  const db = readDatabase();
  const populated = db.classes.map(c => {
    const studentCount = db.students.filter(s => s.classId === c.id).length;
    const teacher = db.teachers.find(t => t.id === c.classTeacherId);
    return {
      ...c,
      studentCount,
      classTeacherName: teacher ? teacher.name : 'Unassigned'
    };
  });
  res.json(populated);
});

app.post('/api/classes', (req, res) => {
  const db = readDatabase();
  const {
    name,
    gradeLevel,
    section = 'A',
    roomNumber = '',
    capacity = 35,
    classTeacherId = '',
    description = ''
  } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: 'Class name is required' });
  }

  const newId = `CLS-${Date.now().toString().slice(-4)}`;
  const newClass = {
    id: newId,
    name: name.trim(),
    gradeLevel: gradeLevel || '10',
    section,
    roomNumber,
    capacity: Number(capacity) || 35,
    classTeacherId,
    description
  };

  db.classes.push(newClass);
  writeDatabase(db);
  res.status(201).json(newClass);
});

app.put('/api/classes/:id', (req, res) => {
  const db = readDatabase();
  const idx = db.classes.findIndex(c => c.id === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ error: 'Class not found' });
  }

  db.classes[idx] = {
    ...db.classes[idx],
    ...req.body,
    id: req.params.id
  };

  writeDatabase(db);
  res.json(db.classes[idx]);
});

app.delete('/api/classes/:id', (req, res) => {
  const db = readDatabase();
  const exists = db.classes.some(c => c.id === req.params.id);
  if (!exists) {
    return res.status(404).json({ error: 'Class not found' });
  }

  db.classes = db.classes.filter(c => c.id !== req.params.id);
  writeDatabase(db);
  res.json({ message: 'Class deleted successfully', id: req.params.id });
});

// ========================
// SUBJECTS / COURSES ENDPOINTS
// ========================
app.get('/api/subjects', (req, res) => {
  const db = readDatabase();
  const populated = db.subjects.map(s => {
    const teacher = db.teachers.find(t => t.id === s.teacherId);
    return {
      ...s,
      teacherName: teacher ? teacher.name : 'Unassigned'
    };
  });
  res.json(populated);
});

app.post('/api/subjects', (req, res) => {
  const db = readDatabase();
  const { title, code, department = 'General', credits = 3, teacherId = '' } = req.body;

  if (!title || !title.trim()) {
    return res.status(400).json({ error: 'Subject title is required' });
  }

  const newId = `SUB-${Date.now().toString().slice(-4)}`;
  const newSubject = {
    id: newId,
    title: title.trim(),
    code: code ? code.trim().toUpperCase() : `SUB${Math.floor(100 + Math.random() * 900)}`,
    department,
    credits: Number(credits) || 3,
    teacherId
  };

  db.subjects.push(newSubject);
  writeDatabase(db);
  res.status(201).json(newSubject);
});

app.delete('/api/subjects/:id', (req, res) => {
  const db = readDatabase();
  db.subjects = db.subjects.filter(s => s.id !== req.params.id);
  writeDatabase(db);
  res.json({ message: 'Subject deleted successfully' });
});

// ========================
// ATTENDANCE ENDPOINTS
// ========================
app.get('/api/attendance', (req, res) => {
  const db = readDatabase();
  const { date, classId } = req.query;
  let records = db.attendance || [];

  if (date) {
    records = records.filter(a => a.date === date);
  }
  if (classId) {
    records = records.filter(a => a.classId === classId);
  }

  res.json(records);
});

app.post('/api/attendance', (req, res) => {
  const db = readDatabase();
  const { date, classId, records } = req.body;

  if (!date || !classId || !Array.isArray(records)) {
    return res.status(400).json({ error: 'Date, classId, and records array are required' });
  }

  if (!db.attendance) db.attendance = [];

  const existingIdx = db.attendance.findIndex(a => a.date === date && a.classId === classId);
  if (existingIdx !== -1) {
    db.attendance[existingIdx].records = records;
  } else {
    db.attendance.push({ date, classId, records });
  }

  writeDatabase(db);
  res.status(200).json({ message: 'Attendance recorded successfully', date, classId });
});

// ========================
// DATA BACKUP & RESET
// ========================
app.post('/api/database/reset', (req, res) => {
  const fresh = resetDatabase();
  res.json({ message: 'Database reset to initial demo data', data: fresh });
});

app.get('/api/database/export', (req, res) => {
  const data = readDatabase();
  res.setHeader('Content-Disposition', 'attachment; filename="school_system_backup.json"');
  res.setHeader('Content-Type', 'application/json');
  res.send(JSON.stringify(data, null, 2));
});

import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.join(__dirname, '..', 'dist');

// If production build exists, serve static client files
import fs from 'node:fs';
if (fs.existsSync(DIST_DIR)) {
  app.use(express.static(DIST_DIR));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(DIST_DIR, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`School Management API Server running on port ${PORT}`);
});


