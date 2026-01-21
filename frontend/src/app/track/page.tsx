'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  Search,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

export default function TrackOrderPage() {
  const [searched, setSearched] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');

  // Mock order data - in production, this would come from API
  const mockOrder = {
    orderNumber: 'FC-20250121-0047',
    status: 'WASHING',
    customerName: 'John Doe',
    items: [
      { name: 'Shirt', quantity: 3 },
      { name: 'Trousers', quantity: 2 },
      { name: 'Suit', quantity: 1 },
    ],
    pickupAddress: 'No 123, Example Street, Ikeja, Lagos',
    service: 'Express Service',
    estimatedReady: 'Today, 5:00 PM',
    totalAmount: 4500,
    timeline: [
      {
        status: 'PENDING',
        label: 'Order Placed',
        time: 'Jan 21, 9:00 AM',
        completed: true,
        icon: CheckCircle,
      },
      {
        status: 'RECEIVED',
        label: 'Received',
        time: 'Jan 21, 10:30 AM',
        completed: true,
        icon: Package,
      },
      {
        status: 'WASHING',
        label: 'Washing',
        time: 'In Progress',
        completed: true,
        current: true,
        icon: Clock,
      },
      {
        status: 'IRONING',
        label: 'Ironing',
        time: 'Pending',
        completed: false,
        icon: Package,
      },
      {
        status: 'READY',
        label: 'Ready for Pickup',
        time: 'Expected 5:00 PM',
        completed: false,
        icon: CheckCircle,
      },
    ],
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-gray-100 text-gray-700 border-gray-200',
      RECEIVED: 'bg-blue-50 text-blue-700 border-blue-200',
      WASHING: 'bg-cyan-50 text-cyan-700 border-cyan-200',
      IRONING: 'bg-purple-50 text-purple-700 border-purple-200',
      READY: 'bg-green-50 text-green-700 border-green-200',
      DELIVERED: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      CANCELLED: 'bg-red-50 text-red-700 border-red-200',
    };
    return colors[status] || 'bg-gray-100 text-gray-700';
  };

  const getProgressValue = (status: string) => {
    const progress: Record<string, number> = {
      PENDING: 10,
      RECEIVED: 25,
      WASHING: 50,
      IRONING: 75,
      READY: 90,
      DELIVERED: 100,
      CANCELLED: 0,
    };
    return progress[status] || 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/">
              <div className="flex items-center gap-2 interactive">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">FC</span>
                </div>
                <span className="text-xl font-bold text-gray-900">FreshClean</span>
              </div>
            </Link>
            <Link href="/auth/login">
              <Button variant="ghost">Staff Login</Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Track Your Order
            </h1>
            <p className="text-lg text-gray-600">
              Enter your order number to see real-time updates
            </p>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter order number (e.g., FC-20250121-0047)"
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                className="pl-12 pr-32 h-14 text-lg border-2 focus:border-blue-500"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && orderNumber) setSearched(true);
                }}
              />
              <Button
                className="absolute right-2 top-1/2 -translate-y-1/2 h-10 gradient-primary text-white interactive"
                onClick={() => setSearched(true)}
                disabled={!orderNumber}
              >
                Track
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Results */}
        {searched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Order Summary Card */}
            <Card className="border-2 shadow-lg">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {mockOrder.orderNumber}
                      </h2>
                      <Badge className={getStatusColor(mockOrder.status)}>
                        {mockOrder.status}
                      </Badge>
                    </div>
                    <p className="text-gray-600">{mockOrder.customerName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total Amount</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₦{mockOrder.totalAmount.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{getProgressValue(mockOrder.status)}%</span>
                  </div>
                  <Progress value={getProgressValue(mockOrder.status)} className="h-3" />
                </div>

                {/* Quick Info */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Items</p>
                      <p className="font-semibold text-gray-900">
                        {mockOrder.items.reduce((sum, item) => sum + item.quantity, 0)} items
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Ready By</p>
                      <p className="font-semibold text-gray-900">{mockOrder.estimatedReady}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Service</p>
                      <p className="font-semibold text-gray-900">{mockOrder.service}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card className="border-2 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Timeline</h3>
                <div className="space-y-0">
                  {mockOrder.timeline.map((step, index) => {
                    const Icon = step.icon;
                    const isLast = index === mockOrder.timeline.length - 1;

                    return (
                      <div key={step.status} className="relative">
                        {/* Connector Line */}
                        {!isLast && (
                          <div
                            className={`absolute left-6 top-12 w-0.5 h-full ${
                              step.completed ? 'bg-blue-500' : 'bg-gray-200'
                            }`}
                          />
                        )}

                        <div className="flex gap-4 pb-8">
                          <div
                            className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                              step.completed
                                ? 'bg-blue-500 text-white'
                                : step.current
                                ? 'bg-blue-100 text-blue-600 ring-4 ring-blue-50'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <div className="flex-1 pt-2">
                            <div className="flex items-center justify-between mb-1">
                              <h4
                                className={`font-semibold ${
                                  step.completed || step.current
                                    ? 'text-gray-900'
                                    : 'text-gray-500'
                                }`}
                              >
                                {step.label}
                              </h4>
                              <span
                                className={`text-sm ${
                                  step.completed || step.current
                                    ? 'text-gray-900'
                                    : 'text-gray-500'
                                }`}
                              >
                                {step.time}
                              </span>
                            </div>
                            {step.current && (
                              <span className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                                In Progress
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Items List */}
            <Card className="border-2 shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
                <div className="space-y-3">
                  {mockOrder.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="border-2 border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Need Help?</h3>
                    <p className="text-sm text-gray-600">
                      Contact our support team for assistance
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="gap-2 interactive">
                      <Phone className="w-4 h-4" />
                      Call Support
                    </Button>
                    <Button className="gradient-primary text-white interactive gap-2">
                      <Calendar className="w-4 h-4" />
                      Schedule Pickup
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
          >
            <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
            Back to Home
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
