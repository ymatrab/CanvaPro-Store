"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
    {
        question: 'How does the Team Invitation method work?',
        answer: 'With the Team Invitation method, you\'ll receive an invite link to join our premium Canva Pro team. Once you accept the invitation, you\'ll have immediate access to all Canva Pro features through the team workspace. This is the fastest way to get started.'
    },
    {
        question: 'What is the Custom Email Upgrade?',
        answer: 'The Custom Email Upgrade allows us to upgrade your existing Canva account directly to Pro status. This means you keep your personal workspace, all your existing designs, and gain full Pro access on your own account. This method takes slightly longer but provides a more personalized experience.'
    },
    {
        question: 'Is this legitimate? Will I lose my account?',
        answer: 'Absolutely legitimate and safe. We\'ve been providing this service for over 2 years with 5,000+ satisfied customers. Your account will not be banned or suspended. We use authorized methods to provide Pro access.'
    },
    {
        question: 'How long does delivery take?',
        answer: 'Team Invitation: Usually within 5-15 minutes during business hours. Custom Email Upgrade: Typically 1-24 hours depending on the queue. We\'ll notify you via email once your upgrade is ready.'
    },
    {
        question: 'What happens when my subscription period ends?',
        answer: 'Your Pro access will expire at the end of your chosen duration. You can easily renew by purchasing another plan. We\'ll send you a reminder before your subscription ends so you can renew without interruption.'
    },
    {
        question: 'Do I get all Canva Pro features?',
        answer: 'Yes! You get complete access to all Canva Pro features including: 100+ million premium photos, videos & graphics, Background Remover, Magic Resize, Brand Kit, 100GB cloud storage, premium templates, and much more.'
    },
    {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major payment methods including credit/debit cards, PayPal, and various local payment options. All transactions are processed through secure, encrypted payment gateways.'
    },
    {
        question: 'What if I have issues with my upgrade?',
        answer: 'Our support team is available 24/7 via live chat. If you experience any issues with your upgrade, we\'ll resolve it promptly or provide a full refund. Customer satisfaction is our top priority.'
    }
];

export default function FAQ() {
    const [openIndex, setOpenIndex] = useState(null);

    return (
        <section id="faq" className="relative py-32 bg-[#0F0F1A]">
            {/* Background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[150px]" />
                <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-violet-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6">
                        FAQ
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Frequently Asked
                        <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent"> Questions</span>
                    </h2>
                    <p className="text-gray-400 text-lg">
                        Everything you need to know about our service
                    </p>
                </motion.div>

                {/* FAQ Items */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl rounded-2xl border border-gray-700/50 p-6 text-left hover:border-gray-600/50 transition-all duration-300"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                                            <HelpCircle className="w-5 h-5 text-teal-400" />
                                        </div>
                                        <h3 className="text-white font-semibold">{faq.question}</h3>
                                    </div>
                                    <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 flex-shrink-0 ${openIndex === index ? 'rotate-180' : ''
                                        }`} />
                                </div>

                                <AnimatePresence>
                                    {openIndex === index && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden"
                                        >
                                            <p className="text-gray-400 mt-4 pl-14 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    ))}
                </div>

                {/* Contact CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 text-center"
                >
                    <p className="text-gray-400">
                        Still have questions?{' '}
                        <button
                            onClick={() => document.getElementById('live-chat')?.click()}
                            className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                        >
                            Chat with us
                        </button>
                    </p>
                </motion.div>
            </div>
        </section>
    );
}