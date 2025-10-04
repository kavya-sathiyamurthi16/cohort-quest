import React from 'react';
import { motion } from 'framer-motion';

const ProgressBar = ({ 
  current, 
  max, 
  label, 
  color = 'blue', 
  showNumbers = true, 
  height = 'h-3',
  animated = true 
}) => {
  const percentage = Math.min((current / max) * 100, 100);
  
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    purple: 'from-purple-500 to-purple-600',
    yellow: 'from-yellow-500 to-yellow-600',
    red: 'from-red-500 to-red-600',
    indigo: 'from-indigo-500 to-indigo-600'
  };

  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showNumbers && (
            <span className="text-sm text-gray-500">
              {current.toLocaleString()} / {max.toLocaleString()}
            </span>
          )}
        </div>
      )}
      
      <div className={`w-full bg-gray-200 rounded-full ${height} overflow-hidden`}>
        <motion.div
          initial={animated ? { width: 0 } : { width: `${percentage}%` }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: animated ? 1 : 0, ease: "easeOut" }}
          className={`${height} bg-gradient-to-r ${colorClasses[color]} rounded-full relative overflow-hidden`}
        >
          {/* Shine effect */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatDelay: 3,
              ease: "easeInOut" 
            }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform skew-x-12"
          />
        </motion.div>
      </div>
      
      {showNumbers && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-400">0</span>
          <span className="text-xs font-medium text-gray-600">
            {percentage.toFixed(1)}%
          </span>
          <span className="text-xs text-gray-400">{max.toLocaleString()}</span>
        </div>
      )}
    </div>
  );
};

export default ProgressBar;
