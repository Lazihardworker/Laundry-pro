'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Search,
  Filter,
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { StaffNavigation } from '@/components/shared/navigation';

// Mock order data
const mockOrders = [
  {
    id: '1',
    orderNumber: 'FC-20250121-0047',
    customerName: 'John Doe',
    customerPhone: '+234 801 234 5678',
    status: 'WASHING',
    priority: 'normal',
    service: 'Express Service',
    items: [
      { name: 'Shirt', quantity: 3, price: 500 },
      { name: 'Trousers', quantity: 2, price: 500 },
      { name: 'Suit', quantity: 1, price: 2000 },
    ],
    pickupAddress: 'No 123, Example Street, Ikeja, Lagos',
    pickupDate: '2025-01-21',
    promisedBy: 'Today, 5:00 PM',
    totalAmount: 4500,
    notes: 'Handle with care - delicate fabric',
    hasIssue: false,
    createdAt: '2025-01-21 09:00',
  },
  {
    id: '2',
    orderNumber: 'FC-20250121-0046',
    customerName: 'Jane Smith',
    customerPhone: '+234 802 345 6789',
    status: 'PENDING',
    priority: 'high',
    service: 'Dry Cleaning',
    items: [
      { name: 'Dress', quantity: 2, price: 800 },
      { name: 'Jacket', quantity: 1, price: 1000 },
    ],
    pickupAddress: 'No 456, Another Street, Lekki, Lagos',
    pickupDate: '2025-01-21',
    promisedBy: 'Tomorrow, 12:00 PM',
    totalAmount: 2600,
    notes: '',
    hasIssue: false,
    createdAt: '2025-01-21 08:30',
  },
  {
    id: '3',
    orderNumber: 'FC-20250121-0045',
    customerName: 'Ahmed Ibrahim',
    customerPhone: '+234 803 456 7890',
    status: 'IRONING',
    priority: 'normal',
    service: 'Basic Wash & Iron',
    items: [
      { name: 'Native Wear', quantity: 5, price: 800 },
      { name: 'Bed Sheet', quantity: 2, price: 600 },
    ],
    pickupAddress: 'No 789, Main Road, VI, Lagos',
    pickupDate: '2025-01-20',
    promisedBy: 'Today, 2:00 PM',
    totalAmount: 5200,
    notes: '',
    hasIssue: false,
    createdAt: '2025-01-20 14:00',
  },
  {
    id: '4',
    orderNumber: 'FC-20250121-0044',
    customerName: 'Chioma Okafor',
    customerPhone: '+234 804 567 8901',
    status: 'READY',
    priority: 'normal',
    service: 'Express Service',
    items: [
      { name: 'Blouse', quantity: 3, price: 500 },
      { name: 'Skirt', quantity: 2, price: 500 },
    ],
    pickupAddress: 'No 321, Estate Road, Ajah, Lagos',
    pickupDate: '2025-01-20',
    promisedBy: 'Ready for pickup',
    totalAmount: 2500,
    notes: '',
    hasIssue: false,
    createdAt: '2025-01-20 10:00',
  },
];

