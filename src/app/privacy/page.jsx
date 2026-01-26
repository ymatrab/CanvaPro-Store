"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';

export default function Privacy() {
    return (
        <div className="min-h-screen bg-[#0F0F1A]">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute bottom-1/4 -right-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-12">
                    <Link href={createPageUrl('Home')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white">CanvaPro</span>
                    </div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8"
                >
                    <div className="flex items-center gap-3 mb-8">
                        <Shield className="w-8 h-8 text-cyan-400" />
                        <h1 className="text-3xl font-bold text-white">Privacy Policy</h1>
                    </div>

                    <div className="prose prose-invert prose-gray max-w-none">
                        <p className="text-gray-400 leading-relaxed">Last updated: {new Date().toLocaleDateString()}</p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Information We Collect</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We collect information you provide directly, including your name, email address, and payment information. We also collect usage data such as IP address, browser type, and pages visited.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. How We Use Your Information</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We use your information to process orders, deliver services, communicate with you about your order, improve our services, and comply with legal obligations.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Information Sharing</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We do not sell your personal information. We may share information with payment processors to complete transactions and with service providers who assist in operating our website.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Data Security</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We implement industry-standard security measures including SSL encryption to protect your data. However, no method of transmission over the internet is 100% secure.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. Cookies</h2>
                        <p className="text-gray-400 leading-relaxed">
                            We use cookies to enhance your experience, analyze site traffic, and understand user behavior. You can control cookie preferences through your browser settings.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Your Rights</h2>
                        <p className="text-gray-400 leading-relaxed">
                            You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us through our support channels.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Contact Us</h2>
                        <p className="text-gray-400 leading-relaxed">
                            For privacy-related questions, please contact us via live chat or email at support@canvaprostore.com.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
