'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  User,
  MapPin,
  Bell,
  CreditCard,
  Shield,
  LogOut,
  ChevronRight,
  Phone,
  Mail,
  Edit,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function ProfilePage() {
  const [editing, setEditing] = useState(false);
  const [notifications, setNotifications] = useState({
    sms: true,
    email: true,
    whatsapp: false,
  });

  // Mock user data
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    phone: '+234 801 234 5678',
    email: 'john.doe@example.com',
    address: {
      street: 'No 123, Example Street',
      city: 'Ikeja',
      state: 'Lagos',
      instructions: 'Gate will be open. Call upon arrival.',
    },
    memberSince: 'January 2024',
    totalOrders: 24,
    loyaltyPoints: 1200,
  };

  const notificationPreferences = [
    { id: 'sms', label: 'SMS Notifications', description: 'Get updates via text message' },
    { id: 'email', label: 'Email Updates', description: 'Receive order confirmations' },
    { id: 'whatsapp', label: 'WhatsApp Messages', description: 'Quick updates on WhatsApp' },
  ];

  const menuItems = [
    {
      icon: MapPin,
      title: 'Saved Addresses',
      description: 'Manage your pickup and delivery addresses',
      href: '/customer/addresses',
      color: 'blue',
    },
    {
      icon: CreditCard,
      title: 'Payment Methods',
      description: 'Add or remove payment options',
      href: '/customer/payment',
      color: 'green',
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Configure your notification preferences',
      href: '/customer/settings',
      color: 'purple',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'Password and authentication settings',
      href: '/customer/security',
      color: 'amber',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      amber: 'bg-amber-100 text-amber-600',
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

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
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <Avatar className="w-24 h-24 border-4 border-white shadow-lg">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-blue-600 text-white text-3xl font-bold">
                    {user.firstName[0]}
                    {user.lastName[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900">
                        {user.firstName} {user.lastName}
                      </h1>
                      <p className="text-gray-600">Member since {user.memberSince}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 interactive"
                      onClick={() => setEditing(!editing)}
                    >
                      <Edit className="w-4 h-4" />
                      {editing ? 'Cancel' : 'Edit Profile'}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-4 mt-3">
                    <Badge variant="outline" className="gap-1">
                      <Phone className="w-3 h-3" />
                      {user.phone}
                    </Badge>
                    <Badge variant="outline" className="gap-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">{user.totalOrders}</p>
                    <p className="text-sm text-gray-600">Orders</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">{user.loyaltyPoints}</p>
                    <p className="text-sm text-gray-600">Points</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {editing && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8"
          >
            <Card className="border-2 border-blue-200">
              <CardContent className="p-6 space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="editFirstName">First Name</Label>
                    <Input
                      id="editFirstName"
                      defaultValue={user.firstName}
                      className="h-11 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="editLastName">Last Name</Label>
                    <Input
                      id="editLastName"
                      defaultValue={user.lastName}
                      className="h-11 border-2"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editPhone">Phone Number</Label>
                  <Input
                    id="editPhone"
                    type="tel"
                    defaultValue={user.phone}
                    className="h-11 border-2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    defaultValue={user.email}
                    className="h-11 border-2"
                  />
                </div>
                <Button className="gradient-primary text-white interactive">
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Address Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">Default Address</h3>
                  <p className="text-gray-700">{user.address.street}</p>
                  <p className="text-gray-700">
                    {user.address.city}, {user.address.state}
                  </p>
                  {user.address.instructions && (
                    <p className="text-sm text-gray-600 mt-2">
                      <span className="font-medium">Instructions:</span>{' '}
                      {user.address.instructions}
                    </p>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="gap-2 interactive">
                  <Edit className="w-4 h-4" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Link href={item.href}>
                  <Card className="card-hover border-2 cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 ${getColorClasses(item.color)} rounded-xl flex items-center justify-center`}>
                          <item.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Notification Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-6"
        >
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Notification Preferences</h3>
                  <p className="text-sm text-gray-600">Choose how you want to receive updates</p>
                </div>
              </div>

              <div className="space-y-4">
                {notificationPreferences.map((pref) => (
                  <div
                    key={pref.id}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{pref.label}</p>
                      <p className="text-sm text-gray-600">{pref.description}</p>
                    </div>
                    <Checkbox
                      checked={notifications[pref.id as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications((prev) => ({
                          ...prev,
                          [pref.id]: checked as boolean,
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Button
            variant="outline"
            className="w-full border-red-200 text-red-600 hover:bg-red-50 interactive"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sign Out
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
