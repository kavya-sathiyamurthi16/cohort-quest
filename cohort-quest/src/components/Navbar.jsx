import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Trophy, 
  Gamepad2, 
  LogOut, 
  Menu, 
  X, 
  User,
  Star,
  Zap
} from 'lucide-react';

const Navbar = ({ currentUser, userRole, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      path: `/dashboard-${userRole}`,
      icon: Home,
      roles: ['student', 'mentor', 'floorwing', 'admin']
    },
    {
      name: 'Leaderboard',
      path: '/leaderboard',
      icon: Trophy,
      roles: ['student', 'mentor', 'floorwing', 'admin']
    },
    {
      name: 'Fun Zone',
      path: '/fun-zone',
      icon: Gamepad2,
      roles: ['student']
    }
  ];

  const visibleItems = navigationItems.filter(item => 
    item.roles.includes(userRole)
  );

  const getRoleColor = (role) => {
    const colors = {
      student: 'from-blue-500 to-blue-600',
      mentor: 'from-green-500 to-green-600',
      floorwing: 'from-purple-500 to-purple-600',
      admin: 'from-red-500 to-red-600'
    };
    return colors[role] || colors.student;
  };

  const getRoleBadge = (role) => {
    const badges = {
      student: { icon: Star, color: 'bg-blue-100 text-blue-600' },
      mentor: { icon: User, color: 'bg-green-100 text-green-600' },
      floorwing: { icon: Trophy, color: 'bg-purple-100 text-purple-600' },
      admin: { icon: Zap, color: 'bg-red-100 text-red-600' }
    };
    return badges[role] || badges.student;
  };

  const badge = getRoleBadge(userRole);
  const BadgeIcon = badge.icon;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to={`/dashboard-${userRole}`} className="flex items-center space-x-3">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-10 h-10 bg-gradient-to-br ${getRoleColor(userRole)} rounded-xl flex items-center justify-center`}
            >
              <Zap className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Cohort Quest</h1>
              <p className="text-xs text-gray-500 capitalize">{userRole} Portal</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {visibleItems.map((item) => {
              const IconComponent = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className="relative group"
                >
                  <motion.div
                    whileHover={{ y: -2 }}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      isActive
                        ? `bg-gradient-to-r ${getRoleColor(userRole)} text-white shadow-lg`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </motion.div>
                  
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {/* User Profile & Actions */}
          <div className="flex items-center space-x-4">
            {/* User Info */}
            <div className="hidden sm:flex items-center space-x-3">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{currentUser.name}</p>
                <div className="flex items-center space-x-2">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                    <BadgeIcon className="w-3 h-3 mr-1" />
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </div>
                  {userRole === 'student' && (
                    <div className="flex items-center text-xs text-gray-500">
                      <Star className="w-3 h-3 mr-1 text-yellow-500" />
                      Level {currentUser.level || 1}
                    </div>
                  )}
                </div>
              </div>
              
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-10 h-10 rounded-full border-2 border-gray-200 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm"
              >
                {currentUser.name.charAt(0).toUpperCase()}
              </motion.div>
            </div>

            {/* Logout Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline font-medium">Logout</span>
            </motion.button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-50"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-200"
          >
            <div className="px-4 py-4 space-y-2">
              {/* Mobile User Info */}
              <div className="flex items-center space-x-3 pb-4 border-b border-gray-200">
                <div
                  className="w-12 h-12 rounded-full border-2 border-gray-200 bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold"
                >
                  {currentUser.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{currentUser.name}</p>
                  <div className="flex items-center space-x-2">
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                      <BadgeIcon className="w-3 h-3 mr-1" />
                      {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                    </div>
                    {userRole === 'student' && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Star className="w-3 h-3 mr-1 text-yellow-500" />
                        Level {currentUser.level || 1}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Mobile Navigation Items */}
              {visibleItems.map((item) => {
                const IconComponent = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                      isActive
                        ? `bg-gradient-to-r ${getRoleColor(userRole)} text-white`
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
