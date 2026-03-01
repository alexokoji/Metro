import { useState } from 'react';
import { FaEnvelope, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      alert('Message sent! We\'ll be in touch soon.');
      setMessage('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-sky-50 py-20 px-6 flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-navy-600 mb-4">Get In Touch</h1>
        <p className="text-gray-600 text-lg">Have questions? Our recovery experts are here to help</p>
      </motion.div>
      <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <div className="flex items-center gap-4">
            <FaEnvelope className="text-sky-600 text-3xl" />
            <div>
              <p className="text-gray-700 font-semibold">Email</p>
              <span className="text-sky-600">support@cyberrecovery.com</span>
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="bg-white p-6 rounded-2xl shadow-lg"
        >
          <div className="flex items-center gap-4">
            <FaPhone className="text-sky-600 text-3xl" />
            <div>
              <p className="text-gray-700 font-semibold">Phone</p>
              <span className="text-sky-600">+1 555 123 4567</span>
            </div>
          </div>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-2xl font-bold text-navy-600 mb-6 text-center">Send us a Message</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            rows={6}
            placeholder="Tell us about your recovery needs..."
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200 resize-none"
            required
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-600 text-white px-6 py-3 rounded hover:bg-sky-700 transition font-semibold disabled:opacity-50"
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Contact;
