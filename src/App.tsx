import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts'
import { 
  Users, 
  Eye, 
  MessageSquare, 
  TrendingUp, 
  Clock, 
  Zap,
  Gamepad2
} from "lucide-react"

// Mock data for demonstration
const viewershipData = [
  { time: '00:00', viewers: 1200, followers: 450 },
  { time: '02:00', viewers: 890, followers: 480 },
  { time: '04:00', viewers: 650, followers: 495 },
  { time: '06:00', viewers: 1100, followers: 520 },
  { time: '08:00', viewers: 1850, followers: 580 },
  { time: '10:00', viewers: 2200, followers: 650 },
  { time: '12:00', viewers: 3200, followers: 720 },
  { time: '14:00', viewers: 4100, followers: 810 },
  { time: '16:00', viewers: 5200, followers: 920 },
  { time: '18:00', viewers: 6800, followers: 1050 },
  { time: '20:00', viewers: 8500, followers: 1200 },
  { time: '22:00', viewers: 7200, followers: 1180 },
]

const gameData = [
  { name: 'Valorant', hours: 45, viewers: 4200, color: '#FF4655' },
  { name: 'League of Legends', hours: 32, viewers: 3800, color: '#C89B3C' },
  { name: 'Minecraft', hours: 28, viewers: 2900, color: '#8B956D' },
  { name: 'Just Chatting', hours: 25, viewers: 2100, color: '#9146FF' },
  { name: 'Apex Legends', hours: 18, viewers: 1800, color: '#FF6700' },
]

const weeklyData = [
  { day: 'Mon', streams: 2, avgViewers: 1200, duration: 6.5 },
  { day: 'Tue', streams: 1, avgViewers: 1800, duration: 8.2 },  
  { day: 'Wed', streams: 3, avgViewers: 950, duration: 4.5 },
  { day: 'Thu', streams: 2, avgViewers: 2100, duration: 7.1 },
  { day: 'Fri', streams: 1, avgViewers: 3200, duration: 9.5 },
  { day: 'Sat', streams: 2, avgViewers: 4100, duration: 8.8 },
  { day: 'Sun', streams: 1, avgViewers: 2800, duration: 6.3 },
]

const heatmapData = [
  { hour: 0, day: 'Mon', viewers: 120 },
  { hour: 1, day: 'Mon', viewers: 89 },
  { hour: 2, day: 'Mon', viewers: 65 },
  { hour: 6, day: 'Mon', viewers: 890 },
  { hour: 14, day: 'Mon', viewers: 1200 },
  { hour: 18, day: 'Mon', viewers: 2100 },
  { hour: 20, day: 'Mon', viewers: 1800 },
  { hour: 22, day: 'Mon', viewers: 950 },
  
  { hour: 14, day: 'Tue', viewers: 1800 },
  { hour: 16, day: 'Tue', viewers: 2200 },
  { hour: 18, day: 'Tue', viewers: 2800 },
  { hour: 20, day: 'Tue', viewers: 3200 },
  { hour: 22, day: 'Tue', viewers: 2100 },
  
  { hour: 12, day: 'Wed', viewers: 650 },
  { hour: 14, day: 'Wed', viewers: 890 },
  { hour: 16, day: 'Wed', viewers: 1200 },
  { hour: 18, day: 'Wed', viewers: 950 },
  
  { hour: 15, day: 'Thu', viewers: 1200 },
  { hour: 17, day: 'Thu', viewers: 1800 },
  { hour: 19, day: 'Thu', viewers: 2500 },
  { hour: 21, day: 'Thu', viewers: 2100 },
  
  { hour: 16, day: 'Fri', viewers: 2200 },
  { hour: 18, day: 'Fri', viewers: 3800 },
  { hour: 20, day: 'Fri', viewers: 4200 },
  { hour: 22, day: 'Fri', viewers: 3200 },
  
  { hour: 14, day: 'Sat', viewers: 2800 },
  { hour: 16, day: 'Sat', viewers: 3800 },
  { hour: 18, day: 'Sat', viewers: 4800 },
  { hour: 20, day: 'Sat', viewers: 5200 },
  { hour: 22, day: 'Sat', viewers: 3800 },
  
  { hour: 15, day: 'Sun', viewers: 1800 },
  { hour: 17, day: 'Sun', viewers: 2400 },
  { hour: 19, day: 'Sun', viewers: 3200 },
  { hour: 21, day: 'Sun', viewers: 2800 },
]

