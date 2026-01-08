import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, Trash2, CreditCard, ArrowLeft, Sparkles, Mail, MessageCircle, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import Navbar from '@/components/Navbar';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { getRecommendations } from '@/data/products';
import OTPAuthModal from '@/components/checkout/OTPAuthModal';
import { generateBillPDF, generateWhatsAppMessage } from '@/lib/generateBill';

const Checkout = () => {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart();
  const { isAuthenticated, email } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [pendingPayment, setPendingPayment] = useState(false);

  const recommendations = getRecommendations(items);
  const gst = totalPrice * 0.05;
  const finalTotal = totalPrice + gst;

  const processPayment = () => {
    setShowScanner(true);
    setIsProcessing(true);

    // Simulate barcode scanning and payment
    setTimeout(() => {
      setShowScanner(false);
      setIsComplete(true);
      
      // Confetti explosion!
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#34D399', '#FED7AA', '#DDD6FE'],
      });

      setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        });
      }, 250);
    }, 3000);
  };

  const handlePayment = () => {
    if (!isAuthenticated) {
      setPendingPayment(true);
      setShowOTPModal(true);
    } else {
      processPayment();
    }
  };

  const handleOTPSuccess = () => {
    if (pendingPayment) {
      setPendingPayment(false);
      processPayment();
    }
  };

  const handleDownloadBill = () => {
    generateBillPDF({
      items,
      subtotal: totalPrice,
      gst,
      total: finalTotal,
      email: email || 'Guest',
    });
  };

  const handleShareWhatsApp = () => {
    const message = generateWhatsAppMessage({
      items,
      subtotal: totalPrice,
      gst,
      total: finalTotal,
      email: email || 'Guest',
    });
    
    // Open WhatsApp with pre-filled message (user can select contact)
    const whatsappUrl = `https://wa.me/?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  if (isComplete) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-12 px-4">
          <div className="container mx-auto max-w-2xl">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center"
            >
              {/* Trolley Animation */}
              <motion.div
                initial={{ x: '-100vw' }}
                animate={{ x: '100vw' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
                className="text-6xl mb-8"
              >
                🛒
              </motion.div>

              <div className="text-8xl mb-6">✅</div>
              <h1 className="font-display text-3xl font-bold text-foreground mb-4">
                Payment Successful!
              </h1>
              <p className="text-muted-foreground mb-4">
                Thank you for shopping with Smart Bazaar
              </p>
              
              {email && (
                <p className="text-sm text-muted-foreground mb-8">
                  <Mail className="w-4 h-4 inline mr-1" />
                  Bill sent to: {email}
                </p>
              )}

              <Card variant="elevated" className="mb-8">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-4">Order Summary</h3>
                  <div className="space-y-2 text-sm">
                    {items.map(item => (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-muted-foreground">{item.name} x{item.quantity}</span>
                        <span className="text-foreground">Rs. {item.price * item.quantity}</span>
                      </div>
                    ))}
                    <div className="h-px bg-border my-3" />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="text-foreground">Rs. {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">GST (5%)</span>
                      <span className="text-foreground">Rs. {gst.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2">
                      <span className="text-foreground">Total</span>
                      <span className="text-primary">Rs. {finalTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button variant="hero" size="lg" className="w-full" onClick={handleDownloadBill}>
                    <Download className="w-5 h-5 mr-2" />
                    Download Bill (PDF)
                  </Button>
                </motion.div>
                
                {email && (
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="w-full bg-green-500/10 border-green-500/30 text-green-600 hover:bg-green-500/20"
                    onClick={handleShareWhatsApp}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Share Bill via WhatsApp
                  </Button>
                )}
                
                <Link to="/products" className="w-full">
                  <Button variant="outline" size="lg" className="w-full" onClick={() => {
                    clearCart();
                    setIsComplete(false);
                    setIsProcessing(false);
                  }}>
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      <Navbar />

      {/* OTP Auth Modal */}
      <OTPAuthModal
        isOpen={showOTPModal}
        onClose={() => {
          setShowOTPModal(false);
          setPendingPayment(false);
        }}
        onSuccess={handleOTPSuccess}
      />

      {/* Barcode Scanner Overlay */}
      <AnimatePresence>
        {showScanner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-foreground/80 flex items-center justify-center"
          >
            <div className="text-center">
              {/* Scanner Box */}
              <div className="relative w-64 h-40 border-4 border-primary rounded-xl mb-6 overflow-hidden">
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-destructive"
                  initial={{ top: 0 }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-mono text-primary text-sm">|||||||||||||||</span>
                </div>
              </div>
              <p className="text-primary-foreground font-medium">Scanning items...</p>

              {/* Falling Coins */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute text-3xl"
                    initial={{ 
                      top: '-10%',
                      left: `${10 + i * 8}%`,
                      rotate: 0,
                    }}
                    animate={{
                      top: '110%',
                      rotate: 720,
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      ease: 'linear',
                    }}
                  >
                    🪙
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <Link to="/products" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground">
              Your Cart
            </h1>
          </motion.div>

          {items.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <span className="text-8xl mb-6 block">🛒</span>
              <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Start adding some delicious items!
              </p>
              <Link to="/products">
                <Button variant="hero" size="lg">
                  Browse Products
                </Button>
              </Link>
            </motion.div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20, height: 0 }}
                    >
                      <Card variant="default" className="overflow-hidden">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-4">
                            {/* Product Image */}
                            <div className="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center text-3xl flex-shrink-0">
                              {item.image}
                            </div>

                            {/* Details */}
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-foreground truncate">
                                {item.name}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {item.brand}
                              </p>
                              <p className="font-bold text-primary">
                                Rs. {item.price}
                              </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-8 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>

                            {/* Remove */}
                            <Button
                              variant="ghost"
                              size="icon"
                              className="text-destructive hover:bg-destructive/10"
                              onClick={() => removeFromCart(item.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Recommendations */}
                {recommendations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8"
                  >
                    <div className="flex items-center gap-2 mb-4">
                      <Sparkles className="w-5 h-5 text-primary" />
                      <h3 className="font-display font-semibold text-foreground">
                        Frequently Bought Together
                      </h3>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {recommendations.map((product) => (
                        <Card key={product.id} variant="product" className="p-3">
                          <div className="text-3xl text-center mb-2">{product.image}</div>
                          <p className="text-sm font-medium text-foreground truncate">
                            {product.name}
                          </p>
                          <p className="text-sm text-primary font-bold">
                            Rs. {product.price}
                          </p>
                        </Card>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card variant="elevated" className="sticky top-24">
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Verified Email Display */}
                    {isAuthenticated && email && (
                      <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-xl">
                        <Mail className="w-4 h-4 text-primary" />
                        <span className="text-sm text-foreground truncate">{email}</span>
                        <Badge variant="secondary" className="ml-auto text-xs">Verified</Badge>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-muted-foreground">
                      <span>Subtotal ({items.length} items)</span>
                      <span>Rs. {totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>GST (5%)</span>
                      <span>Rs. {gst.toFixed(2)}</span>
                    </div>
                    <div className="h-px bg-border" />
                    <div className="flex justify-between font-bold text-lg text-foreground">
                      <span>Total</span>
                      <span>Rs. {finalTotal.toFixed(2)}</span>
                    </div>

                    <Button
                      variant="hero"
                      size="lg"
                      className="w-full mt-6"
                      onClick={handlePayment}
                      disabled={isProcessing}
                    >
                      <CreditCard className="w-5 h-5 mr-2" />
                      {isProcessing ? 'Processing...' : isAuthenticated ? 'Pay Now' : 'Verify & Pay'}
                    </Button>

                    {!isAuthenticated && (
                      <p className="text-xs text-muted-foreground text-center">
                        Phone verification required before payment
                      </p>
                    )}
                    
                    <p className="text-xs text-muted-foreground text-center">
                      Secure payment powered by Smart Bazaar
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Checkout;
