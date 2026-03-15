const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const { protect } = require('../middleware/auth');
const { getRandomAI } = require('../data/aiData');

// Generate random room credentials
const generateRoomId = () => {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
};

const generateRoomPassword = () => {
  return Math.random().toString(36).substring(2, 12);
};

// Create Room
router.post('/create', protect, async (req, res) => {
  try {
    const {
      gameMode,
      maxTime,
      aiSelection,
      selectedAI,
      difficulty,
      roundSelection,
      totalRounds
    } = req.body;

    const roomId = generateRoomId();
    const roomPassword = generateRoomPassword();

    let aiOpponents = [];
    if (aiSelection === 'random') {
      const aiCount = gameMode === '1-player' ? 1 : parseInt(gameMode.charAt(0));
      aiOpponents = getRandomAI(aiCount).map(ai => ai.id);
    } else {
      aiOpponents = selectedAI;
    }

    const room = await Room.create({
      roomId,
      roomPassword,
      host: req.user._id,
      players: [{
        user: req.user._id,
        username: req.user.username
      }],
      gameMode,
      maxTime,
      aiSelection,
      selectedAI: aiOpponents,
      difficulty,
      roundSelection,
      totalRounds
    });

    res.status(201).json({
      success: true,
      data: {
        roomId,
        roomPassword,
        room
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Join Room
router.post('/join', protect, async (req, res) => {
  try {
    const { roomId, roomPassword } = req.body;

    const room = await Room.findOne({ roomId, roomPassword });
    if (!room) {
      return res.status(404).json({ message: 'Invalid room credentials' });
    }

    if (room.status !== 'lobby') {
      return res.status(400).json({ message: 'Room is not accepting players' });
    }

    const maxPlayers = parseInt(room.gameMode.charAt(0));
    if (room.players.length >= maxPlayers) {
      return res.status(400).json({ message: 'Room is full' });
    }

    const alreadyJoined = room.players.some(p => p.user.toString() === req.user._id.toString());
    if (alreadyJoined) {
      return res.json({ success: true, data: room });
    }

    room.players.push({
      user: req.user._id,
      username: req.user.username
    });
    await room.save();

    res.json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get Room Details
router.get('/:roomId', protect, async (req, res) => {
  try {
    const room = await Room.findOne({ roomId: req.params.roomId }).populate('players.user', 'username');
    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }
    res.json({ success: true, data: room });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;
