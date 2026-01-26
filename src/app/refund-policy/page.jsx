"use client";
import React from 'react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { Shield, CheckCircle, Clock, Mail } from 'lucide-react';

export default function RefundPolicy() {
    return (
        <div className="min-h-screen bg-[#0F0F1A]">
            <Navbar />

            <main className="relative pt-32 pb-20 px-6">
                {/* Background accents */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
                    <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium mb-6">
                            100% Satisfaction Guarantee
                        </span>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                            Refund
                            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent"> Policy</span>
                        </h1>
                        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                            We stand behind our service. Use Canva Pro features risk-free with our comprehensive money-back guarantee.
                        </p>
                    </div>

                    {/* Policy Content */}
                    <div className="space-y-8">
                        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                                <Shield className="w-6 h-6 text-green-400" />
                                30-Day Money-Back Guarantee
                            </h2>
                            <p className="text-gray-300 leading-relaxed mb-6">
                                We are confident in the quality of our service. If you are not completely satisfied with your Canva Pro upgrade for any reason within the first 30 days of purchase, we will provide a full refund. No questions asked.
                            </p>
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/50">
                                    <Clock className="w-5 h-5 text-green-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Timeframe</h4>
                                        <p className="text-sm text-gray-400">Request a refund anytime within 30 days of your purchase date.</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-4 rounded-xl bg-gray-800/50">
                                    <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-semibold mb-1">Eligibility</h4>
                                        <p className="text-sm text-gray-400">Applicable to all plans (Team Invitation & Custom Email).</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
                            <h2 className="text-xl font-bold text-white mb-4">How to Request a Refund</h2>
                            <p className="text-gray-300 leading-relaxed mb-4">
                                To initiate a refund, please contact our support team with your order details.
                            </p>
                            <ul className="space-y-3 mb-6">
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 text-sm font-bold">1</div>
                                    <span>Locate your Order ID (sent via email).</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 text-sm font-bold">2</div>
                                    <span>Email us at <span className="text-white font-medium">support@canvaprostore.com</span> or use Live Chat.</span>
                                </li>
                                <li className="flex items-center gap-3 text-gray-300">
                                    <div className="w-6 h-6 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400 text-sm font-bold">3</div>
                                    <span>We will process your refund within 24 hours.</span>
                                </li>
                            </ul>
                            <div className="p-4 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center gap-3">
                                <Mail className="w-5 h-5 text-cyan-400" />
                                <p className="text-cyan-200 text-sm">Funds typically return to your bank account within 3-5 business days depending on your bank.</p>
                            </div>
                        </div>

                        <div className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-2xl p-8">
                            <h2 className="text-xl font-bold text-white mb-4">Exceptions</h2>
                            <p className="text-gray-300 leading-relaxed">
                                While we aim to be as flexible as possible, refunds may not be approved if there is evidence of abuse of our specialized upgrade system, such as repeatedly purchasing and requesting refunds to get free access.
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
