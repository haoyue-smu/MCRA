// Mock data for SCIS Smart Planner

export const courses = [
  {
    id: 'IS111',
    name: 'Introduction to Programming',
    professor: 'Dr. Lee Wei Ming',
    credits: 1.0,
    moduleType: 'Core',
    demand: 'High',
    demandCount: 156,
    capacity: 120,
    subscribers: 189,
    suEligible: false,
    description: 'Fundamental programming concepts using Python',
    assessments: [
      { type: 'Class Participation', date: '2025-04-28', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-15', weight: 10, title: 'Variables & Data Types' },
      { type: 'Quiz 2', date: '2025-03-01', weight: 10, title: 'Control Structures' },
      { type: 'Midterm Exam', date: '2025-03-15', weight: 25, title: 'Written Exam' },
      { type: 'Project', date: '2025-04-10', weight: 30, title: 'Python Application Development' },
      { type: 'Final Exam', date: '2025-04-28', weight: 15, title: 'Practical Coding Exam' }
    ],
    schedule: [
      { day: 'Monday', time: '08:15-11:15', location: 'SOE/SCIS1 SR B1-1' }
    ],
    prerequisites: [],
    bidHistory: [
      { term: '2024-25 T2', minBid: 22, avgBid: 35, maxBid: 48 },
      { term: '2024-25 T1', minBid: 21, avgBid: 34, maxBid: 47 },
      { term: '2023-24 T3', minBid: 21, avgBid: 33, maxBid: 46 },
      { term: '2023-24 T2', minBid: 20, avgBid: 32, maxBid: 45 }
    ],
    yearlyAverage: 34,
    bidRange: '20-48 e$',
    careerPaths: ['Software Developer', 'Data Analyst', 'System Analyst'],
    skills: ['Python', 'Problem Solving', 'Algorithmic Thinking'],
    afterClassRating: 4.2,
    workload: 'High',
    difficulty: 3,
    tags: ['Programming', 'Project-Heavy', 'Beginner-Friendly']
  },
  {
    id: 'IS112',
    name: 'Data Management',
    professor: 'Prof. Sarah Tan',
    credits: 1.0,
    moduleType: 'Core',
    demand: 'Medium',
    demandCount: 98,
    capacity: 100,
    subscribers: 112,
    suEligible: false,
    description: 'Database design, SQL, and data modeling',
    assessments: [
      { type: 'Class Participation', date: '2025-05-01', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-20', weight: 15, title: 'SQL Basics & ER Modeling' },
      { type: 'Lab Assignment', date: '2025-03-05', weight: 15, title: 'Database Design Project' },
      { type: 'Midterm Exam', date: '2025-03-20', weight: 25, title: 'Written Exam' },
      { type: 'Project', date: '2025-04-15', weight: 35, title: 'Database Implementation' }
    ],
    schedule: [
      { day: 'Tuesday', time: '12:00-15:00', location: 'SCIS1 SR 3-1' }
    ],
    prerequisites: ['IS111'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 20, avgBid: 30, maxBid: 42 },
      { term: '2024-25 T1', minBid: 20, avgBid: 29, maxBid: 41 },
      { term: '2023-24 T3', minBid: 20, avgBid: 28, maxBid: 40 },
      { term: '2023-24 T2', minBid: 20, avgBid: 27, maxBid: 39 }
    ],
    yearlyAverage: 29,
    bidRange: '20-42 e$',
    careerPaths: ['Database Administrator', 'Data Engineer', 'Business Analyst'],
    skills: ['SQL', 'Database Design', 'Data Modeling'],
    afterClassRating: 4.5,
    workload: 'Medium',
    difficulty: 3,
    tags: ['Database', 'Project-Heavy', 'Beginner-Friendly']
  },
  {
    id: 'IS210',
    name: 'Business Process Analysis & Solutioning',
    professor: 'Dr. James Wong',
    credits: 1.0,
    moduleType: 'Core',
    demand: 'High',
    demandCount: 142,
    capacity: 110,
    subscribers: 167,
    suEligible: false,
    description: 'Analyze and design business processes',
    assessments: [
      { type: 'Class Participation', date: '2025-05-03', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-18', weight: 10, title: 'Process Modeling Fundamentals' },
      { type: 'Quiz 2', date: '2025-03-08', weight: 10, title: 'Requirements Engineering' },
      { type: 'Midterm Exam', date: '2025-03-22', weight: 25, title: 'Written Exam' },
      { type: 'Group Project', date: '2025-05-03', weight: 45, title: 'Business Process Redesign' }
    ],
    schedule: [
      { day: 'Wednesday', time: '15:30-18:30', location: 'SCIS1 SR 2-4' }
    ],
    prerequisites: ['IS111', 'IS112'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 25, avgBid: 38, maxBid: 50 },
      { term: '2024-25 T1', minBid: 24, avgBid: 37, maxBid: 49 },
      { term: '2023-24 T3', minBid: 24, avgBid: 36, maxBid: 48 },
      { term: '2023-24 T2', minBid: 23, avgBid: 35, maxBid: 47 }
    ],
    yearlyAverage: 37,
    bidRange: '23-50 e$',
    careerPaths: ['Business Analyst', 'Process Consultant', 'Systems Analyst'],
    skills: ['Business Process Modeling', 'Requirements Analysis', 'Process Optimization'],
    afterClassRating: 4.0,
    workload: 'Very High',
    difficulty: 4,
    tags: ['Business Focus', 'Group Work', 'Theory-Heavy']
  },
  {
    id: 'IS216',
    name: 'Web Application Development I',
    professor: 'Dr. Chen Yixuan',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'Very High',
    demandCount: 189,
    capacity: 120,
    subscribers: 215,
    suEligible: true,
    description: 'Full-stack web development with modern frameworks',
    assessments: [
      { type: 'Class Participation', date: '2025-04-30', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-22', weight: 10, title: 'HTML/CSS & JavaScript Basics' },
      { type: 'Quiz 2', date: '2025-03-10', weight: 10, title: 'React Fundamentals' },
      { type: 'Midterm Exam', date: '2025-03-18', weight: 20, title: 'Written Exam' },
      { type: 'Project', date: '2025-04-12', weight: 35, title: 'Full-Stack Web Application' },
      { type: 'Final Exam', date: '2025-04-30', weight: 15, title: 'Practical Coding Exam' }
    ],
    schedule: [
      { day: 'Monday', time: '15:30-18:30', location: 'SCIS1 Lab 1' }
    ],
    prerequisites: ['IS111'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 28, avgBid: 42, maxBid: 50 },
      { term: '2024-25 T1', minBid: 27, avgBid: 41, maxBid: 50 },
      { term: '2023-24 T3', minBid: 26, avgBid: 40, maxBid: 50 },
      { term: '2023-24 T2', minBid: 25, avgBid: 39, maxBid: 50 }
    ],
    yearlyAverage: 41,
    bidRange: '25-50 e$',
    careerPaths: ['Full-Stack Developer', 'Frontend Developer', 'Web Designer'],
    skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS'],
    afterClassRating: 4.7,
    workload: 'Very High',
    difficulty: 4,
    tags: ['Web Development', 'Programming', 'Project-Heavy']
  },
  {
    id: 'IS424',
    name: 'Information Security Management',
    professor: 'Prof. Kumar Raj',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'Medium',
    demandCount: 75,
    capacity: 80,
    subscribers: 89,
    suEligible: true,
    description: 'Security principles, risk management, and compliance',
    assessments: [
      { type: 'Class Participation', date: '2025-05-05', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-25', weight: 15, title: 'Security Fundamentals' },
      { type: 'Case Study', date: '2025-03-12', weight: 20, title: 'Security Breach Analysis' },
      { type: 'Midterm Exam', date: '2025-03-28', weight: 20, title: 'Written Exam' },
      { type: 'Group Project', date: '2025-05-05', weight: 35, title: 'Security Audit Report' }
    ],
    schedule: [
      { day: 'Tuesday', time: '19:00-22:00', location: 'SCIS1 SR 3-2' }
    ],
    prerequisites: ['IS210', 'IS216'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 20, avgBid: 28, maxBid: 38 },
      { term: '2024-25 T1', minBid: 20, avgBid: 27, maxBid: 37 },
      { term: '2023-24 T3', minBid: 20, avgBid: 27, maxBid: 36 },
      { term: '2023-24 T2', minBid: 20, avgBid: 26, maxBid: 35 }
    ],
    yearlyAverage: 27,
    bidRange: '20-38 e$',
    careerPaths: ['Security Analyst', 'Risk Manager', 'Compliance Officer'],
    skills: ['Security Analysis', 'Risk Assessment', 'Compliance'],
    afterClassRating: 4.3,
    workload: 'Medium',
    difficulty: 4,
    tags: ['Security', 'Networking', 'Theory-Heavy']
  },
  {
    id: 'IS445',
    name: 'Artificial Intelligence & Machine Learning',
    professor: 'Dr. Lim Mei Ling',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'Very High',
    demandCount: 201,
    capacity: 100,
    suEligible: false,
    subscribers: 245,
    description: 'AI concepts, ML algorithms, and practical applications',
    assessments: [
      { type: 'Class Participation', date: '2025-05-08', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-28', weight: 10, title: 'ML Fundamentals' },
      { type: 'Quiz 2', date: '2025-03-14', weight: 10, title: 'Neural Networks' },
      { type: 'Assignment', date: '2025-03-30', weight: 20, title: 'Algorithm Implementation' },
      { type: 'Project', date: '2025-04-20', weight: 30, title: 'ML Application Development' },
      { type: 'Final Exam', date: '2025-05-08', weight: 20, title: 'Comprehensive Exam' }
    ],
    schedule: [
      { day: 'Friday', time: '15:30-18:30', location: 'SCIS1 SR 2-1' }
    ],
    prerequisites: ['IS111', 'STAT151'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 32, avgBid: 45, maxBid: 50 },
      { term: '2024-25 T1', minBid: 31, avgBid: 44, maxBid: 50 },
      { term: '2023-24 T3', minBid: 30, avgBid: 43, maxBid: 50 },
      { term: '2023-24 T2', minBid: 29, avgBid: 42, maxBid: 50 }
    ],
    yearlyAverage: 44,
    bidRange: '29-50 e$',
    careerPaths: ['ML Engineer', 'Data Scientist', 'AI Researcher'],
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow'],
    afterClassRating: 4.8,
    workload: 'Very High',
    difficulty: 5,
    tags: ['AI/ML', 'Programming', 'Advanced']
  },
  {
    id: 'IS213',
    name: 'Object Oriented Programming',
    professor: 'Dr. Patricia Ng',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'High',
    demandCount: 165,
    capacity: 130,
    suEligible: true,
    description: 'Advanced OOP concepts, design patterns, and Java programming',
    subscribers: 198,
    assessments: [
      { type: 'Class Participation', date: '2025-05-02', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-17', weight: 12, title: 'OOP Principles' },
      { type: 'Quiz 2', date: '2025-03-03', weight: 13, title: 'Design Patterns' },
      { type: 'Midterm Exam', date: '2025-03-17', weight: 20, title: 'Written Exam' },
      { type: 'Project', date: '2025-04-14', weight: 30, title: 'OOP Application Design' },
      { type: 'Final Exam', date: '2025-05-02', weight: 15, title: 'Practical Exam' }
    ],
    schedule: [
      { day: 'Tuesday', time: '08:15-11:15', location: 'SCIS1 SR 2-2' }
    ],
    prerequisites: ['IS111'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 24, avgBid: 37, maxBid: 48 },
      { term: '2024-25 T1', minBid: 23, avgBid: 36, maxBid: 47 },
      { term: '2023-24 T3', minBid: 23, avgBid: 35, maxBid: 46 },
      { term: '2023-24 T2', minBid: 22, avgBid: 34, maxBid: 45 }
    ],
    yearlyAverage: 36,
    bidRange: '22-48 e$',
    careerPaths: ['Software Engineer', 'Backend Developer', 'Systems Architect'],
    skills: ['Java', 'OOP Design', 'Design Patterns', 'Software Architecture'],
    afterClassRating: 4.4,
    workload: 'High',
    difficulty: 3,
    tags: ['Programming', 'Project-Heavy', 'Individual Work']
  },
  {
    id: 'IS442',
    name: 'Cloud Management and Engineering',
    professor: 'Prof. Michael Chen',
    credits: 1.0,
    moduleType: 'Free Elective',
    demand: 'Very High',
    demandCount: 178,
    capacity: 90,
    suEligible: true,
    description: 'Cloud computing platforms, infrastructure management, and DevOps practices',
    subscribers: 203,
    assessments: [
      { type: 'Class Participation', date: '2025-05-06', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-24', weight: 15, title: 'Cloud Fundamentals & AWS Services' },
      { type: 'Lab Assignment', date: '2025-03-24', weight: 20, title: 'Cloud Deployment' },
      { type: 'Group Project', date: '2025-04-21', weight: 35, title: 'Cloud Architecture Design' },
      { type: 'Final Exam', date: '2025-05-06', weight: 20, title: 'Practical Exam' }
    ],
    schedule: [
      { day: 'Wednesday', time: '12:00-15:00', location: 'SCIS1 Lab 2' }
    ],
    prerequisites: ['IS210', 'IS216'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 30, avgBid: 43, maxBid: 50 },
      { term: '2024-25 T1', minBid: 29, avgBid: 42, maxBid: 50 },
      { term: '2023-24 T3', minBid: 28, avgBid: 41, maxBid: 50 },
      { term: '2023-24 T2', minBid: 27, avgBid: 40, maxBid: 50 }
    ],
    yearlyAverage: 42,
    bidRange: '27-50 e$',
    careerPaths: ['Cloud Engineer', 'DevOps Engineer', 'Solutions Architect'],
    skills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD'],
    afterClassRating: 4.6,
    workload: 'Very High',
    difficulty: 4,
    tags: ['Networking', 'Project-Heavy', 'Group Work', 'Advanced']
  },
  {
    id: 'IS214',
    name: 'Business Intelligence Systems',
    professor: 'Dr. Andrew Lim',
    credits: 1.0,
    moduleType: 'Core',
    demand: 'High',
    demandCount: 135,
    capacity: 120,
    subscribers: 158,
    suEligible: false,
    description: 'Data warehousing, ETL processes, and business analytics',
    assessments: [
      { type: 'Class Participation', date: '2025-04-28', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-19', weight: 15, title: 'Data Warehousing Concepts' },
      { type: 'Lab Assignment', date: '2025-03-06', weight: 20, title: 'ETL Design' },
      { type: 'Midterm Exam', date: '2025-03-21', weight: 20, title: 'Written Exam' },
      { type: 'Project', date: '2025-04-28', weight: 35, title: 'BI Dashboard Development' }
    ],
    schedule: [
      { day: 'Monday', time: '12:00-15:00', location: 'SCIS1 SR 2-3' }
    ],
    prerequisites: ['IS112'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 23, avgBid: 33, maxBid: 45 },
      { term: '2024-25 T1', minBid: 22, avgBid: 32, maxBid: 44 },
      { term: '2023-24 T3', minBid: 22, avgBid: 31, maxBid: 43 },
      { term: '2023-24 T2', minBid: 21, avgBid: 30, maxBid: 42 }
    ],
    yearlyAverage: 32,
    bidRange: '21-45 e$',
    careerPaths: ['BI Developer', 'Data Analyst', 'Analytics Consultant'],
    skills: ['SQL', 'ETL', 'Data Visualization', 'Business Analytics'],
    afterClassRating: 4.1,
    workload: 'High',
    difficulty: 3,
    tags: ['Analytics', 'Data Visualization', 'Database']
  },
  {
    id: 'IS428',
    name: 'IT Solution Architecture',
    professor: 'Prof. David Tan',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'Medium',
    demandCount: 92,
    capacity: 100,
    subscribers: 107,
    suEligible: true,
    description: 'Enterprise architecture frameworks, solution design, and IT strategy',
    assessments: [
      { type: 'Class Participation', date: '2025-04-28', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-26', weight: 15, title: 'Architecture Frameworks' },
      { type: 'Case Study', date: '2025-03-13', weight: 20, title: 'Enterprise Architecture Analysis' },
      { type: 'Midterm Exam', date: '2025-03-27', weight: 25, title: 'Written Exam' },
      { type: 'Group Project', date: '2025-04-28', weight: 30, title: 'Solution Architecture Design' }
    ],
    schedule: [
      { day: 'Monday', time: '12:00-15:00', location: 'SCIS1 SR 3-4' }
    ],
    prerequisites: ['IS210', 'IS213'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 21, avgBid: 29, maxBid: 40 },
      { term: '2024-25 T1', minBid: 20, avgBid: 28, maxBid: 39 },
      { term: '2023-24 T3', minBid: 20, avgBid: 27, maxBid: 38 },
      { term: '2023-24 T2', minBid: 20, avgBid: 26, maxBid: 37 }
    ],
    yearlyAverage: 28,
    bidRange: '20-40 e$',
    careerPaths: ['Solution Architect', 'Enterprise Architect', 'IT Consultant'],
    skills: ['Architecture Design', 'System Integration', 'IT Strategy'],
    afterClassRating: 4.2,
    workload: 'Medium',
    difficulty: 4,
    tags: ['Theory-Heavy', 'Group Work', 'Business Focus']
  },
  {
    id: 'IS315',
    name: 'Mobile Application Development',
    professor: 'Dr. Rachel Koh',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'Very High',
    demandCount: 187,
    capacity: 110,
    subscribers: 221,
    suEligible: true,
    description: 'Native and cross-platform mobile app development for iOS and Android',
    assessments: [
      { type: 'Class Participation', date: '2025-05-01', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-21', weight: 10, title: 'Mobile UI/UX Fundamentals' },
      { type: 'Quiz 2', date: '2025-03-07', weight: 10, title: 'React Native Basics' },
      { type: 'Lab Assignment', date: '2025-03-19', weight: 15, title: 'Mobile Components' },
      { type: 'Project', date: '2025-04-11', weight: 40, title: 'Full Mobile Application' },
      { type: 'Final Exam', date: '2025-05-01', weight: 15, title: 'Practical Exam' }
    ],
    schedule: [
      { day: 'Tuesday', time: '15:30-18:30', location: 'SCIS1 Lab 3' }
    ],
    prerequisites: ['IS111', 'IS216'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 27, avgBid: 40, maxBid: 50 },
      { term: '2024-25 T1', minBid: 26, avgBid: 39, maxBid: 50 },
      { term: '2023-24 T3', minBid: 25, avgBid: 38, maxBid: 50 },
      { term: '2023-24 T2', minBid: 24, avgBid: 37, maxBid: 50 }
    ],
    yearlyAverage: 39,
    bidRange: '24-50 e$',
    careerPaths: ['Mobile Developer', 'iOS Developer', 'Android Developer'],
    skills: ['React Native', 'Swift', 'Kotlin', 'Mobile UI/UX'],
    afterClassRating: 4.7,
    workload: 'Very High',
    difficulty: 4,
    tags: ['Programming', 'Web Development', 'Project-Heavy']
  }
];

// Default cart with sample courses shown on login
// Setup to demonstrate:
// - IS214 and IS428 have same exam date (2025-04-28) AND same class time (Monday 12:00-15:00)
// - IS428 has missing prerequisites (requires IS210 and IS213, which student hasn't completed)
export const studentCart = [
  courses.find(c => c.id === 'IS214'),
  courses.find(c => c.id === 'IS428'),
  courses.find(c => c.id === 'IS216')
].filter(Boolean); // Filter out any undefined values

export const studentTimetable = [];

export const publicHolidays = [
  { date: '2025-02-10', name: 'Chinese New Year', affectedClasses: [] },
  { date: '2025-02-11', name: 'Chinese New Year', affectedClasses: [] },
  { date: '2025-04-18', name: 'Good Friday', affectedClasses: [] },
  { date: '2025-05-01', name: 'Labour Day', affectedClasses: [] }
];

export const careerPaths = [
  {
    id: 'software-dev',
    title: 'Software Developer',
    description: 'Design, develop, and maintain software applications',
    requiredSkills: ['Python', 'JavaScript', 'Problem Solving', 'Data Structures'],
    recommendedCourses: ['IS111', 'IS112', 'IS213', 'IS216', 'IS424'],
    averageSalary: '$4,500 - $7,000',
    jobOpenings: 234,
    growthRate: '+15%'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Extract insights from data using statistical and ML techniques',
    requiredSkills: ['Python', 'Machine Learning', 'Statistics', 'SQL'],
    recommendedCourses: ['IS111', 'IS112', 'IS445'],
    averageSalary: '$5,000 - $8,500',
    jobOpenings: 189,
    growthRate: '+22%'
  },
  {
    id: 'business-analyst',
    title: 'Business Analyst',
    description: 'Bridge gap between business needs and technical solutions',
    requiredSkills: ['Business Process Modeling', 'Requirements Analysis', 'SQL'],
    recommendedCourses: ['IS112', 'IS210', 'IS424'],
    averageSalary: '$4,000 - $6,500',
    jobOpenings: 167,
    growthRate: '+12%'
  },
  {
    id: 'security-analyst',
    title: 'Security Analyst',
    description: 'Protect organizations from cybersecurity threats',
    requiredSkills: ['Security Analysis', 'Risk Assessment', 'Network Security'],
    recommendedCourses: ['IS210', 'IS424'],
    averageSalary: '$4,500 - $7,500',
    jobOpenings: 142,
    growthRate: '+18%'
  },
  {
    id: 'cloud-engineer',
    title: 'Cloud Engineer',
    description: 'Design and manage cloud infrastructure and services',
    requiredSkills: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'DevOps'],
    recommendedCourses: ['IS111', 'IS213', 'IS216', 'IS442'],
    averageSalary: '$5,500 - $9,000',
    jobOpenings: 198,
    growthRate: '+28%'
  }
];

