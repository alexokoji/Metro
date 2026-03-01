import { FaCheckCircle, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const About = () => {
  const features = [
    { 
      icon: FaCheckCircle, 
      title: 'Expert Recovery', 
      desc: 'Industry-leading recovery success rates with proven expertise.' 
    },
    { 
      icon: FaShieldAlt, 
      title: 'Secure & Private', 
      desc: 'Your information stays protected with military-grade encryption.' 
    },
    { 
      icon: FaUsers, 
      title: 'Trusted Experts', 
      desc: 'Our team has decades of combined security experience.' 
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
        <h1 className="text-4xl font-bold text-navy-600 mb-4">About CyberRecovery</h1>
        <p className="text-gray-700 text-lg">
          CyberRecovery specializes in helping individuals and businesses recover lost or compromised crypto assets. 
          Whether you lost access to a wallet, forgot a password, or experienced a security breach, our expert team is here to help.
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((f, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="bg-white p-8 rounded-2xl shadow-lg text-center hover:shadow-xl transition"
          >
            <f.icon className="text-sky-600 text-4xl mb-4 mx-auto" />
            <h3 className="text-xl font-semibold text-navy-600 mb-2">{f.title}</h3>
            <p className="text-gray-600">{f.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto mt-20 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-2xl p-12 text-center"
      >
        <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
        <p className="text-lg text-sky-100 mb-6">
          To provide reliable, professional crypto recovery services that give our clients peace of mind and help them regain access to their digital assets.
        </p>
        <p className="text-lg text-sky-100">
          We're committed to operating with the highest ethical standards and maintaining complete confidentiality throughout the recovery process.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
