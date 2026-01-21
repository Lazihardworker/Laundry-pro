'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Phone, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function LoginPage() {
  const [loginType, setLoginType] = useState<'phone' | 'email'>('phone');
  const [userType, setUserType] = useState<'customer' | 'staff' | 'admin'>('customer');
  const [otpSent, setOtpSent] = useState(false);

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

        {/* Login Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl font-bold text-gray-900">
                Welcome Back
              </CardTitle>
              <p className="text-gray-600 mt-2">Sign in to continue</p>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* User Type Selection */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                {(['customer', 'staff', 'admin'] as const).map((type) => (
                  <button
                    key={type}
                    onClick={() => setUserType(type)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all touch-target ${
                      userType === type
                        ? 'bg-white text-blue-700 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </button>
                ))}
              </div>

              {/* Login Type Toggle */}
              {!otpSent && (
                <div className="flex gap-4">
                  <button
                    onClick={() => setLoginType('phone')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all touch-target ${
                      loginType === 'phone'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Phone className="w-5 h-5" />
                    <span className="font-medium">Phone</span>
                  </button>
                  <button
                    onClick={() => setLoginType('email')}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 transition-all touch-target ${
                      loginType === 'email'
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Mail className="w-5 h-5" />
                    <span className="font-medium">Email</span>
                  </button>
                </div>
              )}

              {!otpSent ? (
                <>
                  {/* Phone Login Form */}
                  {loginType === 'phone' ? (
                    <motion.div
                      key="phone-form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="phone"
                            type="tel"
                            placeholder="+234 801 234 5678"
                            className="pl-10 h-12 border-2 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <Button
                        className="w-full h-12 gradient-primary text-white shadow-lg hover:shadow-xl transition-all interactive"
                        onClick={() => setOtpSent(true)}
                      >
                        Send OTP
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                  ) : (
                    /* Email Login Form */
                    <motion.div
                      key="email-form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            className="pl-10 h-12 border-2 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className="pl-10 h-12 border-2 focus:border-blue-500"
                          />
                        </div>
                      </div>

                      <div className="text-right">
                        <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:underline">
                          Forgot password?
                        </Link>
                      </div>

                      <Button
                        className="w-full h-12 gradient-primary text-white shadow-lg hover:shadow-xl transition-all interactive"
                      >
                        Sign In
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </motion.div>
                  )}
                </>
              ) : (
                /* OTP Verification Form */
                <motion.div
                  key="otp-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">Enter OTP</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      We sent a code to +234 801 234 5678
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
                  >
                    Verify & Continue
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>

                  <div className="text-center">
                    <button className="text-sm text-blue-600 hover:underline font-medium">
                      Resend OTP
                    </button>
                    <span className="text-gray-400 mx-2">•</span>
                    <button
                      onClick={() => setOtpSent(false)}
                      className="text-sm text-gray-600 hover:text-gray-900"
                    >
                      Change number
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Divider */}
              {!otpSent && (
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">New to FreshClean?</span>
                  </div>
                </div>
              )}

              {/* Sign Up Link */}
              {!otpSent && (
                <Link
                  href={
                    userType === 'customer'
                      ? '/auth/register'
                      : userType === 'staff'
                      ? '/auth/staff-register'
                      : '/auth/admin-register'
                  }
                >
                  <Button
                    variant="outline"
                    className="w-full h-12 border-2 hover:border-blue-300 hover:bg-blue-50 transition-all interactive"
                  >
                    <User className="w-5 h-5 mr-2" />
                    Create an Account
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
          className="mt-8 text-center text-sm text-gray-500 space-y-2"
        >
          <p>By signing in, you agree to our</p>
          <div className="flex justify-center gap-4">
            <Link href="/terms" className="hover:text-gray-900">Terms of Service</Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-gray-900">Privacy Policy</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
