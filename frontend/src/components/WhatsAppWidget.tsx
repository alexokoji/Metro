import { useEffect, useState } from 'react';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsAppWidget = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/whatsapp`);
        const data = await res.json();
        setPhoneNumber(data.phoneNumber);
        setMessage(data.message);
      } catch (error) {
        console.error('Failed to fetch WhatsApp settings:', error);
        // Fallback defaults
        setPhoneNumber('+1-818-523-9018');
        setMessage('Hi! I need help with crypto recovery.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (isLoading || !phoneNumber) return null;

  const normalizedPhone = phoneNumber.replace(/[^0-9+]/g, '');
  const phoneOnlyDigits = normalizedPhone.replace(/^\+/, '');
  const whatsappLink = `https://wa.me/${encodeURIComponent(phoneOnlyDigits)}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 bg-green-500 hover:bg-green-600 !text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="text-3xl !text-white" />
    </a>
  );
};

export default WhatsAppWidget;
