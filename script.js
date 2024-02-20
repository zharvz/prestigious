// Import Web3 library
import Web3 from 'web3';

// Initialize Web3
const web3 = new Web3(window.ethereum);

// Contract address and ABI (replace these with your actual contract address and ABI)
const contractAddress = '0x99634f7e0b57B66bD9849728cfe473BD28174eAf';
const contractABI = [
	{
		"inputs": [],
		"name": "purchaseSpace",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "buyer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "SpacePurchased",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "developer",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "spacePrice",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "spacesOwned",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Initialize contract instance
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Add event listener to purchase button
document.addEventListener('DOMContentLoaded', function() {
    const purchaseButton = document.getElementById('purchase-button');

    if (purchaseButton) {
        purchaseButton.addEventListener('click', async function() {
            try {
                // Call the purchaseSpace function of the contract
                await contract.methods.purchaseSpace().send({
                    from: web3.eth.defaultAccount,
                    value: web3.utils.toWei('0.01', 'ether')
                });
                alert('Space purchased successfully!');
            } catch (error) {
                console.error('Error purchasing space:', error);
                alert('Error purchasing space. Please try again later.');
            }
        });
    }
});

// Add event listener to withdraw button (for developer)
const withdrawButton = document.getElementById('withdraw-button');
if (withdrawButton) {
    withdrawButton.addEventListener('click', async function() {
        try {
            // Call the withdraw function of the contract
            await contract.methods.withdraw().send({ from: web3.eth.defaultAccount });
            alert('Withdrawal successful!');
        } catch (error) {
            console.error('Error withdrawing funds:', error);
            alert('Error withdrawing funds. Please try again later.');
        }
    });
}
