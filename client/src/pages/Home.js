import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Computer Mode</h1>
          <div className="flex gap-4 items-center">
            <span className="text-white">Welcome, {user?.username}</span>
            <button
              onClick={() => navigate('/ai-rules')}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
              AI Rules
            </button>
            <button
              onClick={logout}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-md mx-auto">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8">
            <div className="flex justify-between items-center">
              <div className="text-white">
                <div className="text-6xl font-bold mb-2">🤖</div>
                <p className="text-xl">AI</p>
              </div>
              <div className="text-white text-4xl font-bold">VS</div>
              <div className="text-white">
                <div className="text-6xl font-bold mb-2">👨‍💻</div>
                <p className="text-xl">Human</p>
              </div>
            </div>
          </div>
          
          <div className="p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Computer Mode</h2>
            <p className="text-gray-600 mb-6 text-center">
              Battle against AI in real-time coding challenges
            </p>
            <button
              onClick={() => navigate('/room-settings')}
              className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition text-lg font-semibold"
            >
              Enter or Join Room
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
