import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaWallet } from 'react-icons/fa';

const WalletSelection = () => {
  const navigate = useNavigate();

  const wallets = [
    { name: 'MetaMask', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3ymr3UNKopfI0NmUY95Dr-0589vG-91KuAA&s', id: 'metamask' },
    { name: 'Trust Wallet', image: '/wallet-images/Trust.jpeg', id: 'trust' },
    { name: 'Phantom', image: '/wallet-images/Phantom.jpeg', id: 'phantom' },
    { name: 'Coinbase Wallet', image: '/wallet-images/Coinbase.jpeg', id: 'coinbase' },
    { name: 'Ledger Live', image: '/wallet-images/Ledger Live.jpeg', id: 'ledger' },
    { name: 'Trezor', image: 'https://play-lh.googleusercontent.com/xs4ZUIOATV_bGfdl2yd0mWev9bcK2_a4ofnUEIIQe2_BecUqOVQ7YmtXu41Ereg0Kg=w600-h300-pc0xffffff-pd' , id: 'trezor' },
    { name: 'SafePal', image: '/wallet-images/SafePal.jpeg', id: 'safepal' },
    { name: 'imToken', image: '/wallet-images/Imtoken.jpeg', id: 'imtoken' },
    { name: 'MathWallet', image: '/wallet-images/Mathwallet.jpeg', id: 'mathwallet' },
    { name: 'MyEtherWallet', image: '/wallet-images/My Etherwallet.jpeg', id: 'myetherwallet' },
    { name: 'Etherscan', image: '/wallet-images/Etherscan.jpeg', id: 'etherscan' },
    { name: 'Atomic Wallet', image: '/wallet-images/Atomic.jpeg', id: 'atomicwallet' },
    { name: 'Edge Wallet', image: '/wallet-images/Edge.jpeg', id: 'edgewallet' },
    { name: 'Exodus', image: '/wallet-images/Exodus.jpeg', id: 'exodus' },
    { name: 'Electrum', image: 'https://play-lh.googleusercontent.com/2dEx8K8AnAa8L0xvwKDBQXA--DdTsCqxEJmNvG49KyO5x4YSgQFbZPGANdYYITHtIro', id: 'electrum' },
    { name: 'Rabby Wallet', image: '/wallet-images/Rabby.jpeg', id: 'rabbywallet' },
    { name: 'Zerion', image: '/wallet-images/Zerion.jpeg', id: 'zerion' },
    { name: 'BitBox02', image: '/wallet-images/Bitbox.jpeg', id: 'bitbox02' },
    { name: 'Wallet3', image: '/wallet-images/Wallet3.jpeg', id: 'wallet3' },
    { name: 'OneKey', image: '/wallet-images/Onekey.jpeg', id: 'onekey' },
    { name: 'Status', image: '/wallet-images/Status.jpeg', id: 'status' },
    { name: 'OKX Wallet', image: '/wallet-images/OKX Wallet.jpeg', id: 'okx' },
    { name: 'Crypto.com', image: '/wallet-images/Crypto.com.jpeg', id: 'cryptocom' },
    { name: 'Bitfinex', image: '/wallet-images/Bitfinex.jpeg', id: 'bitfinex' },
    { name: 'Bitcoin.com', image: '/wallet-images/Bitcoin.com.jpeg', id: 'bitcoincom' },
    { name: 'Zengo', image: '/wallet-images/Zengo.jpeg', id: 'zengo' },
  ];

  const handleWalletSelect = (walletId: string) => {
    localStorage.setItem('selectedWallet', walletId);
    navigate('/wallet-connect');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-sky-50 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-navy-600 mb-4">Select Your Wallet</h1>
          <p className="text-gray-600 text-lg">Choose the wallet you want to back up</p>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-12">
          {wallets.map((w, idx) => (
            <motion.button
              key={w.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              onClick={() => handleWalletSelect(w.id)}
              className="flex flex-col items-center p-4 bg-white rounded-2xl shadow hover:shadow-lg transition hover:border-2 hover:border-sky-600"
            >
              <img src={w.image} alt={w.name} className="w-16 h-16 object-contain mb-2" onError={e => { e.currentTarget.style.display='none'; }} />
              <span className="text-sm font-medium text-gray-700 text-center">{w.name}</span>
            </motion.button>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center"
        >
          <p className="text-gray-600 mb-4 text-center">Don't see your wallet? Continue anyway</p>
          <button
            onClick={() => navigate('/wallet-connect')}
            className="inline-flex items-center gap-2 bg-sky-600 text-white px-8 py-3 rounded-lg hover:bg-sky-700 transition font-semibold"
          >
            <FaWallet />
            Continue
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WalletSelection;
