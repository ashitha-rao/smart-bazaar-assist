import { useState } from 'react';
import { motion } from 'framer-motion';
import { Pencil, Trash2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useProducts } from '@/context/ProductContext';
import { Product } from '@/context/CartContext';
import ProductFormModal from './ProductFormModal';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const ProductManagement = () => {
  const { products, updateProduct, deleteProduct } = useProducts();
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const handleEdit = (product: Product) => {
    setEditProduct(product);
  };

  const handleUpdate = (productData: Omit<Product, 'id'>) => {
    if (editProduct) {
      updateProduct(editProduct.id, productData);
    }
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteProduct(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <>
      <Card variant="elevated">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" />
            Product Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-[500px] overflow-y-auto">
            {products.map((product) => {
              const isLowStock = product.stock < 5;
              const daysUntilExpiry = Math.ceil(
                (new Date(product.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
              );
              const isNearExpiry = daysUntilExpiry <= 5;

              return (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`flex items-center justify-between p-3 rounded-xl border ${
                    isLowStock || isNearExpiry ? 'border-destructive/30 bg-destructive/5' : 'border-border bg-card'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-2xl flex-shrink-0">{product.image}</span>
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-foreground truncate">{product.name}</p>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm text-muted-foreground">{product.brand}</span>
                        <Badge variant="outline" className="text-xs">{product.category}</Badge>
                        <span className="text-sm font-bold text-primary">Rs. {product.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Badge variant={isLowStock ? 'destructive' : 'secondary'}>
                      {product.stock} in stock
                    </Badge>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => setDeleteId(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <ProductFormModal
        isOpen={!!editProduct}
        onClose={() => setEditProduct(null)}
        onSubmit={handleUpdate}
        editProduct={editProduct}
      />

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductManagement;
