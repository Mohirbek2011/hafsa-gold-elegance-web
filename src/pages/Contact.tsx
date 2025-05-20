
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // В реальном приложении вы бы отправили данные на сервер
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время.",
    });
    // Сброс формы
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Layout>
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium">Связаться с нами</h1>
          <p className="text-gray-600 mt-2">
            Мы будем рады услышать вас
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Контактная информация */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif mb-6">Свяжитесь с нами</h2>
            <p className="text-gray-600 mb-8">
              Если у вас есть вопросы о наших продуктах, услугах или любые другие вопросы, наша команда готова ответить на все ваши вопросы.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Phone size={18} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Телефон</h3>
                  <p className="text-gray-600 mt-1">+998 97 944 9999</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Mail size={18} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600 mt-1">info@hafsagold.com</p>
                  <p className="text-gray-600">support@hafsagold.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Адрес</h3>
                  <p className="text-gray-600 mt-1">
                    Узбекистан, г. Ташкент<br />
                    Чорсу Голд дўкони<br />
                    Ориентир - Тохир Зухра мажмуаси
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Clock size={18} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Часы работы</h3>
                  <p className="text-gray-600 mt-1">
                    Понедельник - Пятница: 9:00 - 20:00<br />
                    Суббота: 10:00 - 18:00<br />
                    Воскресенье: Выходной
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Форма связи */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif mb-6">Отправить сообщение</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email адрес *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Номер телефона
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Тема *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Ваше сообщение *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <Button type="submit" className="bg-gold hover:bg-gold-dark text-black w-full sm:w-auto">
                  Отправить сообщение
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-serif mb-6">Где нас найти</h2>
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-gray-200">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.5124909954396!2d69.23610531642426!3d41.31399540923998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38ae8a4a6c5dde17%3A0x9de355f970836ae6!2z0JHQsNC30LDRgCDQp9C-0YDRgdGDLCBUYXNoa2VudCwgVXpiZWtpc3Rhbg!5e0!3m2!1sru!2s!4v1715446051570!5m2!1sru!2s"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Hafsa Gold Location"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
