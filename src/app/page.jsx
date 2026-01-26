"use client";
import React from 'react';
import Navbar from '@/components/common/Navbar';
import HeroSection from '@/components/home/HeroSection';
import ServicesSection from '@/components/home/ServicesSection';
import PricingSection from '@/components/home/PricingSection';
import HowItWorks from '@/components/home/HowItWorks';
import Testimonials from '@/components/home/Testimonials';
import FAQ from '@/components/home/FAQ';
import Footer from '@/components/common/Footer';
import LiveChat from '@/components/home/LiveChat';

export default function Home() {
    const scrollToPricing = () => {
        if (typeof document !== 'undefined') {
            document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="min-h-screen bg-[#0F0F1A]">
            <Navbar />
            <HeroSection onGetStarted={scrollToPricing} />
            <ServicesSection />
            <PricingSection />
            <HowItWorks />
            <Testimonials />
            <FAQ />
            <Footer />
            <LiveChat />
        </div>
    );
}
