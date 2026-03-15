const express = require('express');
const router = express.Router();
const { getAllAI, getAIByLevel, getAIById } = require('../data/aiData');

// Get all AI opponents
router.get('/', (req, res) => {
  try {
    const allAI = getAllAI();
    res.json({ success: true, data: allAI });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get AI by level
router.get('/level/:level', (req, res) => {
  try {
    const aiList = getAIByLevel(req.params.level);
    res.json({ success: true, data: aiList });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get AI by ID
router.get('/:id', (req, res) => {
  try {
    const ai = getAIById(req.params.id);
    if (!ai) {
      return res.status(404).json({ message: 'AI not found' });
    }
    res.json({ success: true, data: ai });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
