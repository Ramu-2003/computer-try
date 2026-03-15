import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const RoomSettings = () => {
  const navigate = useNavigate();
  const [aiList, setAiList] = useState([]);
  const [formData, setFormData] = useState({
    gameMode: '1-player',
    maxTime: 600, // 10 minutes default
    aiSelection: 'random',
    selectedAI: [],
    difficulty: 'beginner',
    roundSelection: 'random',
    totalRounds: 1
  });
  const [joinRoom, setJoinRoom] = useState(false);
  const [joinData, setJoinData] = useState({
    roomId: '',
    roomPassword: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const res = await axios.get('/api/ai');
        setAiList(res.data.data);
      } catch (error) {
        console.error('Failed to fetch AI data');
      }
    };
    fetchAI();
  }, []);

  useEffect(() => {
    const playerCount = parseInt(formData.gameMode.charAt(0));
    setFormData(prev => ({
      ...prev,
      totalRounds: playerCount === 1 ? prev.totalRounds : playerCount
    }));
  }, [formData.gameMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAISelection = (aiId) => {
    const playerCount = parseInt(formData.gameMode.charAt(0));
    let newSelected = [...formData.selectedAI];
    
    if (newSelected.includes(aiId)) {
      newSelected = newSelected.filter(id => id !== aiId);
    } else if (newSelected.length < playerCount) {
      newSelected.push(aiId);
    }
    
    setFormData(prev => ({ ...prev, selectedAI: newSelected }));
  };

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    
    if (formData.aiSelection === 'select' && formData.selectedAI.length === 0) {
      toast.error('Please select at least one AI opponent');
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post('/api/rooms/create', formData);
      toast.success('Room created successfully!');
      navigate(`/lobby/${res.data.data.roomId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create room');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/rooms/join', joinData);
      toast.success('Joined room successfully!');
      navigate(`/lobby/${joinData.roomId}`);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to join room');
    } finally {
      setLoading(false);
    }
  };

  const getAIByLevel = (level) => {
    return aiList.filter(ai => ai.level === level);
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Room Settings</h1>
          <button
            onClick={() => navigate('/home')}
            className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition"
          >
            Back to Home
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-8">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setJoinRoom(false)}
              className={`px-6 py-2 rounded-lg transition ${!joinRoom ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Create Room
            </button>
            <button
              onClick={() => setJoinRoom(true)}
              className={`px-6 py-2 rounded-lg transition ${joinRoom ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-700'}`}
            >
              Join Room
            </button>
          </div>

          {!joinRoom ? (
            <form onSubmit={handleCreateRoom} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">Game Mode</label>
                  <select
                    name="gameMode"
                    value={formData.gameMode}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="1-player">1 Player vs AI</option>
                    <option value="2-player">2 Players vs AI</option>
                    <option value="3-player">3 Players vs AI</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">Max Time (minutes)</label>
                  <select
                    name="maxTime"
                    value={formData.maxTime}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value={600}>10 minutes</option>
                    <option value={1200}>20 minutes</option>
                    <option value={1800}>30 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">Difficulty</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="moderate">Moderate</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">AI Selection</label>
                  <select
                    name="aiSelection"
                    value={formData.aiSelection}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="random">Random AI</option>
                    <option value="select">Select AI</option>
                  </select>
                </div>

                {formData.gameMode === '1-player' && (
                  <div>
                    <label className="block text-gray-700 mb-2 font-semibold">Total Rounds</label>
                    <select
                      name="totalRounds"
                      value={formData.totalRounds}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                    >
                      {[...Array(10)].map((_, i) => (
                        <option key={i + 1} value={i + 1}>{i + 1} Round{i > 0 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {formData.aiSelection === 'select' && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-700 mb-4">
                    Select AI Opponents ({formData.selectedAI.length}/{parseInt(formData.gameMode.charAt(0))})
                  </h3>
                  
                  {['easy', 'moderate', 'hard'].map(level => (
                    <div key={level} className="mb-6">
                      <h4 className="text-md font-semibold text-gray-600 mb-3 capitalize">{level} AI</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {getAIByLevel(level).map(ai => (
                          <div
                            key={ai.id}
                            onClick={() => handleAISelection(ai.id)}
                            className={`p-3 border rounded-lg cursor-pointer transition ${
                              formData.selectedAI.includes(ai.id)
                                ? 'border-purple-600 bg-purple-50'
                                : 'border-gray-300 hover:border-purple-400'
                            }`}
                          >
                            <h5 className="font-semibold text-gray-800">{ai.name}</h5>
                            <p className="text-sm text-gray-600">{ai.speciality}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 text-lg font-semibold"
              >
                {loading ? 'Creating Room...' : 'Create Room'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleJoinRoom} className="space-y-6">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Room ID</label>
                <input
                  type="text"
                  value={joinData.roomId}
                  onChange={(e) => setJoinData(prev => ({ ...prev, roomId: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter Room ID"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Room Password</label>
                <input
                  type="text"
                  value={joinData.roomPassword}
                  onChange={(e) => setJoinData(prev => ({ ...prev, roomPassword: e.target.value }))}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                  placeholder="Enter Room Password"
                  required
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition disabled:opacity-50 text-lg font-semibold"
              >
                {loading ? 'Joining Room...' : 'Join Room'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomSettings;