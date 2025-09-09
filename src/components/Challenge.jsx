import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Eye, EyeOff, ChevronRight, Sparkles } from 'lucide-react';
import { generateProblem } from '../utils/problemGenerator';

function Challenge({ difficulty, numberCount, selectedOperators, onCorrect, onWrong }) {
  const [problem, setProblem] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  useEffect(() => {
    generateNewProblem();
  }, [difficulty, numberCount, selectedOperators]);

  const generateNewProblem = () => {
    const newProblem = generateProblem(difficulty, numberCount, selectedOperators);
    setProblem(newProblem);
    setShowAnswer(false);
    setUserAnswer('');
    setFeedback('');
    setIsCorrect(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;

    const userAnswerNum = parseFloat(userAnswer);
    const correctAnswer = problem.answer;
    // Allow 0.01 tolerance for all difficulty levels since we're using 2 decimal places
    const tolerance = 0.01;
    
    if (Math.abs(userAnswerNum - correctAnswer) <= tolerance) {
      setIsCorrect(true);
      setFeedback('Excellent! 🎉');
      onCorrect();
    } else {
      setIsCorrect(false);
      setFeedback(`Not quite. The answer is ${correctAnswer}`);
      onWrong();
    }
    setShowAnswer(true);
  };

  const handleNext = () => {
    generateNewProblem();
  };

  if (!problem) return null;

  return (
    <motion.div 
      className="challenge-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="challenge-card">
        {/* Problem Display */}
        <motion.div 
          className="problem-display"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="problem-header">
            <span className="difficulty-badge" data-difficulty={difficulty}>
              {difficulty.toUpperCase()}
            </span>
            <span className="operation-badge">
              {problem.operationDisplay}
            </span>
          </div>
          
          <div className="problem-text">
            {problem.display}
          </div>
        </motion.div>

        {/* Answer Input */}
        <form onSubmit={handleSubmit} className="answer-section">
          <div className="input-group">
            <input
              type="number"
              step="any"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Enter your answer..."
              className="answer-input"
              disabled={showAnswer}
              autoFocus
            />
            
            {!showAnswer && (
              <motion.button
                type="submit"
                className="submit-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                disabled={!userAnswer.trim()}
              >
                Check Answer
              </motion.button>
            )}
          </div>
        </form>

        {/* Feedback */}
        {feedback && (
          <motion.div
            className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {isCorrect && <Sparkles className="feedback-icon" />}
            <span>{feedback}</span>
          </motion.div>
        )}

        {/* Action Buttons */}
        <div className="action-buttons">
          {!showAnswer ? (
            <motion.button
              onClick={() => setShowAnswer(true)}
              className="show-answer-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Eye size={18} />
              Show Answer
            </motion.button>
          ) : (
            <motion.div
              className="answer-display"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="answer-label">Answer:</span>
              <span className="answer-value">{problem.answer}</span>
            </motion.div>
          )}

          <motion.button
            onClick={handleNext}
            className="next-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showAnswer ? (
              <>
                Next Challenge
                <ChevronRight size={18} />
              </>
            ) : (
              <>
                <RefreshCw size={18} />
                New Problem
              </>
            )}
          </motion.button>
        </div>

        {/* Problem Info */}
        <div className="problem-info">
          <span className="info-item">
            {numberCount} numbers
          </span>
          <span className="info-item">
            {problem.operations.join(', ')}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default Challenge;
