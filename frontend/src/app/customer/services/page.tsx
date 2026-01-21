'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, DollarSign, Info, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SERVICE_TYPES, ITEMS_CATALOG } from '@/lib/constants';

export default function ServicesPage() {
  const services = Object.values(SERVICE_TYPES);
  const items = Object.values(ITEMS_CATALOG);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/customer">
              <div className="flex items-center gap-2 interactive">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">FC</span>
                </div>
                <span className="text-xl font-bold text-gray-900">FreshClean</span>
              </div>
            </Link>
            <Link href="/customer/new-order">
              <Button className="gradient-primary text-white shadow-lg interactive">
                Book Now
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Services & Pricing
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional laundry and dry cleaning services at competitive prices
          </p>
        </motion.div>

        {/* Service Types */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Categories</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`card-hover border-2 ${
                    service.id === 'express'
                      ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-white'
                      : 'hover:border-blue-200'
                  }`}
                >
                  <CardContent className="p-6">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{service.name}</h3>
                    <p className="text-gray-600 mb-4">{service.description}</p>
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <p className="text-sm text-gray-500">From</p>
                        <p className="text-2xl font-bold text-blue-600">
                          ₦{service.basePrice.toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={service.id === 'express' ? 'bg-amber-100 text-amber-700 border-amber-300' : ''}
                      >
                        {service.duration}
                      </Badge>
                    </div>
                    {service.id === 'express' && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-amber-700">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">Same-day service available</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Items Catalog */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Price List</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="card-hover border-2">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">{item.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {item.category.replace('_', ' ')}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-blue-600">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Info className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Additional Information
                  </h3>
                  <ul className="space-y-1 text-sm text-gray-700">
                    <li>• Minimum order: ₦1,000</li>
                    <li>• Express service attracts 50% surcharge</li>
                    <li>• Pickup & delivery: ₦500 within Lagos</li>
                    <li>• Corporate subscriptions available</li>
                    <li>• Special care for delicate fabrics</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 text-center"
        >
          <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Ready to Book?
              </h3>
              <p className="text-gray-600 mb-6">
                Schedule your pickup in just a few clicks
              </p>
              <Link href="/customer/new-order">
                <Button
                  size="lg"
                  className="gradient-primary text-white shadow-lg hover:shadow-xl transition-all interactive"
                >
                  Place Order Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
