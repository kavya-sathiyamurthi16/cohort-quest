import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Gift, RotateCcw } from 'lucide-react';
import { spinWheelRewards } from '../utils/mockData';

const SpinWheel = ({ onReward }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedReward, setSelectedReward] = useState(null);
  const [canSpin, setCanSpin] = useState(true);
  const [cooldownTime, setCooldownTime] = useState(0);
  const wheelRef = useRef(null);

  const segmentAngle = 360 / spinWheelRewards.length;

  const spin = () => {
    if (!canSpin || isSpinning) return;

    setIsSpinning(true);
    setSelectedReward(null);

    // Generate random rotation (multiple full rotations + random segment)
    const spins = 5 + Math.random() * 5; // 5-10 full rotations
    const randomSegment = Math.floor(Math.random() * spinWheelRewards.length);
    const finalRotation = rotation + (spins * 360) + (randomSegment * segmentAngle);

    setRotation(finalRotation);

    // Determine winning segment
    const normalizedRotation = finalRotation % 360;
    const winningIndex = Math.floor((360 - normalizedRotation + segmentAngle / 2) / segmentAngle) % spinWheelRewards.length;
    const reward = spinWheelRewards[winningIndex];

    setTimeout(() => {
      setIsSpinning(false);
      setSelectedReward(reward);
      onReward(reward);
      
      // Start cooldown
      setCanSpin(false);
      setCooldownTime(30); // 30 seconds cooldown
      
      const cooldownInterval = setInterval(() => {
        setCooldownTime(prev => {
          if (prev <= 1) {
            clearInterval(cooldownInterval);
            setCanSpin(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 3000);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Wheel Container */}
      <div className="relative">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
          <div className="w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-red-500"></div>
        </div>

        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          animate={{ rotate: rotation }}
          transition={{ 
            duration: isSpinning ? 3 : 0, 
            ease: isSpinning ? "easeOut" : "linear" 
          }}
          className="relative w-80 h-80 rounded-full border-8 border-gray-800 shadow-2xl overflow-hidden"
        >
          {spinWheelRewards.map((reward, index) => {
            const angle = index * segmentAngle;
            const isSelected = selectedReward?.id === reward.id && !isSpinning;
            
            return (
              <motion.div
                key={reward.id}
                className={`absolute w-full h-full ${isSelected ? 'z-10' : ''}`}
                style={{
                  transform: `rotate(${angle}deg)`,
                  transformOrigin: 'center'
                }}
              >
                <div
                  className={`absolute w-1/2 h-full origin-right transition-all duration-300 ${
                    isSelected ? 'brightness-125 scale-105' : ''
                  }`}
                  style={{
                    background: `conic-gradient(from 0deg, ${reward.color} 0deg, ${reward.color} ${segmentAngle}deg, transparent ${segmentAngle}deg)`,
                    clipPath: `polygon(0 0, 100% 0, 87% 50%, 100% 100%, 0 100%)`
                  }}
                >
                  <div 
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white font-bold text-sm"
                    style={{ transform: `translateY(-50%) rotate(${segmentAngle/2}deg)` }}
                  >
                    {reward.label}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Center Circle */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            <Gift className="w-8 h-8 text-white" />
          </div>
        </motion.div>
      </div>

      {/* Spin Button */}
      <motion.button
        whileHover={canSpin ? { scale: 1.05 } : {}}
        whileTap={canSpin ? { scale: 0.95 } : {}}
        onClick={spin}
        disabled={!canSpin || isSpinning}
        className={`
          flex items-center space-x-3 px-8 py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-300
          ${canSpin && !isSpinning
            ? 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white cursor-pointer'
            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }
        `}
      >
        {isSpinning ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <RotateCcw className="w-6 h-6" />
            </motion.div>
            <span>Spinning...</span>
          </>
        ) : !canSpin ? (
          <>
            <Zap className="w-6 h-6" />
            <span>Cooldown: {cooldownTime}s</span>
          </>
        ) : (
          <>
            <Gift className="w-6 h-6" />
            <span>Spin the Wheel!</span>
          </>
        )}
      </motion.button>

      {/* Reward Display */}
      <AnimatePresence>
        {selectedReward && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="bg-white rounded-2xl shadow-xl p-6 border-4 border-yellow-400"
          >
            <div className="text-center">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 0.5, repeat: 2 }}
                className="text-4xl mb-2"
              >
                🎉
              </motion.div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Congratulations!
              </h3>
              <p className="text-lg text-gray-600 mb-4">
                You won <span className="font-bold text-purple-600">{selectedReward.label}</span>!
              </p>
              <div className="flex items-center justify-center space-x-2 text-yellow-600">
                <Zap className="w-5 h-5" />
                <span className="font-bold">+{selectedReward.value} XP</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rewards List */}
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
          Possible Rewards
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {spinWheelRewards.map((reward) => (
            <div
              key={reward.id}
              className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: reward.color }}
              />
              <span className="text-sm font-medium text-gray-700">
                {reward.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpinWheel;
