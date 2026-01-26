"use client";
import React from 'react';
import { Sparkles, Mail, MessageCircle, Shield, Zap } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-[#0A0A12] border-t border-gray-800/50">
            {/* Background accent */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                Canva<span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">Pro</span> Store
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-md">
                            Your trusted partner for premium Canva Pro upgrades. Get access to all professional features at a fraction of the official price.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Shield className="w-4 h-4 text-green-400" />
                                <span>100% Secure</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                                <Zap className="w-4 h-4 text-cyan-400" />
                                <span>Instant Delivery</span>
                            </div>
                        </div>

                        {/* Payment Icons */}
                        <div className="flex gap-3 mt-6">
                            {['cc-visa', 'cc-mastercard', 'cc-amex', 'cc-discover', 'cc-paypal', 'cc-apple-pay'].map((icon, i) => (
                                <div key={i} className="h-8 w-12 bg-gray-800/50 rounded flex items-center justify-center border border-gray-700">
                                    <img src={`https://img.icons8.com/color/48/${icon.replace('cc-', '')}.png`} alt={icon} className="h-5 object-contain opacity-80" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {['Services', 'Pricing', 'How It Works', 'FAQ'].map((item) => (
                                <li key={item}>
                                    <button
                                        onClick={() => document.getElementById(item.toLowerCase().replace(/ /g, '-'))?.scrollIntoView({ behavior: 'smooth' })}
                                        className="text-gray-400 hover:text-white transition-colors text-sm"
                                    >
                                        {item}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <Mail className="w-4 h-4 text-violet-400" />
                                <span>support@canvaprostore.com</span>
                            </li>
                            <li className="flex items-center gap-2 text-gray-400 text-sm">
                                <MessageCircle className="w-4 h-4 text-cyan-400" />
                                <button
                                    onClick={() => document.getElementById('live-chat')?.click()}
                                    className="hover:text-white transition-colors"
                                >
                                    Live Chat Support
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-gray-500 text-sm">
                        © {currentYear} CanvaPro Store. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <Link href={createPageUrl('Terms')} className="text-gray-500 hover:text-white text-sm transition-colors">
                            Terms of Service
                        </Link>
                        <Link href={createPageUrl('Privacy')} className="text-gray-500 hover:text-white text-sm transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/refund-policy" className="text-gray-500 hover:text-white text-sm transition-colors">
                            Refund Policy
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}