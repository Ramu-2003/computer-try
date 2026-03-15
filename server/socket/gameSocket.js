const Room = require('../models/Room');
const { getAIById } = require('../data/aiData');
const { getRandomChallenge } = require('../data/challenges');

// Simulate AI coding with binary display
const simulateAICoding = (ai, challenge, io, roomId, aiCompletionData) => {
  const difficulty = challenge.id.includes('-b-') ? 'beginner' : 
                     challenge.id.includes('-m-') ? 'moderate' : 'hard';
  
  const performance = ai.performance[difficulty];
  let baseTime = 30000; // 30 seconds base
  
  if (performance === 'perfect' || performance === 'excellent') {
    baseTime = 15000;
  } else if (performance === 'good') {
    baseTime = 25000;
  } else if (performance === 'medium') {
    baseTime = 40000;
  } else {
    baseTime = 60000;
  }
  
  const variance = Math.random() * 10000;
  const totalTime = baseTime + variance;
  
  let progress = 0;
  const interval = setInterval(() => {
    progress += 10;
    const binaryCode = Array(50).fill(0).map(() => Math.random() > 0.5 ? '1' : '0').join('');
    
    io.to(roomId).emit('ai-coding-progress', {
      aiId: ai.id,
      progress,
      binaryCode
    });
    
    if (progress >= 100) {
      clearInterval(interval);
      
      const testsPassed = performance === 'perfect' ? challenge.testCases.length :
                         performance === 'excellent' ? challenge.testCases.length :
                         performance === 'good' ? Math.floor(challenge.testCases.length * 0.8) :
                         performance === 'medium' ? Math.floor(challenge.testCases.length * 0.6) :
                         Math.floor(challenge.testCases.length * 0.4);
      
      // Store AI completion data
      if (!aiCompletionData[roomId]) {
        aiCompletionData[roomId] = {};
      }
      aiCompletionData[roomId][ai.id] = {
        time: totalTime,
        testsPassed,
        totalTests: challenge.testCases.length
      };
      
      io.to(roomId).emit('ai-completed', {
        aiId: ai.id,
        time: totalTime,
        testsPassed,
        totalTests: challenge.testCases.length
      });
    }
  }, totalTime / 10);
};

module.exports = (io) => {
  // Store AI completion data temporarily
  const aiCompletionData = {};

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join-room', async ({ roomId, userId }) => {
      try {
        console.log(`User ${userId} joining room ${roomId}`);
        socket.join(roomId);
        const room = await Room.findOne({ roomId });
        
        if (room) {
          const playerIndex = room.players.findIndex(p => p.user.toString() === userId);
          if (playerIndex !== -1) {
            room.players[playerIndex].socketId = socket.id;
            await room.save();
          }
          
          console.log(`Room ${roomId} updated, emitting to all clients`);
          io.to(roomId).emit('room-updated', room);
          
          // If game is already in progress, send current game state
          if (room.status === 'in-progress') {
            const challenge = getRandomChallenge(room.difficulty);
            const aiOpponent = getAIById(room.selectedAI[room.currentRound - 1]);
            
            socket.emit('game-started', {
              round: room.currentRound,
              challenge,
              aiOpponent,
              maxTime: room.maxTime
            });
          }
        }
      } catch (error) {
        console.error('Join room error:', error);
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('start-game', async ({ roomId }) => {
      try {
        console.log('Starting game for room:', roomId);
        const room = await Room.findOne({ roomId });
        if (!room) {
          console.log('Room not found');
          return;
        }
        
        room.status = 'in-progress';
        room.currentRound = 1;
        await room.save();
        
        const challenge = getRandomChallenge(room.difficulty);
        const aiOpponent = getAIById(room.selectedAI[0]);
        
        console.log('Emitting game-started event');
        io.to(roomId).emit('game-started', {
          round: 1,
          challenge,
          aiOpponent,
          maxTime: room.maxTime
        });
        
        simulateAICoding(aiOpponent, challenge, io, roomId, aiCompletionData);
      } catch (error) {
        console.error('Start game error:', error);
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('submit-code', async ({ roomId, userId, timeTaken, testsPassed }) => {
      try {
        const room = await Room.findOne({ roomId });
        if (!room) return;
        
        const player = room.players.find(p => p.user.toString() === userId);
        const aiOpponent = getAIById(room.selectedAI[room.currentRound - 1]);
        
        // Get AI completion data
        const aiData = aiCompletionData[roomId]?.[aiOpponent.id] || { time: 0, testsPassed: 0 };
        
        room.results.push({
          round: room.currentRound,
          player: player.username,
          aiOpponent: aiOpponent.name,
          playerTime: timeTaken,
          aiTime: aiData.time,
          playerTestsPassed: testsPassed,
          aiTestsPassed: aiData.testsPassed
        });
        
        if (room.currentRound < room.totalRounds) {
          room.currentRound += 1;
          await room.save();
          
          const challenge = getRandomChallenge(room.difficulty);
          const nextAI = getAIById(room.selectedAI[room.currentRound - 1]);
          
          io.to(roomId).emit('next-round', {
            round: room.currentRound,
            challenge,
            aiOpponent: nextAI
          });
          
          simulateAICoding(nextAI, challenge, io, roomId, aiCompletionData);
        } else {
          room.status = 'completed';
          await room.save();
          
          // Clean up AI completion data
          delete aiCompletionData[roomId];
          
          io.to(roomId).emit('game-completed', {
            results: room.results
          });
        }
      } catch (error) {
        console.error('Submit code error:', error);
        socket.emit('error', { message: error.message });
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
};
