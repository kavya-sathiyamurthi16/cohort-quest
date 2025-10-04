import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Pages
import LandingPage from './pages/LandingPage';
import LoginStudent from './pages/LoginStudent';
import LoginMentor from './pages/LoginMentor';
import LoginFloorwing from './pages/LoginFloorwing';
import LoginAdmin from './pages/LoginAdmin';
import DashboardStudent from './pages/DashboardStudent';
import DashboardMentor from './pages/DashboardMentor';
import DashboardFloorwing from './pages/DashboardFloorwing';
import DashboardAdmin from './pages/DashboardAdmin';
import Leaderboard from './pages/Leaderboard';
import FunZone from './pages/FunZone';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Utils
import { mockUsers } from './utils/mockData';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('cohortQuestUser');
    const savedRole = localStorage.getItem('cohortQuestRole');
    
    if (savedUser && savedRole) {
      setCurrentUser(JSON.parse(savedUser));
      setUserRole(savedRole);
    }
    
    setIsLoading(false);
  }, []);

  const login = (email, password, role, username = '') => {
    // Allow any email/password combination - create mock user
    if (email && password && email.includes('@') && password.length >= 3) {
      const displayName = username.trim() || email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
      
      const mockUser = {
        id: `${role}_${Date.now()}`,
        name: displayName,
        email: email,
        password: password,
        xp: role === 'student' ? 1500 : 0,
        level: role === 'student' ? 5 : 0,
        floor: 'Floor A',
        badges: role === 'student' ? ['bronze'] : [],
        streak: role === 'student' ? 3 : 0,
        missions: role === 'student' ? [
          { id: 1, title: 'Getting Started', xp: 100, completed: true },
          { id: 2, title: 'First Project', xp: 150, completed: false }
        ] : [],
        achievements: role === 'student' ? [
          { id: 1, title: 'Welcome', description: 'Joined Cohort Quest', date: new Date().toISOString().split('T')[0] }
        ] : []
      };

      setCurrentUser(mockUser);
      setUserRole(role);
      localStorage.setItem('cohortQuestUser', JSON.stringify(mockUser));
      localStorage.setItem('cohortQuestRole', role);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
    setUserRole(null);
    localStorage.removeItem('cohortQuestUser');
    localStorage.removeItem('cohortQuestRole');
    // Force redirect to home page
    window.location.href = '/';
  };

  const updateUser = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('cohortQuestUser', JSON.stringify(updatedUser));
    
    // Update in mock data as well
    const userType = userRole + 's';
    const userIndex = mockUsers[userType].findIndex(u => u.id === updatedUser.id);
    if (userIndex !== -1) {
      mockUsers[userType][userIndex] = updatedUser;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  const ProtectedRoute = ({ children, allowedRoles }) => {
    if (!currentUser || !allowedRoles.includes(userRole)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <AnimatePresence mode="wait">
          {currentUser && <Navbar currentUser={currentUser} userRole={userRole} onLogout={logout} />}
        </AnimatePresence>

        <main className="flex-1">
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/" 
              element={
                currentUser ? (
                  <Navigate to={`/dashboard-${userRole}`} replace />
                ) : (
                  <LandingPage />
                )
              } 
            />
            
            {/* Login Routes */}
            <Route 
              path="/login-student" 
              element={
                currentUser ? (
                  <Navigate to="/dashboard-student" replace />
                ) : (
                  <LoginStudent onLogin={login} />
                )
              } 
            />
            <Route 
              path="/login-mentor" 
              element={
                currentUser ? (
                  <Navigate to="/dashboard-mentor" replace />
                ) : (
                  <LoginMentor onLogin={login} />
                )
              } 
            />
            <Route 
              path="/login-floorwing" 
              element={
                currentUser ? (
                  <Navigate to="/dashboard-floorwing" replace />
                ) : (
                  <LoginFloorwing onLogin={login} />
                )
              } 
            />
            <Route 
              path="/login-admin" 
              element={
                currentUser ? (
                  <Navigate to="/dashboard-admin" replace />
                ) : (
                  <LoginAdmin onLogin={login} />
                )
              } 
            />

            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard-student" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <DashboardStudent 
                    currentUser={currentUser} 
                    updateUser={updateUser}
                  />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard-mentor" 
              element={
                <ProtectedRoute allowedRoles={['mentor']}>
                  <DashboardMentor 
                    currentUser={currentUser} 
                    updateUser={updateUser}
                  />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard-floorwing" 
              element={
                <ProtectedRoute allowedRoles={['floorwing']}>
                  <DashboardFloorwing 
                    currentUser={currentUser} 
                    updateUser={updateUser}
                  />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard-admin" 
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardAdmin 
                    currentUser={currentUser} 
                    updateUser={updateUser}
                  />
                </ProtectedRoute>
              } 
            />

            {/* Shared Protected Routes */}
            <Route 
              path="/leaderboard" 
              element={
                <ProtectedRoute allowedRoles={['student', 'mentor', 'floorwing', 'admin']}>
                  <Leaderboard currentUser={currentUser} userRole={userRole} />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/fun-zone" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <FunZone 
                    currentUser={currentUser} 
                    updateUser={updateUser}
                  />
                </ProtectedRoute>
              } 
            />

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <AnimatePresence mode="wait">
          {currentUser && <Footer />}
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;
