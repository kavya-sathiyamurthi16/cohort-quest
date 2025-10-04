import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Users, 
  Settings, 
  BarChart3,
  Award,
  Zap,
  Building,
  UserPlus,
  UserMinus,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Utils
import { mockUsers, mockFloorData } from '../utils/mockData';
import { calculateLevel, formatXp } from '../utils/xpSystem';

const DashboardAdmin = ({ currentUser, updateUser }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showUserModal, setShowUserModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'student', floor: 'Floor A' });

  // Calculate system statistics
  const totalStudents = mockUsers.students.length;
  const totalMentors = mockUsers.mentors.length;
  const totalFloorwings = mockUsers.floorwings.length;
  const totalXp = mockUsers.students.reduce((sum, s) => sum + (s.xp || 0), 0);
  const avgLevel = totalStudents > 0 
    ? mockUsers.students.reduce((sum, s) => sum + calculateLevel(s.xp || 0), 0) / totalStudents 
    : 0;

  // User distribution by role
  const userDistribution = [
    { name: 'Students', value: totalStudents, color: '#3B82F6' },
    { name: 'Mentors', value: totalMentors, color: '#10B981' },
    { name: 'Floorwings', value: totalFloorwings, color: '#8B5CF6' },
    { name: 'Admins', value: mockUsers.admins.length, color: '#EF4444' }
  ];

  // XP distribution by floor
  const floorXpData = Object.keys(mockFloorData).map(floor => ({
    floor,
    xp: mockUsers.students.filter(s => s.floor === floor).reduce((sum, s) => sum + (s.xp || 0), 0),
    students: mockUsers.students.filter(s => s.floor === floor).length
  }));

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'User Management', icon: Users },
    { id: 'system', label: 'System Settings', icon: Settings },
    { id: 'badges', label: 'Badge Management', icon: Award }
  ];

  const handleAddUser = () => {
    // Simulate adding user
    console.log('Adding user:', newUser);
    setShowUserModal(false);
    setNewUser({ name: '', email: '', role: 'student', floor: 'Floor A' });
  };

  const handleResetData = () => {
    if (confirm('Are you sure you want to reset all leaderboard data? This action cannot be undone.')) {
      // Simulate reset
      console.log('Resetting leaderboard data...');
    }
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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <Shield className="w-8 h-8 mr-3 text-red-500" />
                Admin Dashboard
              </h1>
              <p className="text-gray-600">System administration and management</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowUserModal(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <UserPlus className="w-5 h-5" />
                <span>Add User</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-lg p-2 mb-8 border border-gray-100"
        >
          <div className="flex space-x-2">
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center space-x-2 px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${activeTab === tab.id
                      ? 'bg-red-500 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{tab.label}</span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* System Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total Users</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {totalStudents + totalMentors + totalFloorwings + mockUsers.admins.length}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Total XP</p>
                    <p className="text-2xl font-bold text-gray-900">{formatXp(totalXp)}</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <Building className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Active Floors</p>
                    <p className="text-2xl font-bold text-gray-900">{Object.keys(mockFloorData).length}</p>
                  </div>
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
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Avg Level</p>
                    <p className="text-2xl font-bold text-gray-900">{Math.round(avgLevel * 10) / 10}</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">User Distribution</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={userDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Floor Performance</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={floorXpData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="floor" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="xp" fill="#8B5CF6" />
                  </BarChart>
                </ResponsiveContainer>
              </motion.div>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">User Management</h2>
              <div className="flex space-x-2">
                <button className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
                  <Download className="w-4 h-4" />
                  <span>Export</span>
                </button>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                  <Upload className="w-4 h-4" />
                  <span>Import</span>
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              {['students', 'mentors', 'floorwings', 'admins'].map(role => (
                <div key={role} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 capitalize">{role}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {mockUsers[role].length} {role} in the system
                  </p>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                      View All
                    </button>
                    <button className="px-3 py-1 bg-green-100 text-green-700 rounded text-sm hover:bg-green-200">
                      Add New
                    </button>
                    <button className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200">
                      Bulk Actions
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'system' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">System Settings</h2>
              
              <div className="space-y-6">
                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">XP System Configuration</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Base XP per Mission
                      </label>
                      <input
                        type="number"
                        defaultValue="50"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Level Up Multiplier
                      </label>
                      <input
                        type="number"
                        step="0.1"
                        defaultValue="1.5"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-b border-gray-200 pb-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Leaderboard Settings</h3>
                  <div className="space-y-4">
                    <button
                      onClick={handleResetData}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>Reset Leaderboard Data</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'badges' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Badge Management</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {['bronze', 'silver', 'gold', 'platinum'].map(badge => (
                <div key={badge} className="border border-gray-200 rounded-lg p-4 text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-xl flex items-center justify-center text-2xl
                    ${badge === 'bronze' ? 'bg-amber-100' : 
                      badge === 'silver' ? 'bg-gray-100' :
                      badge === 'gold' ? 'bg-yellow-100' : 'bg-purple-100'}`}>
                    {badge === 'bronze' ? '🥉' : badge === 'silver' ? '🥈' : badge === 'gold' ? '🥇' : '💎'}
                  </div>
                  <h3 className="font-semibold text-gray-900 capitalize mb-2">{badge}</h3>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200">
                    Edit Template
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardAdmin;
