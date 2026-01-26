"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';

export default function Terms() {
    return (
        <div className="min-h-screen bg-[#0F0F1A]">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
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
                        <FileText className="w-8 h-8 text-violet-400" />
                        <h1 className="text-3xl font-bold text-white">Terms of Service</h1>
                    </div>

                    <div className="prose prose-invert prose-gray max-w-none">
                        <p className="text-gray-400 leading-relaxed">Last updated: {new Date().toLocaleDateString()}</p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">1. Acceptance of Terms</h2>
                        <p className="text-gray-400 leading-relaxed">
                            By accessing and using CanvaPro Store, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our service.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">2. Service Description</h2>
                        <p className="text-gray-400 leading-relaxed">
                            CanvaPro Store provides Canva Pro upgrade services through two methods: Team Invitation and Custom Email Upgrade. We are an independent service provider and are not affiliated with Canva Pty Ltd.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">3. Payment and Refunds</h2>
                        <p className="text-gray-400 leading-relaxed">
                            All payments are processed securely. Refunds are available within 24 hours of purchase if the service has not been delivered. Once the upgrade is completed, refunds are not available.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">4. Service Delivery</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Team Invitation upgrades are typically delivered within 5-15 minutes. Custom Email upgrades may take 1-24 hours depending on queue volume. We are not responsible for delays caused by factors outside our control.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">5. User Responsibilities</h2>
                        <p className="text-gray-400 leading-relaxed">
                            Users must provide accurate information during checkout. We are not responsible for delivery issues caused by incorrect email addresses or account information provided by the user.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">6. Limitation of Liability</h2>
                        <p className="text-gray-400 leading-relaxed">
                            CanvaPro Store shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our services.
                        </p>

                        <h2 className="text-xl font-semibold text-white mt-8 mb-4">7. Contact</h2>
                        <p className="text-gray-400 leading-relaxed">
                            For questions about these terms, please contact us via our live chat support or email at support@canvaprostore.com.
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
