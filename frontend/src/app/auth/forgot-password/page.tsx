'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [emailSent, setEmailSent] = useState(false);
  const [email, setEmail] = useState('');

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

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center pb-4">
              {!emailSent ? (
                <>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Forgot Password?
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    No worries! Enter your email and we'll send you a reset link
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">
                    Check Your Email
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    We've sent a password reset link to {email}
                  </p>
                </>
              )}
            </CardHeader>

            <CardContent className="space-y-6">
              {!emailSent ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 h-12 border-2 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <Button
                    className="w-full h-12 gradient-primary text-white shadow-lg hover:shadow-xl transition-all interactive"
                    onClick={() => setEmailSent(true)}
                    disabled={!email}
                  >
                    Send Reset Link
                    <ArrowLeft className="ml-2 w-5 h-5 rotate-180" />
                  </Button>
                </>
              ) : (
                <>
                  <div className="bg-blue-50 rounded-xl p-4 space-y-2">
                    <p className="text-sm text-blue-900">
                      📧 Check your inbox and spam folder
                    </p>
                    <p className="text-sm text-blue-700">
                      The link will expire in 24 hours
                    </p>
                  </div>

                  <Button
                    className="w-full h-12 gradient-primary text-white shadow-lg hover:shadow-xl transition-all interactive"
                    onClick={() => setEmailSent(false)}
                  >
                    Didn't receive? Resend
                  </Button>
                </>
              )}

              {/* Back to Login */}
              <div className="text-center pt-4">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  <ArrowLeft className="w-4 h-4 mr-1" />
                  Back to Sign In
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
