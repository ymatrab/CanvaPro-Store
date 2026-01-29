import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Shield, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function HeroSection({ onGetStarted }) {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F0F1A] pt-20">
            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/10 rounded-full blur-[150px]" />
            </div>

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(124,58,237,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(124,58,237,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8"
                    >
                        <Sparkles className="w-4 h-4 text-violet-400" />
                        <span className="text-sm text-violet-300 font-medium">Premium Canva Pro</span>
                        <span className="text-gray-600">•</span>
                        <span className="text-sm text-cyan-400 font-medium">Up to 70% Off</span>
                    </motion.div>

                    {/* Main heading */}
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6"
                    >
                        Unlock
                        <span className="relative mx-4">
                            <span className="relative z-10 bg-gradient-to-r from-violet-400 via-cyan-400 to-violet-400 bg-clip-text text-transparent">
                                Canva Pro
                            </span>
                            <motion.span
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 0.8, delay: 0.5 }}
                                className="absolute bottom-2 left-0 h-3 bg-gradient-to-r from-violet-500/40 to-cyan-500/40 -z-0 rounded"
                            />
                        </span>
                        <br />
                        <span className="text-gray-300">For Less</span>
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Get instant access to Canva Pro's full suite of premium features at a fraction of the official price.
                        Corporate-level experience, personal pricing.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
                    >
                        <Link href="/checkout?method=team_invitation&duration=3_months&price=12.99">
                            <Button
                                size="lg"
                                className="group bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white px-8 py-6 text-lg rounded-2xl shadow-2xl shadow-violet-500/25 transition-all duration-300 hover:shadow-violet-500/40 hover:scale-105"
                            >
                                Get Started Now
                                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Button
                            variant="outline"
                            size="lg"
                            className="px-8 py-6 text-lg rounded-2xl bg-white border-white text-black hover:bg-gray-100 hover:border-gray-200 shadow-lg shadow-white/5 transition-all duration-300 group"
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                        >
                            View Pricing
                        </Button>
                    </motion.div>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-8 text-gray-500"
                    >
                        <div className="flex items-center gap-2">
                            <Zap className="w-5 h-5 text-cyan-400" />
                            <span className="text-sm">Instant Delivery</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-green-400" />
                            <span className="text-sm">30-Day Guarantee</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-violet-400" />
                            <span className="text-sm">5000+ Happy Customers</span>
                        </div>
                    </motion.div>
                </div>

                {/* Floating cards preview */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 relative"
                >
                    <div className="relative mx-auto max-w-4xl">
                        {/* Main preview card */}
                        <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 shadow-2xl">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {['Brand Kit', 'Magic Resize', 'Background Remover', 'Premium Templates'].map((feature, i) => (
                                    <motion.div
                                        key={feature}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.7 + i * 0.1 }}
                                        className="bg-gradient-to-br from-violet-500/10 to-cyan-500/10 rounded-2xl p-4 border border-gray-700/50"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-cyan-500 mb-3 flex items-center justify-center">
                                            <Sparkles className="w-5 h-5 text-white" />
                                        </div>
                                        <p className="text-sm text-gray-300 font-medium">{feature}</p>
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Floating accent elements */}
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-2xl backdrop-blur-xl border border-cyan-500/20"
                        />
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-violet-500/20 to-pink-500/20 rounded-xl backdrop-blur-xl border border-violet-500/20"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}