export const impactMetrics = {
  studentSatisfaction: { value: 87, change: '+12%', trend: 'up' },
  retentionRate: { value: 94, change: '+5%', trend: 'up' },
  facultyResponseTime: { value: 2.3, change: '-35%', trend: 'down', unit: 'hours' },
  enrollmentConversion: { value: 92, change: '+8%', trend: 'up' },
  gpaStressScore: { value: 3.2, change: '-24%', trend: 'down', unit: '/10' }
};

export const suPolicy = {
  title: 'S/U Policy Overview',
  rules: [
    'Students can S/U up to 12 Course Units (CUs) throughout their undergraduate study',
    'Core modules and major requirements cannot be S/U-ed',
    'Final semester courses cannot be S/U-ed',
    'S/U must be declared within the first 2 weeks of term',
    'Minimum grade of D is required to obtain Satisfactory',
    'S/U courses do not count towards GPA calculation'
  ],
  benefits: [
    'Explore new subjects without GPA risk',
    'Reduce academic stress and anxiety',
    'Encourage interdisciplinary learning',
    'Allow focus on major courses'
  ]
};

// Student Progress Data
export const studentProgress = {
  totalCreditsRequired: 120,
  creditsCompleted: 90,
  creditsByType: {
    core: { completed: 30, required: 36 },
    majorElective: { completed: 45, required: 48 },
    freeElective: { completed: 15, required: 36 }
  },
  currentSemester: 'Term 3 2024-25',
  yearLevel: 'Year 3'
};

