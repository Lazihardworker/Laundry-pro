'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  DollarSign,
  Clock,
  Search,
  Zap,
  Package,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal } from 'lucide-react';

// Mock services data
const mockServices = [
  {
    id: '1',
    name: 'Basic Wash & Iron',
    category: 'BASIC',
    serviceType: 'wash_iron',
    basePrice: 500,
    pricingUnit: 'per piece',
    estimatedHours: 48,
    isExpress: false,
    branchId: null,
    description: 'Professional wash and iron service for everyday clothes',
    careInstructions: 'Machine wash with cold water, tumble dry low',
    isActive: true,
  },
  {
    id: '2',
    name: 'Dry Cleaning',
    category: 'PREMIUM',
    serviceType: 'dry_clean',
    basePrice: 1500,
    pricingUnit: 'per piece',
    estimatedHours: 72,
    isExpress: false,
    branchId: null,
    description: 'Expert dry cleaning for delicate fabrics and formal wear',
    careInstructions: 'Professional dry clean only',
    isActive: true,
  },
  {
    id: '3',
    name: 'Express Service',
    category: 'EXPRESS',
    serviceType: 'express',
    basePrice: 800,
    pricingUnit: 'per piece',
    estimatedHours: 6,
    isExpress: true,
    branchId: null,
    description: 'Same-day service for urgent needs',
    careInstructions: 'Same as regular service',
    isActive: true,
  },
  {
    id: '4',
    name: 'Corporate Monthly Plan',
    category: 'CORPORATE',
    serviceType: 'subscription',
    basePrice: 25000,
    pricingUnit: 'per month',
    estimatedHours: 0,
    isExpress: false,
    branchId: null,
    description: 'Unlimited laundry for businesses (up to 100 items/month)',
    careInstructions: null,
    isActive: true,
  },
  {
    id: '5',
    name: 'Suits Premium Care',
    category: 'PREMIUM',
    serviceType: 'suit_care',
    basePrice: 2000,
    pricingUnit: 'per piece',
    estimatedHours: 72,
    isExpress: false,
    branchId: null,
    description: 'Specialized care for suits and formal wear',
    careInstructions: 'Hand wash or dry clean, hang to dry',
    isActive: false,
  },
];

const categories = [
  { value: 'BASIC', label: 'Basic' },
  { value: 'PREMIUM', label: 'Premium' },
  { value: 'EXPRESS', label: 'Express' },
  { value: 'CORPORATE', label: 'Corporate' },
];

const branches = [
  { id: '', name: 'All Branches' },
  { id: '1', name: 'Ikeja Branch' },
  { id: '2', name: 'Lekki Branch' },
  { id: '3', name: 'Victoria Island Branch' },
];

