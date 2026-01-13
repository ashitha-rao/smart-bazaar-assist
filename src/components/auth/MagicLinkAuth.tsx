import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Loader2, CheckCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLanguage } from '@/context/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface MagicLinkAuthProps {
  onClose?: () => void;
  redirectTo?: string;
}

const MagicLinkAuth = ({ onClose, redirectTo = '/' }: MagicLinkAuthProps) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSendMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: t.error || 'Error',
        description: t.pleaseEnterEmail || 'Please enter your email address',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}${redirectTo}`,
        },
      });

      if (error) throw error;

      setIsSent(true);
      toast({
        title: t.magicLinkSent || 'Magic Link Sent!',
        description: t.checkYourEmail || 'Check your email for the login link',
      });
    } catch (error: any) {
      console.error('Magic link error:', error);
      toast({
        title: t.error || 'Error',
        description: error.message || t.failedToSendLink || 'Failed to send magic link',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSent) {
    return (
      <Card variant="elevated" className="w-full max-w-md mx-auto">
        <CardContent className="pt-8 pb-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 200 }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-primary" />
            </div>
          </motion.div>
          <h2 className="font-display text-2xl font-bold text-foreground mb-2">
            {t.checkYourInbox || 'Check Your Inbox'}
          </h2>
          <p className="text-muted-foreground mb-4">
            {t.magicLinkSentTo || "We've sent a magic link to"}
          </p>
          <p className="font-semibold text-foreground mb-6">{email}</p>
          <p className="text-sm text-muted-foreground mb-6">
            {t.clickLinkToLogin || 'Click the link in the email to log in'}
          </p>
          <Button variant="outline" onClick={() => setIsSent(false)}>
            {t.tryDifferentEmail || 'Try a different email'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card variant="elevated" className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Sparkles className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="font-display text-2xl">
          {t.signInToCheckout || 'Sign in to Checkout'}
        </CardTitle>
        <CardDescription>
          {t.enterEmailForMagicLink || 'Enter your email to receive a magic link'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSendMagicLink} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              {t.email || 'Email Address'}
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="pl-10 h-12"
                disabled={isLoading}
              />
            </div>
          </div>
          
          <Button
            type="submit"
            variant="hero"
            className="w-full"
            size="lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                {t.sending || 'Sending...'}
              </>
            ) : (
              <>
                <Mail className="w-5 h-5 mr-2" />
                {t.sendMagicLink || 'Send Magic Link'}
              </>
            )}
          </Button>

          {onClose && (
            <Button
              type="button"
              variant="ghost"
              className="w-full"
              onClick={onClose}
            >
              {t.cancel || 'Cancel'}
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default MagicLinkAuth;
