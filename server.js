// Standalone Express + Socket.IO server for local development
// This won't be used on Netlify, but allows local testing
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const path = require("path");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});

app.use(cors());
app.use(express.static("public"));

// Game rooms storage
const gameRooms = new Map();

// Helper function to generate room code
function generateRoomCode() {
	return Math.random().toString(36).substring(2, 8).toUpperCase();
}

io.on("connection", (socket) => {
	console.log("User connected:", socket.id);

	// Create a new room
	socket.on("create-room", (data) => {
		const roomCode = generateRoomCode();
		const room = {
			code: roomCode,
			host: socket.id,
			players: [
				{
					id: socket.id,
					name: data.playerName,
					team: null,
				},
			],
			gameState: null,
			started: false,
		};

		gameRooms.set(roomCode, room);
		socket.join(roomCode);
		socket.emit("room-created", { roomCode, room });
		console.log(`Room created: ${roomCode}`);
	});

	// Join existing room
	socket.on("join-room", (data) => {
		const { roomCode, playerName } = data;
		const room = gameRooms.get(roomCode);

		if (!room) {
			socket.emit("error", { message: "Room not found" });
			return;
		}

		if (room.started) {
			socket.emit("error", { message: "Game already started" });
			return;
		}

		room.players.push({
			id: socket.id,
			name: playerName,
			team: null,
		});

		socket.join(roomCode);
		socket.emit("room-joined", { roomCode, room });
		io.to(roomCode).emit("player-joined", {
			player: room.players[room.players.length - 1],
			room,
		});
		console.log(`Player ${playerName} joined room: ${roomCode}`);
	});

	// Assign player to team
	socket.on("join-team", (data) => {
		const { roomCode, teamIndex } = data;
		const room = gameRooms.get(roomCode);

		if (room) {
			const player = room.players.find((p) => p.id === socket.id);
			if (player) {
				player.team = teamIndex;
				io.to(roomCode).emit("team-updated", { room });
			}
		}
	});

	// Start game
	socket.on("start-game", (data) => {
		const { roomCode, gameState } = data;
		const room = gameRooms.get(roomCode);

		if (room && room.host === socket.id) {
			room.started = true;
			room.gameState = gameState;
			io.to(roomCode).emit("game-started", { gameState });
			console.log(`Game started in room: ${roomCode}`);
		}
	});

	// Sync game state
	socket.on("sync-game-state", (data) => {
		const { roomCode, gameState } = data;
		const room = gameRooms.get(roomCode);

		if (room) {
			room.gameState = gameState;
			socket.to(roomCode).emit("game-state-updated", { gameState });
		}
	});

	// Word guessed
	socket.on("word-guessed", (data) => {
		const { roomCode, wordIndex, guesser } = data;
		io.to(roomCode).emit("word-guessed-sync", { wordIndex, guesser });
	});

	// Word skipped
	socket.on("word-skipped", (data) => {
		const { roomCode, wordIndex } = data;
		io.to(roomCode).emit("word-skipped-sync", { wordIndex });
	});

	// Turn ended
	socket.on("turn-ended", (data) => {
		const { roomCode } = data;
		io.to(roomCode).emit("turn-ended-sync", data);
	});

	// Timer sync
	socket.on("timer-update", (data) => {
		const { roomCode, timeRemaining } = data;
		socket.to(roomCode).emit("timer-sync", { timeRemaining });
	});

	// Chat message
	socket.on("chat-message", (data) => {
		const { roomCode, message, playerName } = data;
		io.to(roomCode).emit("chat-message-received", {
			message,
			playerName,
			timestamp: Date.now(),
		});
	});

	// Disconnect
	socket.on("disconnect", () => {
		console.log("User disconnected:", socket.id);

		// Remove player from all rooms
		gameRooms.forEach((room, roomCode) => {
			const playerIndex = room.players.findIndex((p) => p.id === socket.id);
			if (playerIndex !== -1) {
				room.players.splice(playerIndex, 1);

				// If room is empty, delete it
				if (room.players.length === 0) {
					gameRooms.delete(roomCode);
					console.log(`Room ${roomCode} deleted (empty)`);
				} else {
					// If host left, assign new host
					if (room.host === socket.id && room.players.length > 0) {
						room.host = room.players[0].id;
					}
					io.to(roomCode).emit("player-left", { socketId: socket.id, room });
				}
			}
		});
	});
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Open http://localhost:${PORT} to play`);
});
