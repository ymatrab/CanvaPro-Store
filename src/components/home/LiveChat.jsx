"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Loader2, Bot, User, Check, CheckCheck } from 'lucide-react';

export default function LiveChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender_type: 'support',
            message: 'Hi there! 👋 Welcome to CanvaPro Store. How can I help you today?',
            timestamp: new Date(),
            is_read: true
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [sessionId] = useState(() => {
        if (typeof window !== 'undefined') {
            const stored = localStorage.getItem('chat_session_id');
            if (stored) return stored;
            const newId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            localStorage.setItem('chat_session_id', newId);
            return newId;
        }
        return `session_${Date.now()}`;
    });
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Load existing messages on mount
    useEffect(() => {
        const loadMessages = async () => {
            try {
                const response = await fetch(`/api/messages?session_id=${sessionId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setMessages([
                            {
                                id: 1,
                                sender_type: 'support',
                                message: 'Hi there! 👋 Welcome to CanvaPro Store. How can I help you today?',
                                timestamp: new Date(),
                                is_read: true
                            },
                            ...data.map(m => ({
                                ...m,
                                timestamp: new Date(m.created_at)
                            }))
                        ]);
                    }
                }
            } catch (error) {
                console.error('Failed to load messages:', error);
            }
        };
        loadMessages();
    }, [sessionId]);

    // Poll for new messages when chat is open
    useEffect(() => {
        if (!isOpen) return;

        const pollMessages = async () => {
            try {
                const response = await fetch(`/api/messages?session_id=${sessionId}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data && data.length > 0) {
                        setMessages(prev => {
                            const welcomeMsg = prev[0];
                            return [
                                welcomeMsg,
                                ...data.map(m => ({
                                    ...m,
                                    timestamp: new Date(m.created_at)
                                }))
                            ];
                        });
                    }
                }
            } catch (error) {
                console.error('Failed to poll messages:', error);
            }
        };

        const interval = setInterval(pollMessages, 5000);
        return () => clearInterval(interval);
    }, [isOpen, sessionId]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        const userMessage = {
            id: Date.now(),
            sender_type: 'customer',
            message: inputValue.trim(),
            timestamp: new Date(),
            is_read: false
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        // Save to database
        try {
            const response = await fetch('/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    session_id: sessionId,
                    sender_type: 'customer',
                    message: userMessage.message
                })
            });

            if (response.ok) {
                const data = await response.json();

                // If auto-reply was sent, add it to messages
                if (data.autoReply) {
                    setTimeout(() => {
                        setMessages(prev => [...prev, {
                            id: data.autoReply.id,
                            sender_type: 'admin',
                            message: data.autoReply.message,
                            timestamp: new Date(data.autoReply.created_at),
                            is_read: true
                        }]);
                        setIsTyping(false);
                    }, 1500);
                } else {
                    setIsTyping(false);
                }
            } else {
                setIsTyping(false);
            }
        } catch (error) {
            console.error('Failed to save message:', error);
            setIsTyping(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Chat Button */}
            <motion.button
                id="live-chat"
                onClick={() => setIsOpen(true)}
                className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-violet-600 to-cyan-600 text-white shadow-2xl shadow-violet-500/30 flex items-center justify-center hover:scale-110 transition-transform ${isOpen ? 'hidden' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
            >
                <MessageCircle className="w-6 h-6" />
                {/* Notification dot */}
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white animate-pulse" />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[500px] max-h-[calc(100vh-100px)] bg-[#0F0F1A] rounded-3xl border border-gray-700/50 shadow-2xl shadow-black/50 overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-gradient-to-r from-violet-600 to-cyan-600 p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                    <Bot className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-white font-semibold">Support Chat</h3>
                                    <p className="text-white/70 text-xs flex items-center gap-1">
                                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        Online now
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                                <X className="w-4 h-4 text-white" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {messages.map((msg) => (
                                <motion.div
                                    key={msg.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`flex ${msg.sender_type === 'customer' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`flex items-end gap-2 max-w-[80%] ${msg.sender_type === 'customer' ? 'flex-row-reverse' : ''}`}>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.sender_type === 'customer'
                                            ? 'bg-violet-500/20'
                                            : 'bg-cyan-500/20'
                                            }`}>
                                            {msg.sender_type === 'customer'
                                                ? <User className="w-4 h-4 text-violet-400" />
                                                : <Bot className="w-4 h-4 text-cyan-400" />
                                            }
                                        </div>
                                        <div>
                                            <div className={`px-4 py-3 rounded-2xl ${msg.sender_type === 'customer'
                                                ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-white rounded-br-sm'
                                                : 'bg-gray-800 text-gray-200 rounded-bl-sm'
                                                }`}>
                                                <p className="text-sm leading-relaxed">{msg.message}</p>
                                            </div>
                                            {/* Read receipt for customer messages */}
                                            {msg.sender_type === 'customer' && (
                                                <div className="flex justify-end mt-1">
                                                    {msg.is_read
                                                        ? <CheckCheck className="w-3 h-3 text-cyan-400" />
                                                        : <Check className="w-3 h-3 text-gray-500" />
                                                    }
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}

                            {/* Typing indicator */}
                            {isTyping && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                                        <Bot className="w-4 h-4 text-cyan-400" />
                                    </div>
                                    <div className="bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm">
                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                                            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                                            <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                                        </div>
                                    </div>
                                </motion.div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-gray-800">
                            <div className="flex gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Type your message..."
                                    className="flex-1 bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 rounded-xl focus:border-violet-500"
                                />
                                <Button
                                    onClick={handleSend}
                                    disabled={!inputValue.trim() || isTyping}
                                    className="bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 rounded-xl px-4"
                                >
                                    {isTyping ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Send className="w-4 h-4" />
                                    )}
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}