import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, 
  Filter, 
  Users, 
  Building, 
  Crown,
  Medal,
  Star,
  TrendingUp,
  Zap,
  Award
} from 'lucide-react';

// Components
import LeaderboardCard from '../components/LeaderboardCard';

// Utils
import { mockUsers, mockFloorData } from '../utils/mockData';
import { calculateLevel } from '../utils/xpSystem';

const Leaderboard = ({ currentUser, userRole }) => {
  const [filter, setFilter] = useState('all');
  const [timeFilter, setTimeFilter] = useState('all-time');
  const [students, setStudents] = useState([]);
  const [floorStats, setFloorStats] = useState([]);

  useEffect(() => {
    // Process and sort students
    let filteredStudents = [...mockUsers.students];
    
    if (filter !== 'all') {
      filteredStudents = filteredStudents.filter(student => student.floor === filter);
    }
    
    // Sort by XP
    filteredStudents.sort((a, b) => (b.xp || 0) - (a.xp || 0));
    
    setStudents(filteredStudents);

    // Calculate floor statistics
    const floors = Object.keys(mockFloorData);
    const floorStatsData = floors.map(floor => {
      const floorStudents = mockUsers.students.filter(s => s.floor === floor);
      const totalXp = floorStudents.reduce((sum, s) => sum + (s.xp || 0), 0);
      const avgLevel = floorStudents.reduce((sum, s) => sum + calculateLevel(s.xp || 0), 0) / floorStudents.length;
      
      return {
        name: floor,
        students: floorStudents.length,
        totalXp,
        avgLevel: Math.round(avgLevel * 10) / 10,
        topStudent: floorStudents.sort((a, b) => (b.xp || 0) - (a.xp || 0))[0]
      };
    }).sort((a, b) => b.totalXp - a.totalXp);

    setFloorStats(floorStatsData);
  }, [filter, timeFilter]);

  const filterOptions = [
    { value: 'all', label: 'All Students', icon: Users },
    { value: 'Floor A', label: 'Floor A', icon: Building },
    { value: 'Floor B', label: 'Floor B', icon: Building }
  ];

  const timeFilterOptions = [
    { value: 'all-time', label: 'All Time' },
    { value: 'this-week', label: 'This Week' },
    { value: 'this-month', label: 'This Month' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Trophy className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Leaderboard</h1>
          <p className="text-xl text-gray-600">See how you stack up against your peers</p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="font-medium text-gray-700">Filter by:</span>
              
              <div className="flex flex-wrap gap-2">
                {filterOptions.map((option) => {
                  const IconComponent = option.icon;
                  return (
                    <motion.button
                      key={option.value}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setFilter(option.value)}
                      className={`
                        flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200
                        ${filter === option.value
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }
                      `}
                    >
                      <IconComponent className="w-4 h-4" />
                      <span>{option.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-600">Time:</span>
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {timeFilterOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                  Rankings
                  {filter !== 'all' && (
                    <span className="ml-2 text-lg text-gray-500">- {filter}</span>
                  )}
                </h2>
                <p className="text-gray-600 mt-1">
                  {students.length} student{students.length !== 1 ? 's' : ''} competing
                </p>
              </div>

              <div className="p-6">
                {/* Top 3 Podium */}
                {students.length >= 3 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-8"
                  >
                    <div className="flex items-end justify-center space-x-4 mb-6">
                      {/* 2nd Place */}
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-center"
                      >
                        <div className="w-20 h-16 bg-gradient-to-t from-gray-300 to-gray-400 rounded-t-lg flex items-end justify-center pb-2 mb-3">
                          <span className="text-white font-bold text-lg">2</span>
                        </div>
                        <img
                          src={students[1]?.avatar}
                          alt={students[1]?.name}
                          className="w-16 h-16 rounded-full border-4 border-gray-300 mx-auto mb-2 object-cover"
                        />
                        <p className="font-semibold text-sm text-gray-900">{students[1]?.name}</p>
                        <p className="text-xs text-gray-500">{students[1]?.xp?.toLocaleString()} XP</p>
                      </motion.div>

                      {/* 1st Place */}
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="text-center"
                      >
                        <div className="w-24 h-20 bg-gradient-to-t from-yellow-400 to-yellow-500 rounded-t-lg flex items-end justify-center pb-2 mb-3 relative">
                          <Crown className="absolute -top-3 w-6 h-6 text-yellow-600" />
                          <span className="text-white font-bold text-xl">1</span>
                        </div>
                        <img
                          src={students[0]?.avatar}
                          alt={students[0]?.name}
                          className="w-20 h-20 rounded-full border-4 border-yellow-400 mx-auto mb-2 object-cover"
                        />
                        <p className="font-bold text-gray-900">{students[0]?.name}</p>
                        <p className="text-sm text-gray-600">{students[0]?.xp?.toLocaleString()} XP</p>
                      </motion.div>

                      {/* 3rd Place */}
                      <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="text-center"
                      >
                        <div className="w-20 h-12 bg-gradient-to-t from-amber-600 to-amber-700 rounded-t-lg flex items-end justify-center pb-2 mb-3">
                          <span className="text-white font-bold text-lg">3</span>
                        </div>
                        <img
                          src={students[2]?.avatar}
                          alt={students[2]?.name}
                          className="w-16 h-16 rounded-full border-4 border-amber-600 mx-auto mb-2 object-cover"
                        />
                        <p className="font-semibold text-sm text-gray-900">{students[2]?.name}</p>
                        <p className="text-xs text-gray-500">{students[2]?.xp?.toLocaleString()} XP</p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}

                {/* Full Rankings */}
                <div className="space-y-4">
                  <AnimatePresence>
                    {students.map((student, index) => (
                      <motion.div
                        key={student.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ delay: 0.1 * index }}
                      >
                        <LeaderboardCard
                          user={student}
                          rank={index + 1}
                          showXp={true}
                          showLevel={true}
                          animated={true}
                          isCurrentUser={userRole === 'student' && student.id === currentUser?.id}
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Floor Battle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Building className="w-5 h-5 mr-2 text-purple-500" />
                Floor Battle
              </h3>
              
              <div className="space-y-4">
                {floorStats.map((floor, index) => (
                  <motion.div
                    key={floor.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                    className={`
                      p-4 rounded-xl border-2 transition-all duration-200
                      ${index === 0 
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200' 
                        : 'bg-gray-50 border-gray-200'
                      }
                    `}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center
                          ${index === 0 ? 'bg-yellow-500' : 'bg-gray-400'}
                        `}>
                          {index === 0 ? (
                            <Crown className="w-4 h-4 text-white" />
                          ) : (
                            <span className="text-white font-bold text-sm">{index + 1}</span>
                          )}
                        </div>
                        <h4 className="font-bold text-gray-900">{floor.name}</h4>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center text-blue-600">
                          <Zap className="w-4 h-4 mr-1" />
                          <span className="font-bold">{floor.totalXp.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Students</p>
                        <p className="font-semibold text-gray-900">{floor.students}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Avg Level</p>
                        <p className="font-semibold text-gray-900">{floor.avgLevel}</p>
                      </div>
                    </div>
                    
                    {floor.topStudent && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-500 mb-1">Top Performer</p>
                        <div className="flex items-center space-x-2">
                          <img
                            src={floor.topStudent.avatar}
                            alt={floor.topStudent.name}
                            className="w-6 h-6 rounded-full object-cover"
                          />
                          <span className="text-sm font-medium text-gray-900">
                            {floor.topStudent.name}
                          </span>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                Quick Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900">Total Students</span>
                  </div>
                  <span className="font-bold text-blue-600">{mockUsers.students.length}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-gray-900">Total XP</span>
                  </div>
                  <span className="font-bold text-yellow-600">
                    {mockUsers.students.reduce((sum, s) => sum + (s.xp || 0), 0).toLocaleString()}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-gray-900">Avg Level</span>
                  </div>
                  <span className="font-bold text-purple-600">
                    {Math.round(
                      mockUsers.students.reduce((sum, s) => sum + calculateLevel(s.xp || 0), 0) / 
                      mockUsers.students.length * 10
                    ) / 10}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Current User Position (if student) */}
            {userRole === 'student' && currentUser && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl shadow-lg p-6 text-white"
              >
                <h3 className="text-xl font-bold mb-4 flex items-center">
                  <Star className="w-5 h-5 mr-2" />
                  Your Position
                </h3>
                
                <div className="text-center">
                  <div className="text-3xl font-bold mb-2">
                    #{students.findIndex(s => s.id === currentUser.id) + 1}
                  </div>
                  <p className="text-blue-100 mb-4">out of {students.length} students</p>
                  
                  <div className="bg-white/20 rounded-lg p-3">
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="w-4 h-4" />
                      <span className="font-semibold">{currentUser.xp?.toLocaleString()} XP</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
