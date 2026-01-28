"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Users, Mail, ArrowRight, Shield } from 'lucide-react';
import Link from 'next/link';
import { createPageUrl } from '@/lib/utils';

const features = [
    'All Premium Templates',
    'Background Remover',
    'Magic Resize',
    'Brand Kit',
    '100GB Cloud Storage',
    'Premium Fonts & Elements',
    'Transparent Backgrounds',
    'Social Media Scheduler'
];



export default function PricingSection() {
    const [selectedMethod, setSelectedMethod] = useState('team_invitation');
    const [pricingPlans, setPricingPlans] = useState({ team_invitation: [], custom_email: [] });

    React.useEffect(() => {
        const handleSwitch = (e) => {
            if (e.detail) setSelectedMethod(e.detail);
        };
        window.addEventListener('switchPricingMethod', handleSwitch);
        return () => window.removeEventListener('switchPricingMethod', handleSwitch);
    }, []);

    React.useEffect(() => {
        async function fetchPackages() {
            try {
                const response = await fetch('/api/packages');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const packages = await response.json();
                if (!packages || packages.length === 0) return;

                const plans = {
                    team_invitation: packages.filter(p => p.type === 'team_invitation'),
                    custom_email: packages.filter(p => p.type === 'custom_email')
                };
                // Ensure correct structure if needed or just use as is if schema matches props
                // The schema matches well (duration, price, etc.)
                // Just mapping id to duration key if strictly needed by UI but looks like it uses plan.duration
                // Map snake_case to camelCase specific fields if db returns snake_case but schema uses camelCase-ish names?
                // detailed check: db cols: id, name, duration, price, original_price, savings, status, type, popular, best_value
                // JS code expects: duration, label, price, originalPrice, savings, popular, bestValue (camelCase)

                const transform = (pkgs) => pkgs.map(p => ({
                    ...p,
                    originalPrice: p.original_price,
                    bestValue: p.best_value,
                    label: p.duration // The DB has duration as "1 Month", JS code expects label="1 Month", duration="1_month" or unique key
                }));

                setPricingPlans({
                    team_invitation: transform(plans.team_invitation),
                    custom_email: transform(plans.custom_email)
                });
            } catch (err) {
                console.error("Failed to fetch packages", err);
            }
        }
        fetchPackages();
    }, []);

    return (
        <section id="pricing" className="relative py-32 bg-[#0A0A12]">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-600/5 rounded-full blur-[150px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
                        Simple Pricing
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Premium Access,
                        <span className="bg-gradient-to-r from-cyan-400 to-violet-400 bg-clip-text text-transparent"> Affordable Price</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
                        Save up to 74% compared to official Canva Pro pricing. Choose your preferred upgrade method below.
                    </p>

                    {/* Trust Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                        <Shield className="w-4 h-4" />
                        <span>30-Day Money Back Guarantee</span>
                    </div>
                </motion.div>

                {/* Method Toggle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex justify-center mb-12"
                >
                    <div className="inline-flex p-1.5 rounded-2xl bg-gray-900/80 border border-gray-700/50">
                        <button
                            onClick={() => setSelectedMethod('team_invitation')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${selectedMethod === 'team_invitation'
                                ? 'bg-gradient-to-r from-violet-600 to-violet-500 text-white shadow-lg shadow-violet-500/25'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Users className="w-4 h-4" />
                            Team Invitation
                        </button>
                        <button
                            onClick={() => setSelectedMethod('custom_email')}
                            className={`flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${selectedMethod === 'custom_email'
                                ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                                : 'text-gray-400 hover:text-white'
                                }`}
                        >
                            <Mail className="w-4 h-4" />
                            Custom Email
                        </button>
                    </div>
                </motion.div>

                {/* Pricing Cards */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedMethod}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto"
                    >
                        {pricingPlans[selectedMethod].map((plan, index) => (
                            <motion.div
                                key={plan.duration}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative group ${plan.popular || plan.bestValue ? 'sm:-mt-4 sm:mb-4' : ''}`}
                            >
                                {/* Popular/Best Value Badge */}
                                {(plan.popular || plan.bestValue) && (
                                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold text-white shadow-lg z-10 ${plan.bestValue
                                        ? 'bg-gradient-to-r from-amber-500 to-orange-500'
                                        : 'bg-gradient-to-r from-violet-500 to-cyan-500'
                                        }`}>
                                        {plan.bestValue ? '✨ Best Value' : '🔥 Popular'}
                                    </div>
                                )}

                                <div className={`h-full bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl rounded-3xl border transition-all duration-500 p-6 ${plan.popular || plan.bestValue
                                    ? 'border-violet-500/50 shadow-xl shadow-violet-500/10'
                                    : 'border-gray-700/50 hover:border-gray-600/50'
                                    }`}>
                                    {/* Duration */}
                                    <div className="text-center mb-6">
                                        <h3 className="text-lg font-semibold text-white mb-1">{plan.label}</h3>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
                                            <span className="text-green-400 text-xs font-medium">Save {plan.savings}</span>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-center mb-6">
                                        <div className="text-gray-500 text-sm line-through mb-1">${plan.originalPrice.toFixed(2)}</div>
                                        <div className="flex items-baseline justify-center gap-1">
                                            <span className="text-4xl font-bold text-white">${plan.price.toFixed(2)}</span>
                                        </div>
                                        <p className="text-gray-500 text-xs mt-1">one-time payment</p>
                                    </div>

                                    {/* CTA */}
                                    <Link href={createPageUrl(`Checkout?method=${selectedMethod}&duration=${plan.duration}&price=${plan.price}`)}>
                                        <Button
                                            className={`w-full rounded-xl py-5 text-sm font-semibold transition-all duration-300 group-hover:scale-[1.02] ${plan.popular || plan.bestValue
                                                ? 'bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white shadow-lg'
                                                : 'bg-gray-800 hover:bg-gray-700 text-white border border-gray-700'
                                                }`}
                                        >
                                            Get Started
                                            <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </AnimatePresence>

                {/* Features List */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-20"
                >
                    <h3 className="text-center text-xl font-semibold text-white mb-8">
                        Everything included in Canva Pro
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-center gap-3 p-4 rounded-xl bg-gray-900/50 border border-gray-800/50">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-cyan-500 flex items-center justify-center flex-shrink-0">
                                    <Check className="w-3 h-3 text-white" />
                                </div>
                                <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}