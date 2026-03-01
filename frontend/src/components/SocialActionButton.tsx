import { useEffect, useState } from 'react';
import { FaWhatsapp, FaComments } from 'react-icons/fa';
import { FaTelegram, FaInstagram } from 'react-icons/fa6';
import { motion, AnimatePresence } from 'framer-motion';

const SocialActionButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);
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
        setPhoneNumber('+44-789-295-2802');
        setMessage('Hi! I need help with crypto recovery.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  if (isLoading) return null;

  const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;
  const telegramLink = 'https://t.me/primedigitalsolutions';
  const instagramLink = 'https://instagram.com/primedigitalsolutionss';

  const socialIcons = [
    {
      icon: FaWhatsapp,
      link: whatsappLink,
      label: 'WhatsApp',
      bgColor: 'bg-green-500 hover:bg-green-600',
      delay: 0,
    },
    {
      icon: FaTelegram,
      link: telegramLink,
      label: 'Telegram',
      bgColor: 'bg-sky-500 hover:bg-sky-600',
      delay: 0.1,
    },
    {
      icon: FaInstagram,
      link: instagramLink,
      label: 'Instagram',
      bgColor: 'bg-pink-500 hover:bg-pink-600',
      delay: 0.2,
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-0 right-0 flex flex-col gap-4 mb-20"
          >
            {socialIcons.map((social) => {
              const Icon = social.icon;
              return (
                <motion.a
                  key={social.label}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ scale: 0, opacity: 0, y: 20 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0, opacity: 0, y: 20 }}
                  transition={{ delay: social.delay, duration: 0.3 }}
                  className={`${social.bgColor} !text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 flex items-center justify-center`}
                  title={`Chat with us on ${social.label}`}
                >
                  <Icon className="text-2xl !text-white" />
                </motion.a>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Action Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        animate={{ rotate: isExpanded ? 45 : 0 }}
        transition={{ duration: 0.3 }}
        className="bg-sky-500 hover:bg-sky-600 !text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center border-2 border-sky-300"
        title={isExpanded ? 'Close' : 'Chat with us'}
      >
        <FaComments className="text-3xl !text-white" />
      </motion.button>
    </div>
  );
};

export default SocialActionButton;
