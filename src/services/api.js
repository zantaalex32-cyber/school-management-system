const API_BASE = '/api';

async function handleResponse(res) {
  if (!res.ok) {
    let errorMsg = `HTTP Error ${res.status}`;
    try {
      const err = await res.json();
      if (err.error) errorMsg = err.error;
    } catch (_) {}
    throw new Error(errorMsg);
  }
  return res.json();
}

export const api = {
  // Stats
  async getStats() {
    const res = await fetch(`${API_BASE}/stats`);
    return handleResponse(res);
  },

  // Students
  async getStudents(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/students${query ? `?${query}` : ''}`);
    return handleResponse(res);
  },

  async createStudent(student) {
    const res = await fetch(`${API_BASE}/students`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    return handleResponse(res);
  },

  async updateStudent(id, student) {
    const res = await fetch(`${API_BASE}/students/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student)
    });
    return handleResponse(res);
  },

  async deleteStudent(id) {
    const res = await fetch(`${API_BASE}/students/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  },

  // Teachers
  async getTeachers(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/teachers${query ? `?${query}` : ''}`);
    return handleResponse(res);
  },

  async createTeacher(teacher) {
    const res = await fetch(`${API_BASE}/teachers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher)
    });
    return handleResponse(res);
  },

  async updateTeacher(id, teacher) {
    const res = await fetch(`${API_BASE}/teachers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(teacher)
    });
    return handleResponse(res);
  },

  async deleteTeacher(id) {
    const res = await fetch(`${API_BASE}/teachers/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  },

  // Classes
  async getClasses() {
    const res = await fetch(`${API_BASE}/classes`);
    return handleResponse(res);
  },

  async createClass(classData) {
    const res = await fetch(`${API_BASE}/classes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(classData)
    });
    return handleResponse(res);
  },

  async updateClass(id, classData) {
    const res = await fetch(`${API_BASE}/classes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(classData)
    });
    return handleResponse(res);
  },

  async deleteClass(id) {
    const res = await fetch(`${API_BASE}/classes/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  },

  // Subjects
  async getSubjects() {
    const res = await fetch(`${API_BASE}/subjects`);
    return handleResponse(res);
  },

  async createSubject(subject) {
    const res = await fetch(`${API_BASE}/subjects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(subject)
    });
    return handleResponse(res);
  },

  async deleteSubject(id) {
    const res = await fetch(`${API_BASE}/subjects/${id}`, {
      method: 'DELETE'
    });
    return handleResponse(res);
  },

  // Attendance
  async getAttendance(params = {}) {
    const query = new URLSearchParams(params).toString();
    const res = await fetch(`${API_BASE}/attendance${query ? `?${query}` : ''}`);
    return handleResponse(res);
  },

  async recordAttendance(payload) {
    const res = await fetch(`${API_BASE}/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    return handleResponse(res);
  },

  // System
  async resetDemoData() {
    const res = await fetch(`${API_BASE}/database/reset`, { method: 'POST' });
    return handleResponse(res);
  }
};

