import React from 'react';
import { useNavigate } from 'react-router-dom';
import ConnectWallet from './ConnectWallet';

const Navigation = () => {
  const navigate = useNavigate();

  return (
    <nav className="fixed w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <h1 className="text-2xl font-bold text-[#ec0029]">BlockLend</h1>
            <button 
              onClick={() => navigate('/')}
              className="text-gray-600 hover:text-[#ec0029]"
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/lending')}
              className="text-gray-600 hover:text-[#ec0029]"
            >
              App
            </button>
          </div>
          <ConnectWallet />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;