import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Clock, ShoppingBag, Mic, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Index = () => {
  const features = [
    {
      icon: Zap,
      title: 'No Queues',
      description: 'Skip the long checkout lines with our smart self-checkout system.',
      color: 'from-bazaar-mint to-primary',
    },
    {
      icon: Clock,
      title: 'Faster Checkout',
      description: 'Scan, pay, and go in under 60 seconds with mobile payments.',
      color: 'from-bazaar-peach to-bazaar-coral',
    },
    {
      icon: ShoppingBag,
      title: 'Smart Cart',
      description: 'Real-time price tracking and smart recommendations as you shop.',
      color: 'from-bazaar-lavender to-accent-foreground',
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <Navbar />
      
      {/* Hero Section with Photorealistic Background */}
      <section className="relative pt-32 pb-20 px-4 min-h-[90vh] flex items-center">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=1920&q=80')`,
            filter: 'blur(3px)',
          }}
        />
        
        {/* Gradient Overlay - Left to Right Dark */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to right, rgba(30, 30, 30, 0.92), rgba(30, 30, 30, 0.7), rgba(30, 30, 30, 0.3), transparent)',
          }}
        />

        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6"
            >
              <span className="text-sm font-medium text-white">
                The Future of Grocery Shopping
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Welcome to{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bazaar-mint to-primary">Smart Bazaar</span>
              <br />
              Assistant
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-white/80 max-w-xl mb-10">
              Experience seamless grocery shopping with AI-powered search, 
              smart recommendations, and lightning-fast checkout.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/products">
                <Button variant="hero" size="xl">
                  Start Shopping
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="xl"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white"
              >
                <Mic className="w-5 h-5 mr-2" />
                Voice Search
              </Button>
            </div>

            {/* AI Search Hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-8 flex items-center gap-6 text-sm text-white/60"
            >
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-primary" />
                <span>Voice Search</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/60" />
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-primary" />
                <span>Image Search</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-background to-muted/50">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Why Choose Smart Bazaar?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Revolutionizing your grocery experience with cutting-edge technology
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="feature" className="h-full p-8 group hover:shadow-elevated transition-all duration-300">
                  <CardContent className="p-0">
                    {/* Icon */}
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <feature.icon className="w-8 h-8 text-primary-foreground" />
                    </div>

                    {/* Content */}
                    <h3 className="font-display text-xl font-bold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: '500+', label: 'Products' },
              { value: '60s', label: 'Avg Checkout' },
              { value: '99%', label: 'Satisfaction' },
              { value: '24/7', label: 'Support' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border">
        <div className="container mx-auto max-w-6xl text-center">
          <p className="text-sm text-muted-foreground">
            © 2026 Smart Bazaar Assistant. Built for modern shoppers.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
