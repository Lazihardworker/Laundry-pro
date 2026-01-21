'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  Search,
  Filter,
  CheckCircle,
  XCircle,
  MessageSquare,
  Calendar,
  User,
  Package,
  MapPin,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock issues data
const mockIssues = [
  {
    id: '1',
    orderId: 'FC-20250121-0047',
    orderNumber: 'FC-20250121-0047',
    reporterId: 'u1',
    reporterName: 'John Doe',
    issueType: 'damaged',
    severity: 'high',
    description: 'Shirt got torn during washing process. Small tear on the left sleeve.',
    imageUrls: ['/images/damaged-shirt.jpg'],
    status: 'OPEN',
    reportedAt: '2025-01-21 09:30',
    resolvedById: null,
    resolvedByName: null,
    resolutionNotes: null,
    resolvedAt: null,
    compensationAmount: null,
    compensationType: null,
  },
  {
    id: '2',
    orderId: 'FC-20250121-0045',
    orderNumber: 'FC-20250121-0045',
    reporterId: 'u2',
    reporterName: 'Emeka Okonkwo',
    issueType: 'stain',
    severity: 'medium',
    description: 'Oil stain on suit not completely removed after first wash.',
    imageUrls: [],
    status: 'INVESTIGATING',
    reportedAt: '2025-01-21 08:15',
    resolvedById: null,
    resolvedByName: null,
    resolutionNotes: 'Investigating with staff. Will re-wash with special treatment.',
    resolvedAt: null,
    compensationAmount: null,
    compensationType: null,
  },
  {
    id: '3',
    orderId: 'FC-20250120-0042',
    orderNumber: 'FC-20250120-0042',
    reporterId: 'u3',
    reporterName: 'Jane Smith',
    issueType: 'delay',
    severity: 'low',
    description: 'Order delayed due to machine breakdown.',
    imageUrls: [],
    status: 'RESOLVED',
    reportedAt: '2025-01-20 14:00',
    resolvedById: 'u4',
    resolvedByName: 'Admin User',
    resolutionNotes: 'Machine repaired. Order expedited and delivered with free delivery.',
    resolvedAt: '2025-01-20 18:00',
    compensationAmount: 500,
    compensationType: 'delivery_fee_waiver',
  },
  {
    id: '4',
    orderId: 'FC-20250119-0038',
    orderNumber: 'FC-20250119-0038',
    reporterId: 'u5',
    reporterName: 'Ahmed Ibrahim',
    issueType: 'lost',
    severity: 'critical',
    description: 'One sock missing from the order. Customer reported 3 pairs, only 2.5 pairs returned.',
    imageUrls: [],
    status: 'OPEN',
    reportedAt: '2025-01-19 16:45',
    resolvedById: null,
    resolvedByName: null,
    resolutionNotes: null,
    resolvedAt: null,
    compensationAmount: null,
    compensationType: null,
  },
];

const issueTypes = [
  { value: 'damaged', label: 'Damaged Item' },
  { value: 'stain', label: 'Stain Not Removed' },
  { value: 'lost', label: 'Lost Item' },
  { value: 'delay', label: 'Delay' },
  { value: 'wrong_item', label: 'Wrong Item Returned' },
  { value: 'other', label: 'Other' },
];

const severityLevels = [
  { value: 'low', label: 'Low', color: 'bg-gray-100 text-gray-700' },
  { value: 'medium', label: 'Medium', color: 'bg-orange-100 text-orange-700' },
  { value: 'high', label: 'High', color: 'bg-red-100 text-red-700' },
  { value: 'critical', label: 'Critical', color: 'bg-red-200 text-red-800' },
];

const statusOptions = [
  { value: 'OPEN', label: 'Open', color: 'bg-red-100 text-red-700' },
  { value: 'INVESTIGATING', label: 'Investigating', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'RESOLVED', label: 'Resolved', color: 'bg-green-100 text-green-700' },
  { value: 'CLOSED', label: 'Closed', color: 'bg-gray-100 text-gray-700' },
];

