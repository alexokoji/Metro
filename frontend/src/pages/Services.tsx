import { FaKey, FaLock, FaSearch, FaExchangeAlt, FaShieldAlt, FaClock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Services = () => {
  const services = [
    { 
      icon: FaKey, 
      title: 'Password Recovery', 
      desc: 'Cracked wallets due to forgotten passwords? We help you back in.',
      features: ['12-24 word recovery', 'Private key restoration', 'Instant verification']
    },
    { 
      icon: FaLock, 
      title: 'Compromised Wallet', 
      desc: 'Our specialists handle hacked or compromised accounts.',
      features: ['Malware detection', 'Fund tracing', 'Security reset']
    },
    { 
      icon: FaSearch, 
      title: 'Seed Phrase Assistance', 
      desc: 'Missing or invalid seed phrase? Let us analyze and recover.',
      features: ['Phrase analysis', 'Recovery options', 'Validation check']
    },
    { 
      icon: FaExchangeAlt, 
      title: 'Scam Tracing', 
      desc: 'We trace and attempt to recover funds lost to scams.',
      features: ['Blockchain tracking', 'Fund recovery', 'Legal support']
    },
    { 
      icon: FaShieldAlt, 
      title: 'Security Audit', 
      desc: 'Comprehensive assessment of your current security setup.',
      features: ['Vulnerability scan', 'Best practices', 'Risk assessment']
    },
    { 
      icon: FaClock, 
      title: '24/7 Support', 
      desc: 'Always available when you need emergency recovery assistance.',
      features: ['Priority access', 'Expert support', 'Quick response']
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-sky-50 py-20 px-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-navy-600 mb-4">Our Services</h1>
        <p className="text-lg text-gray-600">Comprehensive recovery and security solutions for your crypto assets</p>
      </motion.div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition border border-gray-100"
          >
            <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center text-white text-2xl mb-4 shadow-lg">
              <service.icon />
            </div>
            <h3 className="text-xl font-semibold text-navy-600 mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.desc}</p>
            <ul className="space-y-2">
              {service.features.map((feature, fidx) => (
                <li key={fidx} className="flex items-center gap-2 text-sm text-gray-700">
                  <div className="w-2 h-2 bg-sky-600 rounded-full"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Services;
