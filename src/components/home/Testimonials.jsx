import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, Shield } from 'lucide-react';

const testimonials = [
    {
        name: 'Sarah Mitchell',
        role: 'Freelance Designer',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
        content: 'Absolutely amazing service! Got my Canva Pro access within 5 minutes. The team invitation method works flawlessly.',
        rating: 5
    },
    {
        name: 'James Rodriguez',
        role: 'Marketing Manager',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        content: 'Been using this for 6 months now. Saved so much money compared to the official subscription. Highly recommended!',
        rating: 5
    },
    {
        name: 'Emily Chen',
        role: 'Content Creator',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        content: 'The custom email upgrade kept all my designs intact. Customer support was super helpful when I had questions.',
        rating: 5
    },
    {
        name: 'Michael Foster',
        role: 'Small Business Owner',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        content: 'Best investment for my business. All premium features work perfectly. Will definitely renew!',
        rating: 5
    },
    {
        name: 'Lisa Thompson',
        role: 'Social Media Manager',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face',
        content: 'Lightning fast delivery and excellent customer service. The background remover alone is worth it!',
        rating: 5
    },
    {
        name: 'David Park',
        role: 'Graphic Designer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face',
        content: 'Professional service at an unbeatable price. Switched from official Canva Pro and couldn\'t be happier.',
        rating: 5
    }
];

export default function Testimonials() {
    return (
        <section className="relative py-32 bg-[#0A0A12] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-violet-600/5 rounded-full blur-[200px]" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-6">
                        Customer Reviews
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Loved by
                        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"> Thousands</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Join over 5,000+ satisfied customers who upgraded to Canva Pro with us
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center gap-12 mb-16"
                >
                    {[
                        { value: '5,000+', label: 'Happy Customers' },
                        { value: '4.9/5', label: 'Average Rating' },
                        { value: '99%', label: 'Satisfaction Rate' }
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                {stat.value}
                            </div>
                            <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>

                {/* Testimonials grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group"
                        >
                            <div className="h-full bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6 hover:border-gray-600/50 transition-all duration-500">
                                {/* Quote icon */}
                                <Quote className="w-8 h-8 text-violet-500/30 mb-4" />

                                {/* Content */}
                                <p className="text-gray-300 leading-relaxed mb-6">"{testimonial.content}"</p>

                                {/* Rating */}
                                <div className="flex gap-1 mb-4">
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    ))}
                                </div>

                                {/* Author */}
                                <div className="flex items-center gap-3">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full object-cover border-2 border-gray-700"
                                    />
                                    <div>
                                        <h4 className="text-white font-semibold">{testimonial.name}</h4>
                                        <p className="text-gray-500 text-sm">{testimonial.role}</p>
                                        <div className="flex items-center gap-1 mt-1 text-xs text-green-400 font-medium">
                                            <Shield className="w-3 h-3" />
                                            <span>Verified Purchase</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}