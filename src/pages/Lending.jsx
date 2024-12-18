import React, { useState, useEffect } from 'react';
import { useWeb3 } from '../hooks/useWeb3';
import { lend, withdraw, repay } from '../utils/contract';
import { ethers } from 'ethers';
import { PiggyBank, Wallet, TrendingUp } from 'lucide-react';

const Lending = () => {
  const { account, balance, signer } = useWeb3();
  const [lendAmount, setLendAmount] = useState('');
  const [borrowAmount, setBorrowAmount] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLend = async () => {
    if (!signer || !lendAmount) return;
    setLoading(true);
    try {
      await lend(signer, lendAmount);
      setLendAmount('');
    } catch (error) {
      console.error('Error lending:', error);
    }
    setLoading(false);
  };

  const handleWithdraw = async () => {
    if (!signer || !lendAmount) return;
    setLoading(true);
    try {
      await withdraw(signer, lendAmount);
      setLendAmount('');
    } catch (error) {
      console.error('Error withdrawing:', error);
    }
    setLoading(false);
  };

  const handleRepay = async () => {
    if (!signer || !borrowAmount) return;
    setLoading(true);
    try {
      await repay(signer, borrowAmount);
      setBorrowAmount('');
    } catch (error) {
      console.error('Error repaying:', error);
    }
    setLoading(false);
  };

  const handleBorrow = async () => {
    if (!signer || !borrowAmount) return;
    setLoading(true);
    try {
      await borrow(signer, borrowAmount);
      setBorrowAmount('');
    } catch (error) {
      console.error('Error borrowing:', error);
    }
    setLoading(false);
  };

  if (!account) {
    return (
      <div className="min-h-screen bg-[#f5f5f5] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#6a6867] mb-4">Please connect your wallet</h2>
          <p className="text-gray-500">Connect your wallet to access the lending platform</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f5] pt-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <Wallet className="w-6 h-6 text-[#ec0029]" />
              <span className="text-[#6a6867] font-medium">Wallet Balance</span>
            </div>
            <div className="text-2xl font-bold text-[#6a6867]">
              {balance ? `${Number(balance).toFixed(4)} MNT` : '0 MNT'}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <PiggyBank className="w-6 h-6 text-[#ec0029]" />
              <span className="text-[#6a6867] font-medium">Total Supplied</span>
            </div>
            <div className="text-2xl font-bold text-[#6a6867]">50.800001 MNT</div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center space-x-3 mb-2">
              <TrendingUp className="w-6 h-6 text-[#ec0029]" />
              <span className="text-[#6a6867] font-medium">Total Borrowed</span>
            </div>
            <div className="text-2xl font-bold text-[#6a6867]">6.2 MNT</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-[#6a6867]">Lending</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6a6867] mb-2">
                  Amount to Lend (MNT)
                </label>
                <input
                  type="number"
                  value={lendAmount}
                  onChange={(e) => setLendAmount(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ec0029]"
                  placeholder="0.0"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleLend}
                  disabled={loading || !lendAmount}
                  className="flex-1 bg-[#ec0029] text-white px-4 py-2 rounded-lg hover:bg-[#ec0029]/90 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Lend'}
                </button>
                <button
                  onClick={handleWithdraw}
                  disabled={loading || !lendAmount}
                  className="flex-1 border border-[#ec0029] text-[#ec0029] px-4 py-2 rounded-lg hover:bg-[#ec0029]/10 disabled:opacity-50"
                >
                  {loading ? 'Processing...' : 'Withdraw'}
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-bold mb-6 text-[#6a6867]">Borrowing</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#6a6867] mb-2">
                  Amount to Borrow (MNT)
                </label>
                <input
                  type="number"
                  value={borrowAmount}
                  onChange={(e) => setBorrowAmount(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-[#ec0029]"
                  placeholder="0.0"
                />
              </div>
              <div className="flex space-x-4">
        <button
          onClick={handleBorrow}
          disabled={loading || !borrowAmount}
          className="flex-1 bg-[#ec0029] text-white px-4 py-2 rounded-lg hover:bg-[#ec0029]/90 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Borrow'}
        </button>
        <button
          onClick={handleRepay}
          disabled={loading || !borrowAmount}
          className="flex-1 border border-[#ec0029] text-[#ec0029] px-4 py-2 rounded-lg hover:bg-[#ec0029]/10 disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Repay'}
        </button>
      </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lending;