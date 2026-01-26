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
const initialPackages = [
    {
        id: "team_1_month",
        name: "Team Invitation",
        duration: "1 Month",
        price: 4.99,
        status: "Active",
        type: "team_invitation"
    },
    {
        id: "team_3_months",
        name: "Team Invitation",
        duration: "3 Months",
        price: 12.99,
        status: "Active",
        type: "team_invitation"
    },
    {
        id: "team_6_months",
        name: "Team Invitation",
        duration: "6 Months",
        price: 22.99,
        status: "Active",
        type: "team_invitation"
    },
    {
        id: "team_12_months",
        name: "Team Invitation",
        duration: "12 Months",
        price: 39.99,
        status: "Best Value",
        type: "team_invitation"
    },
    {
        id: "custom_1_month",
        name: "Custom Email",
        duration: "1 Month",
        price: 7.99,
        status: "Active",
        type: "custom_email"
    },
    {
        id: "custom_3_months",
        name: "Custom Email",
        duration: "3 Months",
        price: 19.99,
        status: "Active",
        type: "custom_email"
    },
    {
        id: "custom_6_months",
        name: "Custom Email",
        duration: "6 Months",
        price: 34.99,
        status: "Active",
        type: "custom_email"
    },
    {
        id: "custom_12_months",
        name: "Custom Email",
        duration: "12 Months",
        price: 59.99,
        status: "Active",
        type: "custom_email"
    }
]

export default function PackagesPage() {
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
                            {initialPackages.map((pkg) => (
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
                                                <DropdownMenuItem className="focus:bg-white/5 focus:text-white" onClick={() => navigator.clipboard.writeText("https://canvapro.com/checkout?method=" + pkg.type + "&duration=" + pkg.id.split('_').slice(1).join('_'))}>
                                                    Copy Payment Link
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem className="focus:bg-white/5 focus:text-white">Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400">Delete</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
