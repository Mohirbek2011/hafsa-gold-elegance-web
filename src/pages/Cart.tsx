
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useCart } from '@/contexts/CartContext';
import { Trash2, Plus, Minus } from 'lucide-react';
import { toast } from '@/components/ui/sonner';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { sendOrderToTelegram } from '@/services/telegramService';

const Cart: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Подготавливаем данные для отправки в Telegram
      const orderData = {
        items: cart,
        totalPrice,
        customer: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address
        }
      };
      
      // Отправляем данные в Telegram
      // Для реальной работы необходимо заменить botToken и chatId в telegramService.ts
      const success = await sendOrderToTelegram(orderData);
      
      if (success) {
        toast.success(t('orderSuccess'));
        clearCart();
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.error("Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.");
      }
    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error("Произошла ошибка при оформлении заказа. Пожалуйста, попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-3xl font-serif mb-6">{t('emptyCart')}</h1>
          <p className="text-gray-600 mb-8">{t('continueShopping')}</p>
          <Button onClick={() => navigate('/catalog')} className="bg-gold hover:bg-gold-dark text-black">
            {t('catalog')}
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl md:text-4xl font-serif font-medium mb-8">{t('cart')}</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Товары в корзине */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 text-gray-700">
                  <tr>
                    <th className="text-left py-4 px-4 font-medium">{t('cart')}</th>
                    <th className="text-center py-4 px-2 font-medium">{t('totalPrice')}</th>
                    <th className="text-center py-4 px-2 font-medium">{t('cart')}</th>
                    <th className="text-right py-4 px-4 font-medium">{t('totalPrice')}</th>
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
                            {item.weight && <p className="text-sm text-gray-500">Вес: {item.weight}г</p>}
                            {item.purity && <p className="text-sm text-gray-500">Проба: {item.purity}</p>}
                            {item.size && <p className="text-sm text-gray-500">Размер: {item.size}</p>}
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
                {t('continueShopping')}
              </Button>
              <Button 
                variant="outline" 
                onClick={clearCart}
                className="text-red-500 border-red-500 hover:bg-red-50"
              >
                {t('clearCart')}
              </Button>
            </div>
          </div>

          {/* Оформление заказа */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-xl font-medium mb-4">{t('orderDetails')}</h2>
              
              <div className="space-y-2 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {t('cart')} ({cart.reduce((acc, item) => acc + item.quantity, 0)})
                  </span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-medium">
                  <span>{t('totalPrice')}</span>
                  <span className="text-lg">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    {t('yourName')} *
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
                    {t('email')} *
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
                    {t('phone')} *
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
                    {t('address')} *
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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Отправка..." : t('submitOrder')}
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
