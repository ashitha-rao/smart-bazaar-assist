import { useState } from 'react';
import { motion } from 'framer-motion';
import { HandHelping, MapPin, Package, MessageSquare, Check } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/context/LanguageContext';
import { useToast } from '@/hooks/use-toast';

interface FindHelpButtonProps {
  currentAisle?: string;
  productName?: string;
}

const FindHelpButton = ({ currentAisle, productName }: FindHelpButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [requestType, setRequestType] = useState<'aisle' | 'product' | 'general'>('aisle');
  const [aisleLocation, setAisleLocation] = useState(currentAisle || '');
  const [product, setProduct] = useState(productName || '');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { t } = useLanguage();
  const { toast } = useToast();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Generate a customer identifier (could be session-based or device-based)
    const customerId = localStorage.getItem('smartbazaar-customer-id') || 
      `customer-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
    localStorage.setItem('smartbazaar-customer-id', customerId);

    const { error } = await supabase.from('help_requests').insert({
      request_type: requestType,
      aisle_location: aisleLocation || null,
      product_name: product || null,
      message: message || null,
      customer_identifier: customerId,
    });

    setIsSubmitting(false);

    if (error) {
      toast({ title: t.errorSendingRequest || 'Error sending request', variant: 'destructive' });
      return;
    }

    setIsSuccess(true);
    toast({ title: t.helpRequestSent || 'Help request sent! Staff will assist you shortly.' });

    setTimeout(() => {
      setIsOpen(false);
      setIsSuccess(false);
      setMessage('');
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <HandHelping className="w-4 h-4" />
          {t.findHelp || 'Find Help'}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <HandHelping className="w-5 h-5 text-primary" />
            {t.silentAssistance || 'Silent Assistance'}
          </DialogTitle>
        </DialogHeader>

        {isSuccess ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="py-8 text-center"
          >
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <p className="font-semibold text-foreground">
              {t.helpOnTheWay || 'Help is on the way!'}
            </p>
            <p className="text-sm text-muted-foreground mt-2">
              {t.staffWillAssist || 'A staff member will assist you shortly.'}
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              {t.requestHelpSilently || 'Request help without talking. Staff will come to you.'}
            </p>

            <RadioGroup
              value={requestType}
              onValueChange={(value) => setRequestType(value as 'aisle' | 'product' | 'general')}
            >
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="aisle" id="aisle" />
                <Label htmlFor="aisle" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <MapPin className="w-4 h-4 text-primary" />
                  {t.helpInAisle || 'Help in an aisle'}
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="product" id="product" />
                <Label htmlFor="product" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <Package className="w-4 h-4 text-primary" />
                  {t.helpFindingProduct || 'Help finding a product'}
                </Label>
              </div>
              <div className="flex items-center space-x-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer">
                <RadioGroupItem value="general" id="general" />
                <Label htmlFor="general" className="flex items-center gap-2 flex-1 cursor-pointer">
                  <MessageSquare className="w-4 h-4 text-primary" />
                  {t.generalAssistance || 'General assistance'}
                </Label>
              </div>
            </RadioGroup>

            {requestType === 'aisle' && (
              <div>
                <Label className="text-sm font-medium">{t.whichAisle || 'Which aisle are you in?'}</Label>
                <Input
                  value={aisleLocation}
                  onChange={(e) => setAisleLocation(e.target.value)}
                  placeholder="e.g., A1, B2, C3"
                  className="mt-1"
                />
              </div>
            )}

            {requestType === 'product' && (
              <div>
                <Label className="text-sm font-medium">{t.whatProduct || 'What product are you looking for?'}</Label>
                <Input
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder={t.enterProductName || 'Enter product name'}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label className="text-sm font-medium">{t.additionalMessage || 'Additional message (optional)'}</Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.describeNeed || 'Describe what you need help with...'}
                className="mt-1"
                rows={2}
              />
            </div>

            <Button
              onClick={handleSubmit}
              variant="hero"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t.sending || 'Sending...'}
                </span>
              ) : (
                <>
                  <HandHelping className="w-4 h-4 mr-2" />
                  {t.requestHelp || 'Request Help'}
                </>
              )}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default FindHelpButton;
