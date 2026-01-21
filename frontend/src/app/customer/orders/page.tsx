'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CustomerNavigation } from '@/components/shared/navigation';
import { mockOrders } from '@/lib/mock-data';
import { ORDER_STATUSES } from '@/lib/constants';
import { useState } from 'react';

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch =
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

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

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavigation />

      <main className="lg:pl-64 pb-24 lg:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <Link href="/customer">
                <Button variant="ghost" size="icon" className="touch-target">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <div className="flex-1">
                <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>
                <p className="text-gray-600 text-sm mt-1">{mockOrders.length} total orders</p>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Search orders..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-11 border-2"
                />
              </div>

              <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
                {['all', 'WASHING', 'READY', 'DELIVERED'].map((status) => (
                  <Button
                    key={status}
                    variant={statusFilter === status ? 'default' : 'outline'}
                    onClick={() => setStatusFilter(status)}
                    className="whitespace-nowrap touch-target"
                  >
                    {status === 'all' ? 'All' : ORDER_STATUSES[status as keyof typeof ORDER_STATUSES]?.label}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Orders List */}
          <div className="space-y-4">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/customer/orders/${order.id}`}>
                  <Card className="card-hover border-2 cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        {/* Order Info */}
                        <div className="flex-1">
                          <div className="flex items-start gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                              <span className="text-white font-bold text-lg">
                                {order.items.length}
                              </span>
                            </div>

                            <div className="flex-1">
                              <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                                <h3 className="font-bold text-gray-900">{order.orderNumber}</h3>
                                <Badge className={getStatusColor(order.status) + ' w-fit'}>
                                  {ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES]?.label || order.status}
                                </Badge>
                              </div>

                              <div className="flex flex-wrap gap-3 text-sm text-gray-600">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <span>{new Date(order.createdAt).toLocaleDateString('en-NG')}</span>
                                </div>
                                <span>•</span>
                                <span>{order.items.length} items</span>
                                <span>•</span>
                                <span className="font-medium text-gray-900">₦{order.totalAmount.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex sm:flex-col items-center justify-between sm:justify-center gap-2">
                          <div className="text-sm text-gray-600">
                            {order.status === 'DELIVERED' ? 'Completed' : 'In Progress'}
                          </div>
                          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-600">→</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}

            {filteredOrders.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders found</h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery ? 'Try adjusting your search' : 'You have no orders yet'}
                </p>
                <Link href="/customer/new-order">
                  <Button className="gradient-primary text-white">
                    Place Your First Order
                  </Button>
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
