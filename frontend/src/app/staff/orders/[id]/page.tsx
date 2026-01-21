'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Package,
  Clock,
  CheckCircle,
  AlertTriangle,
  Phone,
  MessageCircle,
  MapPin,
  Calendar,
  User,
  DollarSign,
  Edit,
  Camera,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { StaffNavigation } from '@/components/shared/navigation';

export default function StaffOrderDetailPage({ params }: { params: { id: string } }) {
  const [selectedStatus, setSelectedStatus] = useState('WASHING');
  const [internalNotes, setInternalNotes] = useState('');
  const [issueDialogOpen, setIssueDialogOpen] = useState(false);
  const [issueType, setIssueType] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  // Mock order data
  const order = {
    id: '1',
    orderNumber: 'FC-20250121-0047',
    status: 'WASHING',
    priority: 'normal',
    service: 'Express Service',
    customer: {
      name: 'John Doe',
      phone: '+234 801 234 5678',
      email: 'john.doe@example.com',
    },
    pickup: {
      address: 'No 123, Example Street, Ikeja, Lagos',
      scheduled: '2025-01-21 10:00 AM',
      completed: '2025-01-21 10:30 AM',
    },
    delivery: {
      address: 'No 123, Example Street, Ikeja, Lagos',
      scheduled: '2025-01-21 5:00 PM',
    },
    promisedBy: 'Today, 5:00 PM',
    items: [
      { id: '1', name: 'Shirt', quantity: 3, unitPrice: 500, color: 'White', brand: 'Guaranty', notes: 'Handle with care' },
      { id: '2', name: 'Trousers', quantity: 2, unitPrice: 500, color: 'Black', brand: '', notes: '' },
      { id: '3', name: 'Suit (2-piece)', quantity: 1, unitPrice: 2000, color: 'Navy Blue', brand: 'Armani', notes: 'Premium fabric - extra care needed' },
    ],
    pricing: {
      subtotal: 4500,
      deliveryFee: 500,
      expressFee: 0,
      discount: 0,
      total: 5000,
    },
    notes: 'Customer prefers light starch on shirts',
    internalNotes: 'Customer is a VIP - ensure premium service',
    createdAt: '2025-01-21 09:00 AM',
    history: [
      { status: 'PENDING', time: '2025-01-21 09:00 AM', note: 'Order placed', actor: 'System' },
      { status: 'RECEIVED', time: '2025-01-21 10:30 AM', note: 'Items received from customer', actor: 'Emeka Staff' },
      { status: 'WASHING', time: '2025-01-21 11:00 AM', note: 'Started washing process', actor: 'You' },
    ],
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-gray-100 text-gray-700',
      RECEIVED: 'bg-blue-100 text-blue-700',
      WASHING: 'bg-cyan-100 text-cyan-700',
      IRONING: 'bg-purple-100 text-purple-700',
      READY: 'bg-green-100 text-green-700',
      DELIVERED: 'bg-emerald-100 text-emerald-700',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const handleStatusUpdate = () => {
    console.log('Updating status to:', selectedStatus);
    // API call to update status
  };

  const handleIssueReport = () => {
    console.log('Reporting issue:', { type: issueType, description: issueDescription });
    // API call to report issue
    setIssueDialogOpen(false);
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
          <Link href="/staff/orders">
            <Button variant="ghost" size="sm" className="mb-4 touch-target">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">{order.orderNumber}</h1>
                <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                <Badge variant="outline">{order.priority}</Badge>
              </div>
              <p className="text-gray-600">
                {order.service} • Created {order.createdAt}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-2 interactive"
                onClick={() => window.open(`tel:${order.customer.phone}`)}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Customer
              </Button>
              <Dialog open={issueDialogOpen} onOpenChange={setIssueDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="border-2 border-red-200 text-red-600 hover:bg-red-50 interactive">
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
                      <Label>Issue Type</Label>
                      <Select value={issueType} onValueChange={setIssueType}>
                        <SelectTrigger className="h-12 border-2 mt-2">
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
                      <Label htmlFor="issue-desc">Description</Label>
                      <Textarea
                        id="issue-desc"
                        placeholder="Describe the issue in detail..."
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        className="mt-2 min-h-[120px]"
                      />
                    </div>
                    <div>
                      <Label>Attach Photos (Optional)</Label>
                      <div className="mt-2 flex items-center gap-3">
                        <Button variant="outline" className="gap-2">
                          <Camera className="w-4 h-4" />
                          Take Photo
                        </Button>
                        <span className="text-sm text-gray-600">or drag and drop</span>
                      </div>
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
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Customer & Delivery Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Customer & Delivery Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Customer</p>
                      <p className="font-medium">{order.customer.name}</p>
                      <p className="text-sm text-gray-700">{order.customer.phone}</p>
                      <p className="text-sm text-gray-700">{order.customer.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Pickup Address</p>
                      <p className="text-gray-900">{order.pickup.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Scheduled Pickup</p>
                      <p className="text-gray-900">{order.pickup.scheduled}</p>
                      <p className="text-sm text-green-600 flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Completed at {order.pickup.completed}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Delivery Deadline</p>
                      <p className="text-gray-900 font-medium">{order.delivery.scheduled}</p>
                      <p className="text-sm text-gray-700">{order.delivery.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Items */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Items ({order.items.length})
                  </h3>
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={item.id} className="border-2 rounded-xl p-4 hover:border-blue-200 transition-colors">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h4 className="font-semibold text-gray-900">{item.name}</h4>
                              <Badge variant="outline" className="text-xs">Qty: {item.quantity}</Badge>
                            </div>
                            <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                              <span>Color: {item.color || 'N/A'}</span>
                              {item.brand && <span>Brand: {item.brand}</span>}
                            </div>
                          </div>
                          <p className="text-lg font-bold text-blue-600">
                            ₦{(item.unitPrice * item.quantity).toLocaleString()}
                          </p>
                        </div>
                        {item.notes && (
                          <div className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-sm text-amber-900">
                            💡 {item.notes}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Order History */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Order History
                  </h3>
                  <div className="space-y-4">
                    {order.history.map((entry, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className={`w-3 h-3 rounded-full ${
                            index === order.history.length - 1 ? 'bg-blue-600' : 'bg-gray-300'
                          }`} />
                          {index < order.history.length - 1 && (
                            <div className="w-0.5 flex-1 bg-gray-200 min-h-[60px]" />
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <Badge className={getStatusColor(entry.status)}>{entry.status}</Badge>
                              <p className="font-medium text-gray-900 mt-1">{entry.note}</p>
                            </div>
                            <span className="text-sm text-gray-600">{entry.time}</span>
                          </div>
                          <p className="text-sm text-gray-500">by {entry.actor}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Update Status */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="border-2 border-blue-200">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Update Order Status</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="status">Current Status</Label>
                      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                        <SelectTrigger id="status" className="h-12 border-2 mt-2">
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
                      <Label htmlFor="notes">Internal Notes</Label>
                      <Textarea
                        id="notes"
                        placeholder="Add notes for other staff members..."
                        value={internalNotes}
                        onChange={(e) => setInternalNotes(e.target.value)}
                        className="mt-2 min-h-[100px]"
                      />
                    </div>
                    <Button
                      className="w-full gradient-primary text-white interactive"
                      onClick={handleStatusUpdate}
                    >
                      Update Status
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Pricing */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Pricing Breakdown
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₦{order.pricing.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">₦{order.pricing.deliveryFee.toLocaleString()}</span>
                    </div>
                    {order.pricing.expressFee > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Express Fee</span>
                        <span className="font-medium">₦{order.pricing.expressFee.toLocaleString()}</span>
                      </div>
                    )}
                    {order.pricing.discount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">-₦{order.pricing.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t pt-3 flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="text-xl font-bold text-blue-600">
                        ₦{order.pricing.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Notes */}
            {order.notes && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-2 border-blue-200 bg-blue-50">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-blue-900 mb-1">Customer Notes</p>
                    <p className="text-sm text-blue-800">{order.notes}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {order.internalNotes && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-2 border-purple-200 bg-purple-50">
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-purple-900 mb-1">Internal Notes</p>
                    <p className="text-sm text-purple-800">{order.internalNotes}</p>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
