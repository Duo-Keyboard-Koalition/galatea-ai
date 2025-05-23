import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, MessageSquare, User, Settings, Bell } from "lucide-react"

export default function Dashboard() {
  return (
    <div className="p-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Alex</h1>
          <p className="text-gray-400">Here's what's happening with your AI companions today.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button>
            <Bell size={18} className="mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Active Companions</p>
                <h3 className="text-3xl font-bold text-white mt-1">3</h3>
              </div>
              <div className="bg-teal-500/20 p-3 rounded-full">
                <Heart size={24} className="text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Unread Messages</p>
                <h3 className="text-3xl font-bold text-white mt-1">12</h3>
              </div>
              <div className="bg-teal-500/20 p-3 rounded-full">
                <MessageSquare size={24} className="text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Profile Views</p>
                <h3 className="text-3xl font-bold text-white mt-1">87</h3>
              </div>
              <div className="bg-teal-500/20 p-3 rounded-full">
                <User size={24} className="text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-900/50 border-gray-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Subscription</p>
                <h3 className="text-3xl font-bold text-white mt-1">Pro</h3>
              </div>
              <div className="bg-teal-500/20 p-3 rounded-full">
                <Settings size={24} className="text-teal-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Companions */}
      <Card className="mb-10 bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-white">Recent Companions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-800 rounded-lg overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={i === 1 ? "/dashboard-bg.png" : `/placeholder.svg?height=300&width=200&text=AI+Companion+${i}`}
                    alt={`Companion ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">Sophia {i}</h3>
                  <p className="text-gray-400 text-sm mb-3">Last message: 2 hours ago</p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="flex-1">
                      <MessageSquare size={16} className="mr-1" /> Chat
                    </Button>
                    <Button size="sm" className="flex-1">
                      <Heart size={16} className="mr-1" /> View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            <Button variant="outline" asChild>
              <Link href="/dashboard/discover">Discover More Companions</Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="bg-gray-900/50 border-gray-800">
        <CardHeader>
          <CardTitle className="text-xl text-white">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Sophia", action: "sent you a message", time: "2 hours ago" },
              { name: "Emma", action: "liked your profile", time: "5 hours ago" },
              { name: "Olivia", action: "viewed your profile", time: "Yesterday" },
              { name: "System", action: "subscription renewed", time: "3 days ago" },
            ].map((activity, i) => (
              <div key={i} className="flex items-center p-3 rounded-lg bg-gray-800">
                <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center mr-4">
                  {activity.name === "System" ? (
                    <Settings size={20} className="text-teal-400" />
                  ) : (
                    <User size={20} className="text-teal-400" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-white">
                    <span className="font-semibold">{activity.name}</span> {activity.action}
                  </p>
                  <p className="text-gray-400 text-sm">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
