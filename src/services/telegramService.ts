
import { CartItem } from '@/contexts/CartContext';

interface OrderData {
  items: CartItem[];
  totalPrice: number;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
}

// Конфигурация для Telegram бота
interface TelegramConfig {
  botToken: string;
  chatId: string;
}

// В реальном приложении эти данные должны храниться на сервере
const defaultConfig: TelegramConfig = {
  botToken: 'YOUR_TELEGRAM_BOT_TOKEN',
  chatId: 'YOUR_TELEGRAM_CHAT_ID'
};

/**
 * Отправка заказа в Telegram
 * Для работы нужно заменить botToken и chatId в коде или передать их при вызове
 */
export const sendOrderToTelegram = async (
  orderData: OrderData,
  config: TelegramConfig = defaultConfig
): Promise<boolean> => {
  try {
    const { botToken, chatId } = config;
    
    if (!botToken || !chatId) {
      console.error('Missing Telegram configuration. Please provide botToken and chatId.');
      return false;
    }
    
    // Формируем текст сообщения
    let message = `🛒 *НОВЫЙ ЗАКАЗ*\n\n`;
    message += `👤 *Клиент*:\n`;
    message += `Имя: ${orderData.customer.name}\n`;
    message += `Email: ${orderData.customer.email}\n`;
    message += `Телефон: ${orderData.customer.phone}\n`;
    message += `Адрес: ${orderData.customer.address}\n\n`;
    
    message += `📦 *Товары*:\n`;
    orderData.items.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - ${item.quantity} шт. x $${item.price} = $${item.price * item.quantity}\n`;
      if (item.weight) message += `   Вес: ${item.weight}г\n`;
      if (item.purity) message += `   Проба: ${item.purity}\n`;
      if (item.size) message += `   Размер: ${item.size}\n`;
    });
    
    message += `\n💰 *Итого*: $${orderData.totalPrice}\n`;
    
    // URL для Telegram API
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    // Отправляем запрос к Telegram API
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    
    const data = await response.json();
    
    if (data.ok) {
      console.log('Order sent to Telegram successfully');
      return true;
    } else {
      console.error('Failed to send order to Telegram:', data);
      return false;
    }
  } catch (error) {
    console.error('Error sending order to Telegram:', error);
    return false;
  }
};
