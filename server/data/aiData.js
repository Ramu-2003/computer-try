const aiOpponents = {
  easy: [
    {
      id: 'beginner-bot',
      name: 'BeginnerBot',
      level: 'easy',
      speciality: 'Understands basic problems, Writes simple code',
      weakness: 'Many logical mistakes, Fails complex test cases',
      speed: 'slow',
      performance: {
        beginner: 'medium',
        moderate: 'poor',
        hard: 'very poor'
      }
    },
    {
      id: 'lazy-compiler',
      name: 'LazyCompiler',
      level: 'easy',
      speciality: 'Writes short code quickly',
      weakness: 'Skips edge cases, Fails large inputs',
      speed: 'fast',
      performance: {
        beginner: 'medium',
        moderate: 'poor',
        hard: 'very poor'
      }
    },
    {
      id: 'bug-maker',
      name: 'BugMaker',
      level: 'easy',
      speciality: 'Writes code fast',
      weakness: 'Syntax errors, Runtime errors',
      speed: 'fast',
      performance: {
        beginner: 'medium',
        moderate: 'poor',
        hard: 'very poor'
      }
    },
    {
      id: 'copy-coder',
      name: 'CopyCoder',
      level: 'easy',
      speciality: 'Solves common coding patterns',
      weakness: 'Cannot solve new problems',
      speed: 'medium',
      performance: {
        beginner: 'good',
        moderate: 'poor',
        hard: 'very poor'
      }
    },
    {
      id: 'pattern-ai',
      name: 'PatternAI',
      level: 'easy',
      speciality: 'Recognizes basic patterns',
      weakness: 'Struggles with unique problems',
      speed: 'medium',
      performance: {
        beginner: 'good',
        moderate: 'medium',
        hard: 'poor'
      }
    }
  ],
  moderate: [
    {
      id: 'logic-bot',
      name: 'LogicBot',
      level: 'moderate',
      speciality: 'Strong logical thinking, Correct algorithms',
      weakness: 'Slow coding speed',
      speed: 'slow',
      performance: {
        beginner: 'excellent',
        moderate: 'good',
        hard: 'medium'
      }
    },
    {
      id: 'flash-coder',
      name: 'FlashCoder',
      level: 'moderate',
      speciality: 'Very fast coding',
      weakness: 'Misses edge cases',
      speed: 'very fast',
      performance: {
        beginner: 'excellent',
        moderate: 'good',
        hard: 'medium'
      }
    },
    {
      id: 'debug-bot',
      name: 'DebugBot',
      level: 'moderate',
      speciality: 'Fixes bugs efficiently',
      weakness: 'Slow initial coding',
      speed: 'medium',
      performance: {
        beginner: 'excellent',
        moderate: 'good',
        hard: 'medium'
      }
    },
    {
      id: 'memory-bot',
      name: 'MemoryBot',
      level: 'moderate',
      speciality: 'Remembers previous problems',
      weakness: 'Sometimes repeats wrong solutions',
      speed: 'fast',
      performance: {
        beginner: 'excellent',
        moderate: 'good',
        hard: 'medium'
      }
    },
    {
      id: 'over-thinker',
      name: 'OverThinker',
      level: 'moderate',
      speciality: 'Solves complex logic',
      weakness: 'Overcomplicates simple problems',
      speed: 'slow',
      performance: {
        beginner: 'medium',
        moderate: 'excellent',
        hard: 'good'
      }
    }
  ],
  hard: [
    {
      id: 'algorithm-prime',
      name: 'Algorithm Prime',
      level: 'hard',
      speciality: 'Perfect algorithm design, Optimized solutions',
      weakness: 'None',
      speed: 'fast',
      performance: {
        beginner: 'perfect',
        moderate: 'perfect',
        hard: 'near perfect'
      }
    },
    {
      id: 'speedster-x',
      name: 'Speedster-X',
      level: 'hard',
      speciality: 'Extremely fast coding',
      weakness: 'Minimal',
      speed: 'extremely fast',
      performance: {
        beginner: 'perfect',
        moderate: 'excellent',
        hard: 'excellent'
      }
    },
    {
      id: 'edge-master',
      name: 'EdgeMaster',
      level: 'hard',
      speciality: 'Handles all edge cases',
      weakness: 'None',
      speed: 'fast',
      performance: {
        beginner: 'perfect',
        moderate: 'perfect',
        hard: 'excellent'
      }
    },
    {
      id: 'cleancode-titan',
      name: 'CleanCode Titan',
      level: 'hard',
      speciality: 'Perfect code structure, Highly readable code',
      weakness: 'None',
      speed: 'medium',
      performance: {
        beginner: 'perfect',
        moderate: 'perfect',
        hard: 'excellent'
      }
    },
    {
      id: 'testcase-destroyer',
      name: 'TestCase Destroyer',
      level: 'hard',
      speciality: 'Passes all hidden test cases, Final boss AI',
      weakness: 'None',
      speed: 'fast',
      performance: {
        beginner: 'perfect',
        moderate: 'perfect',
        hard: 'perfect'
      }
    }
  ]
};

const getAllAI = () => {
  return [...aiOpponents.easy, ...aiOpponents.moderate, ...aiOpponents.hard];
};

const getAIByLevel = (level) => {
  return aiOpponents[level] || [];
};

const getAIById = (id) => {
  const allAI = getAllAI();
  return allAI.find(ai => ai.id === id);
};

const getRandomAI = (count = 1, level = null) => {
  let pool = level ? getAIByLevel(level) : getAllAI();
  const selected = [];
  
  for (let i = 0; i < count && pool.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * pool.length);
    selected.push(pool[randomIndex]);
    pool = pool.filter((_, index) => index !== randomIndex);
  }
  
  return selected;
};

module.exports = {
  aiOpponents,
  getAllAI,
  getAIByLevel,
  getAIById,
  getRandomAI
};
