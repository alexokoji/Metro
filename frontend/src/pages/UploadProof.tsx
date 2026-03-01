import { useState } from 'react';
import axios from 'axios';
import API_URL from '../utils/api';
import { motion } from 'framer-motion';
import { FaCloudUploadAlt } from 'react-icons/fa';

const UploadProof = () => {
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !description) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append('proof', file);
    formData.append('amount', description);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${API_URL}/deposits/upload`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('Recovery request submitted successfully!');
      setFile(null);
      setDescription('');
    } catch (err) {
      alert('Submission failed.');
    } finally {
      setIsUploading(false);
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
        <div className="flex items-center justify-center gap-3 mb-6">
          <FaCloudUploadAlt className="text-sky-600 text-3xl" />
          <h2 className="text-3xl font-bold text-navy-600">Submit Recovery Request</h2>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-navy-700 font-semibold mb-2">Recovery Details</label>
            <textarea
              rows={4}
              value={description}
              onChange={e => setDescription(e.target.value)}
              placeholder="Describe your recovery situation in detail"
              className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-200"
              required
            />
          </div>
          <div>
            <label className="block text-navy-700 font-semibold mb-2">Supporting Document</label>
            <input
              type="file"
              accept="image/*,application/pdf"
              onChange={e => setFile(e.target.files?.[0] || null)}
              className="w-full border border-dashed border-sky-300 rounded px-4 py-3 cursor-pointer"
              required
            />
            {file && <p className="text-sm text-gray-600 mt-2">✓ {file.name}</p>}
          </div>
          <button
            type="submit"
            disabled={isUploading}
            className="w-full bg-sky-600 text-white py-3 rounded hover:bg-sky-700 transition disabled:opacity-50 font-semibold"
          >
            {isUploading ? 'Submitting...' : 'Submit Recovery Request'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default UploadProof;
