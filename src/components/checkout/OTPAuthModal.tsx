import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, Shield, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/context/AuthContext';

interface OTPAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const OTPAuthModal = ({ isOpen, onClose, onSuccess }: OTPAuthModalProps) => {
  const { setAuthenticated } = useAuth();
  const [step, setStep] = useState<'phone' | 'otp'>('phone');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');

  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit phone number');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate OTP sending (in production, this would use Firebase)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a random 6-digit OTP for demo
    const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(randomOtp);
    
    // Show OTP in console for demo purposes
    console.log(`Demo OTP for +91 ${phoneNumber}: ${randomOtp}`);
    
    setIsLoading(false);
    setStep('otp');
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setIsLoading(true);
    setError('');

    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));

    // For demo, accept any 6-digit OTP or the generated one
    if (otp === generatedOtp || otp.length === 6) {
      setAuthenticated(`+91 ${phoneNumber}`);
      setIsLoading(false);
      onSuccess();
      onClose();
    } else {
      setError('Invalid OTP. Please try again.');
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtp('');
    setError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-foreground/60 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md"
          >
            <Card variant="elevated">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Verify to Continue
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={handleClose}>
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent>
                {step === 'phone' ? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        Enter your phone number to receive a one-time password
                      </p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Phone Number
                      </label>
                      <div className="flex gap-2">
                        <div className="h-12 px-4 bg-secondary rounded-lg flex items-center text-muted-foreground font-medium">
                          +91
                        </div>
                        <Input
                          type="tel"
                          maxLength={10}
                          value={phoneNumber}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            setPhoneNumber(value);
                            setError('');
                          }}
                          placeholder="Enter 10-digit number"
                          className="h-12 flex-1"
                        />
                      </div>
                    </div>

                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}

                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleSendOtp}
                      disabled={isLoading || phoneNumber.length !== 10}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending OTP...
                        </>
                      ) : (
                        <>
                          Send OTP
                          <ArrowRight className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      By continuing, you agree to our Terms of Service
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Shield className="w-8 h-8 text-primary" />
                      </div>
                      <p className="text-muted-foreground">
                        Enter the 6-digit OTP sent to
                      </p>
                      <p className="font-semibold text-foreground">+91 {phoneNumber}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Enter OTP
                      </label>
                      <Input
                        type="text"
                        maxLength={6}
                        value={otp}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, '');
                          setOtp(value);
                          setError('');
                        }}
                        placeholder="Enter 6-digit OTP"
                        className="h-12 text-center text-2xl tracking-widest"
                      />
                    </div>

                    {error && (
                      <p className="text-sm text-destructive">{error}</p>
                    )}

                    <div className="bg-secondary/50 rounded-lg p-3 text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">Demo Mode:</p>
                      <p>Check browser console for OTP, or enter any 6 digits to proceed.</p>
                    </div>

                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full"
                      onClick={handleVerifyOtp}
                      disabled={isLoading || otp.length !== 6}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Verifying...
                        </>
                      ) : (
                        'Verify & Continue'
                      )}
                    </Button>

                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => {
                        setStep('phone');
                        setOtp('');
                        setError('');
                      }}
                    >
                      Change Phone Number
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OTPAuthModal;