function Dashboard() {
  const getHeatmapIntensity = (viewers: number) => {
    if (viewers > 4000) return 'bg-purple-600'
    if (viewers > 3000) return 'bg-purple-500'  
    if (viewers > 2000) return 'bg-purple-400'
    if (viewers > 1000) return 'bg-purple-300'
    if (viewers > 500) return 'bg-purple-200'
    return 'bg-gray-100'
  }

  // Placeholder logout (will be replaced by Twitch logout)
  const handleLogout = async () => {
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-purple-800/30 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Gamepad2 className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  StreamStats Pro
                </h1>
                <p className="text-sm text-gray-400">@YourTwitchChannel</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-600/20 text-green-400 border-green-600/30">
                <div className="h-2 w-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                LIVE
              </Badge>
              <Badge variant="outline" className="border-purple-600/30 text-purple-400">
                Partner
              </Badge>
              <button onClick={handleLogout} className="text-sm text-gray-400 hover:text-white">Logout</button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Key Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Current Viewers</CardTitle>
              <Eye className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8,547</div>
              <p className="text-xs text-green-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12.5% from last stream
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Total Followers</CardTitle>
              <Users className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">156,284</div>
              <p className="text-xs text-green-400 flex items-center">
                <TrendingUp className="h-3 w-3 mr-1" />
                +847 this week
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Stream Time</CardTitle>
              <Clock className="h-4 w-4 text-orange-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">6h 32m</div>
              <p className="text-xs text-gray-400">
                Today's session
              </p>
            </CardContent>
          </Card>

          <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">Chat Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-pink-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">24,592</div>
              <p className="text-xs text-green-400 flex items-center">
                <Zap className="h-3 w-3 mr-1" />
                Very active chat
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-black/40 border border-purple-800/30">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600/30">Overview</TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-600/30">Analytics</TabsTrigger>
            <TabsTrigger value="heatmap" className="data-[state=active]:bg-purple-600/30">Heatmap</TabsTrigger>
            <TabsTrigger value="games" className="data-[state=active]:bg-purple-600/30">Games</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Viewership Chart */}
            <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Viewership & Growth</CardTitle>
                <CardDescription className="text-gray-400">
                  Real-time viewer count and follower growth over the last 24 hours
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={viewershipData}>
                    <defs>
                      <linearGradient id="viewersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="followersGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#EC4899" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#EC4899" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #4B5563',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="viewers" 
                      stroke="#8B5CF6" 
                      fillOpacity={1} 
                      fill="url(#viewersGradient)"
                      name="Viewers"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="followers" 
                      stroke="#EC4899" 
                      fillOpacity={1} 
                      fill="url(#followersGradient)"
                      name="New Followers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Weekly Performance */}
            <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Weekly Performance</CardTitle>
                <CardDescription className="text-gray-400">
                  Stream frequency, average viewers, and duration by day
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #4B5563',
                        borderRadius: '8px'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="avgViewers" fill="#8B5CF6" name="Avg Viewers" />
                    <Bar dataKey="duration" fill="#EC4899" name="Hours Streamed" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {/* Engagement Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Engagement Rate</CardTitle>
                  <CardDescription className="text-gray-400">
                    Chat activity vs viewer count
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Chat Messages/Min</span>
                      <span className="text-white">47.2</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Unique Chatters</span>
                      <span className="text-white">1,847</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Follower Conversion</span>
                      <span className="text-white">8.3%</span>
                    </div>
                    <Progress value={83} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Top Emotes</CardTitle>
                  <CardDescription className="text-gray-400">
                    Most used emotes in chat today
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { emote: 'KEKW', count: 1247, percentage: 100 },
                      { emote: 'PogChamp', count: 892, percentage: 72 },
                      { emote: '5Head', count: 634, percentage: 51 },
                      { emote: 'EZ Clap', count: 423, percentage: 34 },
                      { emote: 'MonkaS', count: 287, percentage: 23 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded flex items-center justify-center text-xs font-bold">
                            {index + 1}
                          </div>
                          <span className="text-white">{item.emote}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-400">{item.count}</span>
                          <div className="w-16 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" 
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="heatmap" className="space-y-6">
            <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white">Stream Schedule Heatmap</CardTitle>
                <CardDescription className="text-gray-400">
                  Viewer activity by day and hour - find your optimal streaming times
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-25 gap-1">
                    {/* Hour labels */}
                    <div></div>
                    {Array.from({ length: 24 }, (_, i) => (
                      <div key={i} className="text-xs text-gray-400 text-center">
                        {i.toString().padStart(2, '0')}
                      </div>
                    ))}
                    
                    {/* Days and heatmap cells */}
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
                      <React.Fragment key={day}>
                        <div className="text-sm text-gray-300 flex items-center pr-2">{day}</div>
                        {Array.from({ length: 24 }, (_, hour) => {
                          const dataPoint = heatmapData.find(d => d.day === day && d.hour === hour)
                          const viewers = dataPoint?.viewers || 0
                          return (
                            <div
                              key={`${day}-${hour}`}
                              className={`h-4 w-4 rounded-sm ${getHeatmapIntensity(viewers)} border border-gray-700/30 hover:border-purple-400 transition-colors cursor-pointer`}
                              title={`${day} ${hour}:00 - ${viewers} viewers`}
                            />
                          )
                        })}
                      </React.Fragment>
                    ))}
                  </div>
                  
                  {/* Legend */}
                  <div className="flex items-center space-x-4 pt-4 border-t border-gray-700">
                    <span className="text-sm text-gray-400">Viewer Count:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">0</span>
                      <div className="h-3 w-3 bg-gray-100 rounded-sm"></div>
                      <div className="h-3 w-3 bg-purple-200 rounded-sm"></div>
                      <div className="h-3 w-3 bg-purple-300 rounded-sm"></div>
                      <div className="h-3 w-3 bg-purple-400 rounded-sm"></div>
                      <div className="h-3 w-3 bg-purple-500 rounded-sm"></div>
                      <div className="h-3 w-3 bg-purple-600 rounded-sm"></div>
                      <span className="text-xs text-gray-500">5000+</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="games" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Game Distribution Pie Chart */}
              <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Game Categories</CardTitle>
                  <CardDescription className="text-gray-400">
                    Time distribution across different games this month
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={gameData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="hours"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {gameData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #4B5563',
                          borderRadius: '8px'
                        }} 
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Top Games List */}
              <Card className="bg-black/40 border-purple-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Top Performing Games</CardTitle>
                  <CardDescription className="text-gray-400">
                    Games ranked by average viewer count
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {gameData.map((game, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-gray-700/30">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: game.color }}
                          />
                          <div>
                            <div className="text-white font-medium">{game.name}</div>
                            <div className="text-sm text-gray-400">{game.hours}h streamed</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-medium">{game.viewers.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">avg viewers</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

function LoginWithTwitch() {
  // This will redirect to the backend OAuth handler (to be implemented)
  const handleTwitchLogin = () => {
    window.location.href = '/api/twitch-oauth/start'
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-950 via-purple-950 to-slate-900">
      <div className="flex flex-col items-center space-y-8">
        <div className="flex items-center space-x-4 mb-8">
          <div className="h-14 w-14 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Gamepad2 className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">StreamStats Pro</h1>
        </div>
        <button
          onClick={handleTwitchLogin}
          className="flex items-center px-8 py-3 rounded-lg bg-[#9146FF] hover:bg-[#772ce8] text-white font-bold text-lg shadow-lg transition-all duration-150"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="mr-3" xmlns="http://www.w3.org/2000/svg">
            <rect width="28" height="28" rx="6" fill="#9146FF"/>
            <path d="M7 21L9.5 18.5H13L15 16.5H18.5L21 14V7H7V21Z" fill="white"/>
            <rect x="10" y="10" width="2" height="5" fill="#9146FF"/>
            <rect x="16" y="10" width="2" height="5" fill="#9146FF"/>
          </svg>
          Login with Twitch
        </button>
      </div>
    </div>
  )
}

export default function App() {
  // Placeholder: we'll use real auth state after OAuth is implemented
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    // TODO: Check for Twitch auth session (after backend is ready)
  }, [])

  return isLoggedIn ? <Dashboard /> : <LoginWithTwitch />
}
