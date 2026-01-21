'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  User,
  Mail,
  Phone,
  MapPin,
  Shield,
  Search,
  ChevronRight,
  MoreHorizontal,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

// Mock staff data
const mockStaff = [
  {
    id: '1',
    userId: 'u1',
    firstName: 'Emeka',
    lastName: 'Okonkwo',
    email: 'emeka.okonkwo@laundrypro.com',
    phone: '+234 801 234 5678',
    role: 'Manager',
    branch: 'Ikeja Branch',
    branchId: '1',
    employeeId: 'LP001',
    status: 'active',
    hireDate: '2023-01-15',
    ordersHandled: 245,
    averageRating: 4.8,
    salary: 120000,
    permissions: ['view_orders', 'update_status', 'manage_staff', 'view_reports'],
  },
  {
    id: '2',
    userId: 'u2',
    firstName: 'Chioma',
    lastName: 'Nwosu',
    email: 'chioma.nwosu@laundrypro.com',
    phone: '+234 802 345 6789',
    role: 'Staff',
    branch: 'Lekki Branch',
    branchId: '2',
    employeeId: 'LP002',
    status: 'active',
    hireDate: '2023-03-20',
    ordersHandled: 178,
    averageRating: 4.6,
    salary: 75000,
    permissions: ['view_orders', 'update_status'],
  },
  {
    id: '3',
    userId: 'u3',
    firstName: 'Tunde',
    lastName: 'Bakare',
    email: 'tunde.bakare@laundrypro.com',
    phone: '+234 803 456 7890',
    role: 'Staff',
    branch: 'Victoria Island Branch',
    branchId: '3',
    employeeId: 'LP003',
    status: 'active',
    hireDate: '2023-06-10',
    ordersHandled: 156,
    averageRating: 4.5,
    salary: 70000,
    permissions: ['view_orders', 'update_status'],
  },
  {
    id: '4',
    userId: 'u4',
    firstName: 'Fatima',
    lastName: 'Mohammed',
    email: 'fatima.mohammed@laundrypro.com',
    phone: '+234 804 567 8901',
    role: 'Staff',
    branch: 'Ikeja Branch',
    branchId: '1',
    employeeId: 'LP004',
    status: 'inactive',
    hireDate: '2023-08-01',
    ordersHandled: 89,
    averageRating: 4.3,
    salary: 65000,
    permissions: ['view_orders', 'update_status'],
  },
];

const branches = [
  { id: '1', name: 'Ikeja Branch' },
  { id: '2', name: 'Lekki Branch' },
  { id: '3', name: 'Victoria Island Branch' },
  { id: '4', name: 'Abuja Branch' },
];

const roles = ['Manager', 'Supervisor', 'Staff'];
const permissionsList = [
  { id: 'view_orders', label: 'View Orders' },
  { id: 'update_status', label: 'Update Order Status' },
  { id: 'manage_staff', label: 'Manage Staff' },
  { id: 'view_reports', label: 'View Reports' },
  { id: 'manage_services', label: 'Manage Services' },
  { id: 'manage_branches', label: 'Manage Branches' },
];

