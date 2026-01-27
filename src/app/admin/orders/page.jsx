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
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { ChevronDown, MoreHorizontal, Search, ShoppingCart } from "lucide-react"

import { getOrders, refundOrder } from '@/app/actions';

export default function OrdersPage() {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const data = await getOrders();
                setOrders(data);
            } catch (error) {
                console.error("Failed to fetch orders:", error);
            }
        };
        fetchOrders();
    }, []);

    const handleRefund = async (id) => {
        if (confirm('Are you sure you want to refund this order?')) {
            await refundOrder(id);
            // Refresh orders
            const data = await getOrders();
            setOrders(data);
        }
    };
    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Orders</h2>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                        Export
                    </Button>
                </div>
            </div>

            <div className="flex items-center py-4 gap-4">
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Filter orders..."
                        className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-violet-500"
                    />
                </div>
                <div className="ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                                Status <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#0f0f1a] border-white/10 text-white">
                            <DropdownMenuCheckboxItem checked className="focus:bg-white/5 focus:text-white">Completed</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked className="focus:bg-white/5 focus:text-white">Processing</DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem checked className="focus:bg-white/5 focus:text-white">Failed</DropdownMenuCheckboxItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white shadow-xl">
                <CardHeader>
                    <CardTitle className="text-xl">Recent Orders</CardTitle>
                    <CardDescription className="text-gray-400">
                        Manage your latest transactions.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10 hover:bg-white/5">
                                <TableHead className="text-gray-400">Order ID</TableHead>
                                <TableHead className="text-gray-400">Customer</TableHead>
                                <TableHead className="hidden md:table-cell text-gray-400">Package</TableHead>
                                <TableHead className="hidden md:table-cell text-gray-400">Date</TableHead>
                                <TableHead className="text-gray-400">Amount</TableHead>
                                <TableHead className="text-gray-400">Status</TableHead>
                                <TableHead className="text-right text-gray-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.id} className="border-white/10 hover:bg-white/5 transition-colors">
                                    <TableCell className="font-medium text-violet-300">{order.id}</TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="text-white font-medium">{order.customer_name}</span>
                                            <span className="text-xs text-gray-400">{order.customer_email}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-gray-300">
                                        <div className="flex items-center gap-2">
                                            <ShoppingCart className="w-3 h-3 text-gray-500" />
                                            {order.package_name}
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-gray-400">{order.date}</TableCell>
                                    <TableCell className="text-white font-semibold">${order.amount}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                order.status === "Completed" ? "default" :
                                                    order.status === "Processing" ? "secondary" : "destructive"
                                            }
                                            className={
                                                order.status === "Completed" ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0" :
                                                    order.status === "Processing" ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-0" :
                                                        "bg-red-500/20 text-red-400 hover:bg-red-500/30 border-0"
                                            }
                                        >
                                            {order.status}
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
                                                <DropdownMenuItem className="focus:bg-white/5 focus:text-white" onClick={() => navigator.clipboard.writeText(order.id)}>
                                                    Copy Order ID
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem className="focus:bg-white/5 focus:text-white">View Details</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400" onClick={() => handleRefund(order.id)}>Refund Order</DropdownMenuItem>
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
