'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Phone, MessageCircle, Star, Calendar, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { CustomerNavigation } from '@/components/shared/navigation';
import { OrderTracker } from '@/components/order/order-tracker';
import { mockOrders } from '@/lib/mock-data';
import { ORDER_STATUSES, SERVICE_TYPES } from '@/lib/constants';
import { notFound } from 'next/navigation';

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const order = mockOrders.find((o) => o.id === params.id);

  if (!order) {
    notFound();
  }

  const statusInfo = ORDER_STATUSES[order.status as keyof typeof ORDER_STATUSES];

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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Link href="/customer/orders">
              <Button variant="ghost" size="sm" className="mb-4 touch-target">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Orders
              </Button>
            </Link>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{order.orderNumber}</h1>
                  <Badge className={getStatusColor(order.status) + ' text-sm'}>
                    {statusInfo?.icon} {statusInfo?.label}
                  </Badge>
                </div>
                <p className="text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString('en-NG', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="touch-target">
                  <Phone className="w-4 h-4 mr-2" />
                  Call
                </Button>
                <Button variant="outline" className="touch-target">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Order Tracker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6"
          >
            <OrderTracker currentStatus={order.status} />
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Items & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Items */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Items ({order.items.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {order.items.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                      >
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border-2">
                              <span className="text-2xl">👔</span>
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{item.name}</h4>
                              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-bold text-gray-900">₦{item.totalPrice.toLocaleString()}</p>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>

              {/* Pickup/Delivery Details */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      Pickup & Delivery
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Pickup Date & Time</p>
                        <p className="font-medium text-gray-900">
                          {new Date(order.pickupDate).toLocaleDateString('en-NG', {
                            weekday: 'short',
                            month: 'short',
                            day: 'numeric',
                          })}
                          , {order.pickupTimeSlot}
                        </p>
                      </div>
                    </div>

                    <Separator />

                    {order.isDelivery && order.deliveryDate && (
                      <>
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <Truck className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-gray-600 mb-1">Delivery Date & Time</p>
                            <p className="font-medium text-gray-900">
                              {new Date(order.deliveryDate).toLocaleDateString('en-NG', {
                                weekday: 'short',
                                month: 'short',
                                day: 'numeric',
                              })}
                              , {order.deliveryTimeSlot}
                            </p>
                          </div>
                        </div>
                        <Separator />
                      </>
                    )}

                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-600 mb-1">Address</p>
                        <p className="font-medium text-gray-900">{order.pickupAddress}</p>
                      </div>
                    </div>

                    {order.notes && (
                      <>
                        <Separator />
                        <div>
                          <p className="text-sm text-gray-600 mb-1">Special Notes</p>
                          <p className="text-gray-900">{order.notes}</p>
                        </div>
                      </>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Right Column - Summary */}
            <div className="space-y-6">
              {/* Pricing Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₦{order.subtotal.toLocaleString()}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Discount</span>
                        <span className="font-medium text-green-600">
                          -₦{order.discount.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">₦{order.deliveryFee.toLocaleString()}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-xl text-blue-600">
                        ₦{order.totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Estimated Completion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Clock className="w-6 h-6 text-blue-600" />
                      <p className="font-medium text-gray-900">Estimated Ready</p>
                    </div>
                    <p className="text-2xl font-bold text-gray-900 mb-1">
                      {new Date(order.estimatedReady).toLocaleDateString('en-NG', {
                        weekday: 'short',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-600">
                      {new Date(order.estimatedReady).toLocaleTimeString('en-NG', {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Rate Order (if delivered) */}
              {order.status === 'DELIVERED' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <Card className="border-2">
                    <CardContent className="p-6">
                      <p className="font-medium text-gray-900 mb-3">Rate this order</p>
                      <div className="flex gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map((rating) => (
                          <button
                            key={rating}
                            className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-yellow-100 hover:text-yellow-600 transition-colors touch-target"
                          >
                            <Star className="w-5 h-5" />
                          </button>
                        ))}
                      </div>
                      <Button className="w-full gradient-primary text-white">
                        Submit Review
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
