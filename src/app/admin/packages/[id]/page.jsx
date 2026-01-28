"use client"

export const runtime = 'edge'

import { useState, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
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

export default function EditPackagePage() {
    const router = useRouter()
    const params = useParams()
    const packageId = params.id

    const [loading, setLoading] = useState(true)
    const [saving, setSaving] = useState(false)
    const [formData, setFormData] = useState({
        id: "",
        name: "",
        type: "team_invitation",
        duration: "1 Month",
        price: "",
        original_price: "",
        savings: "",
        status: "Active",
        popular: 0,
        best_value: 0
    })

    useEffect(() => {
        async function fetchPackage() {
            try {
                const response = await fetch('/api/packages')
                const packages = await response.json()
                const pkg = packages.find(p => p.id === packageId)
                if (pkg) {
                    setFormData({
                        id: pkg.id,
                        name: pkg.name || "",
                        type: pkg.type || "team_invitation",
                        duration: pkg.duration || "1 Month",
                        price: pkg.price?.toString() || "",
                        original_price: pkg.original_price?.toString() || "",
                        savings: pkg.savings?.toString() || "",
                        status: pkg.status || "Active",
                        popular: pkg.popular || 0,
                        best_value: pkg.best_value || 0
                    })
                }
            } catch (error) {
                console.error("Failed to fetch package:", error)
            } finally {
                setLoading(false)
            }
        }
        if (packageId) {
            fetchPackage()
        }
    }, [packageId])

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }))
    }

    const onSubmit = async (e) => {
        e.preventDefault()
        setSaving(true)

        try {
            const pkg = {
                id: formData.id,
                name: formData.name,
                type: formData.type,
                duration: formData.duration,
                price: parseFloat(formData.price),
                original_price: formData.original_price ? parseFloat(formData.original_price) : null,
                savings: formData.savings ? parseFloat(formData.savings) : null,
                status: formData.status,
                popular: formData.popular,
                best_value: formData.best_value
            }

            const response = await fetch('/api/packages', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(pkg)
            })

            if (!response.ok) throw new Error('Failed to update package')

            router.push("/admin/packages")
            router.refresh()
        } catch (error) {
            console.error("Failed to update package:", error)
            alert(`Failed to update package: ${error.message}`)
        } finally {
            setSaving(false)
        }
    }

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
            </div>
        )
    }

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center space-x-4">
                <Button variant="outline" size="icon" onClick={() => router.back()}>
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white">Edit Package</h2>
                    <p className="text-gray-400">
                        Modify package details.
                    </p>
                </div>
            </div>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white shadow-xl max-w-2xl">
                <CardHeader>
                    <CardTitle>Package Details</CardTitle>
                    <CardDescription className="text-gray-400">
                        Update the package information below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={onSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-gray-300">Package Name</Label>
                            <Input
                                id="name"
                                value={formData.name}
                                onChange={(e) => handleChange('name', e.target.value)}
                                placeholder="e.g., Team Invitation"
                                className="bg-gray-900 border-gray-700 text-white"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="type" className="text-gray-300">Type</Label>
                                <Select value={formData.type} onValueChange={(v) => handleChange('type', v)}>
                                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                                        <SelectValue placeholder="Select type" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 border-gray-700">
                                        <SelectItem value="team_invitation">Team Invitation</SelectItem>
                                        <SelectItem value="custom_email">Custom Email</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="duration" className="text-gray-300">Duration</Label>
                                <Select value={formData.duration} onValueChange={(v) => handleChange('duration', v)}>
                                    <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                                        <SelectValue placeholder="Select duration" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-gray-900 border-gray-700">
                                        <SelectItem value="1 Month">1 Month</SelectItem>
                                        <SelectItem value="3 Months">3 Months</SelectItem>
                                        <SelectItem value="6 Months">6 Months</SelectItem>
                                        <SelectItem value="12 Months">12 Months</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="price" className="text-gray-300">Price ($)</Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    value={formData.price}
                                    onChange={(e) => handleChange('price', e.target.value)}
                                    className="bg-gray-900 border-gray-700 text-white"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="original_price" className="text-gray-300">Original Price ($)</Label>
                                <Input
                                    id="original_price"
                                    type="number"
                                    step="0.01"
                                    value={formData.original_price}
                                    onChange={(e) => handleChange('original_price', e.target.value)}
                                    className="bg-gray-900 border-gray-700 text-white"
                                    placeholder="Optional"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="savings" className="text-gray-300">Savings ($)</Label>
                                <Input
                                    id="savings"
                                    type="number"
                                    step="0.01"
                                    value={formData.savings}
                                    onChange={(e) => handleChange('savings', e.target.value)}
                                    className="bg-gray-900 border-gray-700 text-white"
                                    placeholder="Optional"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="status" className="text-gray-300">Status</Label>
                            <Select value={formData.status} onValueChange={(v) => handleChange('status', v)}>
                                <SelectTrigger className="bg-gray-900 border-gray-700 text-white">
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent className="bg-gray-900 border-gray-700">
                                    <SelectItem value="Active">Active</SelectItem>
                                    <SelectItem value="Best Value">Best Value</SelectItem>
                                    <SelectItem value="Inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                                className="flex-1 bg-white border-white text-black hover:bg-gray-100"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                disabled={saving}
                                className="flex-1 bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500"
                            >
                                {saving ? 'Saving...' : 'Save Changes'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
