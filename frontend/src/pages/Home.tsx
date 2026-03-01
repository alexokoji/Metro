import { Link } from 'react-router-dom';
import { FaShieldAlt, FaUsers, FaClock, FaCheckCircle, FaStar, FaArrowRight, FaGlobeAmericas, FaLock } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Home = () => {
  const stats = [
    { icon: FaUsers, label: 'Successful Recoveries', value: '500+' },
    { icon: FaShieldAlt, label: 'Assets Recovered', value: '$50M+' },
    { icon: FaClock, label: 'Average Recovery Time', value: '48 Hours' },
    { icon: FaCheckCircle, label: 'Success Rate', value: '95%' },
  ];

  const services = [
    {
      title: 'Wallet Recovery',
      description: 'Recover lost or compromised wallets with our expert recovery services.',
      features: ['Lost private keys', 'Stolen wallets', 'Forgotten passphrases'],
      icon: FaShieldAlt,
    },
    {
      title: 'Security Audit',
      description: 'Comprehensive security assessment of your crypto holdings and accounts.',
      features: ['Vulnerability scanning', 'Risk assessment', 'Security recommendations'],
      icon: FaCheckCircle,
    },
    {
      title: 'Cyber Education',
      description: 'Learn best practices to protect your crypto assets from threats.',
      features: ['Security training', 'Best practices guide', 'Prevention strategies'],
      icon: FaUsers,
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock support from our expert security team.',
      features: ['Priority support', 'Expert consultation', 'Emergency response'],
      icon: FaClock,
    },
  ];

  const process = [
    { step: '1', title: 'Register & Consult', desc: 'Create an account and consult with our security experts.' },
    { step: '2', title: 'Backup Wallet', desc: 'Securely back up your wallet phrases and recovery information.' },
    { step: '3', title: 'Request Recovery', desc: 'Submit your recovery request with supporting documentation.' },
  ];

  const testimonials = [
    {
      name: 'John Smith',
      title: 'Security Expert',
      company: 'CyberSecure Solutions',
      quote: 'CyberRecovery helped us recover critical assets within 48 hours. Highly professional team.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      name: 'Sarah Johnson',
      title: 'Crypto Advisor',
      company: 'Digital Assets Inc',
      quote: 'The security audit exposed vulnerabilities we didn\'t know we had. Invaluable service.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/3769021/pexels-photo-3769021.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
    {
      name: 'Michael Chen',
      title: 'Portfolio Manager',
      company: 'Blockchain Capital',
      quote: 'Fast, efficient, and trustworthy. They handled our emergency recovery perfectly.',
      rating: 5,
      avatar: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
    },
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative text-white py-32 px-6 text-center overflow-hidden" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1516321318423-f06a6b1ef331?w=1500&h=500&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-400 rounded-full blur-3xl"></div>
        </div>
        <div className="relative max-w-4xl mx-auto">
          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-bold mb-4 !text-white"
          >
            Recover Your Crypto Assets
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto"
          >
            Professional cryptocurrency recovery and security solutions. Trust the experts to recover what's lost.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex gap-4 justify-center flex-wrap"
          >
            <Link
              to="/wallet-selection"
              className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 !text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              Connect Wallet <FaArrowRight />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-sky-800 hover:bg-sky-900 !text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg"
            >
              Contact Support <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white py-12 px-6 border-b border-gray-200">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className="text-center"
            >
              <stat.icon className="text-sky-600 text-3xl mx-auto mb-2" />
              <div className="text-2xl font-bold text-navy-600">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Badges */}
      <section className="bg-gradient-to-r from-navy-50 to-sky-50 py-12 px-6 border-b border-gray-200">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <FaLock className="text-3xl text-sky-600 mb-2" />
            <p className="font-bold text-navy-600">SSL Secured</p>
            <p className="text-xs text-gray-600">Military-grade encryption</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <FaShieldAlt className="text-3xl text-sky-600 mb-2" />
            <p className="font-bold text-navy-600">Bank-Level Security</p>
            <p className="text-xs text-gray-600">Enterprise protection</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <FaClock className="text-3xl text-sky-600 mb-2" />
            <p className="font-bold text-navy-600">24/7 Support</p>
            <p className="text-xs text-gray-600">Always available</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col items-center text-center"
          >
            <FaGlobeAmericas className="text-3xl text-sky-600 mb-2" />
            <p className="font-bold text-navy-600">50+ Countries</p>
            <p className="text-xs text-gray-600">Global coverage</p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-navy-600 mb-4">Our Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive solutions for crypto asset recovery and security
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, idx) => {
              const serviceImages = [
                'https://images.pexels.com/photos-310456/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
                'https://images.pexels.com/photos/5980856/pexels-photo-5980856.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
                'https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
                'https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop'
              ];
              const isEven = idx % 2 === 0;
              return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-6 items-center`}
              >
                <div className="md:w-1/2">
                  <img 
                    src={serviceImages[idx]} 
                    alt={service.title} 
                    className="w-full h-64 object-cover rounded-lg shadow-md" 
                  />
                </div>
                <div className="md:w-1/2 flex flex-col">
                <h3 className="text-2xl font-semibold text-navy-600 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, fidx) => (
                    <li key={fidx} className="flex items-center gap-2 text-gray-700">
                      <FaCheckCircle className="text-sky-600 text-sm" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 !text-white px-6 py-2 rounded-lg font-semibold transition w-fit"
                >
                  Learn More <FaArrowRight className="text-xs" />
                </Link>
                </div>
              </motion.div>
            );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-navy-600 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to recover your assets</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {process.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-navy-600 to-sky-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-navy-600 mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-center">{item.desc}</p>
                </div>
                {idx < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 -right-8 w-16 h-1 bg-sky-300"></div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 px-6 bg-gradient-to-b from-sky-50 to-white">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-navy-600 mb-4">Real Recovery Results</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Verified success stories from clients we've helped recover their crypto assets
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { amount: '$28,500', status: 'Recovered', desc: 'Unauthorized transfer recovery', type: '🔄' },
              { amount: '$50,000', status: 'Recovered', desc: 'Lost Bitcoin wallet access', type: '💾' },
              { amount: '$35,200', status: 'Recovered', desc: 'Compromised wallet funds', type: '🛡️' }
            ].map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="bg-white p-8 rounded-2xl shadow-lg border-l-4 border-sky-600 hover:shadow-xl transition"
              >
                <div className="text-4xl mb-4">{story.type}</div>
                <p className="text-3xl font-bold text-sky-600 mb-2">{story.amount}</p>
                <p className="text-sm font-semibold text-green-600 mb-2">{story.status} ✓</p>
                <p className="text-gray-600 text-sm">{story.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-sky-600 hover:bg-sky-700 !text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105"
            >
              Get Your Recovery Consultation <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-6 relative overflow-hidden bg-white">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1553531088-be3ee8cf50ad?w=1500&h=800&fit=crop)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          opacity: 0.05
        }}></div>
        <div className="relative z-10">
          <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-navy-600 mb-4">Trusted by Industry Leaders</h2>
            <p className="text-lg text-gray-600">See what our satisfied clients have to say</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => {
              const initials = testimonial.name.split(' ').map(n => n[0]).join('');
              const colors = ['from-sky-500 to-sky-600', 'from-navy-500 to-navy-600', 'from-sky-600 to-navy-500'];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.6 }}
                  className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition border border-gray-100"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-sky-500" size={16} />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-6 italic leading-relaxed">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover shadow-md" />
                    <div>
                      <p className="font-semibold text-navy-600">{testimonial.name}</p>
                      <p className="text-xs text-gray-600">{testimonial.title}</p>
                      <p className="text-xs text-sky-600 font-medium">{testimonial.company}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 px-6 text-white relative overflow-hidden" style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1581288423242-4ea5d6b2b2e3?w=1500&h=500&fit=crop)',
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-400 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-400 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold mb-4 !text-white"
          >
            Don't Wait—Recover Your Cryptocurrency Today
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-xl text-white mb-8 max-w-2xl mx-auto"
          >
            If you need assistance with digital assets, don't wait until your cryptocurrency is gone forever. We have the experience to help you recover your lost cryptocurrency with proven expertise.
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex gap-4 justify-center flex-wrap mb-12"
          >
            <Link
              to="/register"
              className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-800 !text-white px-8 py-4 rounded-lg font-semibold transition transform hover:scale-105 shadow-lg"
            >
              Book Free Consultation <FaArrowRight />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-sky-800 hover:bg-sky-900 !text-white px-8 py-4 rounded-lg font-semibold transition shadow-lg"
            >
              Contact Our Team <FaArrowRight />
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="bg-sky-600/20 p-6 rounded-lg backdrop-blur-sm border border-sky-300/30">
              <p className="text-3xl font-bold mb-2">Fast</p>
              <p className="text-sky-100 text-sm">Transparent Recovery Reviews</p>
            </div>
            <div className="bg-sky-600/20 p-6 rounded-lg backdrop-blur-sm border border-sky-300/30">
              <p className="text-3xl font-bold mb-2">Transparent</p>
              <p className="text-sky-100 text-sm">Full Process Visibility</p>
            </div>
            <div className="bg-sky-600/20 p-6 rounded-lg backdrop-blur-sm border border-sky-300/30">
              <p className="text-3xl font-bold mb-2">Confidential</p>
              <p className="text-sky-100 text-sm">Your Privacy Protected</p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
