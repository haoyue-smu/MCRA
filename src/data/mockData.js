// Mock data for SCIS Smart Planner

export const courses = [
  {
    id: 'IS111',
    name: 'Introduction to Programming',
    professor: 'Dr. Lee Wei Ming',
    credits: 1.0,
    demand: 'High',
    demandCount: 156,
    capacity: 120,
    suEligible: true,
    description: 'Fundamental programming concepts using Python',
    assessments: [
      { type: 'Quiz', date: '2025-02-15', weight: 10 },
      { type: 'Quiz', date: '2025-03-01', weight: 10 },
      { type: 'Midterm', date: '2025-03-15', weight: 25 },
      { type: 'Project', date: '2025-04-10', weight: 25 },
      { type: 'Final', date: '2025-04-28', weight: 30 }
    ],
    schedule: [
      { day: 'Monday', time: '08:15-11:15', location: 'SOE/SCIS1 SR B1-1' },
      { day: 'Thursday', time: '08:15-09:30', location: 'SOE/SCIS1 SR B1-1' }
    ],
    prerequisites: [],
    bidHistory: [
      { term: '2024-25 T2', minBid: 45, avgBid: 78, maxBid: 120 },
      { term: '2023-24 T3', minBid: 42, avgBid: 72, maxBid: 115 }
    ],
    careerPaths: ['Software Developer', 'Data Analyst', 'System Analyst'],
    skills: ['Python', 'Problem Solving', 'Algorithmic Thinking'],
    afterClassRating: 4.2,
    workload: 'High',
    difficulty: 'Medium'
  },
  {
    id: 'IS112',
    name: 'Data Management',
    professor: 'Prof. Sarah Tan',
    credits: 1.0,
    demand: 'Medium',
    demandCount: 98,
    capacity: 100,
    suEligible: true,
    description: 'Database design, SQL, and data modeling',
    assessments: [
      { type: 'Quiz', date: '2025-02-20', weight: 15 },
      { type: 'Lab', date: '2025-03-05', weight: 20 },
      { type: 'Midterm', date: '2025-03-20', weight: 25 },
      { type: 'Project', date: '2025-04-15', weight: 20 },
      { type: 'Final', date: '2025-05-01', weight: 20 }
    ],
    schedule: [
      { day: 'Tuesday', time: '12:00-15:00', location: 'SCIS1 SR 3-1' },
      { day: 'Friday', time: '12:00-13:15', location: 'SCIS1 SR 3-1' }
    ],
    prerequisites: ['IS111'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 35, avgBid: 65, maxBid: 95 },
      { term: '2023-24 T3', minBid: 30, avgBid: 60, maxBid: 90 }
    ],
    careerPaths: ['Database Administrator', 'Data Engineer', 'Business Analyst'],
    skills: ['SQL', 'Database Design', 'Data Modeling'],
    afterClassRating: 4.5,
    workload: 'Medium',
    difficulty: 'Medium'
  },
  {
    id: 'IS210',
    name: 'Business Process Analysis & Solutioning',
    professor: 'Dr. James Wong',
    credits: 1.0,
    demand: 'High',
    demandCount: 142,
    capacity: 110,
    suEligible: false,
    description: 'Analyze and design business processes',
    assessments: [
      { type: 'Quiz', date: '2025-02-18', weight: 10 },
      { type: 'Quiz', date: '2025-03-08', weight: 10 },
      { type: 'Group Project', date: '2025-03-25', weight: 30 },
      { type: 'Midterm', date: '2025-03-22', weight: 20 },
      { type: 'Final', date: '2025-05-03', weight: 30 }
    ],
    schedule: [
      { day: 'Wednesday', time: '15:30-18:30', location: 'SCIS1 SR 2-4' }
    ],
    prerequisites: ['IS111', 'IS112'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 55, avgBid: 85, maxBid: 135 },
      { term: '2023-24 T3', minBid: 50, avgBid: 80, maxBid: 130 }
    ],
    careerPaths: ['Business Analyst', 'Process Consultant', 'Systems Analyst'],
    skills: ['Business Process Modeling', 'Requirements Analysis', 'Process Optimization'],
    afterClassRating: 4.0,
    workload: 'Very High',
    difficulty: 'Hard'
  },
  {
    id: 'IS216',
    name: 'Web Application Development I',
    professor: 'Dr. Chen Yixuan',
    credits: 1.0,
    demand: 'Very High',
    demandCount: 189,
    capacity: 120,
    suEligible: true,
    description: 'Full-stack web development with modern frameworks',
    assessments: [
      { type: 'Quiz', date: '2025-02-22', weight: 10 },
      { type: 'Quiz', date: '2025-03-10', weight: 10 },
      { type: 'Lab', date: '2025-03-18', weight: 15 },
      { type: 'Project', date: '2025-04-12', weight: 35 },
      { type: 'Final', date: '2025-04-30', weight: 30 }
    ],
    schedule: [
      { day: 'Monday', time: '15:30-18:30', location: 'SCIS1 Lab 1' },
      { day: 'Thursday', time: '15:30-16:45', location: 'SCIS1 Lab 1' }
    ],
    prerequisites: ['IS111'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 65, avgBid: 95, maxBid: 150 },
      { term: '2023-24 T3', minBid: 60, avgBid: 90, maxBid: 145 }
    ],
    careerPaths: ['Full-Stack Developer', 'Frontend Developer', 'Web Designer'],
    skills: ['JavaScript', 'React', 'Node.js', 'HTML/CSS'],
    afterClassRating: 4.7,
    workload: 'Very High',
    difficulty: 'Hard'
  },
  {
    id: 'IS424',
    name: 'Information Security Management',
    professor: 'Prof. Kumar Raj',
    credits: 1.0,
    demand: 'Medium',
    demandCount: 75,
    capacity: 80,
    suEligible: true,
    description: 'Security principles, risk management, and compliance',
    assessments: [
      { type: 'Quiz', date: '2025-02-25', weight: 15 },
      { type: 'Case Study', date: '2025-03-12', weight: 20 },
      { type: 'Midterm', date: '2025-03-28', weight: 25 },
      { type: 'Group Project', date: '2025-04-18', weight: 20 },
      { type: 'Final', date: '2025-05-05', weight: 20 }
    ],
    schedule: [
      { day: 'Tuesday', time: '19:00-22:00', location: 'SCIS1 SR 3-2' }
    ],
    prerequisites: ['IS210', 'IS216'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 25, avgBid: 50, maxBid: 80 },
      { term: '2023-24 T3', minBid: 22, avgBid: 48, maxBid: 75 }
    ],
    careerPaths: ['Security Analyst', 'Risk Manager', 'Compliance Officer'],
    skills: ['Security Analysis', 'Risk Assessment', 'Compliance'],
    afterClassRating: 4.3,
    workload: 'Medium',
    difficulty: 'Medium'
  },
  {
    id: 'IS445',
    name: 'Artificial Intelligence & Machine Learning',
    professor: 'Dr. Lim Mei Ling',
    credits: 1.0,
    demand: 'Very High',
    demandCount: 201,
    capacity: 100,
    suEligible: false,
    description: 'AI concepts, ML algorithms, and practical applications',
    assessments: [
      { type: 'Quiz', date: '2025-02-28', weight: 10 },
      { type: 'Quiz', date: '2025-03-14', weight: 10 },
      { type: 'Assignment', date: '2025-03-30', weight: 20 },
      { type: 'Project', date: '2025-04-20', weight: 30 },
      { type: 'Final', date: '2025-05-08', weight: 30 }
    ],
    schedule: [
      { day: 'Friday', time: '15:30-18:30', location: 'SCIS1 SR 2-1' }
    ],
    prerequisites: ['IS111', 'STAT151'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 85, avgBid: 120, maxBid: 180 },
      { term: '2023-24 T3', minBid: 80, avgBid: 115, maxBid: 175 }
    ],
    careerPaths: ['ML Engineer', 'Data Scientist', 'AI Researcher'],
    skills: ['Python', 'Machine Learning', 'Deep Learning', 'TensorFlow'],
    afterClassRating: 4.8,
    workload: 'Very High',
    difficulty: 'Very Hard'
  }
];

export const studentCart = [];

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
    recommendedCourses: ['IS111', 'IS112', 'IS216', 'IS424'],
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
