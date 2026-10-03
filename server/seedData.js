export const initialData = {
  classes: [
    {
      id: "CLS-10A",
      name: "Grade 10 - Alpha",
      gradeLevel: "10",
      section: "A",
      roomNumber: "Room 101",
      capacity: 35,
      classTeacherId: "TCH-001",
      description: "Science & Mathematics focused stream"
    },
    {
      id: "CLS-10B",
      name: "Grade 10 - Beta",
      gradeLevel: "10",
      section: "B",
      roomNumber: "Room 102",
      capacity: 35,
      classTeacherId: "TCH-002",
      description: "Humanities & Social Sciences stream"
    },
    {
      id: "CLS-11A",
      name: "Grade 11 - Pre-Eng",
      gradeLevel: "11",
      section: "A",
      roomNumber: "Room 201",
      capacity: 30,
      classTeacherId: "TCH-003",
      description: "Advanced Physics and Chemistry cohort"
    },
    {
      id: "CLS-12A",
      name: "Grade 12 - Senior Honors",
      gradeLevel: "12",
      section: "A",
      roomNumber: "Room 301",
      capacity: 30,
      classTeacherId: "TCH-004",
      description: "Senior graduating class"
    }
  ],
  subjects: [
    {
      id: "SUB-MTH",
      code: "MATH101",
      title: "Advanced Mathematics",
      department: "Mathematics",
      credits: 4,
      teacherId: "TCH-001"
    },
    {
      id: "SUB-PHY",
      code: "PHYS101",
      title: "Physics Fundamentals",
      department: "Science",
      credits: 4,
      teacherId: "TCH-003"
    },
    {
      id: "SUB-ENG",
      code: "ENG101",
      title: "English Literature & Composition",
      department: "Languages",
      credits: 3,
      teacherId: "TCH-002"
    },
    {
      id: "SUB-BIO",
      code: "BIO101",
      title: "General Biology",
      department: "Science",
      credits: 4,
      teacherId: "TCH-004"
    },
    {
      id: "SUB-HIS",
      code: "HIST101",
      title: "World History & Civics",
      department: "Humanities",
      credits: 3,
      teacherId: "TCH-005"
    }
  ],
  teachers: [
    {
      id: "TCH-001",
      name: "Dr. Evelyn Marcus",
      email: "evelyn.marcus@apexacademy.edu",
      phone: "+1 (555) 234-5678",
      department: "Mathematics",
      qualification: "Ph.D. in Applied Mathematics",
      joiningDate: "2019-08-15",
      status: "Active",
      assignedClassIds: ["CLS-10A"],
      subjects: ["Advanced Mathematics"]
    },
    {
      id: "TCH-002",
      name: "Marcus Vance",
      email: "marcus.vance@apexacademy.edu",
      phone: "+1 (555) 345-6789",
      department: "Languages",
      qualification: "M.A. in English Literature",
      joiningDate: "2020-01-10",
      status: "Active",
      assignedClassIds: ["CLS-10B"],
      subjects: ["English Literature & Composition"]
    },
    {
      id: "TCH-003",
      name: "Sarah Chen",
      email: "sarah.chen@apexacademy.edu",
      phone: "+1 (555) 456-7890",
      department: "Science",
      qualification: "M.Sc. in Physics",
      joiningDate: "2021-09-01",
      status: "Active",
      assignedClassIds: ["CLS-11A"],
      subjects: ["Physics Fundamentals"]
    },
    {
      id: "TCH-004",
      name: "Robert O'Connor",
      email: "robert.oconnor@apexacademy.edu",
      phone: "+1 (555) 567-8901",
      department: "Science",
      qualification: "M.Sc. in Cellular Biology",
      joiningDate: "2018-03-20",
      status: "Active",
      assignedClassIds: ["CLS-12A"],
      subjects: ["General Biology"]
    },
    {
      id: "TCH-005",
      name: "Amina Al-Mansoor",
      email: "amina.mansoor@apexacademy.edu",
      phone: "+1 (555) 678-9012",
      department: "Humanities",
      qualification: "M.A. in International History",
      joiningDate: "2022-08-18",
      status: "Active",
      assignedClassIds: [],
      subjects: ["World History & Civics"]
    }
  ],
  students: [
    {
      id: "STU-2026-001",
      name: "Aiden Montgomery",
      admissionNumber: "ADM-202601",
      classId: "CLS-10A",
      gender: "Male",
      dateOfBirth: "2010-04-12",
      enrollmentDate: "2024-09-01",
      email: "aiden.m@student.apexacademy.edu",
      guardianName: "David Montgomery",
      guardianPhone: "+1 (555) 901-1122",
      guardianEmail: "d.montgomery@example.com",
      address: "742 Evergreen Terrace, Springfield",
      status: "Active",
      bloodGroup: "O+",
      attendanceRate: 96
    },
    {
      id: "STU-2026-002",
      name: "Sophia Rodriguez",
      admissionNumber: "ADM-202602",
      classId: "CLS-10A",
      gender: "Female",
      dateOfBirth: "2010-09-23",
      enrollmentDate: "2024-09-01",
      email: "sophia.r@student.apexacademy.edu",
      guardianName: "Elena Rodriguez",
      guardianPhone: "+1 (555) 901-2233",
      guardianEmail: "elena.r@example.com",
      address: "124 Conch Street, Springfield",
      status: "Active",
      bloodGroup: "A+",
      attendanceRate: 98
    },
    {
      id: "STU-2026-003",
      name: "Liam Alexander Patel",
      admissionNumber: "ADM-202603",
      classId: "CLS-10B",
      gender: "Male",
      dateOfBirth: "2010-06-15",
      enrollmentDate: "2024-09-01",
      email: "liam.patel@student.apexacademy.edu",
      guardianName: "Rajesh Patel",
      guardianPhone: "+1 (555) 901-3344",
      guardianEmail: "rajesh.patel@example.com",
      address: "42 Wallaby Way, Springfield",
      status: "Active",
      bloodGroup: "B+",
      attendanceRate: 92
    },
    {
      id: "STU-2026-004",
      name: "Maya Lin",
      admissionNumber: "ADM-202604",
      classId: "CLS-10B",
      gender: "Female",
      dateOfBirth: "2010-11-04",
      enrollmentDate: "2024-09-01",
      email: "maya.lin@student.apexacademy.edu",
      guardianName: "Wei Lin",
      guardianPhone: "+1 (555) 901-4455",
      guardianEmail: "wei.lin@example.com",
      address: "88 Orchid Ave, Springfield",
      status: "Active",
      bloodGroup: "AB+",
      attendanceRate: 95
    },
    {
      id: "STU-2026-005",
      name: "Lucas Bennett",
      admissionNumber: "ADM-202605",
      classId: "CLS-11A",
      gender: "Male",
      dateOfBirth: "2009-02-18",
      enrollmentDate: "2023-09-01",
      email: "lucas.b@student.apexacademy.edu",
      guardianName: "Karen Bennett",
      guardianPhone: "+1 (555) 901-5566",
      guardianEmail: "karen.b@example.com",
      address: "350 Fifth Ave, Springfield",
      status: "Active",
      bloodGroup: "O-",
      attendanceRate: 91
    },
    {
      id: "STU-2026-006",
      name: "Zara Fatima",
      admissionNumber: "ADM-202606",
      classId: "CLS-11A",
      gender: "Female",
      dateOfBirth: "2009-07-29",
      enrollmentDate: "2023-09-01",
      email: "zara.f@student.apexacademy.edu",
      guardianName: "Tariq Fatima",
      guardianPhone: "+1 (555) 901-6677",
      guardianEmail: "tariq.f@example.com",
      address: "15 Cedar Grove, Springfield",
      status: "Active",
      bloodGroup: "A-",
      attendanceRate: 99
    },
    {
      id: "STU-2026-007",
      name: "Ethan James Walker",
      admissionNumber: "ADM-202607",
      classId: "CLS-12A",
      gender: "Male",
      dateOfBirth: "2008-01-30",
      enrollmentDate: "2022-09-01",
      email: "ethan.w@student.apexacademy.edu",
      guardianName: "Patricia Walker",
      guardianPhone: "+1 (555) 901-7788",
      guardianEmail: "patricia.w@example.com",
      address: "220 Maple Blvd, Springfield",
      status: "Active",
      bloodGroup: "B-",
      attendanceRate: 94
    },
    {
      id: "STU-2026-008",
      name: "Chloe Nakamura",
      admissionNumber: "ADM-202608",
      classId: "CLS-12A",
      gender: "Female",
      dateOfBirth: "2008-05-19",
      enrollmentDate: "2022-09-01",
      email: "chloe.n@student.apexacademy.edu",
      guardianName: "Kenji Nakamura",
      guardianPhone: "+1 (555) 901-8899",
      guardianEmail: "kenji.n@example.com",
      address: "77 Pinecrest Rd, Springfield",
      status: "Active",
      bloodGroup: "O+",
      attendanceRate: 97
    }
  ],
  attendance: [
    {
      date: "2026-10-02",
      classId: "CLS-10A",
      records: [
        { studentId: "STU-2026-001", status: "Present" },
        { studentId: "STU-2026-002", status: "Present" }
      ]
    },
    {
      date: "2026-10-02",
      classId: "CLS-10B",
      records: [
        { studentId: "STU-2026-003", status: "Present" },
        { studentId: "STU-2026-004", status: "Late" }
      ]
    },
    {
      date: "2026-10-02",
      classId: "CLS-11A",
      records: [
        { studentId: "STU-2026-005", status: "Present" },
        { studentId: "STU-2026-006", status: "Present" }
      ]
    },
    {
      date: "2026-10-02",
      classId: "CLS-12A",
      records: [
        { studentId: "STU-2026-007", status: "Excused" },
        { studentId: "STU-2026-008", status: "Present" }
      ]
    }
  ]
};

