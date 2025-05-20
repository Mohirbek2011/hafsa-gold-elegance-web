
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // В реальном приложении здесь был бы запрос к API
    toast.success("Заказ успешно оформлен!");
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif mb-6">Ваша корзина пуста</h1>
          <p className="text-gray-600 mb-8">Посетите наш каталог, чтобы найти прекрасные ювелирные изделия</p>
          <Button onClick={() => navigate('/catalog')} className="bg-gold hover:bg-gold-dark text-black">
            Перейти в каталог
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-serif font-medium mb-8">Корзина</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Товары в корзине */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left py-4 px-4 font-medium">Товар</th>
                    <th className="text-center py-4 px-2 font-medium">Цена</th>
                    <th className="text-center py-4 px-2 font-medium">Количество</th>
                    <th className="text-right py-4 px-4 font-medium">Всего</th>
                    <th className="py-4 px-2 font-medium"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td className="py-4 px-4">
                        <div className="flex items-center">
                          <img 
                            src={item.imageSrc} 
                            alt={item.name} 
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="ml-4">
                            <h3 className="font-medium">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-2 text-center">${item.price.toLocaleString()}</td>
                      <td className="py-4 px-2">
                        <div className="flex items-center justify-center">
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="mx-3 font-medium">{item.quantity}</span>
                          <Button 
                            variant="outline" 
                            size="icon" 
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-medium">
                        ${(item.price * item.quantity).toLocaleString()}
                      </td>
                      <td className="py-4 px-2">
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="text-gray-500 hover:text-red-500"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Кнопки действий */}
            <div className="mt-4 flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => navigate('/catalog')}
              >
                Продолжить покупки
              </Button>
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                Очистить корзину
              </Button>
            </div>
          </div>

          {/* Оформление заказа */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium mb-4">Детали заказа</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Товары ({cart.reduce((acc, item) => acc + item.quantity, 0)})</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>Итого</span>
                  <span className="text-lg">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше имя *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Телефон *
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Адрес доставки *
                  </label>
                  <Textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gold hover:bg-gold-dark text-black mt-4"
                >
                  Оформить заказ
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
