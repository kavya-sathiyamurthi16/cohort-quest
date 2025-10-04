import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Zap, 
  Trophy, 
  Target, 
  Calendar,
  TrendingUp,
  Award,
  Gamepad2,
  Bell,
  CheckCircle,
  Clock,
  Flame,
  Gift,
  ArrowRight
} from 'lucide-react';

// Components
import ProgressBar from '../components/ProgressBar';
import BadgeCard from '../components/BadgeCard';
import LeaderboardCard from '../components/LeaderboardCard';

// Utils
import { calculateLevel, getProgressPercentage, getXpForNextLevel, formatXp } from '../utils/xpSystem';
import { getBadgesByType, checkNewAchievements } from '../utils/badgesLogic';
import { mockUsers, mockAnalyticsData } from '../utils/mockData';

const DashboardStudent = ({ currentUser, updateUser }) => {
  const [notifications, setNotifications] = useState([]);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [recentActivity, setRecentActivity] = useState([]);

  const level = calculateLevel(currentUser.xp);
  const progressPercentage = getProgressPercentage(currentUser.xp);
  const xpToNextLevel = getXpForNextLevel(currentUser.xp);
  const badgeCounts = getBadgesByType(currentUser);

  // Get other students for leaderboard
  const allStudents = mockUsers.students
    .sort((a, b) => (b.xp || 0) - (a.xp || 0))
    .slice(0, 5);

  useEffect(() => {
    // Check for new achievements
    const newAchievements = checkNewAchievements(currentUser);
    if (newAchievements.length > 0) {
      setNotifications(prev => [
        ...prev,
        ...newAchievements.map(achievement => ({
          id: Date.now() + Math.random(),
          type: 'achievement',
          title: 'New Achievement Unlocked!',
          message: `${achievement.title}: ${achievement.description}`,
          icon: '🏆',
          timestamp: new Date()
        }))
      ]);
    }

    // Simulate recent activity
    setRecentActivity([
      { id: 1, action: 'Completed React Tutorial', xp: 100, time: '2 hours ago', type: 'mission' },
      { id: 2, action: 'Daily Login Streak', xp: 25, time: '1 day ago', type: 'streak' },
      { id: 3, action: 'Quiz Master Achievement', xp: 50, time: '2 days ago', type: 'achievement' }
    ]);
  }, [currentUser]);

  const dismissNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const completeMission = (missionId) => {
    const updatedMissions = currentUser.missions.map(mission => 
      mission.id === missionId ? { ...mission, completed: true } : mission
    );
    
    const completedMission = currentUser.missions.find(m => m.id === missionId);
    const newXp = currentUser.xp + completedMission.xp;
    const newLevel = calculateLevel(newXp);
    
    if (newLevel > level) {
      setShowLevelUpModal(true);
    }

    updateUser({
      ...currentUser,
      missions: updatedMissions,
      xp: newXp
    });

    // Add notification
    setNotifications(prev => [{
      id: Date.now(),
      type: 'xp',
      title: 'Mission Completed!',
      message: `+${completedMission.xp} XP earned`,
      icon: '⚡',
      timestamp: new Date()
    }, ...prev]);
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
                Welcome back, {currentUser.name.split(' ')[0]}! 👋
              </h1>
              <p className="text-gray-600">Ready to level up your skills today?</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-4">
              <Link
                to="/fun-zone"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Gamepad2 className="w-5 h-5 mr-2" />
                Fun Zone
              </Link>
              <Link
                to="/leaderboard"
                className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Trophy className="w-5 h-5 mr-2" />
                Leaderboard
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <AnimatePresence>
          {notifications.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-6"
            >
              <div className="space-y-2">
                {notifications.slice(0, 3).map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, x: 300 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 300 }}
                    className="bg-white border-l-4 border-blue-500 rounded-lg shadow-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{notification.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                        <p className="text-sm text-gray-600">{notification.message}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => dismissNotification(notification.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      ×
                    </button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Level Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Level</p>
                  <p className="text-2xl font-bold text-gray-900">{level}</p>
                </div>
              </div>
            </div>
            <ProgressBar
              current={progressPercentage}
              max={100}
              color="blue"
              showNumbers={false}
              height="h-2"
            />
            <p className="text-xs text-gray-500 mt-2">
              {xpToNextLevel ? `${xpToNextLevel} XP to next level` : 'Max level reached!'}
            </p>
          </motion.div>

          {/* XP Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total XP</p>
                <p className="text-2xl font-bold text-gray-900">{formatXp(currentUser.xp)}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+150 this week</span>
            </div>
          </motion.div>

          {/* Streak Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Streak</p>
                <p className="text-2xl font-bold text-gray-900">{currentUser.streak} days</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-orange-600">
              <Flame className="w-4 h-4 mr-1" />
              <span>Keep it up!</span>
            </div>
          </motion.div>

          {/* Rank Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
          >
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Rank</p>
                <p className="text-2xl font-bold text-gray-900">
                  #{allStudents.findIndex(s => s.id === currentUser.id) + 1}
                </p>
              </div>
            </div>
            <div className="flex items-center text-sm text-purple-600">
              <Trophy className="w-4 h-4 mr-1" />
              <span>Top performer</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Your Journey */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="w-6 h-6 mr-2 text-blue-500" />
                Your Journey
              </h2>
              
              <div className="space-y-4">
                {currentUser.missions.map((mission, index) => (
                  <motion.div
                    key={mission.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className={`
                      flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200
                      ${mission.completed 
                        ? 'bg-green-50 border-green-200' 
                        : 'bg-gray-50 border-gray-200 hover:border-blue-200'
                      }
                    `}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${mission.completed ? 'bg-green-500' : 'bg-gray-300'}
                      `}>
                        {mission.completed ? (
                          <CheckCircle className="w-6 h-6 text-white" />
                        ) : (
                          <Clock className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{mission.title}</h3>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <Zap className="w-4 h-4 text-yellow-500" />
                          <span>{mission.xp} XP</span>
                        </div>
                      </div>
                    </div>
                    
                    {!mission.completed && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => completeMission(mission.id)}
                        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-200"
                      >
                        Complete
                      </motion.button>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Recent Activity */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-2 text-green-500" />
                Recent Activity
              </h2>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        {activity.type === 'mission' && <Target className="w-4 h-4 text-blue-600" />}
                        {activity.type === 'streak' && <Flame className="w-4 h-4 text-orange-600" />}
                        {activity.type === 'achievement' && <Award className="w-4 h-4 text-purple-600" />}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-green-600">
                      <Zap className="w-4 h-4 mr-1" />
                      <span className="font-semibold">+{activity.xp}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-2 text-purple-500" />
                Your Badges
              </h2>
              
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(badgeCounts).map(([badge, count]) => (
                  <BadgeCard
                    key={badge}
                    badge={badge}
                    count={count}
                    size="sm"
                    animated={true}
                  />
                ))}
              </div>
            </motion.div>

            {/* Mini Leaderboard */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
                  Top Students
                </h2>
                <Link
                  to="/leaderboard"
                  className="text-blue-500 hover:text-blue-600 flex items-center text-sm font-medium"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
              
              <div className="space-y-3">
                {allStudents.slice(0, 3).map((student, index) => (
                  <LeaderboardCard
                    key={student.id}
                    user={student}
                    rank={index + 1}
                    showLevel={false}
                    animated={true}
                    isCurrentUser={student.id === currentUser.id}
                  />
                ))}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Gift className="w-6 h-6 mr-2 text-pink-500" />
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <Link
                  to="/fun-zone"
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg hover:from-purple-100 hover:to-pink-100 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <Gamepad2 className="w-5 h-5 text-purple-500" />
                    <span className="font-medium text-gray-900">Play Games</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-purple-500" />
                </Link>
                
                <Link
                  to="/leaderboard"
                  className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg hover:from-blue-100 hover:to-indigo-100 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-3">
                    <Trophy className="w-5 h-5 text-blue-500" />
                    <span className="font-medium text-gray-900">View Rankings</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-500" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Level Up Modal */}
      <AnimatePresence>
        {showLevelUpModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowLevelUpModal(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <Star className="w-10 h-10 text-white" />
              </motion.div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Level Up!</h2>
              <p className="text-gray-600 mb-6">
                Congratulations! You've reached level {calculateLevel(currentUser.xp)}
              </p>
              
              <button
                onClick={() => setShowLevelUpModal(false)}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
              >
                Awesome!
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DashboardStudent;
