'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  Users,
  Clock,
  Star,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
  Area,
  AreaChart,
} from 'recharts';

// Mock analytics data
const revenueData = [
  { month: 'Jan', revenue: 850000, orders: 180 },
  { month: 'Feb', revenue: 920000, orders: 195 },
  { month: 'Mar', revenue: 980000, orders: 210 },
  { month: 'Apr', revenue: 1050000, orders: 225 },
  { month: 'May', revenue: 1120000, orders: 240 },
  { month: 'Jun', revenue: 1200000, orders: 260 },
];

const orderStatusData = [
  { name: 'Delivered', value: 450, color: '#10b981' },
  { name: 'Ready', value: 85, color: '#22c55e' },
  { name: 'Washing', value: 120, color: '#06b6d4' },
  { name: 'Ironing', value: 95, color: '#a855f7' },
  { name: 'Pending', value: 45, color: '#94a3b8' },
];

const serviceRevenueData = [
  { name: 'Basic Wash', value: 350000, color: '#3b82f6' },
  { name: 'Dry Clean', value: 420000, color: '#8b5cf6' },
  { name: 'Express', value: 280000, color: '#f59e0b' },
  { name: 'Corporate', value: 150000, color: '#10b981' },
];

const branchPerformanceData = [
  { name: 'Ikeja', revenue: 450000, orders: 180, rating: 4.8 },
  { name: 'Lekki', revenue: 380000, orders: 145, rating: 4.6 },
  { name: 'VI', revenue: 620000, orders: 210, rating: 4.9 },
  { name: 'Abuja', revenue: 0, orders: 0, rating: 0 },
];

const topStaffData = [
  { name: 'Emeka Okonkwo', orders: 245, rating: 4.8, branch: 'Ikeja' },
  { name: 'Chioma Nwosu', orders: 198, rating: 4.7, branch: 'Lekki' },
  { name: 'Tunde Bakare', orders: 187, rating: 4.6, branch: 'VI' },
  { name: 'Fatima Mohammed', orders: 156, rating: 4.5, branch: 'Ikeja' },
];

export default function AdminReportsPage() {
  const [timeRange, setTimeRange] = useState('6m');
  const [reportType, setReportType] = useState('overview');

  const kpis = [
    {
      title: 'Total Revenue',
      value: '₦1.2M',
      change: '+15%',
      positive: true,
      icon: DollarSign,
      color: 'green',
    },
    {
      title: 'Total Orders',
      value: '260',
      change: '+12%',
      positive: true,
      icon: Package,
      color: 'blue',
    },
    {
      title: 'Avg. Rating',
      value: '4.7',
      change: '+0.2',
      positive: true,
      icon: Star,
      color: 'yellow',
    },
    {
      title: 'On-Time Rate',
      value: '94%',
      change: '-2%',
      positive: false,
      icon: Clock,
      color: 'purple',
    },
  ];

  const exportReport = () => {
    console.log('Exporting report...');
    // API call to export report
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Link href="/admin/dashboard">
          <Button variant="ghost" size="sm" className="mb-4 text-gray-400 hover:text-white touch-target">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Button>
        </Link>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
            <p className="text-gray-400 mt-1">Comprehensive business insights</p>
          </div>

          <div className="flex items-center gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="h-11 border-gray-700 bg-gray-800 text-white w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1m">Last Month</SelectItem>
                <SelectItem value="3m">Last 3 Months</SelectItem>
                <SelectItem value="6m">Last 6 Months</SelectItem>
                <SelectItem value="1y">Last Year</SelectItem>
              </SelectContent>
            </Select>
            <Button className="bg-blue-600 hover:bg-blue-700 interactive gap-2" onClick={exportReport}>
              <Download className="w-4 h-4" />
              Export
            </Button>
          </div>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {kpis.map((kpi, index) => (
          <motion.div
            key={kpi.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      kpi.color === 'green'
                        ? 'bg-green-500/20'
                        : kpi.color === 'blue'
                        ? 'bg-blue-500/20'
                        : kpi.color === 'yellow'
                        ? 'bg-yellow-500/20'
                        : 'bg-purple-500/20'
                    }`}
                  >
                    <kpi.icon
                      className={`w-6 h-6 ${
                        kpi.color === 'green'
                          ? 'text-green-400'
                          : kpi.color === 'blue'
                          ? 'text-blue-400'
                          : kpi.color === 'yellow'
                          ? 'text-yellow-400'
                          : 'text-purple-400'
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
        {/* Revenue Trend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Revenue Trend</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: '#f3f4f6' }}
                    formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Order Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Order Status Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
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

        {/* Service Revenue Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Revenue by Service</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={serviceRevenueData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`} />
                  <YAxis type="category" dataKey="name" stroke="#9ca3af" width={100} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: '#f3f4f6' }}
                    formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Revenue']}
                  />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {serviceRevenueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Branch Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Branch Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={branchPerformanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" tickFormatter={(value) => `₦${(value / 1000).toFixed(0)}K`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1f2937',
                      border: '1px solid #374151',
                      borderRadius: '0.5rem',
                    }}
                    labelStyle={{ color: '#f3f4f6' }}
                    formatter={(value: number, name: string) => [
                      name === 'revenue' ? `₦${value.toLocaleString()}` : value,
                      name === 'revenue' ? 'Revenue' : name === 'orders' ? 'Orders' : 'Rating',
                    ]}
                  />
                  <Legend />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Revenue" />
                  <Bar dataKey="orders" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Top Staff & Summary Tables */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Top Staff */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Top Performing Staff</h3>
              <div className="space-y-4">
                {topStaffData.map((staff, index) => (
                  <div
                    key={staff.name}
                    className="flex items-center gap-4 p-4 bg-gray-700/50 rounded-xl hover:bg-gray-700 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-white">{staff.name}</p>
                      <p className="text-sm text-gray-500">{staff.branch}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-medium">{staff.orders} orders</p>
                      <p className="text-sm text-yellow-400 flex items-center justify-end gap-1">
                        <Star className="w-3 h-3 fill-current" />
                        {staff.rating}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-6">Monthly Summary</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Total Revenue</p>
                      <p className="text-sm text-gray-500">All branches</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-green-400">₦1.2M</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Package className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Orders Completed</p>
                      <p className="text-sm text-gray-500">This month</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-blue-400">795</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">New Customers</p>
                      <p className="text-sm text-gray-500">This month</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-purple-400">48</p>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Customer Satisfaction</p>
                      <p className="text-sm text-gray-500">Average rating</p>
                    </div>
                  </div>
                  <p className="text-xl font-bold text-yellow-400">4.7/5.0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
