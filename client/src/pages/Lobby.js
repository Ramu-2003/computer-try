import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import io from 'socket.io-client';

const Lobby = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [room, setRoom] = useState(null);
  const [socket, setSocket] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(`/api/rooms/${roomId}`);
        setRoom(res.data.data);
      } catch (error) {
        toast.error('Room not found');
        navigate('/home');
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId, navigate]);

  useEffect(() => {
    if (room && user) {
      const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'http://localhost:5000';
      const newSocket = io(SOCKET_URL, {
        transports: ['websocket', 'polling']
      });
      setSocket(newSocket);

      newSocket.emit('join-room', { roomId, userId: user.id });

      newSocket.on('room-updated', (updatedRoom) => {
        setRoom(updatedRoom);
      });

      newSocket.on('game-started', (gameData) => {
        console.log('Game starting, navigating to game page');
        navigate(`/game/${roomId}`, { state: { gameData } });
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [room, user, roomId, navigate]);

  const handleStartGame = () => {
    if (socket) {
      socket.emit('start-game', { roomId });
    }
  };

  const isHost = room && user && room.host === user.id;
  const canStart = room && room.players.length >= parseInt(room.gameMode.charAt(0));

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Room not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white">Game Lobby</h1>
          {room.gameMode !== '1-player' && (
            <div className="bg-white rounded-lg p-4">
              <div className="text-sm text-gray-600">Room Credentials</div>
              <div className="font-mono">
                <div>ID: <span className="font-bold">{room.roomId}</span></div>
                <div>Password: <span className="font-bold">{room.roomPassword}</span></div>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Room Settings</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Game Mode:</span>
                <span className="font-semibold">{room.gameMode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Max Time:</span>
                <span className="font-semibold">{Math.floor(room.maxTime / 60)} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Difficulty:</span>
                <span className="font-semibold capitalize">{room.difficulty}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Rounds:</span>
                <span className="font-semibold">{room.totalRounds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">AI Selection:</span>
                <span className="font-semibold capitalize">{room.aiSelection}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Players ({room.players.length}/{parseInt(room.gameMode.charAt(0))})
            </h2>
            <div className="space-y-3">
              {room.players.map((player, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {player.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-semibold">{player.username}</span>
                  </div>
                  {player.user === room.host && (
                    <span className="bg-yellow-500 text-white px-2 py-1 rounded text-sm">Host</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-2xl p-6 mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Opponents</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {room.selectedAI.map((aiId, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                    🤖
                  </div>
                  <span className="font-semibold">{aiId.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {isHost && (
          <div className="mt-8 text-center">
            <button
              onClick={handleStartGame}
              disabled={!canStart}
              className={`px-8 py-4 rounded-lg text-lg font-semibold transition ${
                canStart
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              {canStart ? 'Start Game' : 'Waiting for Players...'}
            </button>
          </div>
        )}

        {!isHost && (
          <div className="mt-8 text-center">
            <div className="text-white text-lg">Waiting for host to start the game...</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;