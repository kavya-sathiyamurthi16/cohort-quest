import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, Award, TrendingUp, Zap, BookOpen, Trophy, Target, Star } from 'lucide-react';

const LandingPage = () => {
  const roleCards = [
    {
      title: 'Student',
      description: 'Track your progress, earn XP, and compete with peers',
      icon: BookOpen,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      link: '/login-student',
      features: ['XP & Levels', 'Badges & Achievements', 'Fun Zone Access', 'Leaderboards']
    },
    {
      title: 'Mentor',
      description: 'Guide students and track their performance',
      icon: Users,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      link: '/login-mentor',
      features: ['Student Analytics', 'XP Management', 'Performance Tracking', 'Feedback System']
    },
    {
      title: 'Floorwing',
      description: 'Oversee floor activities and competitions',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
      hoverColor: 'hover:from-purple-600 hover:to-purple-700',
      link: '/login-floorwing',
      features: ['Floor Analytics', 'Battle Management', 'Mentor Overview', 'Performance Reports']
    },
    {
      title: 'Administrator',
      description: 'Manage the entire ecosystem and system settings',
      icon: Award,
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      link: '/login-admin',
      features: ['User Management', 'System Analytics', 'Badge Templates', 'Global Settings']
    }
  ];

  const features = [
    {
      icon: Zap,
      title: 'Gamified Learning',
      description: 'Earn XP, unlock badges, and level up your skills through engaging challenges'
    },
    {
      icon: Trophy,
      title: 'Competitive Spirit',
      description: 'Compete with peers through leaderboards and floor battles'
    },
    {
      icon: Target,
      title: 'Mission System',
      description: 'Complete missions and challenges to earn rewards and recognition'
    },
    {
      icon: Star,
      title: 'Achievement System',
      description: 'Unlock achievements and showcase your progress with beautiful badges'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold text-gray-900 mb-6"
            >
              Welcome to{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Cohort Quest
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto"
            >
              Transform your learning journey with our gamified cohort ecosystem. 
              Earn XP, unlock achievements, and compete with peers in an engaging educational environment.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
                <Zap className="w-5 h-5 text-yellow-500 mr-2" />
                <span className="text-gray-700 font-medium">Gamified Learning</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
                <Trophy className="w-5 h-5 text-blue-500 mr-2" />
                <span className="text-gray-700 font-medium">Leaderboards</span>
              </div>
              <div className="flex items-center bg-white rounded-full px-6 py-3 shadow-lg">
                <Award className="w-5 h-5 text-purple-500 mr-2" />
                <span className="text-gray-700 font-medium">Achievements</span>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center"
        >
          <BookOpen className="w-8 h-8 text-blue-500" />
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-32 right-20 w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center"
        >
          <Star className="w-6 h-6 text-purple-500" />
        </motion.div>
      </section>

      {/* Role Selection Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Role
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Select your role to access your personalized dashboard and start your journey
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {roleCards.map((role, index) => {
              const IconComponent = role.icon;
              return (
                <motion.div
                  key={role.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={role.link}>
                    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${role.color} ${role.hoverColor} p-8 text-white shadow-xl transition-all duration-300 group-hover:shadow-2xl`}>
                      <div className="relative z-10">
                        <div className="mb-6">
                          <IconComponent className="w-12 h-12 mb-4" />
                          <h3 className="text-2xl font-bold mb-2">{role.title}</h3>
                          <p className="text-white/90 text-sm leading-relaxed">
                            {role.description}
                          </p>
                        </div>
                        
                        <div className="space-y-2">
                          {role.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center text-sm text-white/80">
                              <div className="w-1.5 h-1.5 bg-white/60 rounded-full mr-2" />
                              {feature}
                            </div>
                          ))}
                        </div>
                        
                        <motion.div
                          whileHover={{ x: 5 }}
                          className="mt-6 flex items-center text-sm font-medium"
                        >
                          Get Started
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </motion.div>
                      </div>
                      
                      {/* Background Pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute -right-4 -top-4 w-24 h-24 rounded-full bg-white/20" />
                        <div className="absolute -left-4 -bottom-4 w-16 h-16 rounded-full bg-white/10" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Cohort Quest?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience learning like never before with our innovative gamification features
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="text-center group"
                >
                  <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Start Your Quest?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already leveling up their skills with Cohort Quest
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/login-student"
                className="inline-flex items-center px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                Start Your Journey
                <Zap className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
