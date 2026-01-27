"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createPackage } from "@/app/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChevronLeft } from "lucide-react"

export default function NewPackagePage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        type: "team_invitation",
        duration: "1_month",
        price: "",
        status: "Active"
    })

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            // Construct ID and other fields
            const durationLabelMap = {
                "1_month": "1 Month",
                "3_months": "3 Months",
                "6_months": "6 Months",
                "12_months": "12 Months"
            };

            // Use random UUID to avoid collisions
            const id = crypto.randomUUID();

            const pkg = {
                id,
                name: formData.name || (formData.type === "team_invitation" ? "Team Invitation" : "Custom Email"),
                type: formData.type,
                duration: durationLabelMap[formData.duration] || formData.duration,
                price: parseFloat(formData.price),
                status: formData.status === "best_value" ? "Best Value" : "Active",
                best_value: formData.status === "best_value" ? 1 : 0,
                popular: formData.status === "popular" ? 1 : 0,
                savings: null, // Calculate or input? Left as null for now
                original_price: null // Calculate or input? Left as null for now
            };

            await createPackage(pkg);
            router.push("/admin/packages");
            router.refresh();
        } catch (error) {
            console.error("Failed to create package:", error);
            alert(`Failed to create package: ${error.message}`);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">New Package</h2>
                    <p className="text-gray-400">
                        Create a new subscription package.
                    </p>
                </div>
            </div>

            <div className="grid gap-4 max-w-2xl">
                <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white">
                    <CardHeader>
                        <CardTitle className="text-white">Package Details</CardTitle>
                        <CardDescription className="text-gray-400">
                            Enter the details for the new package.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={onSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name" className="text-gray-300">Package Name</Label>
                                <Input
                                    id="name"
                                    placeholder="e.g. Team Invitation"
                                    className="bg-white/10 border-white/20 text-white"
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="type" className="text-gray-300">Type</Label>
                                    <Select
                                        value={formData.type}
                                        onValueChange={(val) => handleChange("type", val)}
                                    >
                                        <SelectTrigger id="type" className="bg-white/10 border-white/20 text-white">
                                            <SelectValue placeholder="Select type" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0f0f1a] border-white/20 text-white">
                                            <SelectItem value="team_invitation">Team Invitation</SelectItem>
                                            <SelectItem value="custom_email">Custom Email</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="duration" className="text-gray-300">Duration</Label>
                                    <Select
                                        value={formData.duration}
                                        onValueChange={(val) => handleChange("duration", val)}
                                    >
                                        <SelectTrigger id="duration" className="bg-white/10 border-white/20 text-white">
                                            <SelectValue placeholder="Select duration" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0f0f1a] border-white/20 text-white">
                                            <SelectItem value="1_month">1 Month</SelectItem>
                                            <SelectItem value="3_months">3 Months</SelectItem>
                                            <SelectItem value="6_months">6 Months</SelectItem>
                                            <SelectItem value="12_months">12 Months</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-gray-300">Price ($)</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        step="0.01"
                                        placeholder="9.99"
                                        required
                                        className="bg-white/10 border-white/20 text-white"
                                        value={formData.price}
                                        onChange={(e) => handleChange("price", e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="status" className="text-gray-300">Status</Label>
                                    <Select
                                        value={formData.status}
                                        onValueChange={(val) => handleChange("status", val)}
                                    >
                                        <SelectTrigger id="status" className="bg-white/10 border-white/20 text-white">
                                            <SelectValue placeholder="Select status" />
                                        </SelectTrigger>
                                        <SelectContent className="bg-[#0f0f1a] border-white/20 text-white">
                                            <SelectItem value="Active">Active</SelectItem>
                                            <SelectItem value="Inactive">Inactive</SelectItem>
                                            <SelectItem value="best_value">Best Value</SelectItem>
                                            <SelectItem value="popular">Popular</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button variant="ghost" type="button" onClick={() => router.back()} className="text-gray-400 hover:text-white hover:bg-white/10">
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={loading} className="bg-violet-600 hover:bg-violet-700 text-white">
                                    {loading ? "Creating..." : "Create Package"}
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
