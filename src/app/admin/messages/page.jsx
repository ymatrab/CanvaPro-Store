"use client"

import * as React from "react"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Send, User, Check, CheckCheck, ArrowLeft } from "lucide-react"

export default function MessagesPage() {
    const [conversations, setConversations] = React.useState([])
    const [selectedSession, setSelectedSession] = React.useState(null)
    const [messages, setMessages] = React.useState([])
    const [replyText, setReplyText] = React.useState("")
    const [loading, setLoading] = React.useState(true)
    const [sending, setSending] = React.useState(false)
    const messagesEndRef = React.useRef(null)

    const fetchConversations = async () => {
        try {
            const response = await fetch('/api/messages')
            if (!response.ok) throw new Error('Failed to fetch')
            const data = await response.json()
            setConversations(data || [])
        } catch (error) {
            console.error('Error fetching conversations:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchMessages = async (sessionId) => {
        try {
            const response = await fetch(`/api/messages?session_id=${sessionId}`)
            if (!response.ok) throw new Error('Failed to fetch')
            const data = await response.json()
            setMessages(data || [])

            // Mark as read
            await fetch(`/api/messages?session_id=${sessionId}&mark_as=read`, { method: 'PUT' })
            fetchConversations() // Refresh unread counts
        } catch (error) {
            console.error('Error fetching messages:', error)
        }
    }

    React.useEffect(() => {
        fetchConversations()
        const interval = setInterval(fetchConversations, 10000) // Poll every 10s
        return () => clearInterval(interval)
    }, [])

    React.useEffect(() => {
        if (selectedSession) {
            fetchMessages(selectedSession)
            const interval = setInterval(() => fetchMessages(selectedSession), 5000)
            return () => clearInterval(interval)
        }
    }, [selectedSession])

    React.useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleSendReply = async () => {
        if (!replyText.trim() || !selectedSession || sending) return

        setSending(true)
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: selectedSession,
                    sender_type: 'admin',
                    message: replyText.trim()
                })
            })
            if (!response.ok) throw new Error('Failed to send')
            setReplyText("")
            fetchMessages(selectedSession)
        } catch (error) {
            console.error('Error sending reply:', error)
            alert('Failed to send message')
        } finally {
            setSending(false)
        }
    }

    const totalUnread = conversations.reduce((sum, c) => sum + (c.unread_count || 0), 0)

    return (
        <div className="flex-1 p-8 pt-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Messages</h2>
                    <p className="text-gray-400">Respond to customer inquiries</p>
                </div>
                {totalUnread > 0 && (
                    <Badge className="bg-red-500/20 text-red-400 border-red-500/30">
                        {totalUnread} unread
                    </Badge>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
                {/* Conversations List */}
                <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white shadow-xl">
                    <CardHeader className="pb-3">
                        <CardTitle className="text-lg">Conversations</CardTitle>
                        <CardDescription className="text-gray-400">
                            {conversations.length} total conversations
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                        <ScrollArea className="h-[calc(100vh-320px)]">
                            {loading ? (
                                <div className="flex items-center justify-center py-8">
                                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-violet-500"></div>
                                </div>
                            ) : conversations.length === 0 ? (
                                <div className="text-center py-8 px-4">
                                    <MessageCircle className="w-10 h-10 mx-auto text-gray-500 mb-2" />
                                    <p className="text-gray-400 text-sm">No conversations yet</p>
                                </div>
                            ) : (
                                conversations.map((conv) => (
                                    <button
                                        key={conv.session_id}
                                        onClick={() => setSelectedSession(conv.session_id)}
                                        className={`w-full p-4 text-left border-b border-white/5 hover:bg-white/5 transition-colors ${selectedSession === conv.session_id ? 'bg-white/10' : ''
                                            }`}
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                                                    <User className="w-5 h-5 text-violet-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white text-sm">
                                                        {conv.customer_name || conv.customer_email || 'Anonymous'}
                                                    </p>
                                                    <p className="text-gray-400 text-xs line-clamp-1">
                                                        {conv.last_message}
                                                    </p>
                                                </div>
                                            </div>
                                            {conv.unread_count > 0 && (
                                                <Badge className="bg-violet-500/20 text-violet-400 text-xs">
                                                    {conv.unread_count}
                                                </Badge>
                                            )}
                                        </div>
                                    </button>
                                ))
                            )}
                        </ScrollArea>
                    </CardContent>
                </Card>

                {/* Chat Window */}
                <Card className="lg:col-span-2 bg-white/5 backdrop-blur-md border-white/10 text-white shadow-xl flex flex-col">
                    {selectedSession ? (
                        <>
                            <CardHeader className="border-b border-white/10 pb-4">
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="lg:hidden"
                                        onClick={() => setSelectedSession(null)}
                                    >
                                        <ArrowLeft className="w-4 h-4" />
                                    </Button>
                                    <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                                        <User className="w-5 h-5 text-violet-400" />
                                    </div>
                                    <div>
                                        <CardTitle className="text-lg">
                                            {conversations.find(c => c.session_id === selectedSession)?.customer_name || 'Customer'}
                                        </CardTitle>
                                        <CardDescription className="text-gray-400 text-xs">
                                            {conversations.find(c => c.session_id === selectedSession)?.customer_email || selectedSession}
                                        </CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="flex-1 overflow-hidden p-0">
                                <ScrollArea className="h-[calc(100vh-420px)] p-4">
                                    <div className="space-y-4">
                                        {messages.map((msg) => (
                                            <div
                                                key={msg.id}
                                                className={`flex ${msg.sender_type === 'admin' ? 'justify-end' : 'justify-start'}`}
                                            >
                                                <div className={`max-w-[80%] ${msg.sender_type === 'admin' ? 'order-2' : ''}`}>
                                                    <div className={`px-4 py-2 rounded-2xl ${msg.sender_type === 'admin'
                                                            ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-br-sm'
                                                            : 'bg-gray-800 text-gray-200 rounded-bl-sm'
                                                        }`}>
                                                        <p className="text-sm">{msg.message}</p>
                                                    </div>
                                                    <div className={`flex items-center gap-1 mt-1 text-xs text-gray-500 ${msg.sender_type === 'admin' ? 'justify-end' : ''
                                                        }`}>
                                                        <span>{new Date(msg.created_at).toLocaleTimeString()}</span>
                                                        {msg.sender_type === 'admin' && (
                                                            msg.is_read
                                                                ? <CheckCheck className="w-3 h-3 text-cyan-400" />
                                                                : <Check className="w-3 h-3" />
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        <div ref={messagesEndRef} />
                                    </div>
                                </ScrollArea>
                            </CardContent>
                            <div className="p-4 border-t border-white/10">
                                <div className="flex gap-2">
                                    <Input
                                        value={replyText}
                                        onChange={(e) => setReplyText(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                                        placeholder="Type your reply..."
                                        className="flex-1 bg-gray-900 border-gray-700 text-white"
                                    />
                                    <Button
                                        onClick={handleSendReply}
                                        disabled={!replyText.trim() || sending}
                                        className="bg-gradient-to-r from-violet-600 to-cyan-600"
                                    >
                                        <Send className="w-4 h-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center">
                            <div className="text-center">
                                <MessageCircle className="w-12 h-12 mx-auto text-gray-500 mb-3" />
                                <p className="text-gray-400">Select a conversation to start replying</p>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </div>
    )
}
