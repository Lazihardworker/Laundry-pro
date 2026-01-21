'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Package, Plus, MapPin, Clock, Bell, Wallet, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CustomerNavigation } from '@/components/shared/navigation';
import { mockOrders, mockUser } from '@/lib/mock-data';
import { ORDER_STATUSES } from '@/lib/constants';

export default function CustomerDashboard() {
  const activeOrders = mockOrders.filter((o) => !['DELIVERED', 'CANCELLED'].includes(o.status));
  const completedOrders = mockOrders.filter((o) => o.status === 'DELIVERED');

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

  const getStatusProgress = (status: string) => {
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
    <div className="min-h-screen bg-gray-50">
      <CustomerNavigation />

      <main className="lg:pl-64 pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  👋 Hello, {mockUser.firstName}!
                </h1>
                <p className="text-gray-600 mt-1">Ready to refresh your wardrobe?</p>
              </div>

              <Link href="/customer/new-order">
                <Button
                  size="lg"
                  className="gradient-primary text-white shadow-lg hover:shadow-xl transition-all interactive"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  New Order
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Active Orders</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{activeOrders.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Ready</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {activeOrders.filter((o) => o.status === 'READY').length}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{completedOrders.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-amber-200 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Wallet</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">₦2,500</p>
                  </div>
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-amber-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Active Orders Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Active Orders</h2>
              <Link href="/customer/orders">
                <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
                  View All →
                </Button>
              </Link>
            </div>

            <div className="space-y-4">
              {activeOrders.slice(0, 3).map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <Link href={`/customer/orders/${order.id}`}>
                    <Card className="card-hover border-2 cursor-pointer">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                          <div>
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-bold text-gray-900">{order.orderNumber}</h3>
                              <Badge className={getStatusColor(order.status)}>
                                {ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]?.label || order.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-gray-600">
                              {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                            </p>
                          </div>

                          <div className="text-right">
                            <p className="text-sm text-gray-600">Total</p>
                            <p className="text-xl font-bold text-gray-900">₦{order.totalAmount.toLocaleString()}</p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="mb-4">
                          <Progress value={getStatusProgress(order.status)} className="h-2" />
                        </div>

                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="w-4 h-4" />
                            <span>
                              Ready by {new Date(order.estimatedReady).toLocaleDateString('en-NG', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                            </span>
                          </div>

                          <Button variant="ghost" size="sm" className="text-blue-600">
                            <MapPin className="w-4 h-4 mr-1" />
                            Track
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            <Link href="/customer/new-order">
              <Card className="card-hover border-2 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Plus className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Place New Order</h3>
                      <p className="text-sm text-gray-600">Schedule a pickup</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/customer/track">
              <Card className="card-hover border-2 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Track Order</h3>
                      <p className="text-sm text-gray-600">Real-time updates</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>

            <Link href="/customer/profile">
              <Card className="card-hover border-2 cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Bell className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">Notifications</h3>
                      <p className="text-sm text-gray-600">View updates (2)</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
