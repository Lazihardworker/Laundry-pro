'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Search,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const nigeriaStates = [
  'Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City',
  'Kaduna', 'Aba', 'Jos', 'Ilorin', 'Oyo', 'Enugu', 'Calabar', 'Abeokuta',
  'Akure', 'Uyo', 'Osogbo', 'Maiduguri', 'Sokoto', 'Warri'
];

// Mock branches data
const mockBranches = [
  {
    id: '1',
    name: 'Ikeja Branch',
    address: '15 Adeniran Ogunsanya, Surulere',
    city: 'Ikeja',
    state: 'Lagos',
    phone: '+234 801 234 5678',
    email: 'ikeja@laundrypro.com',
    openingHours: { weekdays: '08:00 - 20:00', weekends: '09:00 - 18:00' },
    isActive: true,
    staffCount: 8,
    todayOrders: 24,
    monthlyRevenue: 450000,
  },
  {
    id: '2',
    name: 'Lekki Branch',
    address: '42 Admiralty Way, Lekki Phase 1',
    city: 'Lekki',
    state: 'Lagos',
    phone: '+234 802 345 6789',
    email: 'lekki@laundrypro.com',
    openingHours: { weekdays: '08:00 - 20:00', weekends: '09:00 - 18:00' },
    isActive: true,
    staffCount: 6,
    todayOrders: 18,
    monthlyRevenue: 380000,
  },
  {
    id: '3',
    name: 'Victoria Island Branch',
    address: '101 Adetokunbo Ademola Street',
    city: 'VI',
    state: 'Lagos',
    phone: '+234 803 456 7890',
    email: 'vi@laundrypro.com',
    openingHours: { weekdays: '07:00 - 21:00', weekends: '08:00 - 19:00' },
    isActive: true,
    staffCount: 10,
    todayOrders: 32,
    monthlyRevenue: 620000,
  },
  {
    id: '4',
    name: 'Abuja Branch',
    address: '23 Herbert Macaulay Way, Wuse 2',
    city: 'Wuse',
    state: 'Abuja',
    phone: '+234 804 567 8901',
    email: 'abuja@laundrypro.com',
    openingHours: { weekdays: '08:00 - 20:00', weekends: '10:00 - 17:00' },
    isActive: false,
    staffCount: 5,
    todayOrders: 0,
    monthlyRevenue: 0,
  },
];

