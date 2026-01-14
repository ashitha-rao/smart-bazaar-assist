import { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, AlertTriangle, Package, Users, TrendingUp, Clock, Plus } from 'lucide-react';
import Navbar from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useProducts } from '@/context/ProductContext';
import { useLanguage } from '@/context/LanguageContext';
import ProductFormModal from '@/components/admin/ProductFormModal';
import ProductManagement from '@/components/admin/ProductManagement';
import { Product } from '@/context/CartContext';
import HelpRequestsPanel from '@/components/admin/HelpRequestsPanel';
import CounterManagement from '@/components/admin/CounterManagement';
import CustomerDashboard from '@/components/admin/CustomerDashboard';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const { products, addProduct } = useProducts();
  const { t } = useLanguage();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'smartbazaar.app26@gmail.com' && password === 'Smart@Bazaar2026') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError(t.invalidCredentials);
    }
  };

  const handleAddProduct = (productData: Omit<Product, 'id'>) => {
    addProduct(productData);
  };

  const lowStockProducts = products.filter(p => p.stock < 5);
  const nearExpiryProducts = products.filter(p => {
    const daysUntilExpiry = Math.ceil(
      (new Date(p.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
    );
    return daysUntilExpiry <= 5;
  });

  // Mock customer data
  const customerInsights = [
    { phone: '+91 98765 43210', time: '10:30 AM', total: 'Rs. 542' },
    { phone: '+91 87654 32109', time: '11:15 AM', total: 'Rs. 1,250' },
    { phone: '+91 76543 21098', time: '12:45 PM', total: 'Rs. 328' },
    { phone: '+91 65432 10987', time: '2:20 PM', total: 'Rs. 875' },
    { phone: '+91 54321 09876', time: '3:55 PM', total: 'Rs. 1,680' },
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-24 pb-12 px-4 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <Card variant="elevated">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>{t.adminLogin}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t.email}
                    </label>
                    <Input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      className="h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      {t.password}
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="h-12"
                    />
                  </div>
                  {error && (
                    <p className="text-sm text-destructive">{error}</p>
                  )}
                  <Button type="submit" variant="hero" className="w-full" size="lg">
                    {t.signIn}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header with Add Product Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {t.adminDashboard}
              </h1>
              <p className="text-muted-foreground">
                {t.manageInventory}
              </p>
            </div>
            <Button variant="hero" size="lg" onClick={() => setShowAddModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              {t.addProduct}
            </Button>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {[
              { icon: Package, label: t.totalProducts, value: products.length, color: 'bg-primary' },
              { icon: AlertTriangle, label: t.lowStock, value: lowStockProducts.length, color: 'bg-destructive' },
              { icon: Clock, label: t.nearExpiry, value: nearExpiryProducts.length, color: 'bg-warning' },
              { icon: Users, label: t.customersToday, value: customerInsights.length, color: 'bg-bazaar-lavender' },
            ].map((stat, index) => (
              <Card key={stat.label} variant="default">
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Low Stock Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-destructive">
                    <AlertTriangle className="w-5 h-5" />
                    {t.lowStockAlert}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {lowStockProducts.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t.allProductsWellStocked}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {lowStockProducts.map((product) => (
                        <div
                          key={product.id}
                          className="flex items-center justify-between p-3 bg-destructive/10 rounded-xl"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-secondary">
                              {product.image.startsWith('http') ? (
                                <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                              ) : (
                                <span className="text-2xl">{product.image}</span>
                              )}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{product.name}</p>
                              <p className="text-sm text-muted-foreground">{product.brand}</p>
                            </div>
                          </div>
                          <Badge variant="destructive">
                            {product.stock} {t.left}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Near Expiry Alert */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card variant="elevated">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-warning">
                    <Clock className="w-5 h-5" />
                    {t.nearExpiryItems}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {nearExpiryProducts.length === 0 ? (
                    <p className="text-muted-foreground text-center py-4">
                      {t.noProductsNearExpiry}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {nearExpiryProducts.map((product) => {
                        const daysLeft = Math.ceil(
                          (new Date(product.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
                        );
                        return (
                          <div
                            key={product.id}
                            className="flex items-center justify-between p-3 bg-warning/10 rounded-xl"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center bg-secondary">
                                {product.image.startsWith('http') ? (
                                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                ) : (
                                  <span className="text-2xl">{product.image}</span>
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-foreground">{product.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {t.expires} {product.expiryDate}
                                </p>
                              </div>
                            </div>
                            <Badge className="bg-warning text-warning-foreground">
                              {daysLeft} {t.days}
                            </Badge>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Help Requests Panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="mt-8"
          >
            <HelpRequestsPanel />
          </motion.div>

          {/* Customer Insights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8"
          >
            <Card variant="elevated">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  {t.customerInsights} ({t.today})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t.phoneNumber}</TableHead>
                      <TableHead>{t.time}</TableHead>
                      <TableHead className="text-right">{t.totalSpend}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {customerInsights.map((customer, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{customer.phone}</TableCell>
                        <TableCell>{customer.time}</TableCell>
                        <TableCell className="text-right font-bold text-primary">
                          {customer.total}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </motion.div>

          {/* Counter Management */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8"
          >
            <CounterManagement />
          </motion.div>

          {/* Customer Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8"
          >
            <CustomerDashboard />
          </motion.div>

          {/* Product Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="mt-8"
          >
            <ProductManagement />
          </motion.div>

          {/* Logout */}
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => setIsAuthenticated(false)}
            >
              {t.signOut}
            </Button>
          </div>
        </div>
      </main>

      {/* Add Product Modal */}
      <ProductFormModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={handleAddProduct}
      />
    </div>
  );
};

export default Admin;