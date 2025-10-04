// XP System and Level Calculation Logic

export const XP_LEVELS = [
  { level: 1, minXp: 0, maxXp: 100 },
  { level: 2, minXp: 100, maxXp: 250 },
  { level: 3, minXp: 250, maxXp: 450 },
  { level: 4, minXp: 450, maxXp: 700 },
  { level: 5, minXp: 700, maxXp: 1000 },
  { level: 6, minXp: 1000, maxXp: 1350 },
  { level: 7, minXp: 1350, maxXp: 1750 },
  { level: 8, minXp: 1750, maxXp: 2200 },
  { level: 9, minXp: 2200, maxXp: 2700 },
  { level: 10, minXp: 2700, maxXp: 3250 },
  { level: 11, minXp: 3250, maxXp: 3850 },
  { level: 12, minXp: 3850, maxXp: 4500 },
  { level: 13, minXp: 4500, maxXp: 5200 },
  { level: 14, minXp: 5200, maxXp: 5950 },
  { level: 15, minXp: 5950, maxXp: 6750 },
  { level: 16, minXp: 6750, maxXp: 7600 },
  { level: 17, minXp: 7600, maxXp: 8500 },
  { level: 18, minXp: 8500, maxXp: 9450 },
  { level: 19, minXp: 9450, maxXp: 10450 },
  { level: 20, minXp: 10450, maxXp: Infinity }
];

export const calculateLevel = (xp) => {
  for (let i = XP_LEVELS.length - 1; i >= 0; i--) {
    if (xp >= XP_LEVELS[i].minXp) {
      return XP_LEVELS[i].level;
    }
  }
  return 1;
};

export const getXpForNextLevel = (currentXp) => {
  const currentLevel = calculateLevel(currentXp);
  const nextLevelData = XP_LEVELS.find(level => level.level === currentLevel + 1);
  
  if (!nextLevelData) {
    return null; // Max level reached
  }
  
  return nextLevelData.minXp - currentXp;
};

export const getProgressPercentage = (currentXp) => {
  const currentLevel = calculateLevel(currentXp);
  const currentLevelData = XP_LEVELS.find(level => level.level === currentLevel);
  const nextLevelData = XP_LEVELS.find(level => level.level === currentLevel + 1);
  
  if (!nextLevelData) {
    return 100; // Max level reached
  }
  
  const levelXp = currentXp - currentLevelData.minXp;
  const levelRange = nextLevelData.minXp - currentLevelData.minXp;
  
  return Math.round((levelXp / levelRange) * 100);
};

export const addXp = (currentXp, xpToAdd) => {
  const oldLevel = calculateLevel(currentXp);
  const newXp = currentXp + xpToAdd;
  const newLevel = calculateLevel(newXp);
  
  return {
    newXp,
    newLevel,
    leveledUp: newLevel > oldLevel,
    levelsGained: newLevel - oldLevel
  };
};

export const getBadgeForLevel = (level) => {
  if (level >= 15) return 'platinum';
  if (level >= 10) return 'gold';
  if (level >= 5) return 'silver';
  return 'bronze';
};

export const getBadgeColor = (badge) => {
  const colors = {
    bronze: '#CD7F32',
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2'
  };
  return colors[badge] || colors.bronze;
};

export const getStreakBonus = (streak) => {
  if (streak >= 30) return 100;
  if (streak >= 14) return 50;
  if (streak >= 7) return 25;
  if (streak >= 3) return 10;
  return 0;
};

export const calculateMissionXp = (missionType, difficulty = 'medium') => {
  const baseXp = {
    easy: 25,
    medium: 50,
    hard: 100,
    expert: 200
  };
  
  const multipliers = {
    tutorial: 1,
    project: 2,
    challenge: 1.5,
    team: 1.2,
    presentation: 1.8
  };
  
  return Math.round(baseXp[difficulty] * (multipliers[missionType] || 1));
};

export const getLeaderboardPosition = (userXp, allUsers) => {
  const sortedUsers = allUsers
    .map(user => ({ ...user, xp: user.xp || 0 }))
    .sort((a, b) => b.xp - a.xp);
  
  const position = sortedUsers.findIndex(user => user.xp === userXp) + 1;
  return position || allUsers.length;
};

export const formatXp = (xp) => {
  if (xp >= 1000000) {
    return `${(xp / 1000000).toFixed(1)}M`;
  }
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}K`;
  }
  return xp.toString();
};