export default function AdminStaffPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [branchFilter, setBranchFilter] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<any>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    role: 'Staff',
    branchId: '',
    employeeId: '',
    salary: '',
    permissions: [] as string[],
    status: 'active',
  });

  const filteredStaff = mockStaff.filter((staff) => {
    const matchesSearch =
      staff.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.employeeId.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === 'all' || staff.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesBranch = branchFilter === 'all' || staff.branchId === branchFilter;
    return matchesSearch && matchesRole && matchesBranch;
  });

  const openCreateDialog = () => {
    setEditingStaff(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      role: 'Staff',
      branchId: '',
      employeeId: '',
      salary: '',
      permissions: [],
      status: 'active',
    });
    setDialogOpen(true);
  };

  const openEditDialog = (staff: any) => {
    setEditingStaff(staff);
    setFormData({
      firstName: staff.firstName,
      lastName: staff.lastName,
      email: staff.email,
      phone: staff.phone,
      role: staff.role,
      branchId: staff.branchId,
      employeeId: staff.employeeId,
      salary: staff.salary.toString(),
      permissions: staff.permissions,
      status: staff.status,
    });
    setDialogOpen(true);
  };

  const handlePermissionToggle = (permissionId: string) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    // API call to create/update staff
    setDialogOpen(false);
  };

  const handleDelete = (staffId: string) => {
    if (confirm('Are you sure you want to remove this staff member?')) {
      console.log('Deleting staff:', staffId);
      // API call to delete staff
    }
  };

  const toggleStatus = (staffId: string) => {
    console.log('Toggling status for:', staffId);
    // API call to toggle active/inactive
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
            <h1 className="text-2xl font-bold text-white">Staff Management</h1>
            <p className="text-gray-400 mt-1">Manage your team members and their access</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 interactive" onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Staff
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingStaff ? 'Edit Staff Member' : 'Add New Staff'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      placeholder="John"
                      className="h-11 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder="Doe"
                      className="h-11 border-2"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john.doe@laundrypro.com"
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

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="role">Role *</Label>
                    <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
                      <SelectTrigger id="role" className="h-11 border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch *</Label>
                    <Select value={formData.branchId} onValueChange={(value) => setFormData({ ...formData, branchId: value })}>
                      <SelectTrigger id="branch" className="h-11 border-2">
                        <SelectValue placeholder="Select branch" />
                      </SelectTrigger>
                      <SelectContent>
                        {branches.map((branch) => (
                          <SelectItem key={branch.id} value={branch.id}>
                            {branch.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="employeeId">Employee ID</Label>
                    <Input
                      id="employeeId"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      placeholder="LP005"
                      className="h-11 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="salary">Monthly Salary (₦)</Label>
                    <Input
                      id="salary"
                      type="number"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      placeholder="75000"
                      className="h-11 border-2"
                    />
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Permissions</Label>
                  <div className="grid sm:grid-cols-2 gap-3 p-4 border-2 rounded-xl max-h-[200px] overflow-y-auto">
                    {permissionsList.map((permission) => (
                      <div key={permission.id} className="flex items-center gap-3">
                        <Checkbox
                          id={permission.id}
                          checked={formData.permissions.includes(permission.id)}
                          onCheckedChange={() => handlePermissionToggle(permission.id)}
                        />
                        <label htmlFor={permission.id} className="text-sm cursor-pointer">
                          {permission.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 border-2 rounded-xl">
                  <Checkbox
                    id="status"
                    checked={formData.status === 'active'}
                    onCheckedChange={(checked) => setFormData({ ...formData, status: checked ? 'active' : 'inactive' })}
                  />
                  <div>
                    <Label htmlFor="status" className="cursor-pointer">Active Status</Label>
                    <p className="text-sm text-gray-600">Inactive staff cannot log in</p>
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
                    {editingStaff ? 'Update Staff' : 'Add Staff'}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by name, email, or employee ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-700 bg-gray-800 text-white"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="h-12 border-gray-700 bg-gray-800 text-white w-full sm:w-48">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map((role) => (
                <SelectItem key={role} value={role.toLowerCase()}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={branchFilter} onValueChange={setBranchFilter}>
            <SelectTrigger className="h-12 border-gray-700 bg-gray-800 text-white w-full sm:w-48">
              <SelectValue placeholder="Filter by branch" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Branches</SelectItem>
              {branches.map((branch) => (
                <SelectItem key={branch.id} value={branch.id}>
                  {branch.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            <p className="text-gray-400 text-sm mb-1">Total Staff</p>
            <p className="text-2xl font-bold text-white">{mockStaff.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm mb-1">Active</p>
            <p className="text-2xl font-bold text-green-400">{mockStaff.filter(s => s.status === 'active').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm mb-1">Total Orders Handled</p>
            <p className="text-2xl font-bold text-white">{mockStaff.reduce((sum, s) => sum + s.ordersHandled, 0)}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm mb-1">Avg Rating</p>
            <p className="text-2xl font-bold text-yellow-400">
              {(mockStaff.reduce((sum, s) => sum + s.averageRating, 0) / mockStaff.length).toFixed(1)}
            </p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Staff Table */}
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
                  <TableHead className="text-gray-400">Staff Member</TableHead>
                  <TableHead className="text-gray-400">Role & Branch</TableHead>
                  <TableHead className="text-gray-400">Contact</TableHead>
                  <TableHead className="text-gray-400">Performance</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStaff.map((staff) => (
                  <TableRow
                    key={staff.id}
                    className="border-gray-700 hover:bg-gray-700/50"
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-blue-600 text-white">
                            {staff.firstName[0]}{staff.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-white">
                            {staff.firstName} {staff.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{staff.employeeId}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <p className="font-medium">{staff.role}</p>
                      <p className="text-sm text-gray-500">{staff.branch}</p>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <p className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3" />
                        {staff.email}
                      </p>
                      <p className="flex items-center gap-2 text-sm">
                        <Phone className="w-3 h-3" />
                        {staff.phone}
                      </p>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <p className="text-sm">{staff.ordersHandled} orders</p>
                      <p className="text-sm text-yellow-400 flex items-center gap-1">
                        ★ {staff.averageRating}
                      </p>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={staff.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border-green-500/50'
                          : 'bg-gray-500/20 text-gray-400 border-gray-500/50'
                        }
                      >
                        {staff.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white hover:bg-gray-700 interactive">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-gray-800 border-gray-700">
                          <DropdownMenuLabel className="text-gray-300">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem
                            className="text-gray-300 focus:text-white focus:bg-gray-700 cursor-pointer"
                            onClick={() => openEditDialog(staff)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-gray-300 focus:text-white focus:bg-gray-700 cursor-pointer"
                            onClick={() => toggleStatus(staff.id)}
                          >
                            <Shield className="w-4 h-4 mr-2" />
                            {staff.status === 'active' ? 'Deactivate' : 'Activate'}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-gray-700" />
                          <DropdownMenuItem
                            className="text-red-400 focus:text-red-300 focus:bg-red-500/20 cursor-pointer"
                            onClick={() => handleDelete(staff.id)}
                          >
                            <Trash2 className="w-4 h-4 mr-2" />
                            Remove
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