export default function AdminBranchesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    email: '',
    openingHoursWeekdays: '08:00 - 20:00',
    openingHoursWeekends: '09:00 - 18:00',
    isActive: true,
  });

  const filteredBranches = mockBranches.filter((branch) =>
    branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    branch.state.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openCreateDialog = () => {
    setEditingBranch(null);
    setFormData({
      name: '',
      address: '',
      city: '',
      state: '',
      phone: '',
      email: '',
      openingHoursWeekdays: '08:00 - 20:00',
      openingHoursWeekends: '09:00 - 18:00',
      isActive: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (branch: any) => {
    setEditingBranch(branch);
    setFormData({
      name: branch.name,
      address: branch.address,
      city: branch.city,
      state: branch.state,
      phone: branch.phone,
      email: branch.email,
      openingHoursWeekdays: branch.openingHours.weekdays,
      openingHoursWeekends: branch.openingHours.weekends,
      isActive: branch.isActive,
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    // API call to create/update branch
    setDialogOpen(false);
  };

  const handleDelete = (branchId: string) => {
    if (confirm('Are you sure you want to delete this branch?')) {
      console.log('Deleting branch:', branchId);
      // API call to delete branch
    }
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
            <h1 className="text-2xl font-bold text-white">Branch Management</h1>
            <p className="text-gray-400 mt-1">Manage your business locations</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 interactive" onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Branch
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingBranch ? 'Edit Branch' : 'Create New Branch'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Branch Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Ikeja Branch"
                      className="h-11 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+234 801 234 5678"
                      className="h-11 border-2"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Street Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="No 123, Example Street"
                    className="h-11 border-2"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Ikeja"
                      className="h-11 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="state">State *</Label>
                    <Select value={formData.state} onValueChange={(value) => setFormData({ ...formData, state: value })}>
                      <SelectTrigger id="state" className="h-11 border-2">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        {nigeriaStates.map((state) => (
                          <SelectItem key={state} value={state}>
                            {state}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email (Optional)</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="branch@laundrypro.com"
                    className="h-11 border-2"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="weekdays">Opening Hours (Weekdays)</Label>
                    <Input
                      id="weekdays"
                      value={formData.openingHoursWeekdays}
                      onChange={(e) => setFormData({ ...formData, openingHoursWeekdays: e.target.value })}
                      placeholder="08:00 - 20:00"
                      className="h-11 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="weekends">Opening Hours (Weekends)</Label>
                    <Input
                      id="weekends"
                      value={formData.openingHoursWeekends}
                      onChange={(e) => setFormData({ ...formData, openingHoursWeekends: e.target.value })}
                      placeholder="09:00 - 18:00"
                      className="h-11 border-2"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border-2 rounded-xl">
                  <Checkbox
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
                  />
                  <div>
                    <Label htmlFor="isActive" className="cursor-pointer">Branch is Active</Label>
                    <p className="text-sm text-gray-600">Inactive branches won't accept new orders</p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 border-2 interactive"
                    onClick={() => setDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="button"
                    className="flex-1 bg-blue-600 hover:bg-blue-700 interactive"
                    onClick={handleSubmit}
                  >
                    {editingBranch ? 'Update Branch' : 'Create Branch'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <div className="relative mt-4 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder="Search branches..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-12 border-gray-700 bg-gray-800 text-white"
          />
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm mb-1">Total Branches</p>
            <p className="text-2xl font-bold text-white">{mockBranches.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm mb-1">Active</p>
            <p className="text-2xl font-bold text-green-400">{mockBranches.filter(b => b.isActive).length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm mb-1">Total Staff</p>
            <p className="text-2xl font-bold text-white">{mockBranches.reduce((sum, b) => sum + b.staffCount, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm mb-1">Monthly Revenue</p>
            <p className="text-2xl font-bold text-blue-400">₦{(mockBranches.reduce((sum, b) => sum + b.monthlyRevenue, 0) / 1000).toFixed(0)}K</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Branches List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-700 hover:bg-gray-800">
                  <TableHead className="text-gray-400">Branch</TableHead>
                  <TableHead className="text-gray-400">Location</TableHead>
                  <TableHead className="text-gray-400">Contact</TableHead>
                  <TableHead className="text-gray-400">Staff</TableHead>
                  <TableHead className="text-gray-400">Today's Orders</TableHead>
                  <TableHead className="text-gray-400">Revenue</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBranches.map((branch, index) => (
                  <TableRow
                    key={branch.id}
                    className="border-gray-700 hover:bg-gray-700/50 cursor-pointer"
                  >
                    <TableCell>
                      <Link href={`/admin/branches/${branch.id}`} className="font-medium text-white hover:text-blue-400">
                        {branch.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <p>{branch.address}</p>
                      <p className="text-sm text-gray-500">{branch.city}, {branch.state}</p>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <p className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3" />
                        {branch.phone}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3" />
                        {branch.email}
                      </p>
                    </TableCell>
                    <TableCell className="text-white">{branch.staffCount}</TableCell>
                    <TableCell className="text-white">{branch.todayOrders}</TableCell>
                    <TableCell className="text-green-400 font-medium">₦{branch.monthlyRevenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <Badge className={branch.isActive ? 'bg-green-500/20 text-green-400 border-green-500/50' : 'bg-gray-500/20 text-gray-400 border-gray-500/50'}>
                        {branch.isActive ? 'Active' : 'Inactive'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/20 interactive"
                          onClick={() => openEditDialog(branch)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/20 interactive"
                          onClick={() => handleDelete(branch.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Link href={`/admin/branches/${branch.id}`}>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700 interactive">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
