// Mock data for the gamified cohort ecosystem

export const mockUsers = {
  students: [
    {
      id: 'student1',
      name: 'Alex Johnson',
      email: 'alex@student.com',
      password: 'student123',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      xp: 2450,
      level: 8,
      floor: 'Floor A',
      mentorId: 'mentor1',
      badges: ['bronze', 'silver', 'gold'],
      streak: 7,
      missions: [
        { id: 1, title: 'Complete React Tutorial', xp: 100, completed: true },
        { id: 2, title: 'Submit Project Proposal', xp: 150, completed: true },
        { id: 3, title: 'Attend Team Meeting', xp: 50, completed: false }
      ],
      achievements: [
        { id: 1, title: 'First Steps', description: 'Completed first mission', date: '2024-01-15' },
        { id: 2, title: 'Team Player', description: 'Attended 5 team meetings', date: '2024-01-20' }
      ]
    },
    {
      id: 'student2',
      name: 'Sarah Chen',
      email: 'sarah@student.com',
      password: 'student123',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      xp: 3200,
      level: 12,
      floor: 'Floor A',
      mentorId: 'mentor1',
      badges: ['bronze', 'silver', 'gold', 'platinum'],
      streak: 12,
      missions: [
        { id: 1, title: 'Complete React Tutorial', xp: 100, completed: true },
        { id: 2, title: 'Submit Project Proposal', xp: 150, completed: true },
        { id: 3, title: 'Attend Team Meeting', xp: 50, completed: true }
      ],
      achievements: [
        { id: 1, title: 'First Steps', description: 'Completed first mission', date: '2024-01-15' },
        { id: 2, title: 'Team Player', description: 'Attended 5 team meetings', date: '2024-01-20' },
        { id: 3, title: 'Streak Master', description: 'Maintained 10-day streak', date: '2024-01-25' }
      ]
    },
    {
      id: 'student3',
      name: 'Mike Rodriguez',
      email: 'mike@student.com',
      password: 'student123',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      xp: 1800,
      level: 6,
      floor: 'Floor B',
      mentorId: 'mentor2',
      badges: ['bronze', 'silver'],
      streak: 3,
      missions: [
        { id: 1, title: 'Complete JavaScript Basics', xp: 100, completed: true },
        { id: 2, title: 'Build Calculator App', xp: 200, completed: false },
        { id: 3, title: 'Code Review Session', xp: 75, completed: true }
      ],
      achievements: [
        { id: 1, title: 'First Steps', description: 'Completed first mission', date: '2024-01-10' }
      ]
    },
    {
      id: 'student4',
      name: 'Emma Wilson',
      email: 'emma@student.com',
      password: 'student123',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      xp: 2800,
      level: 10,
      floor: 'Floor B',
      mentorId: 'mentor2',
      badges: ['bronze', 'silver', 'gold'],
      streak: 5,
      missions: [
        { id: 1, title: 'Complete JavaScript Basics', xp: 100, completed: true },
        { id: 2, title: 'Build Calculator App', xp: 200, completed: true },
        { id: 3, title: 'Code Review Session', xp: 75, completed: true }
      ],
      achievements: [
        { id: 1, title: 'First Steps', description: 'Completed first mission', date: '2024-01-10' },
        { id: 2, title: 'Problem Solver', description: 'Completed 10 coding challenges', date: '2024-01-18' }
      ]
    }
  ],
  mentors: [
    {
      id: 'mentor1',
      name: 'Dr. Jennifer Smith',
      email: 'jennifer@mentor.com',
      password: 'mentor123',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      floor: 'Floor A',
      students: ['student1', 'student2'],
      totalXpGiven: 1500,
      rating: 4.8
    },
    {
      id: 'mentor2',
      name: 'Prof. David Kim',
      email: 'david@mentor.com',
      password: 'mentor123',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      floor: 'Floor B',
      students: ['student3', 'student4'],
      totalXpGiven: 1200,
      rating: 4.6
    }
  ],
  floorwings: [
    {
      id: 'floorwing1',
      name: 'Lisa Anderson',
      email: 'lisa@floorwing.com',
      password: 'floorwing123',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face',
      floors: ['Floor A', 'Floor B']
    }
  ],
  admins: [
    {
      id: 'admin1',
      name: 'System Administrator',
      email: 'admin@cohortquest.com',
      password: 'admin123',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    }
  ]
};

export const mockFloorData = {
  'Floor A': {
    totalStudents: 2,
    totalXp: 5650,
    averageXp: 2825,
    topStudent: 'Sarah Chen',
    topMentor: 'Dr. Jennifer Smith'
  },
  'Floor B': {
    totalStudents: 2,
    totalXp: 4600,
    averageXp: 2300,
    topStudent: 'Emma Wilson',
    topMentor: 'Prof. David Kim'
  }
};

export const mockQuizQuestions = [
  {
    id: 1,
    question: 'What does HTML stand for?',
    options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Home Tool Markup Language', 'Hyperlink and Text Markup Language'],
    correct: 0,
    xp: 50
  },
  {
    id: 2,
    question: 'Which CSS property is used to change the text color?',
    options: ['font-color', 'text-color', 'color', 'foreground-color'],
    correct: 2,
    xp: 50
  },
  {
    id: 3,
    question: 'What is the correct way to create a function in JavaScript?',
    options: ['function myFunction() {}', 'create myFunction() {}', 'function = myFunction() {}', 'def myFunction() {}'],
    correct: 0,
    xp: 75
  },
  {
    id: 4,
    question: 'Which React hook is used for state management?',
    options: ['useEffect', 'useState', 'useContext', 'useReducer'],
    correct: 1,
    xp: 100
  },
  {
    id: 5,
    question: 'What does API stand for?',
    options: ['Application Programming Interface', 'Advanced Programming Interface', 'Application Process Interface', 'Automated Programming Interface'],
    correct: 0,
    xp: 75
  }
];

export const mockAnalyticsData = {
  weeklyPerformance: [
    { week: 'Week 1', xp: 400 },
    { week: 'Week 2', xp: 600 },
    { week: 'Week 3', xp: 800 },
    { week: 'Week 4', xp: 1200 }
  ],
  floorComparison: [
    { floor: 'Floor A', xp: 5650, students: 2 },
    { floor: 'Floor B', xp: 4600, students: 2 }
  ],
  badgeDistribution: [
    { badge: 'Bronze', count: 4 },
    { badge: 'Silver', count: 4 },
    { badge: 'Gold', count: 3 },
    { badge: 'Platinum', count: 1 }
  ]
};

export const spinWheelRewards = [
  { id: 1, label: '50 XP', value: 50, color: '#3B82F6' },
  { id: 2, label: '100 XP', value: 100, color: '#10B981' },
  { id: 3, label: '25 XP', value: 25, color: '#F59E0B' },
  { id: 4, label: '200 XP', value: 200, color: '#EF4444' },
  { id: 5, label: '75 XP', value: 75, color: '#8B5CF6' },
  { id: 6, label: '150 XP', value: 150, color: '#06B6D4' },
  { id: 7, label: '30 XP', value: 30, color: '#84CC16' },
  { id: 8, label: '300 XP', value: 300, color: '#F97316' }
];
