
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';
import { useProducts, Product } from '@/contexts/ProductContext';
import { toast } from '@/components/ui/sonner';

// Определяем интерфейс для продукта в админке
export interface AdminProduct {
  id: string;
  name: string;
  price: number;
  weight: number; // вес в граммах
  category: string;
  purity: string; // проба
  size: string; // размер
  imageSrc: string;
}

const AdminPanel: React.FC = () => {
  const { products: catalogProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  const [adminProducts, setAdminProducts] = useState<AdminProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Синхронизируем админ-продукты с продуктами каталога при первой загрузке
  useEffect(() => {
    if (adminProducts.length === 0 && catalogProducts.length > 0) {
      const mappedProducts: AdminProduct[] = catalogProducts.map(product => ({
        id: product.id,
        name: product.name,
        price: product.price,
        weight: product.weight || 0,
        category: product.category,
        purity: product.purity || '',
        size: product.size || '',
        imageSrc: product.imageSrc
      }));
      setAdminProducts(mappedProducts);
    }
  }, [catalogProducts, adminProducts.length]);

  // Добавление нового продукта
  const handleAddProduct = (product: Omit<AdminProduct, 'id'>) => {
    const newProduct: AdminProduct = {
      ...product,
      id: `product-${Date.now()}`,
    };
    
    // Добавляем в админ-список
    setAdminProducts([...adminProducts, newProduct]);
    
    // Добавляем в каталог
    addProduct({
      ...newProduct,
      isNew: true // Помечаем как новый товар
    });
    
    toast.success('Товар успешно добавлен в каталог');
  };

  // Обновление существующего продукта
  const handleUpdateProduct = (updatedProduct: AdminProduct) => {
    // Обновляем в админ-списке
    setAdminProducts(
      adminProducts.map((product) => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    
    // Обновляем в каталоге
    updateProduct({
      ...updatedProduct,
      isNew: false // при обновлении товар перестает быть новым
    });
    
    setEditingProduct(null);
    toast.success('Товар успешно обновлен в каталоге');
  };

  // Удаление продукта
  const handleDeleteProduct = (id: string) => {
    // Удаляем из админ-списка
    setAdminProducts(adminProducts.filter((product) => product.id !== id));
    
    // Удаляем из каталога
    deleteProduct(id);
    
    toast.success('Товар удален из каталога');
  };

  // Начало редактирования продукта
  const handleEditProduct = (product: AdminProduct) => {
    setEditingProduct(product);
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Панель Администратора</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? 'Редактировать товар' : 'Добавить новый товар'}
            </h2>
            <ProductForm 
              onSubmit={editingProduct ? handleUpdateProduct : handleAddProduct}
              initialValues={editingProduct || undefined}
              onCancel={editingProduct ? () => setEditingProduct(null) : undefined}
            />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Список товаров</h2>
            <ProductList 
              products={adminProducts}
              onEdit={handleEditProduct}
              onDelete={handleDeleteProduct}
            />
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminPanel;
