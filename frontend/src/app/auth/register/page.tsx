'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArrowRight, Phone, Mail, Lock, User, MapPin, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    agreeToTerms: false,
  });

  const nigeriaStates = [
    'Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City',
    'Kaduna', 'Aba', 'Jos', 'Ilorin', 'Oyo', 'Enugu', 'Calabar', 'Abeokuta',
    'Akure', 'Uyo', 'Osogbo', 'Maiduguri', 'Sokoto', 'Warri'
  ];

  const updateForm = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const renderStep1 = () => (
    <motion.div
      key="step1"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="firstName">First Name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={(e) => updateForm('firstName', e.target.value)}
            className="pl-10 h-12 border-2 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="lastName">Last Name *</Label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={(e) => updateForm('lastName', e.target.value)}
            className="pl-10 h-12 border-2 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="phone"
            type="tel"
            placeholder="+234 801 234 5678"
            value={formData.phone}
            onChange={(e) => updateForm('phone', e.target.value)}
            className="pl-10 h-12 border-2 focus:border-blue-500"
          />
        </div>
        <p className="text-xs text-gray-500">We'll send you a verification code</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email (Optional)</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="email"
            type="email"
            placeholder="john@example.com"
            value={formData.email}
            onChange={(e) => updateForm('email', e.target.value)}
            className="pl-10 h-12 border-2 focus:border-blue-500"
          />
        </div>
      </div>

      <Button
        className="w-full h-12 gradient-primary text-white shadow-lg hover:shadow-xl transition-all interactive"
        onClick={() => setStep(2)}
        disabled={!formData.firstName || !formData.lastName || !formData.phone}
      >
        Continue
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <Label htmlFor="password">Password *</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => updateForm('password', e.target.value)}
            className="pl-10 h-12 border-2 focus:border-blue-500"
          />
        </div>
        <p className="text-xs text-gray-500">Min 8 characters, include letters & numbers</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address *</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            id="address"
            placeholder="No 123, Example Street"
            value={formData.address}
            onChange={(e) => updateForm('address', e.target.value)}
            className="pl-10 h-12 border-2 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input
            id="city"
            placeholder="Ikeja"
            value={formData.city}
            onChange={(e) => updateForm('city', e.target.value)}
            className="h-12 border-2 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="state">State *</Label>
          <select
            id="state"
            value={formData.state}
            onChange={(e) => updateForm('state', e.target.value)}
            className="w-full h-12 px-3 border-2 rounded-md focus:border-blue-500 focus:outline-none"
          >
            <option value="">Select</option>
            {nigeriaStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-start gap-3 pt-2">
        <Checkbox
          id="terms"
          checked={formData.agreeToTerms}
          onCheckedChange={(checked) => updateForm('agreeToTerms', checked)}
        />
        <label
          htmlFor="terms"
          className="text-sm text-gray-600 leading-tight cursor-pointer"
        >
          I agree to the{' '}
          <Link href="/terms" className="text-blue-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>
        </label>
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 h-12 border-2 interactive"
          onClick={() => setStep(1)}
        >
          Back
        </Button>
        <Button
          className="flex-1 h-12 gradient-primary text-white shadow-lg hover:shadow-xl transition-all interactive"
          onClick={() => setStep(3)}
          disabled={!formData.password || !formData.address || !formData.city || !formData.state || !formData.agreeToTerms}
        >
          Create Account
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      key="step3"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 py-4"
    >
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-10 h-10 text-green-600" />
      </div>

      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Verify Your Phone</h3>
        <p className="text-gray-600">
          We sent a 6-digit code to <span className="font-medium">{formData.phone}</span>
        </p>
      </div>

      <div className="flex justify-center gap-2">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Input
            key={i}
            type="text"
            maxLength={1}
            className="w-12 h-14 text-center text-2xl font-bold border-2 focus:border-blue-500"
          />
        ))}
      </div>

      <Button
        className="w-full h-12 gradient-primary text-white shadow-lg hover:shadow-xl transition-all interactive"
        onClick={() => {
          // Navigate to dashboard after verification
          window.location.href = '/customer';
        }}
      >
        Verify & Complete
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>

      <div className="text-sm text-gray-600">
        <button className="text-blue-600 hover:underline font-medium">
          Resend Code
        </button>
        <span className="mx-2">•</span>
        <button
          onClick={() => setStep(2)}
          className="hover:text-gray-900"
        >
          Edit Number
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link href="/">
            <div className="inline-flex items-center gap-3 mb-4 cursor-pointer interactive">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">FC</span>
              </div>
              <div className="text-left">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  FreshClean
                </h1>
                <p className="text-sm text-gray-500">Professional Laundry Service</p>
              </div>
            </div>
          </Link>
        </motion.div>

        {/* Register Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Create Account
              </CardTitle>
              <p className="text-gray-600 mt-2">Join FreshClean today</p>

              {/* Progress Steps */}
              {step < 3 && (
                <div className="flex items-center justify-center gap-2 mt-6">
                  {[1, 2].map((s) => (
                    <div key={s} className="flex items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                          step >= s
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step > s ? <Check className="w-4 h-4" /> : s}
                      </div>
                      {s < 2 && (
                        <div
                          className={`w-8 h-1 ${
                            step > s ? 'bg-blue-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {step === 1 && renderStep1()}
              {step === 2 && renderStep2()}
              {step === 3 && renderStep3()}

              {/* Divider */}
              {step < 3 && (
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                  </div>
                </div>
              )}

              {/* Sign In Link */}
              {step < 3 && (
                <Link href="/auth/login">
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 hover:border-blue-300 hover:bg-blue-50 transition-all interactive"
                  >
                    Sign In Instead
                  </Button>
                </Link>
              )}

              {/* Back to Home */}
              <div className="text-center pt-4">
                <Link href="/" className="text-sm text-gray-600 hover:text-gray-900">
                  ← Back to Home
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center text-sm text-gray-500"
        >
          By creating an account, you agree to our{' '}
          <Link href="/terms" className="hover:text-gray-900">Terms</Link> &{' '}
          <Link href="/privacy" className="hover:text-gray-900">Privacy</Link>
        </motion.div>
      </div>
    </div>
  );
}
