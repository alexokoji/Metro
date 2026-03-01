import { useState } from 'react';
import { FaChevronDown, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How long does recovery typically take?',
      a: 'Recovery timeframes vary based on your situation. Most straightforward cases are resolved within 24-48 hours. Complex cases may take 3-7 days. We provide regular updates throughout the process.'
    },
    {
      q: 'Is my information kept private?',
      a: 'Absolutely. We use military-grade encryption and maintain strict confidentiality. Your information is never shared with third parties. We comply with all privacy regulations and standards.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept cryptocurrency, credit cards, bank transfers, and wire transfers. Payment is typically due when recovery is successful. We offer transparent pricing with no hidden fees.'
    },
    {
      q: 'What if you cannot recover my wallet?',
      a: 'If recovery is not possible, you pay nothing. We only charge after successful recovery. Our expert team will provide you with a detailed report explaining what happened and recommendations.'
    },
    {
      q: 'Can you help with hardware wallet recovery?',
      a: 'Yes, we specialize in recovering access to hardware wallets including Ledger, Trezor, and other major brands. We work directly with the device to restore your access securely.'
    },
    {
      q: 'How do I get started?',
      a: 'Simply sign up on our platform and submit a recovery request with details about your situation. Our team will review your case and contact you within 2 hours to discuss recovery options.'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-sky-50 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto mb-12"
      >
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-navy-600 mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">Find answers to common questions about our recovery services</p>
        </div>
      </motion.div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05, duration: 0.4 }}
            className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100"
          >
            <button
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
              className="w-full px-6 py-4 flex items-center justify-between hover:bg-sky-50 transition"
            >
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <FaQuestionCircle className="text-sky-600" />
                </div>
                <span className="font-semibold text-navy-700">{faq.q}</span>
              </div>
              <motion.div
                animate={{ rotate: openIdx === idx ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <FaChevronDown className="text-sky-600" />
              </motion.div>
            </button>
            <AnimatePresence>
              {openIdx === idx && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-t border-gray-100 bg-sky-50 px-6 py-4"
                >
                  <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="max-w-3xl mx-auto mt-12 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-2xl p-8 text-center"
      >
        <FaLightbulb className="text-4xl mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Still have questions?</h2>
        <p className="text-sky-100 mb-6">Our expert team is ready to help. Contact us for a personalized consultation.</p>
        <a href="/contact" className="inline-block bg-white text-sky-600 px-6 py-2 rounded-lg font-semibold hover:bg-sky-50 transition">
          Contact Us
        </a>
      </motion.div>
    </div>
  );
};

export default FAQ;
