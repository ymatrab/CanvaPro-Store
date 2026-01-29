"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';
import { Menu, X, Sparkles, ExternalLink } from 'lucide-react';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { label: 'Services', href: '#services' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'How It Works', href: '#how-it-works' },
        { label: 'FAQ', href: '#faq' }
    ];

    const handleNavClick = (href) => {
        setIsMobileMenuOpen(false);
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            element?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? 'bg-[#0F0F1A]/80 backdrop-blur-xl border-b border-gray-800/50'
                    : 'bg-transparent'
                    }`}
            >
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link href={createPageUrl('Home')} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-white" />
                            </div>
                            <div className="flex flex-col">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                                        ProPass
                                    </span>
                                    <span className="text-gray-500 text-lg">|</span>
                                    <span className="text-white font-semibold">Canva</span>
                                </div>
                                <span className="text-[10px] text-gray-500 -mt-0.5">A ProPass.shop Product</span>
                            </div>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <button
                                    key={link.label}
                                    onClick={() => handleNavClick(link.href)}
                                    className="text-gray-400 hover:text-white transition-colors text-sm font-medium"
                                >
                                    {link.label}
                                </button>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="hidden md:flex items-center gap-4">
                            <a
                                href="https://propass.shop"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-1"
                            >
                                More Passes
                                <ExternalLink className="w-3 h-3" />
                            </a>
                            <Link href={createPageUrl('Checkout')}>
                                <Button className="bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white px-6 rounded-xl">
                                    Get Started
                                </Button>
                            </Link>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="md:hidden w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-5 h-5 text-white" />
                            ) : (
                                <Menu className="w-5 h-5 text-white" />
                            )}
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-0 top-20 z-40 md:hidden"
                    >
                        <div className="mx-4 p-6 bg-[#0F0F1A]/95 backdrop-blur-xl rounded-2xl border border-gray-800 shadow-2xl">
                            <div className="space-y-4">
                                {navLinks.map((link) => (
                                    <button
                                        key={link.label}
                                        onClick={() => handleNavClick(link.href)}
                                        className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                                <a
                                    href="https://propass.shop"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full text-left text-gray-400 hover:text-white transition-colors py-2 flex items-center gap-1"
                                >
                                    More Passes
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                                <div className="pt-4 border-t border-gray-800">
                                    <Link href={createPageUrl('Checkout')} onClick={() => setIsMobileMenuOpen(false)}>
                                        <Button className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white rounded-xl">
                                            Get Started
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}