"use client";
import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import {
    Users, Mail, Shield, Zap, CheckCircle, ArrowLeft,
    CreditCard, Sparkles, Lock, Clock, ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { createPageUrl } from '@/lib/utils';


function CheckoutContent() {
    const searchParams = useSearchParams();
    const initialMethod = searchParams.get('method') || 'team_invitation';
    const initialDuration = searchParams.get('duration') || '1 Month'; // Default to "1 Month" string to match DB

    const [step, setStep] = useState(1);
    const [selectedMethod, setSelectedMethod] = useState(initialMethod);
    const [selectedDuration, setSelectedDuration] = useState(initialDuration);
    const [packages, setPackages] = useState({ team_invitation: [], custom_email: [] });
    const [loadingPackages, setLoadingPackages] = useState(true);

    const [formData, setFormData] = useState({
        customer_name: '',
        customer_email: '',
        canva_email: '',
        notes: '',
        payment_method: 'card'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderComplete, setOrderComplete] = useState(false);
    const [orderId, setOrderId] = useState(null);

    useEffect(() => {
        async function fetchPackages() {
            try {
                const response = await fetch('/api/packages');
                if (!response.ok) throw new Error(`HTTP ${response.status}`);
                const data = await response.json();
                if (data) {
                    const grouped = {
                        team_invitation: data.filter(p => p.type === 'team_invitation').map(p => ({
                            ...p,
                            label: p.duration // DB duration is "1 Month"
                        })).sort((a, b) => a.price - b.price),
                        custom_email: data.filter(p => p.type === 'custom_email').map(p => ({
                            ...p,
                            label: p.duration
                        })).sort((a, b) => a.price - b.price)
                    };
                    setPackages(grouped);
                }
            } catch (error) {
                console.error("Failed to fetch packages:", error);
            } finally {
                setLoadingPackages(false);
            }
        }
        fetchPackages();
    }, []);

    // Effect to update selectedDuration once packages are loaded if it was set via URL
    useEffect(() => {
        if (!loadingPackages && initialDuration) {
            const allPackages = [...packages.team_invitation, ...packages.custom_email];
            const matched = allPackages.find(p => p.duration.toLowerCase() === initialDuration.toLowerCase());
            if (matched) {
                setSelectedDuration(matched.duration);
            }
        }
    }, [loadingPackages, initialDuration]);

    const currentPlans = packages[selectedMethod] || [];
    const currentPlan = currentPlans.find(p => p.duration === selectedDuration) || currentPlans[0];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    useEffect(() => {
        if (typeof window !== 'undefined' && window.fbq && currentPlan) {
            window.fbq('track', 'InitiateCheckout', {
                content_name: currentPlan.name,
                content_category: currentPlan.type,
                value: currentPlan.price,
                currency: 'USD',
                content_ids: [currentPlan.id],
                content_type: 'product'
            });
        }
    }, [currentPlan?.id]);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            // Create order via our API
            const orderData = {
                customer_email: formData.customer_email,
                customer_name: formData.customer_name,
                package_name: `${currentPlan.name} - ${currentPlan.duration}`,
                package_type: selectedMethod,
                duration: selectedDuration,
                amount: currentPlan.price,
                status: 'Pending',
                canva_email: selectedMethod === 'custom_email' ? formData.canva_email : '',
                notes: formData.notes,
                payment_method: formData.payment_method
            };

            const response = await fetch('/api/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) throw new Error('Failed to create order');
            const result = await response.json();
            setOrderId(result.id);

            // Track Purchase event
            if (window.fbq) {
                window.fbq('track', 'Purchase', {
                    content_name: currentPlan.name,
                    content_category: currentPlan.type,
                    value: currentPlan.price,
                    currency: 'USD',
                    content_ids: [currentPlan.id],
                    content_type: 'product'
                });
            }

            // If there's a payment link, open it in new tab and stay on checkout page
            if (currentPlan.payment_link) {
                // Open payment link in new tab - user stays on checkout page to retry if needed
                window.open(currentPlan.payment_link, '_blank');
                // Don't show confirmation - user can retry payment if there's an issue
            } else {
                // No payment link, show confirmation for manual processing
                setOrderComplete(true);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to process order. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (orderComplete) {
        return (
            <div className="min-h-screen bg-[#0F0F1A] flex items-center justify-center p-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-md w-full bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8 text-center"
                >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 mx-auto flex items-center justify-center mb-6">
                        <CheckCircle className="w-10 h-10 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold text-white mb-2">Order Confirmed!</h1>
                    <p className="text-gray-400 mb-6">
                        Thank you for your order. We're processing your upgrade now.
                    </p>

                    <div className="bg-gray-800/50 rounded-2xl p-4 mb-6 text-left">
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Order ID</span>
                            <span className="text-white font-mono">#{orderId?.slice(0, 8)}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-2">
                            <span className="text-gray-400">Method</span>
                            <span className="text-white capitalize">{selectedMethod.replace('_', ' ')}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Total Paid</span>
                            <span className="text-white font-semibold">${currentPlan.price.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 justify-center text-sm text-gray-400 mb-6">
                        <Clock className="w-4 h-4 text-cyan-400" />
                        <span>
                            {selectedMethod === 'team_invitation'
                                ? 'Delivery within 5-15 minutes'
                                : 'Delivery within 1-24 hours'}
                        </span>
                    </div>

                    <Link href={createPageUrl('Home')}>
                        <Button className="w-full bg-gradient-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white rounded-xl py-5">
                            Return to Home
                        </Button>
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F0F1A]">
            {/* Background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 -right-1/4 w-[400px] h-[400px] bg-cyan-500/10 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <Link href={createPageUrl('Home')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Home</span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-600 to-cyan-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-lg font-bold text-white">CanvaPro</span>
                    </div>
                </div>

                {/* Progress Steps */}
                <div className="flex items-center justify-center gap-4 mb-12">
                    {[1, 2, 3].map((s) => (
                        <React.Fragment key={s}>
                            <div className={`flex items-center gap-2 ${step >= s ? 'text-white' : 'text-gray-500'}`}>
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= s
                                    ? 'bg-gradient-to-r from-emerald-600 to-cyan-600'
                                    : 'bg-gray-800 border border-gray-700'
                                    }`}>
                                    {step > s ? <CheckCircle className="w-4 h-4" /> : s}
                                </div>
                                <span className="hidden sm:inline text-sm">
                                    {s === 1 ? 'Select Plan' : s === 2 ? 'Your Details' : 'Payment'}
                                </span>
                            </div>
                            {s < 3 && <div className={`w-12 h-0.5 ${step > s ? 'bg-emerald-500' : 'bg-gray-800'}`} />}
                        </React.Fragment>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Form */}
                    <div className="lg:col-span-2">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-8"
                        >
                            {step === 1 && (
                                <>
                                    <h2 className="text-2xl font-bold text-white mb-6">Select Your Plan</h2>

                                    {/* Method Selection */}
                                    <div className="mb-8">
                                        <Label className="text-gray-300 mb-4 block">Upgrade Method</Label>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            {[
                                                { id: 'team_invitation', label: 'Team Invitation', icon: Users, desc: 'Instant access via team invite' },
                                                { id: 'custom_email', label: 'Custom Email', icon: Mail, desc: 'Upgrade your own account' }
                                            ].map((method) => (
                                                <button
                                                    key={method.id}
                                                    onClick={() => setSelectedMethod(method.id)}
                                                    className={`p-4 rounded-2xl border text-left transition-all ${selectedMethod === method.id
                                                        ? 'border-emerald-500 bg-emerald-500/10'
                                                        : 'border-gray-700 hover:border-gray-600'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedMethod === method.id ? 'bg-emerald-500/20' : 'bg-gray-800'
                                                            }`}>
                                                            <method.icon className={`w-5 h-5 ${selectedMethod === method.id ? 'text-emerald-400' : 'text-gray-400'
                                                                }`} />
                                                        </div>
                                                        <span className="text-white font-semibold">{method.label}</span>
                                                    </div>
                                                    <p className="text-gray-400 text-sm">{method.desc}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Duration Selection */}
                                    <div>
                                        <Label className="text-gray-300 mb-4 block">Duration</Label>
                                        {loadingPackages ? (
                                            <div className="text-gray-400">Loading plans...</div>
                                        ) : (
                                            <RadioGroup value={selectedDuration} onValueChange={setSelectedDuration} className="grid sm:grid-cols-2 gap-4">
                                                {packages[selectedMethod] && packages[selectedMethod].length > 0 ? (
                                                    packages[selectedMethod].map((plan) => (
                                                        <div key={plan.id}>
                                                            <RadioGroupItem
                                                                value={plan.duration}
                                                                id={plan.id}
                                                                className="peer sr-only"
                                                            />
                                                            <Label
                                                                htmlFor={plan.id}
                                                                className={`flex items-center justify-between p-4 rounded-2xl border cursor-pointer transition-all ${selectedDuration === plan.duration
                                                                    ? 'border-emerald-500 bg-emerald-500/10 shadow-[0_0_20px_rgba(16,185,129,0.1)]'
                                                                    : 'border-gray-700 hover:border-gray-600'
                                                                    }`}
                                                            >
                                                                <span className="text-white font-medium">{plan.label}</span>
                                                                <span className="text-xl font-bold text-white">${plan.price.toFixed(2)}</span>
                                                            </Label>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="text-gray-400 col-span-2">No plans available for this method.</div>
                                                )}
                                            </RadioGroup>
                                        )}
                                    </div>

                                    <Button
                                        onClick={() => setStep(2)}
                                        className="w-full mt-8 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white py-6 rounded-2xl text-lg"
                                    >
                                        Continue
                                    </Button>
                                </>
                            )}

                            {step === 2 && (
                                <>
                                    <h2 className="text-2xl font-bold text-white mb-6">Your Details</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <Label htmlFor="customer_name" className="text-gray-300 mb-2 block">Full Name</Label>
                                            <Input
                                                id="customer_name"
                                                name="customer_name"
                                                value={formData.customer_name}
                                                onChange={handleInputChange}
                                                placeholder="John Doe"
                                                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 rounded-xl py-5"
                                            />
                                        </div>

                                        <div>
                                            <Label htmlFor="customer_email" className="text-gray-300 mb-2 block">Email Address</Label>
                                            <Input
                                                id="customer_email"
                                                name="customer_email"
                                                type="email"
                                                value={formData.customer_email}
                                                onChange={handleInputChange}
                                                placeholder="john@example.com"
                                                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 rounded-xl py-5"
                                            />
                                        </div>

                                        {selectedMethod === 'custom_email' && (
                                            <div>
                                                <Label htmlFor="canva_email" className="text-gray-300 mb-2 block">Canva Account Email</Label>
                                                <Input
                                                    id="canva_email"
                                                    name="canva_email"
                                                    type="email"
                                                    value={formData.canva_email}
                                                    onChange={handleInputChange}
                                                    placeholder="Your Canva login email"
                                                    className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 rounded-xl py-5"
                                                />
                                                <p className="text-gray-500 text-xs mt-2">The email you use to log into Canva</p>
                                            </div>
                                        )}

                                        <div>
                                            <Label htmlFor="notes" className="text-gray-300 mb-2 block">Additional Notes (Optional)</Label>
                                            <Textarea
                                                id="notes"
                                                name="notes"
                                                value={formData.notes}
                                                onChange={handleInputChange}
                                                placeholder="Any special requests or instructions..."
                                                className="bg-gray-900 border-gray-700 text-white placeholder:text-gray-500 rounded-xl min-h-[100px]"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <Button
                                            onClick={() => setStep(1)}
                                            variant="outline"
                                            className="flex-1 bg-white border-white text-black hover:bg-gray-100 hover:border-gray-200 py-6 rounded-2xl"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            onClick={() => setStep(3)}
                                            disabled={!formData.customer_email || !formData.customer_name || (selectedMethod === 'custom_email' && !formData.canva_email)}
                                            className="flex-1 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white py-6 rounded-2xl"
                                        >
                                            Continue
                                        </Button>
                                    </div>
                                </>
                            )}

                            {step === 3 && (
                                <>
                                    <h2 className="text-2xl font-bold text-white mb-6">Payment</h2>

                                    <div className="space-y-6">
                                        <div>
                                            <Label className="text-gray-300 mb-4 block">Payment Method</Label>
                                            <RadioGroup value={formData.payment_method} onValueChange={(v) => setFormData(prev => ({ ...prev, payment_method: v }))} className="space-y-3">
                                                {[
                                                    { id: 'card', label: 'Credit / Debit Card', icon: CreditCard },
                                                    { id: 'paypal', label: 'PayPal', icon: Shield }
                                                ].map((method) => (
                                                    <div key={method.id} className={method.id === 'paypal' ? 'opacity-60 cursor-not-allowed relative' : ''}>
                                                        <RadioGroupItem
                                                            value={method.id}
                                                            id={method.id}
                                                            className="peer sr-only"
                                                            disabled={method.id === 'paypal'}
                                                        />
                                                        <Label
                                                            htmlFor={method.id}
                                                            className={`flex items-center gap-3 p-4 rounded-2xl border transition-all ${formData.payment_method === method.id
                                                                ? 'border-emerald-500 bg-emerald-500/10'
                                                                : 'border-gray-700 hover:border-gray-600'
                                                                } ${method.id === 'paypal' ? 'cursor-not-allowed hover:border-gray-700' : 'cursor-pointer'}`}
                                                        >
                                                            <method.icon className={`w-5 h-5 ${formData.payment_method === method.id ? 'text-emerald-400' : 'text-gray-400'
                                                                }`} />
                                                            <span className="text-white">{method.label}</span>
                                                            {method.id === 'paypal' && (
                                                                <span className="ml-auto text-xs font-medium px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                                                    Coming Soon
                                                                </span>
                                                            )}
                                                        </Label>
                                                    </div>
                                                ))}
                                            </RadioGroup>
                                        </div>

                                        <div className="bg-gray-800/50 rounded-2xl p-4 flex items-center gap-3">
                                            <Lock className="w-5 h-5 text-green-400" />
                                            <span className="text-gray-400 text-sm">Your payment is secured with 256-bit SSL encryption</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-4 mt-8">
                                        <Button
                                            onClick={() => setStep(2)}
                                            variant="outline"
                                            className="flex-1 bg-white border-white text-black hover:bg-gray-100 hover:border-gray-200 py-6 rounded-2xl"
                                        >
                                            Back
                                        </Button>
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white py-6 rounded-2xl"
                                        >
                                            {isSubmitting ? 'Processing...' : `Pay $${currentPlan.price.toFixed(2)}`}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 p-6">
                            <h3 className="text-lg font-semibold text-white mb-6">Order Summary</h3>

                            <div className="space-y-4 mb-6">
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Package</span>
                                    <span className="text-white capitalize">{selectedMethod.replace('_', ' ')}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-gray-400">Duration</span>
                                    <span className="text-white">{currentPlan?.label}</span>
                                </div>
                                <div className="border-t border-gray-700 pt-4 flex items-center justify-between">
                                    <span className="text-gray-400">Total</span>
                                    <span className="text-2xl font-bold text-white">${currentPlan?.price.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { icon: Zap, text: 'Fast Delivery' },
                                    { icon: Shield, text: '30-Day Money Back Guarantee' },
                                    { icon: CheckCircle, text: 'Full Pro Access' }
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                                        <item.icon className="w-4 h-4 text-green-400" />
                                        <span>{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Checkout() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    )
}
