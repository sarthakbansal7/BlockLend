import { ethers } from 'ethers';

const contractABI = [
  {
    "name": "Borrow",
    "type": "event"
  },
  {
    "name": "Withdraw",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "lend",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "repay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];

const contractAddress = "0x9ce2DaF245ADe333A77c6DCfC56845d491b33CfB";

export const getLendingContract = (signer) => {
  return new ethers.Contract(contractAddress, contractABI, signer);
};

export const lend = async (signer, amount) => {
  try {
    const contract = getLendingContract(signer);
    const tx = await contract.lend({ value: ethers.utils.parseEther(amount.toString()) });
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error lending:', error);
    return false;
  }
};

export const withdraw = async (signer, amount) => {
  try {
    const contract = getLendingContract(signer);
    const tx = await contract.withdraw(ethers.utils.parseEther(amount.toString()));
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error withdrawing:', error);
    return false;
  }
};

export const repay = async (signer, amount) => {
  try {
    const contract = getLendingContract(signer);
    const tx = await contract.repay({ value: ethers.utils.parseEther(amount.toString()) });
    await tx.wait();
    return true;
  } catch (error) {
    console.error('Error repaying:', error);
    return false;
  }
};