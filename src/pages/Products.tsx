import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Mic, Camera } from 'lucide-react';
import Navbar from '@/components/Navbar';
import FloatingEmojis from '@/components/FloatingEmojis';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/context/ProductContext';
import { categories } from '@/data/products';
import { useLanguage } from '@/context/LanguageContext';

const Products = () => {
  const { products } = useProducts();
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isListening, setIsListening] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = 'en-US';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = () => setIsListening(true);
      recognition.onend = () => setIsListening(false);
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
      };

      recognition.start();
    } else {
      alert('Voice search is not supported in your browser.');
    }
  };

  // Map categories to translated names
  const getCategoryLabel = (category: string): string => {
    const categoryMap: Record<string, keyof typeof t> = {
      'All': 'all',
      'Bakery': 'bakery',
      'Dairy': 'dairy',
      'Fruits': 'fruits',
      'Vegetables': 'vegetables',
      'Spreads': 'spreads',
      'Beverages': 'beverages',
      'Grains': 'grains',
      'Snacks': 'snacks',
      'Cooking': 'cooking',
    };
    const key = categoryMap[category];
    return key ? t[key] : category;
  };

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingEmojis />
      <Navbar />

      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              {t.browseProducts}
            </h1>
            <p className="text-muted-foreground">
              {filteredProducts.length} {t.productsAvailable}
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 space-y-4"
          >
            {/* Search Bar */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder={t.searchForProducts}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 rounded-xl bg-card border-border/50 text-foreground"
                />
              </div>
              <Button
                variant={isListening ? 'hero' : 'outline'}
                size="icon"
                className="h-12 w-12"
                onClick={handleVoiceSearch}
              >
                <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse' : ''}`} />
              </Button>
              <Button variant="outline" size="icon" className="h-12 w-12">
                <Camera className="w-5 h-5" />
              </Button>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={`cursor-pointer whitespace-nowrap transition-all ${
                    selectedCategory === category
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {getCategoryLabel(category)}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <span className="text-6xl mb-4 block">🔍</span>
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {t.noProductsFound}
              </h3>
              <p className="text-muted-foreground">
                {t.tryAdjusting}
              </p>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Products;