// Badge System Logic

export const BADGE_TYPES = {
  BRONZE: 'bronze',
  SILVER: 'silver',
  GOLD: 'gold',
  PLATINUM: 'platinum'
};

export const ACHIEVEMENT_TYPES = {
  FIRST_STEPS: 'first_steps',
  TEAM_PLAYER: 'team_player',
  STREAK_MASTER: 'streak_master',
  PROBLEM_SOLVER: 'problem_solver',
  MENTOR_FAVORITE: 'mentor_favorite',
  QUIZ_MASTER: 'quiz_master',
  MISSION_COMPLETE: 'mission_complete',
  LEVEL_UP: 'level_up',
  XP_MILESTONE: 'xp_milestone'
};

export const ACHIEVEMENTS = {
  [ACHIEVEMENT_TYPES.FIRST_STEPS]: {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Complete your first mission',
    icon: '🎯',
    xpReward: 50,
    badge: BADGE_TYPES.BRONZE,
    condition: (user) => user.missions?.some(m => m.completed) || false
  },
  [ACHIEVEMENT_TYPES.TEAM_PLAYER]: {
    id: 'team_player',
    title: 'Team Player',
    description: 'Attend 5 team meetings',
    icon: '🤝',
    xpReward: 100,
    badge: BADGE_TYPES.SILVER,
    condition: (user) => (user.meetingsAttended || 0) >= 5
  },
  [ACHIEVEMENT_TYPES.STREAK_MASTER]: {
    id: 'streak_master',
    title: 'Streak Master',
    description: 'Maintain a 10-day activity streak',
    icon: '🔥',
    xpReward: 200,
    badge: BADGE_TYPES.GOLD,
    condition: (user) => (user.streak || 0) >= 10
  },
  [ACHIEVEMENT_TYPES.PROBLEM_SOLVER]: {
    id: 'problem_solver',
    title: 'Problem Solver',
    description: 'Complete 10 coding challenges',
    icon: '🧩',
    xpReward: 150,
    badge: BADGE_TYPES.SILVER,
    condition: (user) => (user.challengesCompleted || 0) >= 10
  },
  [ACHIEVEMENT_TYPES.MENTOR_FAVORITE]: {
    id: 'mentor_favorite',
    title: 'Mentor\'s Favorite',
    description: 'Receive 500 XP from mentors',
    icon: '⭐',
    xpReward: 100,
    badge: BADGE_TYPES.GOLD,
    condition: (user) => (user.mentorXp || 0) >= 500
  },
  [ACHIEVEMENT_TYPES.QUIZ_MASTER]: {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Score 100% on 5 quizzes',
    icon: '🧠',
    xpReward: 175,
    badge: BADGE_TYPES.GOLD,
    condition: (user) => (user.perfectQuizzes || 0) >= 5
  },
  [ACHIEVEMENT_TYPES.MISSION_COMPLETE]: {
    id: 'mission_complete',
    title: 'Mission Accomplished',
    description: 'Complete all assigned missions',
    icon: '✅',
    xpReward: 250,
    badge: BADGE_TYPES.PLATINUM,
    condition: (user) => {
      const missions = user.missions || [];
      return missions.length > 0 && missions.every(m => m.completed);
    }
  },
  [ACHIEVEMENT_TYPES.LEVEL_UP]: {
    id: 'level_up_10',
    title: 'Rising Star',
    description: 'Reach level 10',
    icon: '🌟',
    xpReward: 300,
    badge: BADGE_TYPES.GOLD,
    condition: (user) => (user.level || 1) >= 10
  },
  [ACHIEVEMENT_TYPES.XP_MILESTONE]: {
    id: 'xp_milestone_5000',
    title: 'XP Champion',
    description: 'Earn 5000 total XP',
    icon: '🏆',
    xpReward: 500,
    badge: BADGE_TYPES.PLATINUM,
    condition: (user) => (user.xp || 0) >= 5000
  }
};

export const checkNewAchievements = (user, previousUser = {}) => {
  const newAchievements = [];
  const currentAchievements = user.achievements || [];
  const currentAchievementIds = currentAchievements.map(a => a.id);

  Object.values(ACHIEVEMENTS).forEach(achievement => {
    // Skip if user already has this achievement
    if (currentAchievementIds.includes(achievement.id)) {
      return;
    }

    // Check if user meets the condition
    if (achievement.condition(user)) {
      newAchievements.push({
        ...achievement,
        dateEarned: new Date().toISOString().split('T')[0]
      });
    }
  });

  return newAchievements;
};

export const getBadgeIcon = (badgeType) => {
  const icons = {
    [BADGE_TYPES.BRONZE]: '🥉',
    [BADGE_TYPES.SILVER]: '🥈',
    [BADGE_TYPES.GOLD]: '🥇',
    [BADGE_TYPES.PLATINUM]: '💎'
  };
  return icons[badgeType] || icons[BADGE_TYPES.BRONZE];
};

export const getBadgeGradient = (badgeType) => {
  const gradients = {
    [BADGE_TYPES.BRONZE]: 'from-amber-600 to-amber-800',
    [BADGE_TYPES.SILVER]: 'from-gray-400 to-gray-600',
    [BADGE_TYPES.GOLD]: 'from-yellow-400 to-yellow-600',
    [BADGE_TYPES.PLATINUM]: 'from-purple-400 to-purple-600'
  };
  return gradients[badgeType] || gradients[BADGE_TYPES.BRONZE];
};

export const calculateBadgeProgress = (user) => {
  const totalAchievements = Object.keys(ACHIEVEMENTS).length;
  const earnedAchievements = (user.achievements || []).length;
  
  return {
    earned: earnedAchievements,
    total: totalAchievements,
    percentage: Math.round((earnedAchievements / totalAchievements) * 100)
  };
};

export const getNextBadgeToEarn = (user) => {
  const currentAchievements = user.achievements || [];
  const currentAchievementIds = currentAchievements.map(a => a.id);

  const availableAchievements = Object.values(ACHIEVEMENTS).filter(
    achievement => !currentAchievementIds.includes(achievement.id)
  );

  // Sort by XP reward (easier achievements first)
  return availableAchievements.sort((a, b) => a.xpReward - b.xpReward)[0] || null;
};

export const getBadgesByType = (user) => {
  const achievements = user.achievements || [];
  const badgeCount = {
    [BADGE_TYPES.BRONZE]: 0,
    [BADGE_TYPES.SILVER]: 0,
    [BADGE_TYPES.GOLD]: 0,
    [BADGE_TYPES.PLATINUM]: 0
  };

  achievements.forEach(achievement => {
    const achievementData = ACHIEVEMENTS[achievement.id];
    if (achievementData && badgeCount.hasOwnProperty(achievementData.badge)) {
      badgeCount[achievementData.badge]++;
    }
  });

  return badgeCount;
};

export const getAchievementsByBadgeType = (badgeType) => {
  return Object.values(ACHIEVEMENTS).filter(
    achievement => achievement.badge === badgeType
  );
};
