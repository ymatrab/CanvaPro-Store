"use client"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Activity,
    CreditCard,
    DollarSign,
    Users,
    ArrowUpRight,
} from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart, CartesianGrid, Defs, LinearGradient, Stop } from "recharts"

const data = [
    { name: "Jan", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Feb", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Mar", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Apr", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "May", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jun", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Jul", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Aug", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Sep", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Oct", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Nov", total: Math.floor(Math.random() * 5000) + 1000 },
    { name: "Dec", total: Math.floor(Math.random() * 5000) + 1000 },
]

// Glassmorphism card styles
const glassCardClass = "bg-white/5 backdrop-blur-md border-white/10 text-white shadow-xl"

export default function AdminPage() {
    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Dashboard
                </h2>
            </div>

            {/* Stat Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className={glassCardClass}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">
                            Total Revenue
                        </CardTitle>
                        <div className="h-8 w-8 rounded-full bg-violet-500/10 flex items-center justify-center">
                            <DollarSign className="h-4 w-4 text-violet-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">$45,231.89</div>
                        <p className="text-xs text-green-400 flex items-center mt-1">
                            +20.1% <ArrowUpRight className="ml-1 h-3 w-3" /> from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className={glassCardClass}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">
                            Subscriptions
                        </CardTitle>
                        <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                            <Users className="h-4 w-4 text-cyan-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">+2350</div>
                        <p className="text-xs text-green-400 flex items-center mt-1">
                            +180.1% <ArrowUpRight className="ml-1 h-3 w-3" /> from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className={glassCardClass}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">Sales</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-orange-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">+12,234</div>
                        <p className="text-xs text-green-400 flex items-center mt-1">
                            +19% <ArrowUpRight className="ml-1 h-3 w-3" /> from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className={glassCardClass}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">Active Now</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <Activity className="h-4 w-4 text-emerald-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">+573</div>
                        <p className="text-xs text-green-400 flex items-center mt-1">
                            +201 <ArrowUpRight className="ml-1 h-3 w-3" /> since last hour
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className={`col-span-4 ${glassCardClass}`}>
                    <CardHeader>
                        <CardTitle className="text-white">Revenue Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <BarChart data={data}>
                                <defs>
                                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.8} />
                                    </linearGradient>
                                </defs>
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f0f1a', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    labelStyle={{ color: '#888' }}
                                    cursor={{ fill: 'transparent' }}
                                />
                                <Bar
                                    dataKey="total"
                                    fill="url(#colorTotal)"
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className={`col-span-3 ${glassCardClass}`}>
                    <CardHeader>
                        <CardTitle className="text-white">Recent Sales</CardTitle>
                        <CardDescription className="text-gray-400">
                            You made 265 sales this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {[
                                { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+$1,999.00", initials: "OM" },
                                { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+$39.00", initials: "JL" },
                                { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+$299.00", initials: "IN" },
                                { name: "William Kim", email: "will@email.com", amount: "+$99.00", initials: "WK" },
                                { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+$39.00", initials: "SD" }
                            ].map((user, i) => (
                                <div key={i} className="flex items-center group">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-white text-xs font-bold ring-2 ring-transparent group-hover:ring-violet-500/50 transition-all">
                                        {user.initials}
                                    </div>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none text-white group-hover:text-violet-300 transition-colors">
                                            {user.name}
                                        </p>
                                        <p className="text-sm text-gray-400">
                                            {user.email}
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium text-white">{user.amount}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
