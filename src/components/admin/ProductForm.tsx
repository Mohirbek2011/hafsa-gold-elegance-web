
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/sonner';
import { AdminProduct } from '@/pages/admin/AdminPanel';

// Определяем схему валидации
const productSchema = z.object({
  name: z.string().min(2, { message: 'Название должно содержать минимум 2 символа' }),
  price: z.coerce.number().positive({ message: 'Цена должна быть положительным числом' }),
  weight: z.coerce.number().positive({ message: 'Вес должен быть положительным числом' }),
  category: z.string().min(1, { message: 'Категория обязательна' }),
  purity: z.string().min(1, { message: 'Проба обязательна' }),
  size: z.string(),
  imageSrc: z.string().url({ message: 'Должен быть действительный URL изображения' }),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  onSubmit: (data: AdminProduct) => void;
  initialValues?: AdminProduct;
  onCancel?: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, initialValues, onCancel }) => {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: initialValues || {
      name: '',
      price: 0,
      weight: 0,
      category: '',
      purity: '',
      size: '',
      imageSrc: '',
    },
  });

  const handleSubmit = (values: ProductFormData) => {
    if (initialValues) {
      // Обновляем существующий товар
      onSubmit({ 
        ...values, 
        id: initialValues.id 
      });
      toast.success('Товар обновлен');
    } else {
      // Добавляем новый товар
      onSubmit(values as AdminProduct);
      toast.success('Товар добавлен');
      
      form.reset({
        name: '',
        price: 0,
        weight: 0,
        category: '',
        purity: '',
        size: '',
        imageSrc: '',
      });
    }
  };

  const categoryOptions = ['Кольца', 'Серьги', 'Ожерелья', 'Браслеты', 'Подвески', 'Наборы'];
  const purityOptions = ['585', '750', '875', '916', '958', '999'];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6 bg-white p-6 rounded-md shadow-sm">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название товара</FormLabel>
              <FormControl>
                <Input placeholder="Золотое кольцо с бриллиантом" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Цена ($)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="1000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Вес (г)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" placeholder="5.2" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категория</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...field}
                  >
                    <option value="" disabled>Выберите категорию</option>
                    {categoryOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="purity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Проба</FormLabel>
                <FormControl>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    {...field}
                  >
                    <option value="" disabled>Выберите пробу</option>
                    {purityOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))}
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Размер</FormLabel>
                <FormControl>
                  <Input placeholder="16.5" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        
        <FormField
          control={form.control}
          name="imageSrc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL изображения</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
              {field.value && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-1">Предпросмотр:</p>
                  <img 
                    src={field.value} 
                    alt="Предпросмотр" 
                    className="h-24 w-24 object-cover rounded-md border"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100x100?text=Ошибка';
                    }}
                  />
                </div>
              )}
            </FormItem>
          )}
        />
        
        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Отмена
            </Button>
          )}
          <Button type="submit" className="bg-gold hover:bg-gold/90 text-black">
            {initialValues ? 'Обновить товар' : 'Добавить товар'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProductForm;
