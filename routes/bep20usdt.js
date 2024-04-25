import express from "express";
import verifyuser from "../utils/Verify.js";
const router = express.Router();
import Web3 from "web3";

router.get("/", verifyuser, async (req, res) => {

    try {
        const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org"))
        const account = web3.eth.accounts.create();
        res.status(201).json({
            message: "Account fetch",
            account
        })
    } catch (error) {
        res.status(403).json({
            error
        })
    }
});

router.post('/transfer', verifyuser, async (req, res) => {
    try {
        const { from, fromkey, to, amount } = req.body;
        const realamount= amount - 0.5;
        //console.log(amount)
        const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org"))
        const contractaddres = "0x55d398326f99059fF775485246999027B3197955"; //BEP20USDT
        const api = [{ "inputs": [], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "spender", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Approval", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }, { "constant": true, "inputs": [], "name": "_decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "_symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "spender", "type": "address" }], "name": "allowance", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "approve", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "account", "type": "address" }], "name": "balanceOf", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "burn", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "decimals", "outputs": [{ "internalType": "uint8", "name": "", "type": "uint8" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "subtractedValue", "type": "uint256" }], "name": "decreaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "getOwner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "spender", "type": "address" }, { "internalType": "uint256", "name": "addedValue", "type": "uint256" }], "name": "increaseAllowance", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "mint", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "name", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [], "name": "renounceOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "symbol", "outputs": [{ "internalType": "string", "name": "", "type": "string" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "totalSupply", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transfer", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "sender", "type": "address" }, { "internalType": "address", "name": "recipient", "type": "address" }, { "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "transferFrom", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]
        
        let gas = await web3.eth.estimateGas({
            "from": from,
        });

        const contract = new web3.eth.Contract(api, contractaddres)
        // console.log(contract)
        const gasPrice = web3.utils.toWei('10', 'gwei')
        const tx = {
            from: from,
            to: contractaddres,
            gas: 200000,
            gasPrice: gasPrice,
            value: 0,

            data: contract.methods.transfer(to, realamount*1000000000000000000).encodeABI(),
        };
        // console.log(tx)
        try {

            const signedTx = await web3.eth.accounts.signTransaction(tx, fromkey);
            //console.log(signedTx)
            // send = hash.transactionHash;
            const hash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
            // console.log(hash.transactionHash)
            res.status(200).json(hash.transactionHash)
        } catch (error) {
            res.status(403).json({
                error
            })
        }
    } catch (error) {
        res.status(403).json({
            error
        })
    }


});


router.get("/gettransections", verifyuser, async (req, res) => {

    try {

        const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org"));
        const walletAddress = req.query.wallet;
        const transactions = await web3.eth.getTransaction(walletAddress)
        console.log(transactions)
    } catch (error) {
        console.error('Error:', error);
        res.status(403).json({
            error: error.message // Send error message in response
        });

    }


});

async function fetchTransactions(walletAddress, fromBlockNumber, toBlockNumber) {
    try {
        const web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed1.binance.org"));
        const transactions = [];

        for (let blockNumber = fromBlockNumber; blockNumber <= toBlockNumber; blockNumber++) {
            // Get block information
            const block = await web3.eth.getBlock(blockNumber, true);

            if (block && Array.isArray(block.transactions)) {
                // Filter transactions related to the wallet address
                // const filteredTransactions = block.transactions.filter((transaction:any) =>  (transaction.to && transaction.to.toLowerCase() === walletAddress.toLowerCase())
                // );

                // Add filtered transactions to the transactions array
                transactions.push(block.transactions);
            } else {
                console.log(`No transactions in Block ${blockNumber}`);
            }
        }

        return transactions;
    } catch (error) {
        console.error('Error fetching transactions:', error);
        throw error; // Rethrow the error to handle it outside the function
    }
}





export default router;