import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AIRules = () => {
  const navigate = useNavigate();
  const [aiList, setAiList] = useState([]);

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

  const getLevelColor = (level) => {
    switch(level) {
      case 'easy': return 'bg-green-500';
      case 'moderate': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getEstimatedTime = (performance) => {
    if (performance === 'perfect' || performance === 'excellent') return '15-25s';
    if (performance === 'good') return '25-35s';
    if (performance === 'medium') return '40-50s';
    return '60-70s';
  };

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">AI Opponents Rules</h1>
          <button
            onClick={() => navigate('/home')}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Back to Home
          </button>
        </div>

        {/* Time Guide */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Coding Speed Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
              <h3 className="font-bold text-green-700 mb-2">Perfect/Excellent</h3>
              <p className="text-2xl font-bold text-green-600">15-25s</p>
              <p className="text-sm text-gray-600 mt-1">Lightning fast coding</p>
            </div>
            <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg">
              <h3 className="font-bold text-blue-700 mb-2">Good</h3>
              <p className="text-2xl font-bold text-blue-600">25-35s</p>
              <p className="text-sm text-gray-600 mt-1">Fast and reliable</p>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-lg">
              <h3 className="font-bold text-yellow-700 mb-2">Medium</h3>
              <p className="text-2xl font-bold text-yellow-600">40-50s</p>
              <p className="text-sm text-gray-600 mt-1">Moderate speed</p>
            </div>
            <div className="p-4 bg-red-50 border border-red-300 rounded-lg">
              <h3 className="font-bold text-red-700 mb-2">Poor</h3>
              <p className="text-2xl font-bold text-red-600">60-70s</p>
              <p className="text-sm text-gray-600 mt-1">Slow and struggling</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiList.map((ai) => (
            <div key={ai.id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-800">{ai.name}</h3>
                <span className={`${getLevelColor(ai.level)} text-white px-3 py-1 rounded-full text-sm`}>
                  {ai.level.toUpperCase()}
                </span>
              </div>
              
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-semibold text-gray-600">Speciality:</p>
                  <p className="text-gray-800">{ai.speciality}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-600">Weakness:</p>
                  <p className="text-gray-800">{ai.weakness}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-600">Speed:</p>
                  <p className="text-gray-800 capitalize">{ai.speed}</p>
                </div>
                
                <div>
                  <p className="text-sm font-semibold text-gray-600">Performance & Time:</p>
                  <ul className="text-sm text-gray-700 mt-1 space-y-1">
                    <li className="flex justify-between">
                      <span>Beginner:</span>
                      <span className="font-semibold">
                        {ai.performance.beginner} ({getEstimatedTime(ai.performance.beginner)})
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Moderate:</span>
                      <span className="font-semibold">
                        {ai.performance.moderate} ({getEstimatedTime(ai.performance.moderate)})
                      </span>
                    </li>
                    <li className="flex justify-between">
                      <span>Hard:</span>
                      <span className="font-semibold">
                        {ai.performance.hard} ({getEstimatedTime(ai.performance.hard)})
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIRules;
