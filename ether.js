const {ethers}  = require('ethers');
require('dotenv').config();

// Replace these with your actual values
const provider = new ethers.providers.JsonRpcProvider(process.env.BNBTestnetUrl)
const privateKey = process.env.USER1_PK;
const contractAddress = process.env.CONTRACT_ADDRESS;

// ABI (Application Binary Interface) of the smart contract
const contractABI = require("./BEP20_ABI.json")
// Connect to the wallet using the private keys
const wallet = new ethers.Wallet(privateKey, provider);

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Address to which you want to send funds
const toAddress = process.env.RecipientAddress;

// Amount to transfer
const amount = ethers.utils.parseEther('1.0'); // 1 ETH in this example

// Call the transfer function of the smart contract
async function sendTransaction() {
  try {
    const transaction = await contract.transfer(toAddress, amount);
    await transaction.wait();
    console.log('Transaction sent successfully:', transaction.hash);
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

// // Call the function to send the transaction
sendTransaction();
