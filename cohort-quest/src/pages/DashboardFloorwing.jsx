import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building, 
  TrendingUp, 
  Users, 
  Trophy,
  Star,
  Zap,
  Target,
  BarChart3,
  Crown,
  Award,
  Calendar,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

// Components
import LeaderboardCard from '../components/LeaderboardCard';

// Utils
import { mockUsers, mockFloorData, mockAnalyticsData } from '../utils/mockData';
import { calculateLevel, formatXp } from '../utils/xpSystem';

const DashboardFloorwing = ({ currentUser, updateUser }) => {
  const [selectedFloor, setSelectedFloor] = useState('Floor A');
  const [timeFilter, setTimeFilter] = useState('this-week');
  const [floorBattleData, setFloorBattleData] = useState([]);

  // Get floors managed by this floorwing
  const managedFloors = currentUser.floors || ['Floor A', 'Floor B'];

  // Calculate floor statistics
  const floorStats = managedFloors.map(floor => {
    const floorStudents = mockUsers.students.filter(s => s.floor === floor);
    const floorMentors = mockUsers.mentors.filter(m => m.floor === floor);
    const totalXp = floorStudents.reduce((sum, s) => sum + (s.xp || 0), 0);
    const avgLevel = floorStudents.length > 0 
      ? floorStudents.reduce((sum, s) => sum + calculateLevel(s.xp || 0), 0) / floorStudents.length 
      : 0;
    const topStudent = floorStudents.sort((a, b) => (b.xp || 0) - (a.xp || 0))[0];
    const topMentor = floorMentors.sort((a, b) => (b.totalXpGiven || 0) - (a.totalXpGiven || 0))[0];

    return {
      name: floor,
      students: floorStudents.length,
      mentors: floorMentors.length,
      totalXp,
      avgLevel: Math.round(avgLevel * 10) / 10,
      topStudent,
      topMentor,
      weeklyGrowth: Math.floor(Math.random() * 20) + 5 // Simulated growth
    };
  }).sort((a, b) => b.totalXp - a.totalXp);

  // Floor battle comparison data
  const battleData = floorStats.map((floor, index) => ({
    floor: floor.name,
    xp: floor.totalXp,
    students: floor.students,
    avgLevel: floor.avgLevel,
    rank: index + 1,
    change: Math.floor(Math.random() * 3) - 1 // -1, 0, or 1
  }));

  // Performance radar data for selected floor
  const selectedFloorData = floorStats.find(f => f.name === selectedFloor);
  const radarData = selectedFloorData ? [
    { subject: 'Total XP', A: (selectedFloorData.totalXp / 10000) * 100, fullMark: 100 },
    { subject: 'Avg Level', A: (selectedFloorData.avgLevel / 20) * 100, fullMark: 100 },
    { subject: 'Students', A: (selectedFloorData.students / 10) * 100, fullMark: 100 },
    { subject: 'Mentors', A: (selectedFloorData.mentors / 5) * 100, fullMark: 100 },
    { subject: 'Growth', A: selectedFloorData.weeklyGrowth * 5, fullMark: 100 },
    { subject: 'Activity', A: Math.floor(Math.random() * 40) + 60, fullMark: 100 }
  ] : [];

  // Weekly comparison data
  const weeklyComparison = mockAnalyticsData.weeklyPerformance.map(week => ({
    week: week.week,
    'Floor A': week.xp + Math.floor(Math.random() * 200),
    'Floor B': week.xp + Math.floor(Math.random() * 200)
  }));

  useEffect(() => {
    setFloorBattleData(battleData);
  }, []);

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
                Floorwing Dashboard
              </h1>
              <p className="text-gray-600">
                Welcome back, {currentUser.name}! Oversee your floors and drive competition.
              </p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold text-gray-900">{managedFloors.length} Floors</span>
                </div>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 shadow-lg border border-gray-100">
                <div className="flex items-center space-x-2">
                  <Users className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-900">
                    {floorStats.reduce((sum, f) => sum + f.students, 0)} Students
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Floor Battle Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Trophy className="w-7 h-7 mr-3 text-yellow-500" />
            Floor Battle Rankings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {floorBattleData.map((floor, index) => (
              <motion.div
                key={floor.floor}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className={`
                  relative p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer
                  ${index === 0 
                    ? 'bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300 shadow-lg' 
                    : 'bg-gray-50 border-gray-200 hover:border-purple-300 hover:shadow-md'
                  }
                `}
                onClick={() => setSelectedFloor(floor.floor)}
              >
                {/* Rank Badge */}
                <div className={`
                  absolute -top-3 -right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-white
                  ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'}
                `}>
                  {index === 0 ? <Crown className="w-5 h-5" /> : floor.rank}
                </div>

                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{floor.floor}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="w-5 h-5 text-blue-500" />
                      <span className="text-lg font-bold text-gray-900">
                        {formatXp(floor.xp)}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="text-center">
                        <p className="text-gray-500">Students</p>
                        <p className="font-semibold text-gray-900">{floor.students}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-gray-500">Avg Level</p>
                        <p className="font-semibold text-gray-900">{floor.avgLevel}</p>
                      </div>
                    </div>

                    {/* Rank Change */}
                    <div className="flex items-center justify-center space-x-1">
                      {floor.change > 0 ? (
                        <>
                          <ArrowUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-green-600 font-medium">Rising</span>
                        </>
                      ) : floor.change < 0 ? (
                        <>
                          <ArrowDown className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600 font-medium">Falling</span>
                        </>
                      ) : (
                        <span className="text-sm text-gray-500 font-medium">Stable</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Winner Crown Animation */}
                {index === 0 && (
                  <motion.div
                    animate={{ 
                      rotate: [0, 10, -10, 0],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="absolute -top-2 left-1/2 transform -translate-x-1/2"
                  >
                    <Crown className="w-6 h-6 text-yellow-500" />
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Analytics */}
          <div className="lg:col-span-2 space-y-8">
            {/* Floor Performance Comparison */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <BarChart3 className="w-6 h-6 mr-2 text-green-500" />
                  Weekly Performance Comparison
                </h2>
                <select
                  value={timeFilter}
                  onChange={(e) => setTimeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="this-quarter">This Quarter</option>
                </select>
              </div>
              
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyComparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="Floor A" fill="#3B82F6" name="Floor A" />
                  <Bar dataKey="Floor B" fill="#8B5CF6" name="Floor B" />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Selected Floor Radar Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Target className="w-6 h-6 mr-2 text-purple-500" />
                  Floor Performance Analysis
                </h2>
                <select
                  value={selectedFloor}
                  onChange={(e) => setSelectedFloor(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  {managedFloors.map(floor => (
                    <option key={floor} value={floor}>{floor}</option>
                  ))}
                </select>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <ResponsiveContainer width="100%" height={250}>
                    <RadarChart data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name={selectedFloor}
                        dataKey="A"
                        stroke="#8B5CF6"
                        fill="#8B5CF6"
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  {selectedFloorData && (
                    <>
                      <div className="bg-purple-50 rounded-lg p-4">
                        <h4 className="font-semibold text-purple-900 mb-2">Floor Overview</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-purple-700">Total Students:</span>
                            <span className="font-semibold">{selectedFloorData.students}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700">Total Mentors:</span>
                            <span className="font-semibold">{selectedFloorData.mentors}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700">Total XP:</span>
                            <span className="font-semibold">{formatXp(selectedFloorData.totalXp)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-700">Average Level:</span>
                            <span className="font-semibold">{selectedFloorData.avgLevel}</span>
                          </div>
                        </div>
                      </div>
                      
                      {selectedFloorData.topStudent && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="font-semibold text-blue-900 mb-2">Top Student</h4>
                          <div className="flex items-center space-x-3">
                            <img
                              src={selectedFloorData.topStudent.avatar}
                              alt={selectedFloorData.topStudent.name}
                              className="w-10 h-10 rounded-full border-2 border-blue-200 object-cover"
                            />
                            <div>
                              <p className="font-medium text-blue-900">{selectedFloorData.topStudent.name}</p>
                              <p className="text-sm text-blue-700">
                                Level {calculateLevel(selectedFloorData.topStudent.xp)} • {formatXp(selectedFloorData.topStudent.xp)} XP
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {selectedFloorData.topMentor && (
                        <div className="bg-green-50 rounded-lg p-4">
                          <h4 className="font-semibold text-green-900 mb-2">Top Mentor</h4>
                          <div className="flex items-center space-x-3">
                            <img
                              src={selectedFloorData.topMentor.avatar}
                              alt={selectedFloorData.topMentor.name}
                              className="w-10 h-10 rounded-full border-2 border-green-200 object-cover"
                            />
                            <div>
                              <p className="font-medium text-green-900">{selectedFloorData.topMentor.name}</p>
                              <p className="text-sm text-green-700">
                                {selectedFloorData.topMentor.totalXpGiven} XP Awarded
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Top Performers & Stats */}
          <div className="space-y-6">
            {/* Top Students Across All Floors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-500" />
                Top Students
              </h3>
              
              <div className="space-y-3">
                {mockUsers.students
                  .filter(s => managedFloors.includes(s.floor))
                  .sort((a, b) => (b.xp || 0) - (a.xp || 0))
                  .slice(0, 5)
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

            {/* Top Mentors */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Award className="w-5 h-5 mr-2 text-green-500" />
                Top Mentors
              </h3>
              
              <div className="space-y-4">
                {mockUsers.mentors
                  .filter(m => managedFloors.includes(m.floor))
                  .sort((a, b) => (b.totalXpGiven || 0) - (a.totalXpGiven || 0))
                  .map((mentor, index) => (
                    <motion.div
                      key={mentor.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`
                          w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                          ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-600'}
                        `}>
                          {index + 1}
                        </div>
                        <img
                          src={mentor.avatar}
                          alt={mentor.name}
                          className="w-10 h-10 rounded-full border-2 border-gray-200 object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{mentor.name}</p>
                          <p className="text-sm text-gray-500">{mentor.floor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{mentor.totalXpGiven}</p>
                        <p className="text-xs text-gray-500">XP Given</p>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
                Overall Stats
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900">Total Students</span>
                  </div>
                  <span className="font-bold text-blue-600">
                    {floorStats.reduce((sum, f) => sum + f.students, 0)}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-green-500" />
                    <span className="font-medium text-gray-900">Total XP</span>
                  </div>
                  <span className="font-bold text-green-600">
                    {formatXp(floorStats.reduce((sum, f) => sum + f.totalXp, 0))}
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Building className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-gray-900">Floors Managed</span>
                  </div>
                  <span className="font-bold text-purple-600">{managedFloors.length}</span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Star className="w-5 h-5 text-yellow-500" />
                    <span className="font-medium text-gray-900">Avg Level</span>
                  </div>
                  <span className="font-bold text-yellow-600">
                    {Math.round(floorStats.reduce((sum, f) => sum + f.avgLevel, 0) / floorStats.length * 10) / 10}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardFloorwing;
