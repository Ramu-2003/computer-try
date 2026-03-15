# Computer Mode Battle - Humans vs AI Coding Platform

A competitive coding environment where human players battle against AI robots in real-time coding challenges.

## Features

### 🔐 Authentication System
- User Registration with email verification
- Secure login with JWT tokens
- Password reset via Gmail SMTP
- Bcrypt password hashing

### 🎮 Game Modes
- **1 Player Mode**: Single player vs AI (up to 10 rounds)
- **2 Player Mode**: Two players cooperate to defeat AI (2 rounds)
- **3 Player Mode**: Three players cooperate to defeat AI (3 rounds)

### 🤖 AI Opponents (15 Total)
#### Easy AI (5)
- BeginnerBot, LazyCompiler, BugMaker, CopyCoder, PatternAI

#### Moderate AI (5)
- LogicBot, FlashCoder, DebugBot, MemoryBot, OverThinker

#### Hard AI (5)
- Algorithm Prime, Speedster-X, EdgeMaster, CleanCode Titan, TestCase Destroyer

### 🧩 Coding Challenges
- **Languages**: HTML (expandable to CSS, JavaScript, Python, Java)
- **Difficulties**: Beginner, Moderate, Hard
- **Real-time test case validation**

### 🏟 Room System
- Room creation with unique ID and password
- Multiplayer lobby system
- Real-time player synchronization

### 🔒 Strict Mode
- Copy/paste prevention
- Right-click disabled
- Anti-cheat measures

## Technology Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose
- **Socket.io** for real-time features
- **JWT** for authentication
- **Bcrypt** for password hashing
- **Nodemailer** for email services

### Frontend
- **React.js** with functional components
- **React Router** for navigation
- **Socket.io-client** for real-time communication
- **Monaco Editor** for code editing
- **Tailwind CSS** for styling
- **React Hot Toast** for notifications

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)
- Gmail account for SMTP

### 1. Clone the Repository
```bash
git clone <repository-url>
cd computer-mode-battle
```

### 2. Install Dependencies
```bash
# Install server dependencies
npm install

# Install client dependencies
cd client
npm install
cd ..
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/computer-mode-battle
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Email Configuration (Gmail SMTP)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_gmail_app_password
EMAIL_FROM=noreply@computermode.com

# Frontend URL
CLIENT_URL=http://localhost:3000
```

### 4. Gmail SMTP Setup
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
   - Use this password in `EMAIL_PASS`

### 5. MongoDB Setup
#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# Start MongoDB service
mongod
```

#### Option B: MongoDB Atlas (Cloud)
1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env`

### 6. Start the Application
```bash
# Development mode (runs both server and client)
npm run dev

# Or run separately:
# Terminal 1 - Server
npm run server

# Terminal 2 - Client
npm run client
```

### 7. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Project Structure
```
computer-mode-battle/
├── server/
│   ├── models/          # MongoDB schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication middleware
│   ├── config/          # Email configuration
│   ├── data/           # AI and challenge data
│   ├── socket/         # Socket.io game logic
│   └── server.js       # Main server file
├── client/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── pages/      # Page components
│   │   ├── context/    # React context
│   │   └── App.js      # Main app component
│   └── public/         # Static files
├── package.json        # Server dependencies
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password/:token` - Reset password

### Rooms
- `POST /api/rooms/create` - Create game room
- `POST /api/rooms/join` - Join existing room
- `GET /api/rooms/:roomId` - Get room details

### AI
- `GET /api/ai` - Get all AI opponents
- `GET /api/ai/level/:level` - Get AI by difficulty level
- `GET /api/ai/:id` - Get specific AI details

## Socket Events

### Client to Server
- `join-room` - Join game room
- `start-game` - Start the game (host only)
- `submit-code` - Submit code solution

### Server to Client
- `room-updated` - Room state updated
- `game-started` - Game has started
- `ai-coding-progress` - AI coding progress update
- `ai-completed` - AI finished coding
- `next-round` - Next round started
- `game-completed` - Game finished

## Game Flow

1. **Registration/Login** - User creates account or logs in
2. **Home Page** - Access game mode selection
3. **Room Settings** - Configure game parameters
4. **Lobby** - Wait for players and view settings
5. **Game** - Real-time coding battle with AI
6. **Results** - View final scores and statistics

## Development

### Adding New AI Opponents
Edit `server/data/aiData.js` to add new AI with:
- Unique ID and name
- Difficulty level (easy/moderate/hard)
- Speciality and weakness descriptions
- Performance ratings per difficulty

### Adding New Challenges
Edit `server/data/challenges.js` to add new coding challenges:
- Challenge description and expected output
- Test cases for validation
- Difficulty classification

### Extending Languages
Currently supports HTML. To add new languages:
1. Update challenge data structure
2. Modify Monaco Editor configuration
3. Add language-specific test runners

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in `.env`

2. **Email Not Sending**
   - Verify Gmail SMTP credentials
   - Check app password generation
   - Ensure 2FA is enabled

3. **Socket Connection Issues**
   - Check if server is running on port 5000
   - Verify CORS configuration

4. **Build Errors**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.