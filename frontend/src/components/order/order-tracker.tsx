'use client';

import { motion } from 'framer-motion';
import { CheckCircle, Circle, Package, Clock, Truck } from 'lucide-react';
import { ORDER_STATUSES } from '@/lib/constants';

interface OrderTrackerProps {
  currentStatus: string;
}

export function OrderTracker({ currentStatus }: OrderTrackerProps) {
  const statusFlow = ['RECEIVED', 'WASHING', 'IRONING', 'READY', 'DELIVERED'];
  const currentIndex = statusFlow.indexOf(currentStatus as keyof typeof ORDER_STATUSES);

  const getIcon = (status: string, index: number) => {
    if (index < currentIndex) {
      return <CheckCircle className="w-6 h-6 text-green-500" />;
    } else if (index === currentIndex) {
      return <div className="relative">
        <div className="w-6 h-6 rounded-full border-2 border-blue-500 bg-blue-500 animate-pulse" />
        <div className="absolute inset-0 w-6 h-6 rounded-full border-2 border-blue-500 animate-ping opacity-75" />
      </div>;
    }
    return <Circle className="w-6 h-6 text-gray-300" />;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-gray-100">
      <h3 className="text-lg font-bold text-gray-900 mb-6">Order Progress</h3>

      <div className="relative">
        {/* Progress Line */}
        <div className="absolute top-6 left-6 right-6 h-0.5 bg-gray-200 -z-10">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / (statusFlow.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
          />
        </div>

        {/* Status Steps */}
        <div className="flex justify-between">
          {statusFlow.map((status, index) => {
            const statusInfo = ORDER_STATUSES[status as keyof typeof ORDER_STATUSES];
            return (
              <motion.div
                key={status}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center gap-2"
              >
                <div className="w-12 h-12 flex items-center justify-center">
                  {getIcon(status, index)}
                </div>
                <div className="text-center">
                  <p
                    className={`text-xs font-medium ${
                      index <= currentIndex ? 'text-gray-900' : 'text-gray-400'
                    }`}
                  >
                    {statusInfo?.label}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
