import React from 'react';
import { motion } from 'framer-motion';
import { Users, Mail, Zap, Clock, Shield, CheckCircle } from 'lucide-react';

const services = [
    {
        id: 'team_invitation',
        title: 'Team Invitation',
        subtitle: 'Instant Access',
        description: 'Join our premium Canva Pro team instantly. Get immediate access to all Pro features through a team invite link.',
        icon: Users,
        color: 'violet',
        gradient: 'from-violet-500 to-purple-600',
        features: [
            'Instant delivery within minutes',
            'Full Canva Pro access',
            'Shared team workspace',
            'All premium templates & elements'
        ],
        badge: 'Most Popular'
    },
    {
        id: 'custom_email',
        title: 'Custom Email Upgrade',
        subtitle: 'Personal Account',
        description: 'We upgrade your existing Canva account directly. Keep your personal workspace and all your existing designs.',
        icon: Mail,
        color: 'cyan',
        gradient: 'from-cyan-500 to-teal-500',
        features: [
            'Your own personal Pro account',
            'Keep all existing designs',
            'Private workspace',
            'Premium support included'
        ],
        badge: 'Premium'
    }
];

export default function ServicesSection() {
    return (
        <section id="services" className="relative py-32 bg-[#0F0F1A]">
            {/* Background accents */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-cyan-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-6">
                        Our Services
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Choose Your
                        <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent"> Upgrade Path</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Two flexible options to get you premium access. Pick the method that works best for you.
                    </p>
                </motion.div>

                {/* Services grid */}
                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: index * 0.2 }}
                            className="group relative cursor-pointer"
                            onClick={() => {
                                const event = new CustomEvent('switchPricingMethod', { detail: service.id });
                                window.dispatchEvent(event);
                                document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            {/* Card */}
                            <div className="relative h-full bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 transition-all duration-500 hover:border-gray-600/50 hover:shadow-2xl hover:shadow-violet-500/10">
                                {/* Badge */}
                                <div className={`absolute -top-3 right-8 px-4 py-1 rounded-full bg-gradient-to-r ${service.gradient} text-white text-xs font-semibold shadow-lg`}>
                                    {service.badge}
                                </div>

                                {/* Icon */}
                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} p-0.5 mb-6`}>
                                    <div className="w-full h-full rounded-2xl bg-gray-900 flex items-center justify-center">
                                        <service.icon className="w-7 h-7 text-white" />
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="mb-6">
                                    <p className={`text-sm font-medium mb-2 ${service.color === 'violet' ? 'text-violet-400' : 'text-cyan-400'}`}>
                                        {service.subtitle}
                                    </p>
                                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">{service.description}</p>
                                </div>

                                {/* Features */}
                                <ul className="space-y-3">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-center gap-3">
                                            <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center flex-shrink-0`}>
                                                <CheckCircle className="w-3 h-3 text-white" />
                                            </div>
                                            <span className="text-gray-300 text-sm">{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* Hover gradient effect */}
                                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Additional info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="mt-16 flex flex-wrap justify-center gap-8 text-center"
                >
                    {[
                        { icon: Zap, text: 'Lightning Fast Setup', color: 'text-yellow-400' },
                        { icon: Clock, text: '24/7 Available', color: 'text-cyan-400' },
                        { icon: Shield, text: 'Secure & Reliable', color: 'text-green-400' }
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <item.icon className={`w-5 h-5 ${item.color}`} />
                            <span className="text-gray-400 text-sm">{item.text}</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}