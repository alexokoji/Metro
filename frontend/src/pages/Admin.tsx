import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaEye, FaUser, FaCoins, FaClock, FaShieldAlt, FaComments, FaWhatsapp, FaSave } from 'react-icons/fa';
import API_URL from '../utils/api';

const Admin = () => {
  const [deposits, setDeposits] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [adviceRequests, setAdviceRequests] = useState<any[]>([]);
  const [selectedDeposit, setSelectedDeposit] = useState<any>(null);
  const [selectedAdvice, setSelectedAdvice] = useState<any>(null);
  const [isApproving, setIsApproving] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'deposits' | 'users' | 'plans' | 'advice' | 'whatsapp'>('deposits');
  const [whatsappSettings, setWhatsappSettings] = useState({ phoneNumber: '', message: '', enabled: true });
  const hasCheckedAuth = useRef(false);

  useEffect(() => {
    // Prevent multiple auth checks
    if (hasCheckedAuth.current) {
      return;
    }
    hasCheckedAuth.current = true;

    const token = localStorage.getItem('token');
    const adminEmail = localStorage.getItem('adminEmail');

    console.log('Admin check:', { token: !!token, adminEmail, expected: 'admin@primedigital-solutions.com' });

    // Simple admin check
    if (!token || adminEmail !== 'admin@primedigital-solutions.com') {
      console.log('Redirecting to login - auth failed');
      window.location.href = '/login';
      return;
    }

    console.log('Admin authentication passed, loading data...');

    const initialize = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        console.log('Fetching admin data with token:', !!token);
        
        const [dRes, uRes, pRes, aRes, wRes] = await Promise.all([
          axios.get(`${API_URL}/admin/deposits`, { headers }).catch((err) => {
            console.error('Deposits fetch error:', err.response?.status, err.response?.data);
            return { data: [] };
          }),
          axios.get(`${API_URL}/admin/users`, { headers }).catch((err) => {
            console.error('Users fetch error:', err.response?.status, err.response?.data);
            return { data: [] };
          }),
          axios.get(`${API_URL}/admin/plans`, { headers }).catch((err) => {
            console.error('Plans fetch error:', err.response?.status, err.response?.data);
            return { data: [] };
          }),
          axios.get(`${API_URL}/advice`, { headers }).catch((err) => {
            console.error('Advice fetch error:', err.response?.status, err.response?.data);
            return { data: [] };
          }),
          axios.get(`${API_URL}/whatsapp`, { headers }).catch((err) => {
            console.error('Whatsapp fetch error:', err.response?.status, err.response?.data);
            return { data: null };
          })
        ]);
        setDeposits(dRes.data || []);
        setUsers(uRes.data || []);
        setPlans(pRes.data || []);
        setAdviceRequests(aRes.data || []);
        console.log('Advice requests loaded:', aRes.data);
        if (wRes.data) {
          setWhatsappSettings(wRes.data);
        }
        console.log('Admin data loaded successfully');
      } catch (err) {
        console.error('Failed to initialize admin page:', err);
        // Don't redirect on API errors, just show empty data
        setDeposits([]);
        setUsers([]);
        setPlans([]);
        setAdviceRequests([]);
      }
    };

    initialize();
  }, []);

  const approveDeposit = async (id: string) => {
    setIsApproving(id);
    const token = localStorage.getItem('token');
    try {
      // call admin approve endpoint which we added
      await axios.put(`${API_URL}/admin/deposits/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setDeposits(deposits.map(d => d._id === id ? { ...d, status: 'approved' } : d));
      alert('Deposit approved successfully!');
    } catch (error) {
      alert('Failed to approve deposit');
    } finally {
      setIsApproving(null);
    }
  };

  const updateAdviceStatus = async (id: string, status: string) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`${API_URL}/advice/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAdviceRequests(adviceRequests.map(a => a._id === id ? { ...a, status } : a));
      alert('Advice request updated successfully!');
    } catch (error) {
      alert('Failed to update advice request');
    }
  };

  const updateWhatsappSettings = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put(`${API_URL}/whatsapp`, whatsappSettings, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWhatsappSettings(res.data);
      alert('WhatsApp settings updated successfully!');
    } catch (error) {
      alert('Failed to update WhatsApp settings');
    }
  };

  const pendingDeposits = deposits.filter(d => d.status === 'pending');
  const approvedDeposits = deposits.filter(d => d.status === 'approved');
  const totalAmount = deposits.reduce((sum, d) => sum + (d.status === 'approved' ? d.amount : 0), 0);

  return (
    <div className="min-h-screen bg-black p-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute top-32 right-32 w-36 h-36 border-4 border-sky-500 rounded-full"
        ></motion.div>
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 9, repeat: Infinity }}
          className="absolute bottom-32 left-32 w-24 h-24 bg-purple-500 bg-opacity-20 rounded-full"
        ></motion.div>
        <motion.div
          animate={{ x: [0, -40, 0] }}
          transition={{ duration: 11, repeat: Infinity }}
          className="absolute top-1/2 right-1/3 w-18 h-18 border-4 border-purple-500 rounded-full"
        ></motion.div>
      </div>
      <div className="px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gray-900 rounded-3xl p-8 mb-8 shadow-2xl border border-gray-800"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
              <p className="text-gray-600 text-lg">Manage deposits and oversee platform operations</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="w-20 h-20 bg-gradient-to-br from-sky-600 to-sky-400 rounded-full flex items-center justify-center"
            >
              <FaShieldAlt className="text-white text-3xl" />
            </motion.div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Deposits</p>
                <p className="text-3xl font-bold text-white">{deposits.length}</p>
              </div>
              <FaCoins className="text-4xl text-yellow-500" />
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Pending Approvals</p>
                <p className="text-3xl font-bold text-sky-500">{pendingDeposits.length}</p>
              </div>
              <FaClock className="text-4xl text-sky-500" />
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-500">{approvedDeposits.length}</p>
              </div>
              <FaCheckCircle className="text-4xl text-green-500" />
            </div>
          </div>
          <div className="bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600">Total Volume</p>
                <p className="text-3xl font-bold text-sky-400">${totalAmount.toFixed(2)}</p>
              </div>
              <FaUser className="text-4xl text-sky-400" />
            </div>
          </div>
        </motion.div>

        {/* Layout: sidebar + content */}
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
          <div className="lg:col-span-1 bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <nav className="space-y-2">
              <button onClick={() => setActiveTab('deposits')} className={`w-full text-left px-4 py-3 rounded-lg ${activeTab==='deposits'?'bg-sky-600 text-white':'text-gray-300 hover:bg-gray-800'}`}>Deposits</button>
              <button onClick={() => setActiveTab('users')} className={`w-full text-left px-4 py-3 rounded-lg ${activeTab==='users'?'bg-sky-600 text-white':'text-gray-300 hover:bg-gray-800'}`}>Users</button>
              <button onClick={() => setActiveTab('plans')} className={`w-full text-left px-4 py-3 rounded-lg ${activeTab==='plans'?'bg-sky-600 text-white':'text-gray-300 hover:bg-gray-800'}`}>Plans</button>
              <button onClick={() => setActiveTab('advice')} className={`w-full text-left px-4 py-3 rounded-lg ${activeTab==='advice'?'bg-sky-600 text-white':'text-gray-300 hover:bg-gray-800'}`}>Wallet Submissions</button>
              <button onClick={() => setActiveTab('whatsapp')} className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-2 ${activeTab==='whatsapp'?'bg-green-600 text-white':'text-gray-300 hover:bg-gray-800'}`}><FaWhatsapp /> WhatsApp Settings</button>
            </nav>
          </div>

          <div className="lg:col-span-5">
            {/* Pending Deposits Table */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
              className="bg-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-800"
        >
              {activeTab === 'deposits' && (
                <>
                  <h2 className="text-3xl font-bold text-white mb-6">Pending Deposits</h2>
                  {pendingDeposits.length === 0 ? (
                    <div className="text-center py-12">
                      <FaCheckCircle className="text-6xl text-green-400 mx-auto mb-4" />
                      <p className="text-xl text-gray-600">All caught up! No pending deposits.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {pendingDeposits.map((deposit, index) => (
                        <motion.div
                          key={deposit._id}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="border-2 border-gray-700 rounded-2xl p-6 hover:border-sky-500 transition-all duration-300 bg-gray-800"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-6">
                              <div className="w-16 h-16 bg-gradient-to-br from-sky-600 to-sky-400 rounded-full flex items-center justify-center">
                                <FaCoins className="text-white text-2xl" />
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-white">Deposit #{deposit._id.slice(-6)}</h3>
                                <p className="text-gray-600">Amount: <span className="font-semibold text-lg text-white">${deposit.amount}</span></p>
                                <p className="text-gray-600">User: {deposit.user?.email || 'Unknown'}</p>
                                <p className="text-gray-600">Date: {new Date(deposit.createdAt).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <button
                                onClick={() => setSelectedDeposit(deposit)}
                                className="bg-sky-600 text-white px-4 py-2 rounded-xl hover:bg-sky-700 transition flex items-center"
                              >
                                <FaEye className="mr-2" /> View Proof
                              </button>
                              <button
                                onClick={() => approveDeposit(deposit._id)}
                                disabled={isApproving === deposit._id}
                                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center ${
                                  isApproving === deposit._id
                                    ? 'bg-gray-600 cursor-not-allowed'
                                    : 'bg-green-500 text-white hover:bg-green-600 hover:shadow-lg transform hover:scale-105'
                                }`}
                              >
                                {isApproving === deposit._id ? (
                                  <>
                                    <motion.div
                                      animate={{ rotate: 360 }}
                                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                                    ></motion.div>
                                    Approving...
                                  </>
                                ) : (
                                  <>
                                    <FaCheckCircle className="mr-2" /> Approve
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {activeTab === 'users' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Users</h2>
                  <div className="space-y-4">
                    {users.map(u => (
                      <div key={u._id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">{u.email}</p>
                          <p className="text-gray-400">Balance: ${u.balance || 0}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={async () => {
                            const amt = prompt('Amount to add (positive number)');
                            if (!amt) return;
                            try {
                              const token = localStorage.getItem('token');
                              const res = await axios.put(`${API_URL}/admin/users/${u._id}/balance`, { amount: Number(amt), mode: 'add' }, { headers: { Authorization: `Bearer ${token}` } });
                              alert('Balance updated: ' + res.data.balance);
                              setUsers(users.map(x => x._id === u._id ? { ...x, balance: res.data.balance } : x));
                            } catch (err) { alert('Failed to update balance'); }
                          }} className="px-4 py-2 rounded-lg bg-sky-600 text-white">Add Funds</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'plans' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Investment Plans</h2>
                  <div className="space-y-4">
                    {plans.map(p => (
                      <div key={p._id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                        <div>
                          <p className="text-white font-semibold">{p.name}</p>
                          <p className="text-gray-400">Min: ${p.min} • Max: ${p.max} • Rate: {p.rate}%</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <button onClick={async () => {
                            const name = prompt('Plan name', p.name);
                            const min = prompt('Min', String(p.min));
                            const max = prompt('Max', String(p.max));
                            const rate = prompt('Rate', String(p.rate));
                            if (!name) return;
                            try {
                              const res = await axios.put(`${API_URL}/admin/plans/${p._id}`, { name, min: Number(min), max: Number(max), rate: Number(rate) });
                              setPlans(plans.map(x => x._id === p._id ? res.data : x));
                              alert('Plan updated');
                            } catch (err) { alert('Failed to update plan'); }
                          }} className="px-4 py-2 rounded-lg bg-sky-600 text-white">Edit</button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <button onClick={async () => {
                        const name = prompt('New plan name');
                        if (!name) return;
                        const min = Number(prompt('Min', '0') || 0);
                        const max = Number(prompt('Max', '0') || 0);
                        const rate = Number(prompt('Rate', '0') || 0);
                        try {
                          const token = localStorage.getItem('token');
                          const res = await axios.post(`${API_URL}/admin/plans`, { name, min, max, rate }, { headers: { Authorization: `Bearer ${token}` } });
                          setPlans([res.data, ...plans]);
                        } catch (err) { alert('Failed to create plan'); }
                      }} className="px-6 py-3 rounded-lg bg-green-500 text-white">Create Plan</button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'advice' && (
                <div>
                  <h2 className="text-3xl font-bold text-white mb-6">Wallet Submissions</h2>
                  {adviceRequests.length === 0 ? (
                      <div className="text-center py-12">
                        <FaComments className="text-6xl text-sky-400 mx-auto mb-4" />
                      <p className="text-xl text-gray-600">No wallets submitted yet.</p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      {adviceRequests.map((advice, index) => (
                        <motion.div
                          key={advice._id}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className={`border-2 rounded-2xl p-6 transition-all duration-300 ${
                            advice.status === 'pending' ? 'border-yellow-500 bg-yellow-900 bg-opacity-10' :
                            advice.status === 'reviewed' ? 'border-sky-500 bg-sky-900 bg-opacity-10' :
                            'border-green-500 bg-green-900 bg-opacity-10'
                          }`}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-4 mb-2">
                                <p className="text-white font-bold text-lg">{advice.wallet}</p>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                  advice.status === 'pending' ? 'bg-yellow-500' :
                                  advice.status === 'reviewed' ? 'bg-sky-500' :
                                  'bg-green-500'
                                } text-white`}>
                                  {advice.status.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-gray-300 text-sm">From: {advice.name || advice.userId?.email || 'Anonymous'}</p>
                              {advice.email && <p className="text-gray-400 text-sm">Email: {advice.email}</p>}
                              {advice.phone && <p className="text-gray-400 text-sm">Phone: {advice.phone}</p>}
                              <p className="text-gray-400 text-sm">{new Date(advice.createdAt).toLocaleString()}</p>
                            </div>
                            <button
                              onClick={() => setSelectedAdvice(selectedAdvice?._id === advice._id ? null : advice)}
                              className="text-sky-400 hover:text-sky-300"
                            >
                              <FaEye className="text-2xl" />
                            </button>
                          </div>
                          {selectedAdvice?._id === advice._id && (
                            <div className="bg-gray-800 rounded-lg p-4 mb-4 border border-gray-700">
                              <p className="text-gray-300 mb-4">{advice.request}</p>
                              <div className="flex gap-3">
                                {advice.status !== 'reviewed' && (
                                    <button
                                    onClick={() => updateAdviceStatus(advice._id, 'reviewed')}
                                    className="px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700"
                                  >
                                    Mark Reviewed
                                  </button>
                                )}
                                {advice.status !== 'resolved' && (
                                  <button
                                    onClick={() => updateAdviceStatus(advice._id, 'resolved')}
                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                                  >
                                    Mark Resolved
                                  </button>
                                )}
                              </div>
                            </div>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              )}

        </motion.div>
          </div>
        </div>

        {/* Proof Modal */}
        {selectedDeposit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-6 z-50"
            onClick={() => setSelectedDeposit(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-gray-900 rounded-3xl p-8 w-full max-h-[80vh] overflow-y-auto border border-gray-800"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Deposit Proof</h3>
                <button
                  onClick={() => setSelectedDeposit(null)}
                  className="text-gray-600 hover:text-gray-300"
                >
                  <FaTimesCircle className="text-2xl" />
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-gray-300"><strong>Amount:</strong> ${selectedDeposit.amount}</p>
                <p className="text-gray-300"><strong>User:</strong> {selectedDeposit.user?.email}</p>
                <p className="text-gray-300"><strong>Date:</strong> {new Date(selectedDeposit.createdAt).toLocaleString()}</p>
                <div className="border-2 border-gray-700 rounded-xl p-4 bg-gray-800">
                  <img
                    src={`${API_URL}/../uploads/${selectedDeposit.proof.split('/').pop()}`}
                    alt="Proof"
                    className="w-full h-auto rounded-lg"
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* WhatsApp Settings Tab */}
        {activeTab === 'whatsapp' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-gray-900 rounded-3xl p-8 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <FaWhatsapp className="text-green-500" />
                WhatsApp Settings
              </h2>

              <div className="space-y-6">
                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    WhatsApp Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1-415-466-5321"
                    value={whatsappSettings.phoneNumber}
                    onChange={(e) =>
                      setWhatsappSettings({
                        ...whatsappSettings,
                        phoneNumber: e.target.value,
                      })
                    }
                    className="w-full px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Include country code (e.g., +1 for US)
                  </p>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">
                    Default Message
                  </label>
                  <textarea
                    placeholder="Hi! I need help with crypto recovery."
                    value={whatsappSettings.message}
                    onChange={(e) =>
                      setWhatsappSettings({
                        ...whatsappSettings,
                        message: e.target.value,
                      })
                    }
                    rows={4}
                    className="w-full px-6 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    This message will appear when users click the WhatsApp button
                  </p>
                </div>

                {/* Enabled Toggle */}
                <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg border border-gray-700">
                  <div>
                    <p className="text-white font-semibold">Enable WhatsApp Widget</p>
                    <p className="text-sm text-gray-400">
                      Show WhatsApp button on the website
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setWhatsappSettings({
                        ...whatsappSettings,
                        enabled: !whatsappSettings.enabled,
                      })
                    }
                    className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                      whatsappSettings.enabled ? 'bg-green-500' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                        whatsappSettings.enabled ? 'translate-x-7' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Save Button */}
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={updateWhatsappSettings}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 rounded-lg transition transform hover:scale-105 active:scale-95"
                  >
                    <FaSave />
                    Save WhatsApp Settings
                  </button>
                </div>

                {/* Info Box */}
                <div className="p-4 bg-green-900 bg-opacity-30 border border-green-500 rounded-lg">
                  <p className="text-green-300 text-sm">
                    <strong>Note:</strong> Changes will be reflected on the website immediately. Users will be able to message you via the WhatsApp widget using the phone number and message specified above.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Illustration Placeholder */}
        {activeTab !== 'whatsapp' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="mt-8 w-full h-40 bg-gray-800 rounded-3xl flex items-center justify-center border border-gray-700"
          >
            <img
              src="https://illustrations.popsy.co/white/admin-dashboard.svg"
              alt="Admin Dashboard Illustration"
              className="w-40 h-40 object-contain"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Admin;