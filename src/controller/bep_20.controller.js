const { ethers } = require('ethers');
require('dotenv').config();

// Replace these with your actual values
const provider = new ethers.providers.JsonRpcProvider(process.env.BNBTestnetUrl)
const privateKey = process.env.USER1_PK;
const contractAddress = process.env.CONTRACT_ADDRESS;

const contractABI = require('../config/BEP20_ABI.json')
// Connect to the wallet using the private keys
const wallet = new ethers.Wallet(privateKey, provider);

// Create a contract instance
const contract = new ethers.Contract(contractAddress, contractABI, wallet);

// Address to which you want to send funds
const toAddress = process.env.RecipientAddress;

// Amount to transfer


const sendBep = async (req, res) => {
  try {
    const { toAddress, amount } = req.body
    if (!toAddress) {
      return res.status(500).send({ msg: "Please pass recipient address." })
    }
    if (!amount) {
      return res.status(500).send({ msg: "Amount is required." })
    }
    const transaction = await contract.transfer(toAddress, ethers.utils.formatUnits(amount, 0));
    await transaction.wait();
    return res.send({ msg: "Transaction sent successfully", "status": "success", "hash": transaction.hash }).status(200)
  } catch (error) {
    console.error('Error sending transaction:', error);
  }
}

module.exports = { sendBep }