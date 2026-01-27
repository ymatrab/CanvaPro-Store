"use client"

import * as React from "react"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Mock data based on the checkout page
import { getPackages, deletePackage } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function PackagesPage() {
    const [packages, setPackages] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const router = useRouter();

    const fetchPackages = async () => {
        setLoading(true);
        setError(null);
        try {
            console.log("[PackagesPage] Fetching packages...");
            const data = await getPackages();
            console.log("[PackagesPage] Received data:", data);
            setPackages(data || []);
        } catch (error) {
            console.error("[PackagesPage] Failed to fetch packages:", error);
            setError(error.message || "Failed to fetch packages");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchPackages();
    }, []);

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this package?')) {
            await deletePackage(id);
            fetchPackages();
        }
    };
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-white mb-2">Packages</h2>
                    <p className="text-gray-400">
                        Manage your product packages and pricing.
                    </p>
                </div>
                <Button onClick={() => window.location.href = '/admin/packages/new'} className="bg-gradient-to-r from-violet-600 to-cyan-600 text-white hover:from-violet-500 hover:to-cyan-500 border-0 shadow-lg shadow-violet-500/20">
                    <Plus className="mr-2 h-4 w-4" /> Add Package
                </Button>
            </div>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white shadow-xl">
                <CardHeader>
                    <CardTitle className="text-xl">All Packages</CardTitle>
                    <CardDescription className="text-gray-400">
                        List of all available subscription packages.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
                            <span className="ml-3 text-gray-400">Loading packages...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <p className="text-red-400 mb-2">Error: {error}</p>
                            <Button onClick={fetchPackages} variant="outline" className="border-white/20 text-gray-300">
                                Retry
                            </Button>
                        </div>
                    ) : packages.length === 0 ? (
                        <div className="text-center py-8">
                            <Package className="w-12 h-12 mx-auto text-gray-500 mb-3" />
                            <p className="text-gray-400 mb-2">No packages found</p>
                            <p className="text-gray-500 text-sm">The database query returned 0 results. Check the browser console for more details.</p>
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow className="border-white/10 hover:bg-white/5">
                                    <TableHead className="text-gray-400">Name</TableHead>
                                    <TableHead className="text-gray-400">Type</TableHead>
                                    <TableHead className="text-gray-400">Duration</TableHead>
                                    <TableHead className="text-gray-400">Price</TableHead>
                                    <TableHead className="text-gray-400">Status</TableHead>
                                    <TableHead className="text-right text-gray-400">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {packages.map((pkg) => (
                                    <TableRow key={pkg.id} className="border-white/10 hover:bg-white/5 data-[state=selected]:bg-white/10 transition-colors">
                                        <TableCell className="font-medium text-white">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${pkg.type === 'team_invitation' ? 'bg-violet-500/20 text-violet-300' : 'bg-cyan-500/20 text-cyan-300'}`}>
                                                    <Package className="w-4 h-4" />
                                                </div>
                                                {pkg.name}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="border-white/20 text-gray-300">{pkg.type.replace('_', ' ')}</Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-300">{pkg.duration}</TableCell>
                                        <TableCell className="text-white font-semibold">${pkg.price}</TableCell>
                                        <TableCell>
                                            <Badge variant={pkg.status === "Best Value" ? "default" : "secondary"}
                                                className={pkg.status === "Best Value" ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0" : "bg-white/10 text-gray-300 hover:bg-white/20"}>
                                                {pkg.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-white/10">
                                                        <span className="sr-only">Open menu</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="bg-[#0f0f1a] border-white/10 text-white">
                                                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                    <DropdownMenuItem className="focus:bg-white/5 focus:text-white" onClick={() => navigator.clipboard.writeText("https://canvapro.com/checkout?method=" + pkg.type + "&duration=" + pkg.duration)}>
                                                        Copy Checkout Link
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/10" />
                                                    <DropdownMenuItem className="focus:bg-white/5 focus:text-white">Edit</DropdownMenuItem>
                                                    <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400" onClick={() => handleDelete(pkg.id)}>Delete</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    )
}
