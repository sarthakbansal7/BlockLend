import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { Wallet } from 'lucide-react';

const ConnectWallet = () => {
  const { account, connectWallet } = useWeb3();

  return (
    <button
      onClick={connectWallet}
      className="flex items-center bg-[#ec0029] text-white px-6 py-2 rounded-full hover:bg-[#ec0029]/80 transition-all"
    >
      <Wallet className="w-5 h-5 mr-2" />
      {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
    </button>
  );
};

export default ConnectWallet;