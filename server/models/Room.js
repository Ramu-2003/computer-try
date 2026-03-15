const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  roomPassword: {
    type: String,
    required: true
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  players: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    username: String,
    socketId: String
  }],
  gameMode: {
    type: String,
    enum: ['1-player', '2-player', '3-player'],
    required: true
  },
  maxTime: {
    type: Number,
    required: true,
    max: 1800 // 30 minutes in seconds
  },
  aiSelection: {
    type: String,
    enum: ['select', 'random'],
    required: true
  },
  selectedAI: [{
    type: String
  }],
  language: {
    type: String,
    default: 'html'
  },
  difficulty: {
    type: String,
    enum: ['beginner', 'moderate', 'hard'],
    required: true
  },
  roundSelection: {
    type: String,
    enum: ['pick', 'random'],
    required: true
  },
  totalRounds: {
    type: Number,
    required: true
  },
  currentRound: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['lobby', 'in-progress', 'completed'],
    default: 'lobby'
  },
  results: [{
    round: Number,
    player: String,
    aiOpponent: String,
    winner: String,
    playerTime: Number,
    aiTime: Number,
    playerTestsPassed: Number,
    aiTestsPassed: Number
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Room', roomSchema);
