import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimes } from 'react-icons/fa';

interface Announcement {
  id: number;
  amount: string;
  service: string;
}

const announcements: Announcement[] = [
  { id: 1, amount: '$47,500', service: 'Recovered from stolen crypto wallet' },
  { id: 2, amount: '$23,800', service: 'Recovered from compromised account' },
  { id: 3, amount: '$89,200', service: 'Recovered from scam transaction' },
  { id: 4, amount: '$15,600', service: 'Recovered from failed transfer' },
  { id: 5, amount: '$56,300', service: 'Recovered from hacked exchange account' },
  { id: 6, amount: '$34,900', service: 'Recovered from lost wallet access' },
  { id: 7, amount: '$72,400', service: 'Recovered from disputed transaction' },
  { id: 8, amount: '$41,200', service: 'Recovered from malware attack' },
  { id: 9, amount: '$65,800', service: 'Recovered from phishing scam' },
  { id: 10, amount: '$28,500', service: 'Recovered from unauthorized transfer' },
];

const AnnouncementPopup = () => {
  const [currentAnnouncement, setCurrentAnnouncement] = useState<Announcement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const showRandomAnnouncement = () => {
      const randomAnnouncement = announcements[Math.floor(Math.random() * announcements.length)];
      setCurrentAnnouncement(randomAnnouncement);
      setIsVisible(true);

      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 5000);

      return () => clearTimeout(timer);
    };

    // Show first announcement after 2 seconds
    const initialTimer = setTimeout(() => {
      showRandomAnnouncement();
    }, 2000);

    // Show subsequent announcements every 8-12 seconds
    const interval = setInterval(() => {
      showRandomAnnouncement();
    }, 8000 + Math.random() * 4000);

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && currentAnnouncement && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: -20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: -20 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-20 sm:bottom-6 left-2 sm:left-6 right-2 sm:right-auto z-40 max-w-xs sm:max-w-sm"
        >
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-l-4 border-green-500 rounded-lg shadow-2xl p-3 sm:p-4 flex items-start gap-3 sm:gap-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
              className="flex-shrink-0 mt-1"
            >
              <FaCheckCircle className="text-xl sm:text-2xl text-green-500" />
            </motion.div>

            <div className="flex-grow">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15 }}
                className="font-bold text-gray-800 text-sm sm:text-base"
              >
                {currentAnnouncement.amount} {currentAnnouncement.service}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-xs sm:text-sm text-gray-600 mt-1"
              >
                Successfully recovered ✓
              </motion.p>
            </div>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="text-base sm:text-lg" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementPopup;
