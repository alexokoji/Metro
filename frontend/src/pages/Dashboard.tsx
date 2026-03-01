import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../utils/api';
import { FaWallet, FaUpload, FaShieldAlt, FaHistory, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const fetchUser = async () => {
        try {
          const res = await axios.get(`${API_URL}/auth/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (error) {
          console.error('Failed to fetch user');
        }
      };
      fetchUser();
    }
  }, []);

  const activities = [
    { type: 'backup', title: 'Wallet Backup', desc: 'Successfully backed up wallet information', time: '2 hours ago', icon: FaCheckCircle },
    { type: 'recovery', title: 'Recovery Request', desc: 'Recovery request submitted for review', time: '1 day ago', icon: FaUpload },
    { type: 'security', title: 'Security Audit', desc: 'Routine security audit completed', time: '3 days ago', icon: FaShieldAlt },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-navy-600 mb-2">Welcome, {user?.email?.split('@')[0] || 'User'}</h1>
          <p className="text-gray-600">Manage your crypto recovery and security settings</p>
        </motion.div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <Link
              to="/wallet-selection"
              className="block h-full bg-gradient-to-br from-sky-500 to-sky-600 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              <FaWallet className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Backup Wallet</h3>
              <p className="text-sky-100">Securely back up your wallet phrases and recovery information</p>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Link
              to="/upload-proof"
              className="block h-full bg-gradient-to-br from-navy-600 to-navy-700 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:scale-105"
            >
              <FaUpload className="text-4xl mb-4" />
              <h3 className="text-2xl font-semibold mb-2">Request Recovery</h3>
              <p className="text-navy-200">Submit your recovery request with supporting documentation</p>
            </Link>
          </motion.div>
        </div>

        {/* Admin Access */}
        {user?.isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-12"
          >
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <FaShieldAlt />
              Admin Panel
            </Link>
          </motion.div>
        )}

        {/* Activity Feed */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <FaHistory className="text-navy-600 text-2xl" />
            <h2 className="text-2xl font-semibold text-navy-600">Recent Activity</h2>
          </div>
          <div className="space-y-4">
            {activities.map((activity, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + idx * 0.1, duration: 0.6 }}
                className="flex items-start gap-4 pb-4 border-b border-gray-200 last:border-b-0"
              >
                <activity.icon className="text-sky-600 text-2xl mt-1 flex-shrink-0" />
                <div className="flex-grow">
                  <h4 className="font-semibold text-navy-600">{activity.title}</h4>
                  <p className="text-gray-600 text-sm">{activity.desc}</p>
                </div>
                <span className="text-gray-500 text-sm whitespace-nowrap">{activity.time}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