export default function AdminIssuesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [severityFilter, setSeverityFilter] = useState<string>('all');
  const [resolveDialogOpen, setResolveDialogOpen] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);
  const [resolutionData, setResolutionData] = useState({
    resolutionNotes: '',
    compensationAmount: '',
    compensationType: '',
  });

  const filteredIssues = mockIssues.filter((issue) => {
    const matchesSearch =
      issue.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.reporterName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || issue.status === statusFilter;
    const matchesSeverity = severityFilter === 'all' || issue.severity === severityFilter;
    return matchesSearch && matchesStatus && matchesSeverity;
  });

  const openResolveDialog = (issue: any) => {
    setSelectedIssue(issue);
    setResolutionData({
      resolutionNotes: issue.resolutionNotes || '',
      compensationAmount: issue.compensationAmount?.toString() || '',
      compensationType: issue.compensationType || '',
    });
    setResolveDialogOpen(true);
  };

  const handleResolve = () => {
    console.log('Resolving issue:', selectedIssue?.id, resolutionData);
    // API call to resolve issue
    setResolveDialogOpen(false);
  };

  const getSeverityColor = (severity: string) => {
    const level = severityLevels.find((l) => l.value === severity);
    return level?.color || 'bg-gray-100 text-gray-700';
  };

  const getStatusColor = (status: string) => {
    const statusInfo = statusOptions.find((s) => s.value === status);
    return statusInfo?.color || 'bg-gray-100 text-gray-700';
  };

  const getIssueTypeLabel = (type: string) => {
    const issueType = issueTypes.find((t) => t.value === type);
    return issueType?.label || type;
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
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-amber-400" />
              Issues Management
            </h1>
            <p className="text-gray-400 mt-1">Track and resolve customer complaints</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder="Search by order number, customer, or description..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 border-gray-700 bg-gray-800 text-white"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="h-12 border-gray-700 bg-gray-800 text-white w-full sm:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              {statusOptions.map((status) => (
                <SelectItem key={status.value} value={status.value}>
                  {status.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="h-12 border-gray-700 bg-gray-800 text-white w-full sm:w-40">
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Severities</SelectItem>
              {severityLevels.map((level) => (
                <SelectItem key={level.value} value={level.value}>
                  {level.label}
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
            <p className="text-gray-400 text-sm mb-1">Total Issues</p>
            <p className="text-2xl font-bold text-white">{mockIssues.length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm mb-1">Open</p>
            <p className="text-2xl font-bold text-red-400">{mockIssues.filter(i => i.status === 'OPEN').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm mb-1">Investigating</p>
            <p className="text-2xl font-bold text-yellow-400">{mockIssues.filter(i => i.status === 'INVESTIGATING').length}</p>
          </CardContent>
        </Card>
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="p-4">
            <p className="text-gray-400 text-sm mb-1">Resolved</p>
            <p className="text-2xl font-bold text-green-400">{mockIssues.filter(i => i.status === 'RESOLVED').length}</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Issues Table */}
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
                  <TableHead className="text-gray-400">Issue</TableHead>
                  <TableHead className="text-gray-400">Order</TableHead>
                  <TableHead className="text-gray-400">Reporter</TableHead>
                  <TableHead className="text-gray-400">Severity</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Reported</TableHead>
                  <TableHead className="text-gray-400 text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIssues.map((issue, index) => (
                  <TableRow
                    key={issue.id}
                    className="border-gray-700 hover:bg-gray-700/50 cursor-pointer"
                  >
                    <TableCell>
                      <div className="flex items-start gap-3">
                        <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                          issue.severity === 'critical' || issue.severity === 'high'
                            ? 'text-red-400'
                            : issue.severity === 'medium'
                            ? 'text-orange-400'
                            : 'text-yellow-400'
                        }`} />
                        <div>
                          <p className="font-medium text-white">{getIssueTypeLabel(issue.issueType)}</p>
                          <p className="text-sm text-gray-500 line-clamp-2 max-w-md">{issue.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/orders/${issue.orderId}`}
                        className="text-blue-400 hover:text-blue-300 font-medium"
                      >
                        {issue.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      <p>{issue.reporterName}</p>
                    </TableCell>
                    <TableCell>
                      <Badge className={getSeverityColor(issue.severity)}>
                        {issue.severity.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(issue.status)}>
                        {issue.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-300 text-sm">
                      {new Date(issue.reportedAt).toLocaleDateString('en-NG', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        {issue.status === 'OPEN' || issue.status === 'INVESTIGATING' ? (
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700 interactive"
                            onClick={() => openResolveDialog(issue)}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Resolve
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-400 hover:text-white hover:bg-gray-700 interactive"
                            onClick={() => openResolveDialog(issue)}
                          >
                            <MessageSquare className="w-4 h-4 mr-1" />
                            View
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </motion.div>

      {/* Resolve Dialog */}
      <Dialog open={resolveDialogOpen} onOpenChange={setResolveDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-400" />
              Resolve Issue
            </DialogTitle>
          </DialogHeader>
          {selectedIssue && (
            <div className="space-y-4 py-4">
              {/* Issue Details */}
              <div className="p-4 bg-gray-50 rounded-xl border-2">
                <div className="grid sm:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm text-gray-600">Order Number</p>
                    <p className="font-medium">{selectedIssue.orderNumber}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Issue Type</p>
                    <p className="font-medium">{getIssueTypeLabel(selectedIssue.issueType)}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Description</p>
                  <p className="text-gray-900">{selectedIssue.description}</p>
                </div>
              </div>

              {/* Resolution Form */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="resolutionNotes">Resolution Notes *</Label>
                  <Textarea
                    id="resolutionNotes"
                    placeholder="Describe how the issue was resolved..."
                    value={resolutionData.resolutionNotes}
                    onChange={(e) => setResolutionData({ ...resolutionData, resolutionNotes: e.target.value })}
                    className="mt-2 min-h-[100px]"
                  />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="compensationType">Compensation Type (Optional)</Label>
                    <Select
                      value={resolutionData.compensationType}
                      onValueChange={(value) => setResolutionData({ ...resolutionData, compensationType: value })}
                    >
                      <SelectTrigger id="compensationType" className="h-11 border-2 mt-2">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">No compensation</SelectItem>
                        <SelectItem value="refund">Full Refund</SelectItem>
                        <SelectItem value="partial_refund">Partial Refund</SelectItem>
                        <SelectItem value="free_service">Free Service</SelectItem>
                        <SelectItem value="delivery_fee_waiver">Delivery Fee Waiver</SelectItem>
                        <SelectItem value="discount">Future Discount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="compensationAmount">Compensation Amount (₦)</Label>
                    <Input
                      id="compensationAmount"
                      type="number"
                      value={resolutionData.compensationAmount}
                      onChange={(e) => setResolutionData({ ...resolutionData, compensationAmount: e.target.value })}
                      placeholder="0"
                      className="h-11 border-2 mt-2"
                    />
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-2 interactive"
                    onClick={() => setResolveDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700 interactive"
                    onClick={handleResolve}
                    disabled={!resolutionData.resolutionNotes}
                  >
                    Mark as Resolved
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
