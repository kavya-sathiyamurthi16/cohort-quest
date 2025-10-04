import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  TrendingUp, 
  Award, 
  Plus, 
  Minus,
  MessageSquare,
  BarChart3,
  Star,
  Zap,
  Trophy,
  Target,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

// Components
import ProgressBar from '../components/ProgressBar';
import LeaderboardCard from '../components/LeaderboardCard';

// Utils
import { mockUsers, mockAnalyticsData } from '../utils/mockData';
import { calculateLevel, addXp, formatXp } from '../utils/xpSystem';

const DashboardMentor = ({ currentUser, updateUser }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [xpAmount, setXpAmount] = useState(50);
  const [feedback, setFeedback] = useState('');
  const [showXpModal, setShowXpModal] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Get mentor's students
  const mentorStudents = mockUsers.students.filter(student => 
    student.mentorId === currentUser.id
  );

  // Calculate analytics
  const totalStudents = mentorStudents.length;
  const averageXp = totalStudents > 0 
    ? Math.round(mentorStudents.reduce((sum, s) => sum + (s.xp || 0), 0) / totalStudents)
    : 0;
  const topStudent = mentorStudents.sort((a, b) => (b.xp || 0) - (a.xp || 0))[0];

  // Weekly performance data
  const weeklyData = mockAnalyticsData.weeklyPerformance.map(week => ({
    ...week,
    students: Math.floor(Math.random() * totalStudents) + 1
  }));

  // Student level distribution
  const levelDistribution = mentorStudents.reduce((acc, student) => {
    const level = calculateLevel(student.xp || 0);
    const range = level <= 5 ? 'Beginner (1-5)' : 
                  level <= 10 ? 'Intermediate (6-10)' : 
                  level <= 15 ? 'Advanced (11-15)' : 'Expert (16+)';
    acc[range] = (acc[range] || 0) + 1;
    return acc;
  }, {});

  const levelChartData = Object.entries(levelDistribution).map(([range, count]) => ({
    name: range,
    value: count,
    color: range.includes('Beginner') ? '#3B82F6' :
           range.includes('Intermediate') ? '#10B981' :
           range.includes('Advanced') ? '#F59E0B' : '#EF4444'
  }));

  useEffect(() => {
    // Simulate notifications
    setNotifications([
      {
        id: 1,
        type: 'achievement',
        student: 'Sarah Chen',
        message: 'earned a new Gold badge!',
        time: '5 minutes ago',
        icon: '🏆'
      },
      {
        id: 2,
        type: 'milestone',
        student: 'Alex Johnson',
        message: 'reached Level 8!',
        time: '1 hour ago',
        icon: '⭐'
      }
    ]);
  }, []);

  const handleXpAward = (student, amount, type = 'add') => {
    const currentXp = student.xp || 0;
    const newXp = type === 'add' ? currentXp + amount : Math.max(0, currentXp - amount);
    const xpResult = { newXp, leveledUp: calculateLevel(newXp) > calculateLevel(currentXp) };

    // Update student in mock data
    const studentIndex = mockUsers.students.findIndex(s => s.id === student.id);
    if (studentIndex !== -1) {
      mockUsers.students[studentIndex] = { ...student, xp: newXp };
    }

    // Add notification
    const newNotification = {
      id: Date.now(),
      type: type === 'add' ? 'xp_awarded' : 'xp_deducted',
      student: student.name,
      message: `${type === 'add' ? 'received' : 'lost'} ${amount} XP`,
      time: 'Just now',
      icon: type === 'add' ? '⚡' : '⚠️'
    };

    setNotifications(prev => [newNotification, ...prev.slice(0, 4)]);
    setShowXpModal(false);
    setSelectedStudent(null);
    setXpAmount(50);
    setFeedback('');
  };

  const openXpModal = (student) => {
    setSelectedStudent(student);
    setShowXpModal(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mentor Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {currentUser.name}! Guide your students to success.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-gray-900">{totalStudents} Students</span>
                </div>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="font-semibold text-gray-900">Rating: {currentUser.rating}</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{totalStudents}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>All active</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average XP</p>
                <p className="text-2xl font-bold text-gray-900">{formatXp(averageXp)}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-blue-600">
              <BarChart3 className="w-4 h-4 mr-1" />
              <span>Per student</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Top Performer</p>
                <p className="text-lg font-bold text-gray-900">
                  {topStudent ? topStudent.name.split(' ')[0] : 'N/A'}
                </p>
              </div>
            </div>
            {topStudent && (
              <div className="flex items-center text-sm text-yellow-600">
                <Star className="w-4 h-4 mr-1" />
                <span>Level {calculateLevel(topStudent.xp)}</span>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">XP Awarded</p>
                <p className="text-2xl font-bold text-gray-900">{currentUser.totalXpGiven || 0}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-purple-600">
              <Target className="w-4 h-4 mr-1" />
              <span>This month</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Students & Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Student Management */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Users className="w-6 h-6 mr-2 text-blue-500" />
                Your Students
              </h2>
              
              <div className="space-y-4">
                {mentorStudents.map((student, index) => (
                  <motion.div
                    key={student.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={student.avatar}
                        alt={student.name}
                        className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-900">{student.name}</h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>Level {calculateLevel(student.xp)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Zap className="w-4 h-4 text-blue-500" />
                            <span>{formatXp(student.xp)} XP</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4 text-orange-500" />
                            <span>{student.streak} day streak</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openXpModal(student)}
                        className="flex items-center space-x-1 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        <Zap className="w-4 h-4" />
                        <span>Manage XP</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Analytics Charts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <BarChart3 className="w-6 h-6 mr-2 text-green-500" />
                Performance Analytics
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Weekly Performance */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly XP Trends</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={weeklyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="xp" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* Level Distribution */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Student Levels</h3>
                  <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                      <Pie
                        data={levelChartData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {levelChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="mt-4 space-y-2">
                    {levelChartData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          />
                          <span className="text-gray-700">{item.name}</span>
                        </div>
                        <span className="font-semibold text-gray-900">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Notifications & Quick Actions */}
          <div className="space-y-6">
            {/* Recent Notifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                Recent Activity
              </h3>
              
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-lg">{notification.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{notification.student}</span>{' '}
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 flex items-center mt-1">
                        <Clock className="w-3 h-3 mr-1" />
                        {notification.time}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Top Students */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
                Top Performers
              </h3>
              
              <div className="space-y-3">
                {mentorStudents
                  .sort((a, b) => (b.xp || 0) - (a.xp || 0))
                  .slice(0, 3)
                  .map((student, index) => (
                    <LeaderboardCard
                      key={student.id}
                      user={student}
                      rank={index + 1}
                      showLevel={true}
                      showXp={true}
                      animated={true}
                    />
                  ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-purple-500" />
                Quick Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Active Students</span>
                  <span className="font-semibold text-gray-900">{totalStudents}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completed Missions</span>
                  <span className="font-semibold text-gray-900">
                    {mentorStudents.reduce((sum, s) => 
                      sum + (s.missions?.filter(m => m.completed).length || 0), 0
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Average Streak</span>
                  <span className="font-semibold text-gray-900">
                    {Math.round(mentorStudents.reduce((sum, s) => sum + (s.streak || 0), 0) / totalStudents)} days
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* XP Management Modal */}
      <AnimatePresence>
        {showXpModal && selectedStudent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowXpModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <img
                  src={selectedStudent.avatar}
                  alt={selectedStudent.name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 border-4 border-gray-200 object-cover"
                />
                <h2 className="text-2xl font-bold text-gray-900">{selectedStudent.name}</h2>
                <p className="text-gray-600">
                  Current XP: {formatXp(selectedStudent.xp)} | Level {calculateLevel(selectedStudent.xp)}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    XP Amount
                  </label>
                  <input
                    type="number"
                    value={xpAmount}
                    onChange={(e) => setXpAmount(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Feedback (Optional)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    rows="3"
                    placeholder="Add a note about this XP change..."
                  />
                </div>

                <div className="flex space-x-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleXpAward(selectedStudent, xpAmount, 'add')}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-200"
                  >
                    <Plus className="w-5 h-5" />
                    <span>Award XP</span>
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleXpAward(selectedStudent, xpAmount, 'deduct')}
                    className="flex-1 flex items-center justify-center space-x-2 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                  >
                    <Minus className="w-5 h-5" />
                    <span>Deduct XP</span>
                  </motion.button>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowXpModal(false)}
                  className="w-full py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardMentor;
