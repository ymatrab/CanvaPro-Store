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
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { MoreHorizontal, Star, CheckCircle, XCircle } from "lucide-react"

import { getReviews, approveReview, hideReview, deleteReview } from '@/app/actions';

export default function ReviewsPage() {
    const [reviews, setReviews] = React.useState([]);

    const fetchReviews = async () => {
        try {
            const data = await getReviews();
            setReviews(data);
        } catch (error) {
            console.error("Failed to fetch reviews:", error);
        }
    };

    React.useEffect(() => {
        fetchReviews();
    }, []);

    const handleApprove = async (id) => {
        await approveReview(id);
        fetchReviews();
    };

    const handleHide = async (id) => {
        await hideReview(id);
        fetchReviews();
    };

    const handleDelete = async (id) => {
        if (confirm('Are you sure you want to delete this review?')) {
            await deleteReview(id);
            fetchReviews();
        }
    };

    return (
        <div className="flex-1 space-y-4 p-8 pt-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-white">Reviews</h2>
            </div>

            <Card className="bg-white/5 backdrop-blur-md border-white/10 text-white shadow-xl">
                <CardHeader>
                    <CardTitle className="text-xl">User Reviews</CardTitle>
                    <CardDescription className="text-gray-400">
                        Manage and moderate user testimonials.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="border-white/10 hover:bg-white/5">
                                <TableHead className="text-gray-400">User</TableHead>
                                <TableHead className="text-gray-400">Rating</TableHead>
                                <TableHead className="hidden md:table-cell text-gray-400">Comment</TableHead>
                                <TableHead className="text-gray-400">Date</TableHead>
                                <TableHead className="text-gray-400">Status</TableHead>
                                <TableHead className="text-right text-gray-400">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {reviews.map((review) => (
                                <TableRow key={review.id} className="border-white/10 hover:bg-white/5 transition-colors">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full overflow-hidden ring-2 ring-white/10">
                                                <img src={review.avatar} alt={review.name} className="h-full w-full object-cover" />
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-medium text-white">{review.name}</span>
                                                <span className="text-xs text-gray-400">{review.role}</span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center bg-amber-500/10 w-fit px-2 py-1 rounded-md">
                                            <span className="text-amber-400 font-bold mr-1">{review.rating}</span>
                                            <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell max-w-xs truncate text-gray-300" title={review.content}>
                                        "{review.content}"
                                    </TableCell>
                                    <TableCell className="text-gray-400">{review.date}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                review.status === "Approved" ? "default" :
                                                    review.status === "Pending" ? "secondary" : "destructive"
                                            }
                                            className={
                                                review.status === "Approved" ? "bg-green-500/20 text-green-400 hover:bg-green-500/30 border-0" :
                                                    review.status === "Pending" ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30 border-0" :
                                                        "bg-gray-500/20 text-gray-400 hover:bg-gray-500/30 border-0"
                                            }
                                        >
                                            {review.status}
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
                                                <DropdownMenuItem className="focus:bg-white/5 focus:text-white" onClick={() => handleApprove(review.id)}>
                                                    <CheckCircle className="mr-2 h-4 w-4 text-green-500" /> Approve
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="focus:bg-white/5 focus:text-white" onClick={() => handleHide(review.id)}>
                                                    <XCircle className="mr-2 h-4 w-4 text-red-500" /> Hide
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator className="bg-white/10" />
                                                <DropdownMenuItem className="text-red-400 focus:bg-red-500/10 focus:text-red-400" onClick={() => handleDelete(review.id)}>Delete</DropdownMenuItem>
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
