"use client";
import React from 'react';
import { Sparkles, Mail, MessageCircle, Shield, Zap, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const otherPasses = [
        { name: 'ChatGPT Plus', desc: 'AI Assistant', coming: true },
        { name: 'Spotify Premium', desc: 'Music Streaming', coming: true },
        { name: 'Autodesk', desc: 'Design Software', coming: true },
        { name: 'Adobe CC', desc: 'Creative Suite', coming: true },
    ];

    return (
        <footer className="relative bg-[#0A0A12] border-t border-gray-800/50">
            {/* Background accent */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-violet-600/5 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <div className="grid md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                    ProPass
                                </span>
                                <span className="text-gray-500 mx-1">|</span>
                                <span className="text-white font-semibold">Canva</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Premium Canva Pro access at unbeatable prices. Part of the ProPass.shop family.
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
                    </div>

                    {/* Other Passes */}
                    <div>
                        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                            Explore More Passes
                            <span className="text-[10px] px-2 py-0.5 bg-violet-500/20 text-violet-400 rounded-full">Soon</span>
                        </h3>
                        <ul className="space-y-3">
                            {otherPasses.map((pass) => (
                                <li key={pass.name} className="text-gray-500 text-sm flex items-center justify-between">
                                    <div>
                                        <span className="text-gray-400">{pass.name}</span>
                                        <span className="text-gray-600 text-xs ml-2">{pass.desc}</span>
                                    </div>
                                </li>
                            ))}
                            <li className="pt-2">
                                <a
                                    href="https://propass.shop"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-violet-400 hover:text-violet-300 text-sm flex items-center gap-1 transition-colors"
                                >
                                    View all at ProPass.shop
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </li>
                        </ul>
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
                                <span>support@propass.shop</span>
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

                        {/* Payment Icons */}
                        <div className="flex gap-2 mt-6 flex-wrap">
                            {['visa', 'mastercard', 'amex', 'paypal', 'apple-pay'].map((icon, i) => (
                                <div key={i} className="h-7 w-10 bg-gray-800/50 rounded flex items-center justify-center border border-gray-700">
                                    <img src={`https://img.icons8.com/color/48/${icon}.png`} alt={icon} className="h-4 object-contain opacity-80" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-12 pt-8 border-t border-gray-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-500 text-sm">
                            © {currentYear} ProPass.shop. All rights reserved.
                        </p>
                        <span className="text-gray-700">•</span>
                        <a href="https://propass.shop" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-violet-400 text-sm transition-colors">
                            propass.shop
                        </a>
                    </div>
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