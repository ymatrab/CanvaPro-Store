import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, CreditCard, Mail, Sparkles } from 'lucide-react';

const steps = [
    {
        number: '01',
        title: 'Select Your Plan',
        description: 'Choose between Team Invitation or Custom Email upgrade, and select your preferred duration.',
        icon: ShoppingCart,
        color: 'violet'
    },
    {
        number: '02',
        title: 'Complete Payment',
        description: 'Secure checkout with multiple payment options. Your transaction is fully encrypted.',
        icon: CreditCard,
        color: 'cyan'
    },
    {
        number: '03',
        title: 'Receive Access',
        description: 'Get your team invite link or account upgrade confirmation within minutes.',
        icon: Mail,
        color: 'pink'
    },
    {
        number: '04',
        title: 'Enjoy Canva Pro',
        description: 'Start creating with full access to all premium features, templates, and tools.',
        icon: Sparkles,
        color: 'amber'
    }
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="relative py-32 bg-[#0F0F1A]">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[150px]" />
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-sm font-medium mb-6">
                        Simple Process
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        How It
                        <span className="bg-gradient-to-r from-pink-400 to-violet-400 bg-clip-text text-transparent"> Works</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Get started in just a few minutes with our streamlined process
                    </p>
                </motion.div>

                {/* Steps */}
                <div className="relative max-w-5xl mx-auto">
                    {/* Connection line */}
                    <div className="absolute top-24 left-8 right-8 h-0.5 bg-gradient-to-r from-violet-500/50 via-cyan-500/50 to-amber-500/50 hidden lg:block" />

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((step, index) => (
                            <motion.div
                                key={step.number}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                className="relative"
                            >
                                {/* Step card */}
                                <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 h-full hover:border-gray-600/50 transition-all duration-500 group">
                                    {/* Number badge */}
                                    <div className={`absolute -top-4 left-8 w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color === 'violet' ? 'from-violet-500 to-purple-600' :
                                            step.color === 'cyan' ? 'from-cyan-500 to-teal-500' :
                                                step.color === 'pink' ? 'from-pink-500 to-rose-500' :
                                                    'from-amber-500 to-orange-500'
                                        } flex items-center justify-center shadow-lg z-10`}>
                                        <step.icon className="w-5 h-5 text-white" />
                                    </div>

                                    {/* Content */}
                                    <div className="pt-6">
                                        <span className={`text-xs font-bold tracking-widest ${step.color === 'violet' ? 'text-violet-400' :
                                                step.color === 'cyan' ? 'text-cyan-400' :
                                                    step.color === 'pink' ? 'text-pink-400' :
                                                        'text-amber-400'
                                            }`}>
                                            STEP {step.number}
                                        </span>
                                        <h3 className="text-xl font-bold text-white mt-2 mb-3">{step.title}</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                                    </div>

                                    {/* Hover glow */}
                                    <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${step.color === 'violet' ? 'from-violet-500/5 to-purple-600/5' :
                                            step.color === 'cyan' ? 'from-cyan-500/5 to-teal-500/5' :
                                                step.color === 'pink' ? 'from-pink-500/5 to-rose-500/5' :
                                                    'from-amber-500/5 to-orange-500/5'
                                        }`} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}