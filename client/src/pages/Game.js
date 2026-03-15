import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Editor from '@monaco-editor/react';
import io from 'socket.io-client';
import { toast } from 'react-hot-toast';

const Game = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [socket, setSocket] = useState(null);
  const [gameData, setGameData] = useState(null);
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(0);
  const [testResults, setTestResults] = useState([]);
  const [aiProgress, setAiProgress] = useState(0);
  const [aiBinaryCode, setAiBinaryCode] = useState('');
  const [gameCompleted, setGameCompleted] = useState(false);
  const [results, setResults] = useState(null);
  const [strictMode] = useState(true);

  useEffect(() => {
    if (!user) return;
    
    const newSocket = io('http://localhost:5000');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      console.log('Socket connected');
      newSocket.emit('join-room', { roomId, userId: user.id });
    });

    newSocket.on('game-started', (data) => {
      console.log('Game started:', data);
      setGameData(data);
      setTimeLeft(data.maxTime);
      setCode('');
      setTestResults([]);
      setAiProgress(0);
    });

    newSocket.on('ai-coding-progress', (data) => {
      setAiProgress(data.progress);
      setAiBinaryCode(data.binaryCode);
    });

    newSocket.on('ai-completed', (data) => {
      toast.success(`AI completed in ${Math.floor(data.time / 1000)} seconds`);
    });

    newSocket.on('next-round', (data) => {
      setGameData(data);
      setCode('');
      setTestResults([]);
      setAiProgress(0);
    });

    newSocket.on('game-completed', (data) => {
      setGameCompleted(true);
      setResults(data.results);
    });

    newSocket.on('error', (error) => {
      console.error('Socket error:', error);
      toast.error(error.message || 'Connection error');
    });

    return () => {
      newSocket.disconnect();
    };
  }, [roomId, user]);

  useEffect(() => {
    if (timeLeft > 0 && !gameCompleted) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, gameCompleted]);

  // Disable copy-paste in strict mode
  useEffect(() => {
    if (strictMode) {
      const handleKeyDown = (e) => {
        if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'v')) {
          e.preventDefault();
          toast.error('Copy/Paste disabled in strict mode!');
        }
      };

      const handleContextMenu = (e) => {
        e.preventDefault();
        toast.error('Right-click disabled in strict mode!');
      };

      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('contextmenu', handleContextMenu);

      return () => {
        document.removeEventListener('keydown', handleKeyDown);
        document.removeEventListener('contextmenu', handleContextMenu);
      };
    }
  }, [strictMode]);

  const runTests = () => {
    if (!gameData || !code.trim()) {
      toast.error('Please write some code first');
      return;
    }

    const results = gameData.challenge.testCases.map((testCase, index) => {
      const passed = code.toLowerCase().includes(testCase.expected.toLowerCase());
      return {
        id: index,
        description: testCase.description,
        passed
      };
    });

    setTestResults(results);
    return results;
  };

  const submitCode = () => {
    const results = runTests();
    const passedTests = results.filter(r => r.passed).length;
    const timeTaken = (gameData.maxTime - timeLeft) * 1000; // Convert to milliseconds

    if (socket) {
      socket.emit('submit-code', {
        roomId,
        userId: user.id,
        timeTaken,
        testsPassed: passedTests
      });
    }

    toast.success(`Submitted! Passed ${passedTests}/${results.length} tests`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameCompleted && results) {
    return (
      <div className="min-h-screen p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-2xl p-8">
            <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Game Results</h1>
            
            <div className="space-y-6">
              {results.map((result, index) => (
                <div key={index} className="p-6 border rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Round {result.round}</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-blue-600">Player: {result.player}</h4>
                      <p>Time: {Math.floor(result.playerTime / 1000)}s</p>
                      <p>Tests Passed: {result.playerTestsPassed}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-600">AI: {result.aiOpponent}</h4>
                      <p>Time: {Math.floor(result.aiTime / 1000)}s</p>
                      <p>Tests Passed: {result.aiTestsPassed}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={() => navigate('/home')}
                className="bg-purple-600 text-white px-8 py-3 rounded-lg hover:bg-purple-700 transition"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!gameData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading game...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 no-copy">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-white">
            Round {gameData.round} - {gameData.challenge.title}
          </h1>
          <div className="bg-white rounded-lg px-4 py-2">
            <span className="text-2xl font-bold text-red-600">{formatTime(timeLeft)}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[calc(100vh-120px)]">
          {/* Left Panel - Code Editor */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="bg-gray-800 text-white p-3">
              <h2 className="text-lg font-semibold">Code Editor</h2>
            </div>
            <div className="flex-1" style={{ minHeight: '500px' }}>
              <Editor
                height="100%"
                defaultLanguage="html"
                value={code}
                onChange={(value) => setCode(value || '')}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: 'on',
                  contextmenu: false,
                  selectOnLineNumbers: false
                }}
              />
            </div>
          </div>

          {/* Right Panel */}
          <div className="space-y-4">
            {/* Challenge Description */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-2">Challenge</h3>
              <p className="text-gray-700">{gameData.challenge.description}</p>
              <div className="mt-3 p-3 bg-gray-100 rounded">
                <h4 className="font-semibold text-sm">Expected Output:</h4>
                <code className="text-sm">{gameData.challenge.expectedOutput}</code>
              </div>
            </div>

            {/* Test Cases */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-semibold">Test Cases</h3>
                <button
                  onClick={runTests}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                >
                  Run Tests
                </button>
              </div>
              <div className="space-y-2">
                {gameData.challenge.testCases.map((testCase, index) => {
                  const result = testResults.find(r => r.id === index);
                  return (
                    <div
                      key={index}
                      className={`p-3 rounded border ${
                        result
                          ? result.passed
                            ? 'bg-green-50 border-green-300'
                            : 'bg-red-50 border-red-300'
                          : 'bg-gray-50 border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-sm">{testCase.description}</span>
                        {result && (
                          <span className={`text-sm font-semibold ${
                            result.passed ? 'text-green-600' : 'text-red-600'
                          }`}>
                            {result.passed ? '✓ PASS' : '✗ FAIL'}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Panel */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <h3 className="text-lg font-semibold mb-3">AI Opponent: {gameData.aiOpponent.name}</h3>
              <div className="mb-3">
                <div className="flex justify-between text-sm mb-1">
                  <span>Progress</span>
                  <span>{aiProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${aiProgress}%` }}
                  ></div>
                </div>
              </div>
              <div className="bg-black text-green-400 p-3 rounded font-mono text-xs overflow-hidden">
                {aiBinaryCode || '01001000 01100101 01101100 01101100 01101111'}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={submitCode}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition text-lg font-semibold"
            >
              Submit Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;