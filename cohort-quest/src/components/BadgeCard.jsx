import React from 'react';
import { motion } from 'framer-motion';
import { getBadgeIcon, getBadgeGradient } from '../utils/badgesLogic';

const BadgeCard = ({ 
  badge, 
  count = 0, 
  size = 'md', 
  showCount = true, 
  animated = true,
  onClick 
}) => {
  const sizeClasses = {
    sm: 'w-12 h-12 text-lg',
    md: 'w-16 h-16 text-2xl',
    lg: 'w-20 h-20 text-3xl',
    xl: 'w-24 h-24 text-4xl'
  };

  const containerSizes = {
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
    xl: 'p-8'
  };

  const badgeIcon = getBadgeIcon(badge);
  const badgeGradient = getBadgeGradient(badge);

  const badgeNames = {
    bronze: 'Bronze',
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum'
  };

  return (
    <motion.div
      initial={animated ? { scale: 0, opacity: 0 } : {}}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5, type: "spring", bounce: 0.3 }}
      whileHover={{ scale: 1.05, y: -2 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        bg-white rounded-2xl shadow-lg border border-gray-100 
        ${containerSizes[size]} 
        ${onClick ? 'cursor-pointer hover:shadow-xl' : ''} 
        transition-all duration-300 group relative overflow-hidden
      `}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute -right-2 -top-2 w-8 h-8 rounded-full bg-gray-400" />
        <div className="absolute -left-2 -bottom-2 w-6 h-6 rounded-full bg-gray-300" />
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Badge Icon */}
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          className={`
            ${sizeClasses[size]} 
            bg-gradient-to-br ${badgeGradient} 
            rounded-xl flex items-center justify-center 
            shadow-lg group-hover:shadow-xl transition-shadow duration-300
            mb-3
          `}
        >
          <span className="text-white filter drop-shadow-sm">
            {badgeIcon}
          </span>
        </motion.div>

        {/* Badge Name */}
        <h3 className="font-bold text-gray-900 mb-1 capitalize">
          {badgeNames[badge] || badge}
        </h3>

        {/* Badge Count */}
        {showCount && (
          <div className="flex items-center space-x-1">
            <motion.span
              key={count}
              initial={{ scale: 1.5, color: '#10B981' }}
              animate={{ scale: 1, color: '#6B7280' }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold"
            >
              {count}
            </motion.span>
            <span className="text-sm text-gray-500">
              {count === 1 ? 'badge' : 'badges'}
            </span>
          </div>
        )}

        {/* Glow Effect */}
        <motion.div
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className={`
            absolute inset-0 rounded-2xl 
            bg-gradient-to-br ${badgeGradient} 
            opacity-10 blur-xl -z-10
          `}
        />
      </div>

      {/* Achievement Sparkles */}
      {count > 0 && animated && (
        <>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-blue-400 rounded-full"
          />
        </>
      )}
    </motion.div>
  );
};

export default BadgeCard;
