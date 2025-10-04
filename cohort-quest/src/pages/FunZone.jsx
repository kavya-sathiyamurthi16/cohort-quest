import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gamepad2, 
  Zap, 
  Trophy, 
  Gift, 
  Brain,
  Star,
  Target,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Components
import SpinWheel from '../components/SpinWheel';
import QuizCard from '../components/QuizCard';

// Utils
import { addXp, calculateLevel } from '../utils/xpSystem';

const FunZone = ({ currentUser, updateUser }) => {
  const [activeGame, setActiveGame] = useState(null);
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [rewardData, setRewardData] = useState(null);
  const [confetti, setConfetti] = useState([]);

  const games = [
    {
      id: 'spin-wheel',
      title: 'Spin Wheel',
      description: 'Spin the wheel of fortune and win XP rewards!',
      icon: Gift,
      color: 'from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600',
      minReward: 25,
      maxReward: 300
    },
    {
      id: 'quiz',
      title: 'Quiz Challenge',
      description: 'Test your knowledge and earn XP for correct answers!',
      icon: Brain,
      color: 'from-blue-500 to-indigo-500',
      hoverColor: 'hover:from-blue-600 hover:to-indigo-600',
      minReward: 50,
      maxReward: 225
    }
  ];

  const createConfetti = () => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      rotation: Math.random() * 360,
      color: ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'][Math.floor(Math.random() * 6)]
    }));
    setConfetti(newConfetti);
    
    setTimeout(() => setConfetti([]), 3000);
  };

  const handleSpinReward = (reward) => {
    const oldLevel = calculateLevel(currentUser.xp);
    const xpResult = addXp(currentUser.xp, reward.value);
    
    updateUser({
      ...currentUser,
      xp: xpResult.newXp
    });

    setRewardData({
      type: 'spin',
      xp: reward.value,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.newLevel,
      title: 'Spin Wheel Reward!'
    });
    
    setShowRewardModal(true);
    createConfetti();
  };

  const handleQuizComplete = (result) => {
    const oldLevel = calculateLevel(currentUser.xp);
    const xpResult = addXp(currentUser.xp, result.score);
    
    updateUser({
      ...currentUser,
      xp: xpResult.newXp
    });

    setRewardData({
      type: 'quiz',
      xp: result.score,
      leveledUp: xpResult.leveledUp,
      newLevel: xpResult.newLevel,
      title: 'Quiz Complete!',
      correctAnswers: result.correctAnswers,
      totalQuestions: result.totalQuestions,
      percentage: result.percentage
    });
    
    setShowRewardModal(true);
    if (result.percentage >= 80) {
      createConfetti();
    }
  };

  const closeRewardModal = () => {
    setShowRewardModal(false);
    setRewardData(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 relative overflow-hidden">
      {/* Confetti */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            initial={{ 
              x: piece.x, 
              y: piece.y, 
              rotate: piece.rotation,
              opacity: 1 
            }}
            animate={{ 
              y: window.innerHeight + 100,
              rotate: piece.rotation + 720,
              opacity: 0
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="fixed w-3 h-3 pointer-events-none z-50"
            style={{ backgroundColor: piece.color }}
          />
        ))}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
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
              className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
            >
              <Gamepad2 className="w-8 h-8 text-white" />
            </motion.div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Fun Zone</h1>
          <p className="text-xl text-gray-600">Play games, have fun, and earn XP!</p>
          
          {/* Back to Dashboard */}
          <div className="mt-4">
            <Link
              to="/dashboard-student"
              className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </motion.div>

        {/* Current Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-12 h-12 rounded-full border-2 border-gray-200 object-cover"
              />
              <div>
                <h3 className="font-bold text-gray-900">{currentUser.name}</h3>
                <p className="text-sm text-gray-600">Ready to play and earn XP!</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-blue-600">
                  <Star className="w-5 h-5" />
                  <span className="font-bold text-lg">{calculateLevel(currentUser.xp)}</span>
                </div>
                <p className="text-xs text-gray-500">Level</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-yellow-600">
                  <Zap className="w-5 h-5" />
                  <span className="font-bold text-lg">{currentUser.xp?.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">Total XP</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center space-x-1 text-orange-600">
                  <Target className="w-5 h-5" />
                  <span className="font-bold text-lg">{currentUser.streak}</span>
                </div>
                <p className="text-xs text-gray-500">Streak</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Game Selection or Active Game */}
        <AnimatePresence mode="wait">
          {!activeGame ? (
            <motion.div
              key="game-selection"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.3 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {games.map((game, index) => {
                  const IconComponent = game.icon;
                  return (
                    <motion.div
                      key={game.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      whileHover={{ y: -5 }}
                      className="group cursor-pointer"
                      onClick={() => setActiveGame(game.id)}
                    >
                      <div className={`
                        relative overflow-hidden rounded-2xl bg-gradient-to-br ${game.color} ${game.hoverColor} 
                        p-8 text-white shadow-xl transition-all duration-300 group-hover:shadow-2xl
                      `}>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-6">
                            <IconComponent className="w-12 h-12" />
                            <div className="text-right">
                              <div className="flex items-center space-x-1 text-white/80">
                                <Zap className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                  {game.minReward}-{game.maxReward} XP
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <h3 className="text-2xl font-bold mb-3">{game.title}</h3>
                          <p className="text-white/90 mb-6 leading-relaxed">
                            {game.description}
                          </p>
                          
                          <motion.div
                            whileHover={{ x: 5 }}
                            className="flex items-center text-sm font-medium"
                          >
                            Play Now
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </motion.div>
                        </div>
                        
                        {/* Background Pattern */}
                        <div className="absolute inset-0 opacity-10">
                          <div className="absolute -right-8 -top-8 w-32 h-32 rounded-full bg-white/20" />
                          <div className="absolute -left-8 -bottom-8 w-24 h-24 rounded-full bg-white/10" />
                        </div>
                        
                        {/* Sparkle Effects */}
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
                          className="absolute top-4 right-4 w-2 h-2 bg-white/60 rounded-full"
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
                          className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-white/50 rounded-full"
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Fun Zone Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-gray-100"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Sparkles className="w-6 h-6 mr-2 text-purple-500" />
                  Fun Zone Benefits
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Zap className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Earn XP</h4>
                    <p className="text-sm text-gray-600">Win XP rewards through fun games and challenges</p>
                  </div>
                  
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Learn & Play</h4>
                    <p className="text-sm text-gray-600">Test your knowledge while having fun</p>
                  </div>
                  
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <Trophy className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 mb-1">Compete</h4>
                    <p className="text-sm text-gray-600">Climb the leaderboard with your earned XP</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="active-game"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {games.find(g => g.id === activeGame)?.title}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveGame(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors duration-200"
                >
                  Back to Games
                </motion.button>
              </div>
              
              <div className="flex justify-center">
                {activeGame === 'spin-wheel' && (
                  <SpinWheel onReward={handleSpinReward} />
                )}
                {activeGame === 'quiz' && (
                  <QuizCard onComplete={handleQuizComplete} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Reward Modal */}
      <AnimatePresence>
        {showRewardModal && rewardData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={closeRewardModal}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.div
                animate={{ 
                  rotate: rewardData.leveledUp ? 360 : [0, 10, -10, 0],
                  scale: rewardData.leveledUp ? [1, 1.2, 1] : [1, 1.1, 1]
                }}
                transition={{ duration: rewardData.leveledUp ? 2 : 1 }}
                className={`w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
                  rewardData.leveledUp 
                    ? 'bg-gradient-to-br from-yellow-400 to-orange-500' 
                    : 'bg-gradient-to-br from-green-500 to-emerald-500'
                }`}
              >
                {rewardData.leveledUp ? (
                  <Star className="w-10 h-10 text-white" />
                ) : (
                  <Zap className="w-10 h-10 text-white" />
                )}
              </motion.div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {rewardData.leveledUp ? 'Level Up!' : rewardData.title}
              </h2>
              
              {rewardData.leveledUp && (
                <p className="text-lg text-gray-600 mb-4">
                  Congratulations! You've reached level {rewardData.newLevel}!
                </p>
              )}
              
              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-center space-x-2 text-green-600 mb-2">
                  <Zap className="w-6 h-6" />
                  <span className="text-2xl font-bold">+{rewardData.xp} XP</span>
                </div>
                
                {rewardData.type === 'quiz' && (
                  <div className="text-sm text-gray-600">
                    <p>{rewardData.correctAnswers}/{rewardData.totalQuestions} correct answers</p>
                    <p>Score: {rewardData.percentage}%</p>
                  </div>
                )}
              </div>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeRewardModal}
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
              >
                Awesome!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FunZone;
