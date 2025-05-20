
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';

// Определяем интерфейс для продукта
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
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);

  // Добавление нового продукта
  const handleAddProduct = (product: Omit<AdminProduct, 'id'>) => {
    const newProduct = {
      ...product,
      id: `product-${Date.now()}`,
    };
    setProducts([...products, newProduct]);
  };

  // Обновление существующего продукта
  const handleUpdateProduct = (updatedProduct: AdminProduct) => {
    setProducts(
      products.map((product) => 
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
    setEditingProduct(null);
  };

  // Удаление продукта
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
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
              products={products}
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
