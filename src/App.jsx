import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Calculator, Trophy, Settings as SettingsIcon } from 'lucide-react';
import Challenge from './components/Challenge';
import Settings from './components/Settings';
import './App.css';

function App() {
  const [difficulty, setDifficulty] = useState('easy');
  const [numberCount, setNumberCount] = useState(2);
  const [showSettings, setShowSettings] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const handleCorrectAnswer = () => {
    setScore(score + 1);
    setStreak(streak + 1);
  };

  const handleWrongAnswer = () => {
    setStreak(0);
  };

  return (
    <div className="app">
      {/* Background gradient animation */}
      <div className="background-gradient"></div>
      
      {/* Header */}
      <motion.header 
        className="header"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <div className="logo">
            <Brain className="logo-icon" />
            <h1>Mathmizer</h1>
          </div>
          
          <div className="stats">
            <div className="stat">
              <Trophy className="stat-icon" />
              <span>Score: {score}</span>
            </div>
            <div className="stat">
              <Calculator className="stat-icon" />
              <span>Streak: {streak}</span>
            </div>
          </div>

          <motion.button
            className="settings-btn"
            onClick={() => setShowSettings(!showSettings)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <SettingsIcon />
          </motion.button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="main-content">
        <AnimatePresence mode="wait">
          {showSettings ? (
            <Settings
              key="settings"
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              numberCount={numberCount}
              setNumberCount={setNumberCount}
              onClose={() => setShowSettings(false)}
            />
          ) : (
            <Challenge
              key="challenge"
              difficulty={difficulty}
              numberCount={numberCount}
              onCorrect={handleCorrectAnswer}
              onWrong={handleWrongAnswer}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>Train your mind • Improve your calculation skills • Master the numbers</p>
      </footer>
    </div>
  );
}

export default App;