"use client"

import React, { useState, useEffect } from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    Activity,
    CreditCard,
    DollarSign,
    Users,
    ArrowUpRight,
    ArrowDownRight,
    Eye,
    MessageCircle,
} from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Line, LineChart, Area, AreaChart, CartesianGrid, Legend } from "recharts"

// Glassmorphism card styles
const glassCardClass = "bg-white/5 backdrop-blur-md border-white/10 text-white shadow-xl"

export default function AdminPage() {
    const [stats, setStats] = useState(null)
    const [period, setPeriod] = useState('30d')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`/api/stats?period=${period}`)
                if (response.ok) {
                    const data = await response.json()
                    setStats(data)
                }
            } catch (error) {
                console.error('Error fetching stats:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [period])

    // Transform chart data for display
    const chartData = stats?.chartData?.map(d => ({
        name: new Date(d.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        revenue: d.revenue,
        orders: d.orders
    })) || []

    const periodLabels = {
        '7d': 'Last 7 Days',
        '30d': 'Last 30 Days',
        '90d': 'Last 90 Days',
        '1y': 'Last Year'
    }

    return (
        <div className="flex-1 space-y-8 p-8 pt-6">
            <div className="flex items-center justify-between space-y-2">
                <h2 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    Dashboard
                </h2>
                {/* Period Selector */}
                <div className="flex gap-2">
                    {['7d', '30d', '90d', '1y'].map((p) => (
                        <Button
                            key={p}
                            variant={period === p ? "default" : "outline"}
                            size="sm"
                            onClick={() => setPeriod(p)}
                            className={period === p
                                ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-0"
                                : "border-gray-700 text-gray-400 hover:text-white hover:border-gray-600"
                            }
                        >
                            {p === '7d' ? '7 Days' : p === '30d' ? '30 Days' : p === '90d' ? '90 Days' : 'Year'}
                        </Button>
                    ))}
                </div>
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
                        <div className="text-3xl font-bold text-white">
                            ${loading ? '...' : (stats?.totalRevenue || 0).toFixed(2)}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            ${(stats?.periodRevenue || 0).toFixed(2)} in {periodLabels[period].toLowerCase()}
                        </p>
                    </CardContent>
                </Card>
                <Card className={glassCardClass}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">
                            Total Orders
                        </CardTitle>
                        <div className="h-8 w-8 rounded-full bg-cyan-500/10 flex items-center justify-center">
                            <CreditCard className="h-4 w-4 text-cyan-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">
                            {loading ? '...' : stats?.totalOrders || 0}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            {stats?.periodOrders || 0} in {periodLabels[period].toLowerCase()}
                        </p>
                    </CardContent>
                </Card>
                <Card className={glassCardClass}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">Page Views</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <Eye className="h-4 w-4 text-orange-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">
                            {loading ? '...' : stats?.totalViews || 0}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            {stats?.periodViews || 0} in {periodLabels[period].toLowerCase()}
                        </p>
                    </CardContent>
                </Card>
                <Card className={glassCardClass}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-gray-300">Unread Messages</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-emerald-500/10 flex items-center justify-center">
                            <MessageCircle className="h-4 w-4 text-emerald-400" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-white">
                            {loading ? '...' : stats?.unreadMessages || 0}
                        </div>
                        <p className="text-xs text-gray-400 mt-1">
                            <a href="/admin/messages" className="text-violet-400 hover:underline">View messages →</a>
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className={`col-span-4 ${glassCardClass}`}>
                    <CardHeader>
                        <CardTitle className="text-white">Revenue & Orders</CardTitle>
                        <CardDescription className="text-gray-400">
                            {periodLabels[period]}
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <ResponsiveContainer width="100%" height={350}>
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                <XAxis
                                    dataKey="name"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    yAxisId="left"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `$${value}`}
                                />
                                <YAxis
                                    yAxisId="right"
                                    orientation="right"
                                    stroke="#888888"
                                    fontSize={12}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#0f0f1a', border: '1px solid #333', borderRadius: '8px' }}
                                    itemStyle={{ color: '#fff' }}
                                    labelStyle={{ color: '#888' }}
                                />
                                <Legend />
                                <Area
                                    yAxisId="left"
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#8b5cf6"
                                    fillOpacity={1}
                                    fill="url(#colorRevenue)"
                                    name="Revenue ($)"
                                />
                                <Area
                                    yAxisId="right"
                                    type="monotone"
                                    dataKey="orders"
                                    stroke="#06b6d4"
                                    fillOpacity={1}
                                    fill="url(#colorOrders)"
                                    name="Orders"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
                <Card className={`col-span-3 ${glassCardClass}`}>
                    <CardHeader>
                        <CardTitle className="text-white">Recent Orders</CardTitle>
                        <CardDescription className="text-gray-400">
                            Latest transactions
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-violet-500"></div>
                                </div>
                            ) : stats?.recentOrders?.length > 0 ? (
                                stats.recentOrders.map((order, i) => (
                                    <div key={order.id || i} className="flex items-center group">
                                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center text-white text-xs font-bold ring-2 ring-transparent group-hover:ring-violet-500/50 transition-all">
                                            {order.customer_name?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U'}
                                        </div>
                                        <div className="ml-4 space-y-1 flex-1">
                                            <p className="text-sm font-medium leading-none text-white group-hover:text-violet-300 transition-colors">
                                                {order.customer_name}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {order.customer_email}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-medium text-white">${order.amount?.toFixed(2)}</div>
                                            <div className={`text-xs ${order.status === 'Completed' ? 'text-green-400' :
                                                    order.status === 'Failed' ? 'text-red-400' :
                                                        'text-yellow-400'
                                                }`}>
                                                {order.status}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400 text-center py-4">No orders yet</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
