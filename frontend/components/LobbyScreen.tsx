'use client'

import { useGame } from './GameContext'
import { motion } from 'framer-motion'
import { Copy, Crown, Play, ArrowLeft } from 'lucide-react'

export default function LobbyScreen() {
  const { roomCode, players, isHost, myTeam, joinTeam, startGame, playerName, setCurrentScreen } = useGame()

  const team1 = players.filter(p => p.team === 0)
  const team2 = players.filter(p => p.team === 1)
  const unassigned = players.filter(p => p.team === null)

  const canStart = team1.length > 0 && team2.length > 0

  const copyRoomCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode)
    }
  }

  return (
    <div className="py-8 relative">
      {/* Back Button */}
      <button
        onClick={() => setCurrentScreen('room')}
        className="absolute top-0 left-0 px-4 py-2 glass-strong rounded-xl hover:bg-white/10 transition-colors flex items-center gap-2"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold mb-4">Game Lobby</h1>
        <div className="flex items-center justify-center gap-3">
          <div className="glass rounded-xl px-6 py-3 flex items-center gap-3">
            <span className="text-gray-400">Room Code:</span>
            <span className="text-2xl font-mono font-bold tracking-wider">{roomCode}</span>
            <button
              onClick={copyRoomCode}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <Copy className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Team 1 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-2xl p-6 border-2 border-blue-500/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-blue-400">Team 1</h2>
            <span className="text-gray-400">{team1.length} players</span>
          </div>
          
          <div className="space-y-3 mb-4 min-h-[200px]">
            {team1.map((player) => (
              <div
                key={player.id}
                className={`glass rounded-xl p-4 flex items-center gap-3 ${
                  player.name === playerName ? 'ring-2 ring-blue-400' : ''
                }`}
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold">
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{player.name}</span>
                {player.name === playerName && <span className="text-blue-400 text-sm">(You)</span>}
              </div>
            ))}
          </div>

          {myTeam !== 0 && (
            <button
              onClick={() => joinTeam(0)}
              className="w-full py-3 px-6 bg-blue-500 hover:bg-blue-600 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              Join Team 1
            </button>
          )}
        </motion.div>

        {/* Team 2 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-strong rounded-2xl p-6 border-2 border-red-500/30"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-red-400">Team 2</h2>
            <span className="text-gray-400">{team2.length} players</span>
          </div>
          
          <div className="space-y-3 mb-4 min-h-[200px]">
            {team2.map((player) => (
              <div
                key={player.id}
                className={`glass rounded-xl p-4 flex items-center gap-3 ${
                  player.name === playerName ? 'ring-2 ring-red-400' : ''
                }`}
              >
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center font-bold">
                  {player.name.charAt(0).toUpperCase()}
                </div>
                <span className="font-medium">{player.name}</span>
                {player.name === playerName && <span className="text-red-400 text-sm">(You)</span>}
              </div>
            ))}
          </div>

          {myTeam !== 1 && (
            <button
              onClick={() => joinTeam(1)}
              className="w-full py-3 px-6 bg-red-500 hover:bg-red-600 rounded-xl font-semibold transition-all transform hover:scale-105"
            >
              Join Team 2
            </button>
          )}
        </motion.div>
      </div>

      {/* Unassigned Players */}
      {unassigned.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="glass rounded-xl p-4 mb-6"
        >
          <h3 className="text-lg font-semibold mb-3 text-gray-400">Waiting to join:</h3>
          <div className="flex flex-wrap gap-2">
            {unassigned.map((player) => (
              <div key={player.id} className="glass rounded-lg px-4 py-2 text-sm">
                {player.name}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Start Game Button */}
      {isHost && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <button
            onClick={startGame}
            disabled={!canStart}
            className="px-12 py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105 flex items-center gap-3 mx-auto"
          >
            <Crown className="w-6 h-6" />
            Start Game
            <Play className="w-6 h-6" />
          </button>
          {!canStart && (
            <p className="text-gray-400 text-sm mt-3">
              Need at least 1 player in each team to start
            </p>
          )}
        </motion.div>
      )}

      {!isHost && (
        <div className="text-center text-gray-400">
          Waiting for host to start the game...
        </div>
      )}
    </div>
  )
}
