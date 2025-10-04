import React from 'react';
import { motion } from 'framer-motion';
import { Crown, Trophy, Medal, Star, Zap } from 'lucide-react';
import { calculateLevel, formatXp } from '../utils/xpSystem';

const LeaderboardCard = ({ 
  user, 
  rank, 
  showXp = true, 
  showLevel = true, 
  animated = true,
  isCurrentUser = false 
}) => {
  const getRankIcon = (position) => {
    switch (position) {
      case 1:
        return { icon: Crown, color: 'text-yellow-500', bg: 'bg-yellow-50' };
      case 2:
        return { icon: Trophy, color: 'text-gray-400', bg: 'bg-gray-50' };
      case 3:
        return { icon: Medal, color: 'text-amber-600', bg: 'bg-amber-50' };
      default:
        return { icon: Star, color: 'text-blue-500', bg: 'bg-blue-50' };
    }
  };

  const getRankColor = (position) => {
    if (position === 1) return 'from-yellow-400 to-yellow-500';
    if (position === 2) return 'from-gray-300 to-gray-400';
    if (position === 3) return 'from-amber-500 to-amber-600';
    return 'from-blue-400 to-blue-500';
  };

  const rankInfo = getRankIcon(rank);
  const RankIcon = rankInfo.icon;
  const level = calculateLevel(user.xp || 0);

  return (
    <motion.div
      initial={animated ? { opacity: 0, x: -20 } : {}}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: (rank - 1) * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className={`
        relative bg-white rounded-2xl shadow-lg border-2 p-4
        ${isCurrentUser 
          ? 'border-blue-300 bg-blue-50/50 ring-2 ring-blue-200' 
          : 'border-gray-100 hover:border-gray-200'
        }
        transition-all duration-300 group overflow-hidden
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-4 -top-4 w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400" />
        <div className="absolute -left-4 -bottom-4 w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-blue-400" />
      </div>

      {/* Current User Indicator */}
      {isCurrentUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 right-2 bg-blue-500 text-white text-xs px-2 py-1 rounded-full font-medium"
        >
          You
        </motion.div>
      )}

      <div className="relative z-10 flex items-center space-x-4">
        {/* Rank */}
        <div className="flex-shrink-0">
          <div className={`relative ${rankInfo.bg} rounded-2xl p-3`}>
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-8 h-8 bg-gradient-to-br ${getRankColor(rank)} rounded-xl flex items-center justify-center`}
            >
              <RankIcon className={`w-5 h-5 text-white`} />
            </motion.div>
            
            {/* Rank Number */}
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gray-800 text-white text-xs font-bold rounded-full flex items-center justify-center">
              {rank}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-3">
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full border-2 border-white shadow-md object-cover"
            />
            
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors duration-200">
                {user.name}
              </h3>
              
              <div className="flex items-center space-x-3 mt-1">
                {showLevel && (
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-600">
                      Level {level}
                    </span>
                  </div>
                )}
                
                {user.floor && (
                  <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {user.floor}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* XP Display */}
        {showXp && (
          <div className="flex-shrink-0 text-right">
            <div className="flex items-center space-x-1 text-blue-600">
              <Zap className="w-4 h-4" />
              <span className="font-bold text-lg">
                {formatXp(user.xp || 0)}
              </span>
            </div>
            <div className="text-xs text-gray-500">XP</div>
          </div>
        )}
      </div>

      {/* Streak Indicator */}
      {user.streak && user.streak > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-3 flex items-center justify-center"
        >
          <div className="flex items-center space-x-1 bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-xs font-medium">
            <span>🔥</span>
            <span>{user.streak} day streak</span>
          </div>
        </motion.div>
      )}

      {/* Rank Change Animation */}
      {rank <= 3 && (
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${getRankColor(rank)} opacity-10`}
        />
      )}
    </motion.div>
  );
};

export default LeaderboardCard;
