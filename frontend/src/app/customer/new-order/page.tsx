'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CustomerNavigation } from '@/components/shared/navigation';
import { SERVICE_TYPES, ITEMS_CATALOG, TIME_SLOTS } from '@/lib/constants';
import { useState } from 'react';

export default function NewOrderPage() {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');

  const totalItems = Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);
  const totalAmount = Object.entries(selectedItems).reduce(
    (sum, [itemId, qty]) => sum + (ITEMS_CATALOG[itemId as keyof typeof ITEMS_CATALOG]?.price || 0) * qty,
    0
  );

  const updateItemQuantity = (itemId: string, quantity: number) => {
    setSelectedItems((prev) => {
      if (quantity <= 0) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [itemId]: quantity };
    });
  };

  const steps = [
    { number: 1, title: 'Service', description: 'Choose service type' },
    { number: 2, title: 'Items', description: 'Add your items' },
    { number: 3, title: 'Schedule', description: 'Pickup details' },
    { number: 4, title: 'Review', description: 'Confirm order' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavigation />

      <main className="lg:pl-64 pb-24 lg:pb-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link href="/customer">
              <Button variant="ghost" size="sm" className="mb-4 touch-target">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </Link>

            <h1 className="text-2xl font-bold text-gray-900 mb-4">Create New Order</h1>

            {/* Progress Steps */}
            <div className="flex items-center justify-between overflow-x-auto pb-2">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center flex-1 min-w-[100px]">
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                        step >= s.number
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {step > s.number ? <Check className="w-5 h-5" /> : s.number}
                    </motion.div>
                    <p
                      className={`text-xs mt-2 font-medium text-center ${
                        step >= s.number ? 'text-blue-600' : 'text-gray-500'
                      }`}
                    >
                      {s.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-0.5 mx-2 transition-colors ${
                        step > s.number ? 'bg-blue-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Step 1: Select Service */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Select Service Type</h2>
              <div className="space-y-4">
                {Object.values(SERVICE_TYPES).map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <Card
                      onClick={() => setSelectedService(service.id)}
                      className={`cursor-pointer border-2 transition-all card-hover ${
                        selectedService === service.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'hover:border-blue-200'
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="text-5xl">{service.icon}</div>
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h3 className="text-lg font-bold text-gray-900">{service.name}</h3>
                                <p className="text-gray-600 text-sm">{service.description}</p>
                              </div>
                              {selectedService === service.id && (
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                  <Check className="w-4 h-4 text-white" />
                                </div>
                              )}
                            </div>
                            <div className="flex items-center gap-4 text-sm">
                              <Badge variant="secondary" className="text-xs">
                                From ₦{service.basePrice.toLocaleString()}/{service.unit}
                              </Badge>
                              <span className="text-gray-600">{service.duration}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <Button
                  size="lg"
                  onClick={() => setStep(2)}
                  disabled={!selectedService}
                  className="gradient-primary text-white interactive"
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Add Items */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Add Items</h2>
                {totalItems > 0 && (
                  <Badge variant="secondary" className="text-sm">
                    {totalItems} {totalItems === 1 ? 'item' : 'items'}
                  </Badge>
                )}
              </div>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                {Object.entries(ITEMS_CATALOG).map(([id, item]) => {
                  const quantity = selectedItems[id] || 0;
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: parseInt(id) * 0.02 }}
                    >
                      <Card
                        className={`border-2 transition-all ${
                          quantity > 0 ? 'border-blue-500 bg-blue-50' : 'hover:border-blue-200'
                        }`}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="text-3xl">{item.icon}</div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900">{item.name}</h3>
                              <p className="text-sm text-blue-600 font-medium">
                                ₦{item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateItemQuantity(id, quantity - 1)}
                              disabled={quantity === 0}
                              className="touch-target"
                            >
                              -
                            </Button>
                            <span className="w-12 text-center font-bold text-lg">{quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateItemQuantity(id, quantity + 1)}
                              className="touch-target"
                            >
                              +
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>

              {totalItems > 0 && (
                <Card className="bg-blue-50 border-2 border-blue-200 mb-6">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900">Estimated Total</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ₦{totalAmount.toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)} className="touch-target">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => setStep(3)}
                  disabled={totalItems === 0}
                  className="gradient-primary text-white interactive"
                >
                  Continue
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Schedule Pickup */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule Pickup</h2>

              <Card className="border-2 mb-6">
                <CardContent className="p-6 space-y-6">
                  {/* Date Selection */}
                  <div className="space-y-2">
                    <Label>Pickup Date</Label>
                    <Input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="h-12 border-2"
                    />
                  </div>

                  {/* Time Slot Selection */}
                  <div className="space-y-2">
                    <Label>Preferred Time Slot</Label>
                    <div className="grid grid-cols-2 gap-3">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedTimeSlot(slot.id)}
                          className={`p-4 rounded-xl border-2 text-left transition-all touch-target ${
                            selectedTimeSlot === slot.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-blue-200'
                          }`}
                        >
                          <p className="font-medium text-gray-900">{slot.label}</p>
                          <p className="text-sm text-gray-600">{slot.time}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Address */}
                  <div className="space-y-2">
                    <Label>Pickup Address</Label>
                    <Input
                      placeholder="Enter your address"
                      className="h-12 border-2"
                      defaultValue="15 Adeniran Ogunsanya, Surulere, Lagos"
                    />
                  </div>

                  {/* Special Notes */}
                  <div className="space-y-2">
                    <Label>Special Notes (Optional)</Label>
                    <textarea
                      placeholder="Any special instructions?"
                      className="w-full p-3 border-2 rounded-xl min-h-[100px] focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)} className="touch-target">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => setStep(4)}
                  disabled={!selectedDate || !selectedTimeSlot}
                  className="gradient-primary text-white interactive"
                >
                  Review Order
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Review & Confirm */}
          {step === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Review Your Order</h2>

              <Card className="border-2 mb-6">
                <CardContent className="p-6 space-y-6">
                  {/* Service Summary */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Service Type</p>
                    <p className="font-bold text-gray-900">
                      {SERVICE_TYPES[selectedService as keyof typeof SERVICE_TYPES]?.name}
                    </p>
                  </div>

                  {/* Items Summary */}
                  <div>
                    <p className="text-sm text-gray-600 mb-3">Items ({totalItems})</p>
                    <div className="space-y-2">
                      {Object.entries(selectedItems).map(([itemId, qty]) => {
                        const item = ITEMS_CATALOG[itemId as keyof typeof ITEMS_CATALOG];
                        return (
                          <div key={itemId} className="flex justify-between items-center">
                            <span>{item.icon} {item.name} × {qty}</span>
                            <span className="font-medium">₦{(item.price * qty).toLocaleString()}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-medium">₦{totalAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Delivery Fee</span>
                      <span className="font-medium">₦500</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-blue-600">₦{(totalAmount + 500).toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Pickup Details */}
                  <div>
                    <p className="text-sm text-gray-600 mb-2">Pickup Details</p>
                    <p className="font-medium text-gray-900">
                      {new Date(selectedDate).toLocaleDateString('en-NG', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="text-gray-900">
                      {TIME_SLOTS.find((s) => s.id === selectedTimeSlot)?.time}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)} className="touch-target">
                  <ArrowLeft className="mr-2 w-4 h-4" />
                  Back
                </Button>
                <Button
                  size="lg"
                  onClick={() => {/* Handle order submission */}}
                  className="gradient-primary text-white interactive"
                >
                  Confirm Order
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
