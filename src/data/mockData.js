// Mock data for BOSS Smart Planner

export const courses = [
  {
    id: 'IS111',
    name: 'Introduction to Programming',
    professor: 'Prof. Lee Wei Ming',
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
      { term: '2024-25 T2', minBid: 18, avgBid: 32, maxBid: 38 },
      { term: '2024-25 T1', minBid: 17, avgBid: 31, maxBid: 37 },
      { term: '2023-24 T3', minBid: 16, avgBid: 30, maxBid: 36 },
      { term: '2023-24 T2', minBid: 15, avgBid: 29, maxBid: 35 }
    ],
    yearlyAverage: 32,
    bidRange: '15-38 e$',
    weeklyHours: '9-12 hrs/week',
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
      { term: '2024-25 T2', minBid: 15, avgBid: 25, maxBid: 35 },
      { term: '2024-25 T1', minBid: 15, avgBid: 24, maxBid: 34 },
      { term: '2023-24 T3', minBid: 15, avgBid: 23, maxBid: 33 },
      { term: '2023-24 T2', minBid: 15, avgBid: 22, maxBid: 32 }
    ],
    yearlyAverage: 25,
    bidRange: '15-35 e$',
    weeklyHours: '6-9 hrs/week',
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
    professor: 'Prof. James Wong',
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
      { term: '2024-25 T2', minBid: 20, avgBid: 33, maxBid: 42 },
      { term: '2024-25 T1', minBid: 19, avgBid: 32, maxBid: 41 },
      { term: '2023-24 T3', minBid: 19, avgBid: 31, maxBid: 40 },
      { term: '2023-24 T2', minBid: 18, avgBid: 30, maxBid: 39 }
    ],
    yearlyAverage: 33,
    bidRange: '18-42 e$',
    weeklyHours: '12-15 hrs/week',
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
    professor: 'Prof. Chen Yixuan',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'Very High',
    demandCount: 189,
    capacity: 120,
    subscribers: 215,
    suEligible: true,
    demandChange: { type: 'increase', previousDemandCount: 165, changePercent: 15, suggestedBid: 38 },
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
      { term: '2024-25 T2', minBid: 20, avgBid: 35, maxBid: 45 },
      { term: '2024-25 T1', minBid: 20, avgBid: 34, maxBid: 44 },
      { term: '2023-24 T3', minBid: 19, avgBid: 33, maxBid: 43 },
      { term: '2023-24 T2', minBid: 19, avgBid: 32, maxBid: 42 }
    ],
    yearlyAverage: 35,
    bidRange: '19-45 e$',
    weeklyHours: '12-15 hrs/week',
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
      { term: '2024-25 T2', minBid: 15, avgBid: 24, maxBid: 32 },
      { term: '2024-25 T1', minBid: 15, avgBid: 23, maxBid: 31 },
      { term: '2023-24 T3', minBid: 15, avgBid: 23, maxBid: 30 },
      { term: '2023-24 T2', minBid: 15, avgBid: 22, maxBid: 29 }
    ],
    yearlyAverage: 24,
    bidRange: '15-32 e$',
    weeklyHours: '6-9 hrs/week',
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
    professor: 'Prof. Lim Mei Ling',
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
      { term: '2024-25 T2', minBid: 22, avgBid: 35, maxBid: 45 },
      { term: '2024-25 T1', minBid: 22, avgBid: 34, maxBid: 44 },
      { term: '2023-24 T3', minBid: 21, avgBid: 33, maxBid: 43 },
      { term: '2023-24 T2', minBid: 21, avgBid: 32, maxBid: 42 }
    ],
    yearlyAverage: 35,
    bidRange: '21-45 e$',
    weeklyHours: '12-15 hrs/week',
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
    professor: 'Prof. Patricia Ng',
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
      { term: '2024-25 T2', minBid: 18, avgBid: 31, maxBid: 40 },
      { term: '2024-25 T1', minBid: 17, avgBid: 30, maxBid: 39 },
      { term: '2023-24 T3', minBid: 17, avgBid: 29, maxBid: 38 },
      { term: '2023-24 T2', minBid: 16, avgBid: 28, maxBid: 37 }
    ],
    yearlyAverage: 31,
    bidRange: '16-40 e$',
    weeklyHours: '9-12 hrs/week',
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
      { term: '2024-25 T2', minBid: 20, avgBid: 34, maxBid: 45 },
      { term: '2024-25 T1', minBid: 20, avgBid: 33, maxBid: 44 },
      { term: '2023-24 T3', minBid: 19, avgBid: 32, maxBid: 43 },
      { term: '2023-24 T2', minBid: 19, avgBid: 31, maxBid: 42 }
    ],
    yearlyAverage: 34,
    bidRange: '19-45 e$',
    weeklyHours: '12-15 hrs/week',
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
    professor: 'Prof. Andrew Lim',
    credits: 1.0,
    moduleType: 'Core',
    demand: 'High',
    demandCount: 135,
    capacity: 120,
    subscribers: 158,
    suEligible: false,
    demandChange: { type: 'increase', previousDemandCount: 118, changePercent: 14, suggestedBid: 33 },
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
      { term: '2024-25 T2', minBid: 18, avgBid: 30, maxBid: 38 },
      { term: '2024-25 T1', minBid: 17, avgBid: 29, maxBid: 37 },
      { term: '2023-24 T3', minBid: 17, avgBid: 28, maxBid: 36 },
      { term: '2023-24 T2', minBid: 16, avgBid: 27, maxBid: 35 }
    ],
    yearlyAverage: 30,
    bidRange: '16-38 e$',
    weeklyHours: '9-12 hrs/week',
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
    demandChange: { type: 'decrease', previousDemandCount: 115, changePercent: -20, suggestedBid: 22 },
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
      { term: '2024-25 T2', minBid: 15, avgBid: 25, maxBid: 33 },
      { term: '2024-25 T1', minBid: 15, avgBid: 24, maxBid: 32 },
      { term: '2023-24 T3', minBid: 15, avgBid: 23, maxBid: 31 },
      { term: '2023-24 T2', minBid: 15, avgBid: 22, maxBid: 30 }
    ],
    yearlyAverage: 25,
    bidRange: '15-33 e$',
    weeklyHours: '6-9 hrs/week',
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
    professor: 'Prof. Rachel Koh',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'Very High',
    demandCount: 187,
    capacity: 110,
    subscribers: 221,
    suEligible: true,
    demandChange: { type: 'increase', previousDemandCount: 170, changePercent: 10, suggestedBid: 36 },
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
      { term: '2024-25 T2', minBid: 20, avgBid: 34, maxBid: 44 },
      { term: '2024-25 T1', minBid: 19, avgBid: 33, maxBid: 43 },
      { term: '2023-24 T3', minBid: 19, avgBid: 32, maxBid: 42 },
      { term: '2023-24 T2', minBid: 18, avgBid: 31, maxBid: 41 }
    ],
    yearlyAverage: 34,
    bidRange: '18-44 e$',
    weeklyHours: '12-15 hrs/week',
    careerPaths: ['Mobile Developer', 'iOS Developer', 'Android Developer'],
    skills: ['React Native', 'Swift', 'Kotlin', 'Mobile UI/UX'],
    afterClassRating: 4.7,
    workload: 'Very High',
    difficulty: 4,
    tags: ['Programming', 'Web Development', 'Project-Heavy']
  },
  {
    id: 'IS217',
    name: 'Web Application Development II',
    professor: 'Prof. Benjamin Tan',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'High',
    demandCount: 148,
    capacity: 110,
    subscribers: 165,
    suEligible: true,
    description: 'Advanced web development with microservices and cloud deployment',
    assessments: [
      { type: 'Class Participation', date: '2025-04-29', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-23', weight: 10, title: 'Microservices Architecture' },
      { type: 'Quiz 2', date: '2025-03-09', weight: 10, title: 'API Design' },
      { type: 'Lab Assignment', date: '2025-03-25', weight: 20, title: 'RESTful API Development' },
      { type: 'Project', date: '2025-04-16', weight: 35, title: 'Microservices Application' },
      { type: 'Final Exam', date: '2025-04-29', weight: 15, title: 'Practical Exam' }
    ],
    schedule: [
      { day: 'Thursday', time: '12:00-15:00', location: 'SCIS1 Lab 2' }
    ],
    prerequisites: ['IS216'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 18, avgBid: 30, maxBid: 38 },
      { term: '2024-25 T1', minBid: 17, avgBid: 29, maxBid: 37 },
      { term: '2023-24 T3', minBid: 17, avgBid: 28, maxBid: 36 },
      { term: '2023-24 T2', minBid: 16, avgBid: 27, maxBid: 35 }
    ],
    yearlyAverage: 30,
    bidRange: '16-38 e$',
    weeklyHours: '12-15 hrs/week',
    careerPaths: ['Backend Developer', 'Full-Stack Developer', 'API Developer'],
    skills: ['Node.js', 'Express', 'Microservices', 'REST APIs', 'Docker'],
    afterClassRating: 4.5,
    workload: 'Very High',
    difficulty: 4,
    tags: ['Web Development', 'Programming', 'Project-Heavy']
  },
  {
    id: 'IS415',
    name: 'Geospatial Analytics',
    professor: 'Prof. Kam Tin Seong',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'Low',
    demandCount: 45,
    capacity: 80,
    subscribers: 52,
    suEligible: true,
    description: 'Spatial data analysis and visualization techniques for geographic insights',
    assessments: [
      { type: 'Class Participation', date: '2025-05-07', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-27', weight: 15, title: 'GIS Fundamentals' },
      { type: 'Lab Assignment', date: '2025-03-15', weight: 20, title: 'Spatial Analysis' },
      { type: 'Project', date: '2025-04-18', weight: 35, title: 'Geospatial Application' },
      { type: 'Final Exam', date: '2025-05-07', weight: 20, title: 'Written Exam' }
    ],
    schedule: [
      { day: 'Friday', time: '08:15-11:15', location: 'SCIS1 Lab 4' }
    ],
    prerequisites: ['IS112'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 15, avgBid: 18, maxBid: 22 },
      { term: '2024-25 T1', minBid: 15, avgBid: 17, maxBid: 21 },
      { term: '2023-24 T3', minBid: 15, avgBid: 17, maxBid: 20 },
      { term: '2023-24 T2', minBid: 15, avgBid: 16, maxBid: 19 }
    ],
    yearlyAverage: 18,
    bidRange: '15-22 e$',
    weeklyHours: '9-12 hrs/week',
    careerPaths: ['GIS Analyst', 'Data Scientist', 'Urban Planner'],
    skills: ['R', 'Python', 'QGIS', 'Spatial Analysis', 'Data Visualization'],
    afterClassRating: 4.6,
    workload: 'High',
    difficulty: 3,
    tags: ['Analytics', 'Data Visualization', 'Specialized']
  },
  {
    id: 'IS429',
    name: 'Enterprise Systems and Process Automation',
    professor: 'Prof. Helen Chong',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'Medium',
    demandCount: 87,
    capacity: 90,
    subscribers: 96,
    suEligible: true,
    description: 'ERP systems, workflow automation, and enterprise integration',
    assessments: [
      { type: 'Class Participation', date: '2025-05-04', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-26', weight: 15, title: 'ERP Fundamentals' },
      { type: 'Case Study', date: '2025-03-16', weight: 20, title: 'Process Automation Analysis' },
      { type: 'Group Project', date: '2025-04-22', weight: 35, title: 'Enterprise System Implementation' },
      { type: 'Final Exam', date: '2025-05-04', weight: 20, title: 'Written Exam' }
    ],
    schedule: [
      { day: 'Wednesday', time: '08:15-11:15', location: 'SCIS1 SR 3-3' }
    ],
    prerequisites: ['IS210'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 15, avgBid: 23, maxBid: 29 },
      { term: '2024-25 T1', minBid: 15, avgBid: 22, maxBid: 28 },
      { term: '2023-24 T3', minBid: 15, avgBid: 22, maxBid: 27 },
      { term: '2023-24 T2', minBid: 15, avgBid: 21, maxBid: 26 }
    ],
    yearlyAverage: 23,
    bidRange: '15-29 e$',
    weeklyHours: '6-9 hrs/week',
    careerPaths: ['ERP Consultant', 'Business Process Manager', 'Systems Integrator'],
    skills: ['SAP', 'Process Automation', 'Business Process Management', 'Workflow Design'],
    afterClassRating: 4.2,
    workload: 'Medium',
    difficulty: 3,
    tags: ['Business Focus', 'Group Work', 'Theory-Heavy']
  },
  {
    id: 'IS434',
    name: 'Social Media and Network Analytics',
    professor: 'Prof. Vivian Chen',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'High',
    demandCount: 152,
    capacity: 100,
    subscribers: 178,
    suEligible: true,
    description: 'Social network analysis, sentiment analysis, and social media mining',
    assessments: [
      { type: 'Class Participation', date: '2025-04-27', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-02-16', weight: 15, title: 'Network Theory' },
      { type: 'Lab Assignment', date: '2025-03-11', weight: 20, title: 'Sentiment Analysis' },
      { type: 'Project', date: '2025-04-13', weight: 35, title: 'Social Network Analysis Project' },
      { type: 'Final Exam', date: '2025-04-27', weight: 20, title: 'Written Exam' }
    ],
    schedule: [
      { day: 'Monday', time: '19:00-22:00', location: 'SCIS1 Lab 3' }
    ],
    prerequisites: ['IS112', 'STAT151'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 18, avgBid: 29, maxBid: 36 },
      { term: '2024-25 T1', minBid: 17, avgBid: 28, maxBid: 35 },
      { term: '2023-24 T3', minBid: 17, avgBid: 27, maxBid: 34 },
      { term: '2023-24 T2', minBid: 16, avgBid: 26, maxBid: 33 }
    ],
    yearlyAverage: 29,
    bidRange: '16-36 e$',
    weeklyHours: '9-12 hrs/week',
    careerPaths: ['Social Media Analyst', 'Data Scientist', 'Marketing Analyst'],
    skills: ['Python', 'Network Analysis', 'NLP', 'Data Mining', 'Visualization'],
    afterClassRating: 4.4,
    workload: 'High',
    difficulty: 4,
    tags: ['Analytics', 'AI/ML', 'Data Visualization']
  },
  {
    id: 'IS453',
    name: 'Data Visualization and Visual Analytics',
    professor: 'Prof. Lisa Wong',
    credits: 1.0,
    moduleType: 'Major Elective',
    demand: 'Medium',
    demandCount: 95,
    capacity: 100,
    subscribers: 108,
    suEligible: true,
    description: 'Interactive visualizations and visual storytelling with data',
    assessments: [
      { type: 'Class Participation', date: '2025-05-09', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-03-02', weight: 15, title: 'Visualization Principles' },
      { type: 'Lab Assignment', date: '2025-03-23', weight: 20, title: 'Dashboard Development' },
      { type: 'Project', date: '2025-04-24', weight: 40, title: 'Interactive Visualization' },
      { type: 'Final Exam', date: '2025-05-09', weight: 15, title: 'Practical Exam' }
    ],
    schedule: [
      { day: 'Thursday', time: '15:30-18:30', location: 'SCIS1 Lab 1' }
    ],
    prerequisites: ['IS112'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 15, avgBid: 26, maxBid: 33 },
      { term: '2024-25 T1', minBid: 15, avgBid: 25, maxBid: 32 },
      { term: '2023-24 T3', minBid: 15, avgBid: 24, maxBid: 31 },
      { term: '2023-24 T2', minBid: 15, avgBid: 23, maxBid: 30 }
    ],
    yearlyAverage: 26,
    bidRange: '15-33 e$',
    weeklyHours: '9-12 hrs/week',
    careerPaths: ['Data Visualization Specialist', 'BI Developer', 'UX Designer'],
    skills: ['D3.js', 'Tableau', 'R', 'JavaScript', 'Visual Design'],
    afterClassRating: 4.7,
    workload: 'High',
    difficulty: 3,
    tags: ['Data Visualization', 'Programming', 'Creative']
  },
  {
    id: 'IS460',
    name: 'Blockchain Technologies and Applications',
    professor: 'Prof. Nathan Lee',
    credits: 1.0,
    moduleType: 'Free Elective',
    demand: 'Very High',
    demandCount: 195,
    capacity: 80,
    subscribers: 230,
    suEligible: true,
    description: 'Distributed ledger technology, smart contracts, and blockchain applications',
    assessments: [
      { type: 'Class Participation', date: '2025-05-10', weight: 10, title: 'Attendance & Engagement' },
      { type: 'Quiz 1', date: '2025-03-04', weight: 15, title: 'Blockchain Fundamentals' },
      { type: 'Lab Assignment', date: '2025-03-26', weight: 20, title: 'Smart Contract Development' },
      { type: 'Group Project', date: '2025-04-26', weight: 35, title: 'Blockchain Application' },
      { type: 'Final Exam', date: '2025-05-10', weight: 20, title: 'Written Exam' }
    ],
    schedule: [
      { day: 'Friday', time: '12:00-15:00', location: 'SCIS1 SR 2-2' }
    ],
    prerequisites: ['IS111', 'IS213'],
    bidHistory: [
      { term: '2024-25 T2', minBid: 22, avgBid: 37, maxBid: 46 },
      { term: '2024-25 T1', minBid: 21, avgBid: 36, maxBid: 45 },
      { term: '2023-24 T3', minBid: 21, avgBid: 35, maxBid: 44 },
      { term: '2023-24 T2', minBid: 20, avgBid: 34, maxBid: 43 }
    ],
    yearlyAverage: 37,
    bidRange: '20-46 e$',
    weeklyHours: '12-15 hrs/week',
    careerPaths: ['Blockchain Developer', 'Smart Contract Engineer', 'Crypto Analyst'],
    skills: ['Solidity', 'Ethereum', 'Web3', 'Distributed Systems', 'Cryptography'],
    afterClassRating: 4.8,
    workload: 'Very High',
    difficulty: 5,
    tags: ['Programming', 'Advanced', 'Emerging Tech']
  }
];

