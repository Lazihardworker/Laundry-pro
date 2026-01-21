'use client';

import { motion } from 'framer-motion';
import { Package, Clock, CheckCircle, AlertTriangle, Phone, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { StaffNavigation } from '@/components/shared/navigation';
import { mockStaffTasks, mockStaffUser } from '@/lib/mock-data';

export default function StaffDashboard() {
  const tasksByStatus = {
    pending: mockStaffTasks.filter((t) => t.status === 'PENDING'),
    inProgress: mockStaffTasks.filter((t) => !['READY', 'DELIVERED'].includes(t.status)),
    ready: mockStaffTasks.filter((t) => t.status === 'READY'),
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      PENDING: 'bg-gray-100 text-gray-700 border-gray-200',
      RECEIVED: 'bg-blue-100 text-blue-700 border-blue-200',
      WASHING: 'bg-cyan-100 text-cyan-700 border-cyan-200',
      IRONING: 'bg-purple-100 text-purple-700 border-purple-200',
      READY: 'bg-green-100 text-green-700 border-green-200',
      DELAYED: 'bg-red-100 text-red-700 border-red-200',
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Good morning, {mockStaffUser.firstName}! 👋
              </h1>
              <p className="text-gray-600 mt-1">{mockStaffUser.branchName} • {new Date().toLocaleDateString('en-NG', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
            </div>

            <div className="flex items-center gap-3">
              <Badge variant="outline" className="px-4 py-2 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                On the clock
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Card className="border-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Today's Tasks</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{mockStaffTasks.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">In Progress</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {tasksByStatus.inProgress.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-cyan-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Ready</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {tasksByStatus.ready.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">
                    {mockStaffUser.ordersCompleted}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tasks Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Pending Tasks */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">To Do</h2>
              <Badge variant="secondary">{tasksByStatus.pending.length}</Badge>
            </div>

            <div className="space-y-3">
              {tasksByStatus.pending.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <Card className="card-hover border-2 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{task.orderNumber}</h3>
                          <p className="text-sm text-gray-600">{task.customerName}</p>
                        </div>
                        <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {task.items.map((item, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {item.name} × {item.quantity}
                          </Badge>
                        ))}
                      </div>

                      {task.notes && (
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-sm text-yellow-800">
                          💡 {task.notes}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* In Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">In Progress</h2>
              <Badge variant="secondary">{tasksByStatus.inProgress.length}</Badge>
            </div>

            <div className="space-y-3">
              {tasksByStatus.inProgress.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                >
                  <Card
                    className={`card-hover border-2 cursor-pointer ${
                      task.hasIssue ? 'border-red-300 bg-red-50' : ''
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-bold text-gray-900">{task.orderNumber}</h3>
                          <p className="text-sm text-gray-600">{task.customerName}</p>
                        </div>
                        <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {task.items.map((item, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {item.name} × {item.quantity}
                          </Badge>
                        ))}
                      </div>

                      {task.hasIssue && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-sm text-red-800 flex items-start gap-2">
                          <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          <span>{task.notes}</span>
                        </div>
                      )}

                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700 interactive">
                          Update Status
                        </Button>
                        <Button size="sm" variant="outline" className="touch-target">
                          <Phone className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="outline" className="touch-target">
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ready for Delivery */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Ready</h2>
              <Badge variant="secondary">{tasksByStatus.ready.length}</Badge>
            </div>

            <div className="space-y-3">
              {tasksByStatus.ready.map((task, index) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                >
                  <Card className="card-hover border-2 border-green-200 bg-green-50 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-gray-900">{task.orderNumber}</h3>
                            <Badge className="bg-green-100 text-green-700">✓ Ready</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{task.customerName}</p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {task.items.map((item, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {item.name} × {item.quantity}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-green-600 hover:bg-green-700 interactive">
                          Mark Delivered
                        </Button>
                        <Button size="sm" variant="outline" className="touch-target">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