// Program Requirements
export const programRequirements = [
  {
    category: 'Core Modules',
    required: 36,
    completed: 30,
    modules: [
      { id: 'IS111', name: 'Introduction to Programming', status: 'completed' },
      { id: 'IS112', name: 'Data Management', status: 'completed' },
      { id: 'IS210', name: 'Business Process Analysis & Solutioning', status: 'in_cart' },
      { id: 'IS214', name: 'Business Intelligence Systems', status: 'pending' },
      { id: 'STAT151', name: 'Introduction to Statistics', status: 'completed' },
      { id: 'COMM101', name: 'Communication & Pitching', status: 'completed' }
    ]
  },
  {
    category: 'Major Electives',
    required: 48,
    completed: 45,
    modules: [
      { id: 'IS216', name: 'Web Application Development I', status: 'in_cart' },
      { id: 'IS213', name: 'Object Oriented Programming', status: 'pending' },
      { id: 'IS424', name: 'Information Security Management', status: 'pending' },
      { id: 'IS445', name: 'Artificial Intelligence & Machine Learning', status: 'pending' }
    ]
  },
  {
    category: 'Free Electives',
    required: 36,
    completed: 15,
    modules: [
      { id: 'IS442', name: 'Cloud Management and Engineering', status: 'pending' },
      { id: 'ECON101', name: 'Introduction to Economics', status: 'completed' },
      { id: 'MGMT101', name: 'Principles of Management', status: 'completed' }
    ]
  }
];
