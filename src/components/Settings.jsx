import { motion } from 'framer-motion';
import { X, Zap, Target, TrendingUp } from 'lucide-react';

function Settings({ difficulty, setDifficulty, numberCount, setNumberCount, onClose }) {
  const difficulties = [
    {
      value: 'easy',
      label: 'Easy',
      icon: <Zap size={20} />,
      description: 'Rounded numbers only (100, 200, 2000, etc.)',
      color: '#10b981'
    },
    {
      value: 'medium',
      label: 'Medium',
      icon: <Target size={20} />,
      description: 'Any whole numbers',
      color: '#f59e0b'
    },
    {
      value: 'hard',
      label: 'Hard',
      icon: <TrendingUp size={20} />,
      description: 'Including decimal numbers',
      color: '#ef4444'
    }
  ];

  return (
    <motion.div 
      className="settings-container"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <div className="settings-card">
        <div className="settings-header">
          <h2>Settings</h2>
          <motion.button
            onClick={onClose}
            className="close-btn"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X size={24} />
          </motion.button>
        </div>

        {/* Difficulty Selection */}
        <div className="settings-section">
          <h3>Difficulty Level</h3>
          <div className="difficulty-options">
            {difficulties.map((diff) => (
              <motion.button
                key={diff.value}
                className={`difficulty-option ${difficulty === diff.value ? 'active' : ''}`}
                onClick={() => setDifficulty(diff.value)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  '--accent-color': diff.color
                }}
              >
                <div className="option-icon" style={{ color: diff.color }}>
                  {diff.icon}
                </div>
                <div className="option-content">
                  <h4>{diff.label}</h4>
                  <p>{diff.description}</p>
                </div>
                {difficulty === diff.value && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeIndicator"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Number Count Slider */}
        <div className="settings-section">
          <h3>Number of Numbers</h3>
          <p className="section-description">
            How many numbers should be in each calculation?
          </p>
          
          <div className="slider-container">
            <div className="slider-value">
              <span className="value-display">{numberCount}</span>
              <span className="value-label">numbers</span>
            </div>
            
            <div className="slider-wrapper">
              <input
                type="range"
                min="2"
                max="10"
                value={numberCount}
                onChange={(e) => setNumberCount(parseInt(e.target.value))}
                className="slider"
                style={{
                  '--progress': `${((numberCount - 2) / 8) * 100}%`
                }}
              />
              <div className="slider-marks">
                {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <span 
                    key={num} 
                    className={`mark ${numberCount === num ? 'active' : ''}`}
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="settings-preview">
          <h4>Preview</h4>
          <p>
            You'll solve {difficulty} problems with {numberCount} numbers.
            {difficulty === 'easy' && ' Numbers will be rounded (e.g., 100, 500, 2000).'}
            {difficulty === 'medium' && ' Numbers will be whole integers.'}
            {difficulty === 'hard' && ' Numbers may include decimals.'}
          </p>
        </div>

        {/* Apply Button */}
        <motion.button
          onClick={onClose}
          className="apply-btn"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Apply Settings
        </motion.button>
      </div>
    </motion.div>
  );
}

export default Settings;
