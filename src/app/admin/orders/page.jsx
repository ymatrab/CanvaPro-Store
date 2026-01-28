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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ChevronDown, MoreHorizontal, Search, ShoppingCart, Trash2 } from "lucide-react"

export default function OrdersPage() {
    const [orders, setOrders] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [searchTerm, setSearchTerm] = React.useState("");

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch('/api/orders');
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            setOrders(data || []);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
            setError(error.message || "Failed to fetch orders");
        } finally {
            setLoading(false);
        }
    };

    React.useEffect(() => {
        fetchOrders();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const response = await fetch(`/api/orders?id=${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (!response.ok) throw new Error('Failed to update status');
            fetchOrders();
        } catch (error) {
            console.error('Error updating status:', error);
            alert('Failed to update order status');
        }
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this order?')) {
            try {
                const response = await fetch(`/api/orders?id=${id}`, {
                    method: 'DELETE'
                });
                if (!response.ok) throw new Error('Failed to delete order');
                fetchOrders();
            } catch (error) {
                console.error('Error deleting order:', error);
                alert('Failed to delete order');
            }
        }
    };

    const filteredOrders = orders.filter(order =>
        order.customer_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customer_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getStatusColor = (status) => {
        switch (status) {
            case 'Completed': return 'bg-green-500/20 text-green-400 hover:bg-green-500/30';
            case 'Processing': return 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30';
            case 'Pending': return 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30';
            case 'Failed': return 'bg-red-500/20 text-red-400 hover:bg-red-500/30';
            case 'Refunded': return 'bg-purple-500/20 text-purple-400 hover:bg-purple-500/30';
            default: return 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30';
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
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:ring-violet-500"
                    />
                </div>
            </div>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white shadow-xl">
                <CardHeader>
                    <CardTitle className="text-xl">Recent Orders</CardTitle>
                    <CardDescription className="text-gray-400">
                        Manage your latest transactions. Click on status to change it.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-violet-500"></div>
                            <span className="ml-3 text-gray-400">Loading orders...</span>
                        </div>
                    ) : error ? (
                        <div className="text-center py-8">
                            <p className="text-red-400 mb-2">Error: {error}</p>
                            <Button onClick={fetchOrders} variant="outline" className="border-white/20 text-gray-300">
                                Retry
                            </Button>
                        </div>
                    ) : filteredOrders.length === 0 ? (
                        <div className="text-center py-8">
                            <ShoppingCart className="w-12 h-12 mx-auto text-gray-500 mb-3" />
                            <p className="text-gray-400 mb-2">No orders found</p>
                            <p className="text-gray-500 text-sm">Orders will appear here after customers complete checkout.</p>
                        </div>
                    ) : (
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
                                {filteredOrders.map((order) => (
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
                                            <Select
                                                value={order.status}
                                                onValueChange={(value) => handleStatusChange(order.id, value)}
                                            >
                                                <SelectTrigger className={`w-32 border-0 ${getStatusColor(order.status)}`}>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent className="bg-[#0f0f1a] border-white/10">
                                                    <SelectItem value="Pending">Pending</SelectItem>
                                                    <SelectItem value="Processing">Processing</SelectItem>
                                                    <SelectItem value="Completed">Completed</SelectItem>
                                                    <SelectItem value="Failed">Failed</SelectItem>
                                                    <SelectItem value="Refunded">Refunded</SelectItem>
                                                </SelectContent>
                                            </Select>
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
                                                    <DropdownMenuItem className="focus:bg-white/5 focus:text-white" onClick={() => navigator.clipboard.writeText(order.customer_email)}>
                                                        Copy Customer Email
                                                    </DropdownMenuItem>
                                                    <DropdownMenuSeparator className="bg-white/10" />
                                                    <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400" onClick={() => handleDelete(order.id)}>
                                                        <Trash2 className="w-4 h-4 mr-2" />
                                                        Delete Order
                                                    </DropdownMenuItem>
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
