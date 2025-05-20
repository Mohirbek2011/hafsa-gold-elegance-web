
import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import ProductList from '@/components/admin/ProductList';
import ProductForm from '@/components/admin/ProductForm';
import { useProducts, Product } from '@/contexts/ProductContext';
import { toast } from '@/components/ui/sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

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
  const [password, setPassword] = useState<string>('');
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  const ADMIN_PASSWORD = '2231';

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      localStorage.setItem('adminAuthenticated', 'true');
      toast.success('Авторизация успешна');
    } else {
      toast.error('Неверный пароль');
    }
  };

  // Проверяем аутентификацию при загрузке
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true';
    setAuthenticated(isAuthenticated);
  }, []);

  // Синхронизируем админ-продукты с продуктами каталога при первой загрузке
  useEffect(() => {
    if (authenticated && adminProducts.length === 0 && catalogProducts.length > 0) {
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
  }, [catalogProducts, adminProducts.length, authenticated]);

  // Добавление нового продукта
  const handleAddProduct = (product: AdminProduct) => {
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

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated');
    setAuthenticated(false);
    toast.success('Выход выполнен успешно');
  };

  if (!authenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Вход в панель администратора</h2>
            <p className="mt-2 text-gray-600">Введите пароль для доступа</p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
                required
              />
            </div>
            <div>
              <Button type="submit" className="w-full bg-gold hover:bg-gold-dark text-black">
                Войти
              </Button>
            </div>
            <div className="text-center">
              <Button 
                type="button" 
                variant="link" 
                onClick={() => navigate('/')}
                className="text-gray-500"
              >
                Вернуться на главную
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Панель Администратора</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="text-red-500 border-red-500 hover:bg-red-50"
          >
            Выйти
          </Button>
        </div>
        
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
