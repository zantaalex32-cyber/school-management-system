# Apex Academy — School Management System (SMS)

A modern, responsive, full-stack School Management System built with **React**, **Vite**, **Tailwind CSS**, and a **Node.js / Express** persistent backend.

Designed for school administrators and staff to manage **Students**, **Teachers/Faculty**, **Classes & Cohorts**, and **Daily Attendance Registers**.

---

## 🚀 Key Features

### 1. 🎓 Student Management
- **Admissions & Enrollment**: Complete admission forms with automatic or custom admission numbering (`ADM-XXXXXX`), assigned grade/cohort, date of birth, blood group, and emergency contact details.
- **Student Directory**: Live search filtering by student name, admission number, or guardian.
- **Roster Filtering**: Filter students by class cohort and active/inactive enrollment status.
- **Student Profile Sheet**: Detailed modal view for reviewing guardian details, home address, and academic standing.
- **Data Export**: One-click **Export to CSV** for records, spreadsheets, or state reports.

### 2. 👨‍🏫 Faculty & Staff Management
- **Teacher Directory**: Manage teacher profiles, academic qualifications (e.g. *Ph.D., M.Sc., M.A.*), department allocations, phone, and official email.
- **Subject Specializations**: Assign multiple subjects and curriculum courses per faculty member.
- **Class Advisor Assignments**: Assign teachers as primary advisors/heads for specific classrooms and cohorts.

### 3. 🏫 Classrooms, Cohorts & Curriculum
- **Class Cohorts**: Manage grade levels (Grades 9–12), section letters (A, B, C), assigned physical classrooms (e.g. *Room 101*), and seat capacities.
- **Capacity Monitoring**: Real-time progress bars showing enrolled headcount against maximum room capacity.
- **Course Catalog**: Add and manage courses with course codes (e.g. `MATH101`, `PHYS101`), credit units, department tags, and assigned instructors.

### 4. 📅 Attendance Tracking
- **Interactive Daily Register**: Roll-call screen with single-click status toggles:
  - 🟢 **Present** (On-time arrival)
  - 🟡 **Late** (Tardy note checked)
  - 🔴 **Absent** (Guardian notified)
  - 🟣 **Excused** (Medical note on file)
- **Batch Operations**: "Mark All Present" shortcut for rapid roll-call entry.
- **Live Metrics**: Automatic calculation of daily present counts, absence rates, and class attendance percentages.
- **Persistent Storage**: Saves attendance logs directly to the persistent backend.

### 5. 📊 Administrator Dashboard
- **Key Performance Indicators**: Total students, active enrollment, faculty count, and average school-wide attendance rate.
- **Capacity Overview**: Live status breakdown of each classroom cohort.
- **Recent Admissions Table**: Quick overview of newest student registrations.
- **Demo Reset Button**: One-click restore to sample demo school roster for testing and presentations.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS, Lucide Icons, Plus Jakarta Sans typography.
- **Backend**: Node.js, Express, RESTful JSON API with CORS and file-backed persistence (`server/data/db.json`).
- **Dev Tools**: `concurrently` for running frontend and backend in parallel with a single command.

---

## 💻 How to Run

### Option 1: Development Mode (Hot Reloading)

From this directory (`C:\Users\wekes\.gemini\antigravity\scratch\school-management-system`):

```bash
npm run dev
```

- **Frontend Dev Server**: [http://localhost:3000](http://localhost:3000)
- **Backend API Server**: [http://localhost:5000/api](http://localhost:5000/api)

### Option 2: Production Unified Server (Single Port)

```bash
# Build the production bundle
npm run build

# Start the full-stack server
node server/server.js
```

Then open your browser to **[http://localhost:5000](http://localhost:5000)**.

---

## 📁 Project Architecture

```
school-management-system/
├── dist/                     # Optimized production bundle
├── server/
│   ├── data/
│   │   └── db.json           # Persistent JSON database (auto-created)
│   ├── seedData.js           # Default realistic school dataset
│   ├── storage.js            # DB read/write/reset operations
│   └── server.js             # Express API & static file server
├── src/
│   ├── components/
│   │   ├── AttendanceTracker.jsx   # Attendance roll-call & calculations
│   │   ├── ClassManagement.jsx     # Classes & subjects manager
│   │   ├── DashboardOverview.jsx   # Metrics, charts, and capacity view
│   │   ├── Header.jsx              # Navigation header with date & quick actions
│   │   ├── Modal.jsx               # Accessible dialog modal
│   │   ├── Sidebar.jsx             # Brand navigation with count badges
│   │   ├── StudentManagement.jsx   # Student CRUD, search, and CSV export
│   │   ├── TeacherManagement.jsx   # Faculty directory & course assignments
│   │   └── Toast.jsx               # Action feedback notifications
│   ├── services/
│   │   └── api.js                  # Frontend REST API client
│   ├── App.jsx                     # Root application coordinator
│   ├── index.css                   # Tailwind styles and custom scrollbars
│   └── main.jsx                    # React entrypoint
├── index.html                      # HTML template with Google Fonts
├── package.json                    # Scripts and dependencies
├── tailwind.config.js              # Theme custom colors
└── vite.config.js                  # Proxy configuration to API
```

---

## 🔌 API Endpoints Summary

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/stats` | School-wide summary counts and attendance averages |
| `GET` | `/api/students` | List students with `?search=`, `?classId=`, `?status=` |
| `POST` | `/api/students` | Enroll a new student |
| `PUT` | `/api/students/:id` | Update student profile |
| `DELETE` | `/api/students/:id` | Remove a student |
| `GET` | `/api/teachers` | List teachers with `?search=`, `?department=` |
| `POST` | `/api/teachers` | Register a new faculty member |
| `PUT` | `/api/teachers/:id` | Update teacher details |
| `DELETE` | `/api/teachers/:id` | Remove a teacher |
| `GET` | `/api/classes` | List class cohorts with enrolled counts |
| `POST` | `/api/classes` | Create a new class cohort |
| `GET` | `/api/subjects` | List curriculum courses |
| `POST` | `/api/subjects` | Add a course |
| `GET` | `/api/attendance` | Query attendance by `?date=` and `?classId=` |
| `POST` | `/api/attendance` | Record daily class attendance roll |
| `POST` | `/api/database/reset` | Reset database to default seed data |
| `GET` | `/api/database/export` | Download full database JSON backup |