export default function AdminServicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'BASIC',
    serviceType: '',
    basePrice: '',
    pricingUnit: 'per piece',
    estimatedHours: '',
    isExpress: false,
    branchId: '',
    description: '',
    careInstructions: '',
    isActive: true,
  });

  const filteredServices = mockServices.filter((service) => {
    const matchesSearch =
      service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || service.category.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const openCreateDialog = () => {
    setEditingService(null);
    setFormData({
      name: '',
      category: 'BASIC',
      serviceType: '',
      basePrice: '',
      pricingUnit: 'per piece',
      estimatedHours: '',
      isExpress: false,
      branchId: '',
      description: '',
      careInstructions: '',
      isActive: true,
    });
    setDialogOpen(true);
  };

  const openEditDialog = (service: any) => {
    setEditingService(service);
    setFormData({
      name: service.name,
      category: service.category,
      serviceType: service.serviceType,
      basePrice: service.basePrice.toString(),
      pricingUnit: service.pricingUnit,
      estimatedHours: service.estimatedHours.toString(),
      isExpress: service.isExpress,
      branchId: service.branchId || '',
      description: service.description || '',
      careInstructions: service.careInstructions || '',
      isActive: service.isActive,
    });
    setDialogOpen(true);
  };

  const handleSubmit = () => {
    console.log('Submitting:', formData);
    // API call to create/update service
    setDialogOpen(false);
  };

  const handleDelete = (serviceId: string) => {
    if (confirm('Are you sure you want to delete this service?')) {
      console.log('Deleting service:', serviceId);
      // API call to delete service
    }
  };

  const toggleStatus = (serviceId: string) => {
    console.log('Toggling status for:', serviceId);
    // API call to toggle active/inactive
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      BASIC: 'bg-blue-100 text-blue-700',
      PREMIUM: 'bg-purple-100 text-purple-700',
      EXPRESS: 'bg-amber-100 text-amber-700',
      CORPORATE: 'bg-green-100 text-green-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, string> = {
      BASIC: '👕',
      PREMIUM: '🧥',
      EXPRESS: '⚡',
      CORPORATE: '🏢',
    };
    return icons[category] || '📦';
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
            <h1 className="text-2xl font-bold text-white">Services Management</h1>
            <p className="text-gray-400 mt-1">Manage your services and pricing</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 interactive" onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingService ? 'Edit Service' : 'Create New Service'}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Service Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Premium Wash & Iron"
                    className="h-11 border-2"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger id="category" className="h-11 border-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="serviceType">Service Type *</Label>
                    <Input
                      id="serviceType"
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      placeholder="e.g., wash_iron"
                      className="h-11 border-2"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basePrice">Base Price (₦) *</Label>
                    <Input
                      id="basePrice"
                      type="number"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                      placeholder="500"
                      className="h-11 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pricingUnit">Pricing Unit *</Label>
                    <Input
                      id="pricingUnit"
                      value={formData.pricingUnit}
                      onChange={(e) => setFormData({ ...formData, pricingUnit: e.target.value })}
                      placeholder="per piece"
                      className="h-11 border-2"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="estimatedHours">Est. Hours *</Label>
                    <Input
                      id="estimatedHours"
                      type="number"
                      value={formData.estimatedHours}
                      onChange={(e) => setFormData({ ...formData, estimatedHours: e.target.value })}
                      placeholder="48"
                      className="h-11 border-2"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="branch">Branch (Optional)</Label>
                    <Select value={formData.branchId} onValueChange={(value) => setFormData({ ...formData, branchId: value })}>
                      <SelectTrigger id="branch" className="h-11 border-2">
                        <SelectValue placeholder="All branches" />
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
                  <div className="flex items-center gap-3 p-4 border-2 rounded-xl">
                    <Checkbox
                      id="isExpress"
                      checked={formData.isExpress}
                      onCheckedChange={(checked) => setFormData({ ...formData, isExpress: checked as boolean })}
                    />
                    <div>
                      <Label htmlFor="isExpress" className="cursor-pointer flex items-center gap-2">
                        <Zap className="w-4 h-4" />
                        Express Service
                      </Label>
                      <p className="text-sm text-gray-600">Fast turnaround available</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe what this service includes..."
                    className="min-h-[100px]"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="careInstructions">Care Instructions (Optional)</Label>
                  <Textarea
                    id="careInstructions"
                    value={formData.careInstructions}
                    onChange={(e) => setFormData({ ...formData, careInstructions: e.target.value })}
                    placeholder="Special care instructions for this service..."
                    className="min-h-[80px]"
                  />
                </div>

                <div className="flex items-center gap-3 p-4 border-2 rounded-xl">
                  <Checkbox
                    id="isActive"
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked as boolean })}
                  />
                  <div>
                    <Label htmlFor="isActive" className="cursor-pointer">Service is Active</Label>
                    <p className="text-sm text-gray-600">Inactive services won't be visible to customers</p>
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
                    {editingService ? 'Update Service' : 'Create Service'}
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
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-700 bg-gray-800 text-white"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="h-12 border-gray-700 bg-gray-800 text-white w-full sm:w-48">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat.value} value={cat.value.toLowerCase()}>
                  {cat.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredServices.map((service, index) => (
          <Card
            key={service.id}
            className={`bg-gray-800 border-gray-700 hover:border-gray-600 transition-colors ${
              !service.isActive ? 'opacity-60' : ''
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-700 rounded-xl flex items-center justify-center text-2xl">
                    {getCategoryIcon(service.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{service.name}</h3>
                    <Badge className={getCategoryColor(service.category)}>{service.category}</Badge>
                  </div>
                </div>
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
                      onClick={() => openEditDialog(service)}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="text-gray-300 focus:text-white focus:bg-gray-700 cursor-pointer"
                      onClick={() => toggleStatus(service.id)}
                    >
                      {service.isActive ? (
                        <>
                          <Package className="w-4 h-4 mr-2" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Zap className="w-4 h-4 mr-2" />
                          Activate
                        </>
                      )}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-700" />
                    <DropdownMenuItem
                      className="text-red-400 focus:text-red-300 focus:bg-red-500/20 cursor-pointer"
                      onClick={() => handleDelete(service.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{service.description}</p>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Price</span>
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-green-400" />
                    <span className="text-lg font-bold text-green-400">
                      {service.basePrice.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm">Per</span>
                  <span className="text-white">{service.pricingUnit}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Turnaround
                  </span>
                  <span className="text-white">
                    {service.category === 'EXPRESS'
                      ? 'Same day'
                      : service.category === 'CORPORATE'
                      ? 'Monthly'
                      : `${Math.floor(service.estimatedHours / 24)} days`}
                  </span>
                </div>
              </div>

              {service.isExpress && (
                <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm">
                  <Zap className="w-4 h-4" />
                  <span className="font-medium">Express Available</span>
                </div>
              )}

              {!service.isActive && (
                <div className="mt-4 p-2 bg-gray-700 rounded-lg text-center">
                  <p className="text-sm text-gray-400">Inactive Service</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </div>
  );
}
