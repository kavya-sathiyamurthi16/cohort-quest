import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Zap, 
  Trophy,
  RotateCcw,
  Target
} from 'lucide-react';
import { mockQuizQuestions } from '../utils/mockData';

const QuizCard = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isActive, setIsActive] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = mockQuizQuestions.slice(0, 3); // Use first 3 questions

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0 && !showResult) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showResult) {
      handleAnswer(null); // Auto-submit when time runs out
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, showResult]);

  const startQuiz = () => {
    setIsActive(true);
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedAnswer(null);
    setShowResult(false);
    setQuizCompleted(false);
    setScore(0);
    setTimeLeft(30);
  };

  const handleAnswer = (answerIndex) => {
    const question = questions[currentQuestion];
    const isCorrect = answerIndex === question.correct;
    
    const newAnswer = {
      questionId: question.id,
      selected: answerIndex,
      correct: question.correct,
      isCorrect
    };

    setAnswers([...answers, newAnswer]);
    setSelectedAnswer(answerIndex);
    setShowResult(true);

    if (isCorrect) {
      setScore(score + question.xp);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setTimeLeft(30);
      } else {
        // Quiz completed
        setQuizCompleted(true);
        setIsActive(false);
        const finalScore = score + (isCorrect ? question.xp : 0);
        const totalPossible = questions.reduce((sum, q) => sum + q.xp, 0);
        const percentage = Math.round((finalScore / totalPossible) * 100);
        
        onComplete({
          score: finalScore,
          totalQuestions: questions.length,
          correctAnswers: [...answers, newAnswer].filter(a => a.isCorrect).length,
          percentage
        });
      }
    }, 2000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setAnswers([]);
    setShowResult(false);
    setTimeLeft(30);
    setIsActive(false);
    setQuizCompleted(false);
    setScore(0);
  };

  if (!isActive && !quizCompleted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-6"
        >
          <Brain className="w-8 h-8 text-white" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Quick Quiz Challenge</h2>
        <p className="text-gray-600 mb-6">
          Test your knowledge with {questions.length} questions and earn XP!
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <Target className="w-6 h-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-blue-700">{questions.length} Questions</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <Clock className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-yellow-700">30s per question</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <Zap className="w-6 h-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-green-700">
              Up to {questions.reduce((sum, q) => sum + q.xp, 0)} XP
            </p>
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={startQuiz}
          className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-200 shadow-lg"
        >
          Start Quiz
        </motion.button>
      </motion.div>
    );
  }

  if (quizCompleted) {
    const correctAnswers = answers.filter(a => a.isCorrect).length;
    const percentage = Math.round((correctAnswers / questions.length) * 100);
    
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl shadow-lg p-8 text-center border border-gray-100"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 360]
          }}
          transition={{ duration: 1 }}
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 ${
            percentage >= 80 
              ? 'bg-gradient-to-br from-green-500 to-emerald-500' 
              : percentage >= 60 
                ? 'bg-gradient-to-br from-yellow-500 to-orange-500'
                : 'bg-gradient-to-br from-red-500 to-pink-500'
          }`}
        >
          <Trophy className="w-8 h-8 text-white" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Quiz Complete!</h2>
        <p className="text-gray-600 mb-6">
          {percentage >= 80 
            ? "Excellent work! 🎉" 
            : percentage >= 60 
              ? "Good job! 👍" 
              : "Keep practicing! 💪"
          }
        </p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-blue-600">{correctAnswers}/{questions.length}</p>
            <p className="text-sm text-blue-700">Correct Answers</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-center space-x-1">
              <Zap className="w-5 h-5 text-green-500" />
              <p className="text-2xl font-bold text-green-600">+{score}</p>
            </div>
            <p className="text-sm text-green-700">XP Earned</p>
          </div>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Score</span>
            <span className="text-sm font-bold text-gray-900">{percentage}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className={`h-3 rounded-full ${
                percentage >= 80 
                  ? 'bg-gradient-to-r from-green-500 to-emerald-500' 
                  : percentage >= 60 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500'
                    : 'bg-gradient-to-r from-red-500 to-pink-500'
              }`}
            />
          </div>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetQuiz}
          className="flex items-center space-x-2 px-6 py-3 bg-gray-500 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors duration-200 mx-auto"
        >
          <RotateCcw className="w-5 h-5" />
          <span>Try Again</span>
        </motion.button>
      </motion.div>
    );
  }

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <motion.div
      key={currentQuestion}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Question {currentQuestion + 1} of {questions.length}</p>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">{question.xp} XP</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className={`w-5 h-5 ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-500'}`} />
          <span className={`font-bold ${timeLeft <= 10 ? 'text-red-500' : 'text-gray-700'}`}>
            {timeLeft}s
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
        />
      </div>

      {/* Question */}
      <h2 className="text-xl font-bold text-gray-900 mb-6">
        {question.question}
      </h2>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => {
          let buttonClass = "w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ";
          
          if (showResult) {
            if (index === question.correct) {
              buttonClass += "bg-green-50 border-green-500 text-green-700";
            } else if (index === selectedAnswer && index !== question.correct) {
              buttonClass += "bg-red-50 border-red-500 text-red-700";
            } else {
              buttonClass += "bg-gray-50 border-gray-200 text-gray-500";
            }
          } else {
            buttonClass += selectedAnswer === index 
              ? "bg-blue-50 border-blue-500 text-blue-700" 
              : "bg-gray-50 border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50";
          }

          return (
            <motion.button
              key={index}
              whileHover={!showResult ? { scale: 1.02 } : {}}
              whileTap={!showResult ? { scale: 0.98 } : {}}
              onClick={() => !showResult && handleAnswer(index)}
              disabled={showResult}
              className={buttonClass}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option}</span>
                {showResult && (
                  <div className="flex-shrink-0 ml-3">
                    {index === question.correct ? (
                      <CheckCircle className="w-6 h-6 text-green-500" />
                    ) : index === selectedAnswer ? (
                      <XCircle className="w-6 h-6 text-red-500" />
                    ) : null}
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>

      {/* Result Message */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`mt-6 p-4 rounded-xl ${
              selectedAnswer === question.correct 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}
          >
            <div className="flex items-center space-x-2">
              {selectedAnswer === question.correct ? (
                <>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="font-medium text-green-700">
                    Correct! +{question.xp} XP
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-red-700">
                    {selectedAnswer === null ? 'Time\'s up!' : 'Incorrect!'}
                  </span>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default QuizCard;
