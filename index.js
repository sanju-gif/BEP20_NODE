const {Web3} = require('web3');
require('dotenv').config();
// Connect to a local Ethereum node (you can replace this URL with the URL of your Ethereum node)
const web3 = new Web3('https://bsc-testnet.publicnode.com');

const contractABI = require("./BEP20_ABI.json")

// Address of the smart contract
const contractAddress = process.env.CONTRACT_ADDRESS;

const fromAccount = process.env.USER1_ADDRESS;

// Private key of the fromAccount (needed to sign the transaction)
const privateKey = process.env.USER1_PK;

// Create a contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Function to send a transaction to the smart contract
async function sendTransaction() {
  const gasPrice = await web3.eth.getGasPrice();
  const gasLimit = 300000; 

  const data = contract.methods.transfer(process.env.RecipientAddress, 100).encodeABI();

  const nonce = await web3.eth.getTransactionCount(fromAccount);
  const rawTransaction = {
    nonce: web3.utils.toHex(nonce),
    gasPrice: web3.utils.toHex(gasPrice),
    gasLimit: web3.utils.toHex(gasLimit),
    to: contractAddress,
    data: data,
  };

  const signedTransaction = await web3.eth.accounts.signTransaction(rawTransaction, privateKey);

  web3.eth.sendSignedTransaction(signedTransaction.rawTransaction)
    .on('transactionHash', function (hash) {
      console.log('Transaction Hash:', hash);
    })
    .on('receipt', function (receipt) {
      console.log('Transaction Receipt:', receipt);
    })
    .on('error', function (error) {
      console.error('Error:', error);
    });
}

// Call the function to send the transaction
sendTransaction();