export default function StaffOrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [issueNotes, setIssueNotes] = useState('');
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState('');

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-gray-100 text-gray-700 border-gray-200',
      RECEIVED: 'bg-blue-100 text-blue-700 border-blue-200',
      WASHING: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      IRONING: 'bg-purple-100 text-purple-700 border-purple-200',
      READY: 'bg-green-100 text-green-700 border-green-200',
      DELIVERED: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getPriorityColor = (priority: string) => {
    const colors: Record<string, string> = {
      normal: 'bg-gray-100 text-gray-700',
      high: 'bg-orange-100 text-orange-700',
      urgent: 'bg-red-100 text-red-700',
    };
    return colors[priority] || 'bg-gray-100';
  };

  const handleStatusUpdate = () => {
    // API call to update status
    console.log(`Updating order ${selectedOrder?.id} to ${selectedStatus}`);
    setUpdateDialogOpen(false);
  };

  const handleIssueReport = () => {
    // API call to report issue
    console.log(`Reporting issue for order ${selectedOrder?.id}: ${issueNotes}`);
    setIssueDialogOpen(false);
    setIssueNotes('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StaffNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Link href="/staff/dashboard">
              <Button variant="ghost" size="sm" className="touch-target">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
              <p className="text-gray-600">View and manage assigned orders</p>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by order number or customer name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-2"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="h-12 border-2 w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="washing">Washing</SelectItem>
                <SelectItem value="ironing">Ironing</SelectItem>
                <SelectItem value="ready">Ready</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="border-2">
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600">Try adjusting your search or filter</p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="border-2 hover:border-blue-200 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-bold text-gray-900">{order.orderNumber}</h3>
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          <Badge className={getPriorityColor(order.priority)}>{order.priority}</Badge>
                        </div>
                        <p className="text-gray-700 font-medium">{order.customerName}</p>
                        <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {order.customerPhone}
                          </span>
                          <span className="flex items-center gap-1">
                            <Package className="w-4 h-4" />
                            {order.items.length} items
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {order.promisedBy}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Total Amount</p>
                        <p className="text-2xl font-bold text-blue-600">
                          ₦{order.totalAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>

                    {/* Items */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {order.items.map((item, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {item.name} × {item.quantity}
                        </Badge>
                      ))}
                    </div>

                    {/* Notes */}
                    {order.notes && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-blue-900">{order.notes}</p>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap gap-3">
                      <Link href={`/staff/orders/${order.id}`} className="flex-1">
                        <Button className="w-full gradient-primary text-white interactive">
                          View Details
                          <ChevronRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>

                      <Dialog open={updateDialogOpen} onOpenChange={setUpdateDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-2 interactive"
                            onClick={() => {
                              setSelectedOrder(order);
                              setSelectedStatus(order.status);
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Update Status
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Order Status</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label>Order Number</Label>
                              <p className="font-medium">{selectedOrder?.orderNumber}</p>
                            </div>
                            <div>
                              <Label htmlFor="status">New Status</Label>
                              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                                <SelectTrigger id="status" className="h-12 border-2">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="PENDING">Pending</SelectItem>
                                  <SelectItem value="RECEIVED">Received</SelectItem>
                                  <SelectItem value="WASHING">Washing</SelectItem>
                                  <SelectItem value="IRONING">Ironing</SelectItem>
                                  <SelectItem value="READY">Ready</SelectItem>
                                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="notes">Notes (Optional)</Label>
                              <Textarea
                                id="notes"
                                placeholder="Add any notes about this update..."
                                className="mt-2"
                              />
                            </div>
                            <Button
                              className="w-full gradient-primary text-white interactive"
                              onClick={handleStatusUpdate}
                            >
                              Update Status
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            className="border-2 border-red-200 text-red-600 hover:bg-red-50 interactive"
                            onClick={() => setSelectedOrder(order)}
                          >
                            <AlertTriangle className="w-4 h-4 mr-2" />
                            Report Issue
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Report Issue</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <Label>Order Number</Label>
                              <p className="font-medium">{selectedOrder?.orderNumber}</p>
                            </div>
                            <div>
                              <Label htmlFor="issue-type">Issue Type</Label>
                              <Select>
                                <SelectTrigger id="issue-type" className="h-12 border-2 mt-2">
                                  <SelectValue placeholder="Select issue type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="damaged">Damaged Item</SelectItem>
                                  <SelectItem value="stain">Stain Not Removed</SelectItem>
                                  <SelectItem value="lost">Lost Item</SelectItem>
                                  <SelectItem value="delay">Delay Expected</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div>
                              <Label htmlFor="issue-notes">Description</Label>
                              <Textarea
                                id="issue-notes"
                                placeholder="Describe the issue in detail..."
                                value={issueNotes}
                                onChange={(e) => setIssueNotes(e.target.value)}
                                className="mt-2 min-h-[120px]"
                              />
                            </div>
                            <Button
                              className="w-full bg-red-600 hover:bg-red-700 text-white interactive"
                              onClick={handleIssueReport}
                            >
                              Submit Issue Report
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button
                        variant="outline"
                        className="border-2 interactive"
                        onClick={() => window.open(`tel:${order.customerPhone}`)}
                      >
                        <Phone className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