// Default cart with sample courses shown on login
// Setup to demonstrate:
// - IS214 has demand change (increase)
// - IS428 has demand change (decrease)
// - IS216 has demand change (increase)
// - Mix of demand levels: High (IS214), Medium (IS428), Very High (IS216)
export const studentCart = [
  courses.find(c => c.id === 'IS214'),  // demand change: increase, high demand
  courses.find(c => c.id === 'IS428'),  // demand change: decrease, medium demand
  courses.find(c => c.id === 'IS216')   // demand change: increase, very high demand
].filter(Boolean); // Filter out any undefined values

// Initialize default subscriptions for cart courses
// This ensures courses in cart are already "liked" when user logs in
export const defaultSubscriptions = studentCart.map(course => course?.id).filter(Boolean);

// Initialize subscriber counts including default subscriptions
export const initializeSubscriberCounts = () => {
  const counts = {};
  courses.forEach(course => {
    counts[course.id] = course.subscribers;
    // Don't increment here since the subscribers count already includes base numbers
  });
  return counts;
};

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
    'Students can S/U up to 2 modules in total, decided when towards graduating',
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
  totalCreditsRequired: 36,
  creditsCompleted: 27,
  creditsByType: {
    core: { completed: 8, required: 12 },
    majorElective: { completed: 12, required: 15 },
    freeElective: { completed: 7, required: 9 }
  },
  currentSemester: 'Term 3 2024-25',
  yearLevel: 'Year 3'
};

// Program Requirements
export const programRequirements = [
  {
    category: 'Core Modules',
    required: 12,
    completed: 8,
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
    required: 15,
    completed: 12,
    modules: [
      { id: 'IS216', name: 'Web Application Development I', status: 'in_cart' },
      { id: 'IS213', name: 'Object Oriented Programming', status: 'pending' },
      { id: 'IS424', name: 'Information Security Management', status: 'pending' },
      { id: 'IS445', name: 'Artificial Intelligence & Machine Learning', status: 'pending' }
    ]
  },
  {
    category: 'Free Electives',
    required: 9,
    completed: 7,
    modules: [
      { id: 'IS442', name: 'Cloud Management and Engineering', status: 'pending' },
      { id: 'ECON101', name: 'Introduction to Economics', status: 'completed' },
      { id: 'MGMT101', name: 'Principles of Management', status: 'completed' }
    ]
  }
];
