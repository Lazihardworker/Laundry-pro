'use client';

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Users, Package, DollarSign, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AdminNavigation } from '@/components/shared/navigation';
import { mockAdminData } from '@/lib/mock-data';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

export default function AdminDashboard() {
  const { overview, weeklyOrders, recentOrders, topStaff, alerts } = mockAdminData;

  const statusDistribution = [
    { name: 'Washing', value: 15, color: '#06b6d4' },
    { name: 'Ironing', value: 12, color: '#a855f7' },
    { name: 'Ready', value: 8, color: '#22c55e' },
    { name: 'Delivered', value: 9, color: '#10b981' },
    { name: 'Delayed', value: 3, color: '#ef4444' },
  ];

  const kpis = [
    {
      title: 'Today\'s Revenue',
      value: `₦${(overview.todayRevenue / 1000).toFixed(0)}K`,
      change: '+12%',
      positive: true,
      icon: DollarSign,
      color: 'blue',
    },
    {
      title: 'Today\'s Orders',
      value: overview.todayOrders.toString(),
      change: '+8%',
      positive: true,
      icon: Package,
      color: 'purple',
    },
    {
      title: 'On-Time Rate',
      value: `${overview.onTimeRate}%`,
      change: '-1.5%',
      positive: false,
      icon: Clock,
      color: 'green',
    },
    {
      title: 'Avg Rating',
      value: overview.averageRating.toString(),
      change: '0%',
      positive: true,
      icon: TrendingUp,
      color: 'amber',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <AdminNavigation />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-gray-400 mt-1">
                {new Date().toLocaleDateString('en-NG', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Badge className="px-4 py-2 bg-green-500/20 text-green-400 border-green-500/50">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 pulse-dot relative" />
                Live
              </Badge>
            </div>
          </div>
        </motion.div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700"
          >
            <div className="flex items-center gap-2 mb-3">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-white">Alerts</h3>
            </div>
            <div className="space-y-2">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      alert.type === 'warning'
                        ? 'bg-amber-400'
                        : alert.type === 'error'
                        ? 'bg-red-400'
                        : 'bg-blue-400'
                    }`}
                  />
                  <span className="text-gray-300">{alert.message}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* KPI Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {kpis.map((kpi, index) => (
            <motion.div
              key={kpi.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.05 }}
            >
              <Card className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        kpi.color === 'blue'
                          ? 'bg-blue-500/20'
                          : kpi.color === 'purple'
                          ? 'bg-purple-500/20'
                          : kpi.color === 'green'
                          ? 'bg-green-500/20'
                          : 'bg-amber-500/20'
                      }`}
                    >
                      <kpi.icon
                        className={`w-6 h-6 ${
                          kpi.color === 'blue'
                            ? 'text-blue-400'
                            : kpi.color === 'purple'
                            ? 'text-purple-400'
                            : kpi.color === 'green'
                            ? 'text-green-400'
                            : 'text-amber-400'
                        }`}
                      />
                    </div>
                    <div
                      className={`flex items-center gap-1 text-sm ${
                        kpi.positive ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {kpi.positive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      {kpi.change}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-1">{kpi.title}</p>
                  <p className="text-2xl font-bold text-white">{kpi.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Orders Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Orders This Week</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyOrders}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="day" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem',
                      }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="orders"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>

          {/* Status Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Order Status Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: '#1f2937',
                        border: '1px solid #374151',
                        borderRadius: '0.5rem',
                      }}
                      labelStyle={{ color: '#f3f4f6' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentOrders.map((order, index) => (
                    <motion.div
                      key={order.orderNumber}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.7 + index * 0.05 }}
                      className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                          <Package className="w-5 h-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{order.orderNumber}</p>
                          <p className="text-sm text-gray-400">{order.customerName}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <Badge
                          className={
                            order.status === 'WASHING'
                              ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/50'
                              : order.status === 'READY'
                              ? 'bg-green-500/20 text-green-400 border-green-500/50'
                              : 'bg-red-500/20 text-red-400 border-red-500/50'
                          }
                        >
                          {order.status}
                        </Badge>
                        <span className="text-sm text-gray-400">{order.items} items</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Top Staff */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Top Staff</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topStaff.map((staff, index) => (
                    <motion.div
                      key={staff.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 + index * 0.05 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                        {staff.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-white">{staff.name}</p>
                        <p className="text-sm text-gray-400">{staff.ordersCompleted} orders</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-white font-medium">{staff.rating}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
