document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the connect button (middle slot)
    const connectButton = document.getElementById('cell-5');
    const connectionDot = document.getElementById('connection-dot');
    const connectionText = document.getElementById('connection-text');
    const walletAddress = document.getElementById('wallet-address');

    // Contract address and ABI (replace these with your actual contract address and ABI)
    const contractAddress = '0x99634f7e0b57B66bD9849728cfe473BD28174eAf'; // Replace with your actual contract address
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

    // Initialize Web3
    let web3;
    let contract;

    // Function to initialize Web3 and contract instance
    async function init() {
        // Modern dapp browsers...
        if (window.ethereum) {
            web3 = new Web3(window.ethereum);
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                contract = new web3.eth.Contract(contractABI, contractAddress);
            } catch (error) {
                console.error('User denied account access or other error:', error);
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            web3 = new Web3(web3.currentProvider);
            contract = new web3.eth.Contract(contractABI, contractAddress);
        }
        // Non-dapp browsers...
        else {
            console.error('Non-Ethereum browser detected. You should consider trying MetaMask!');
        }
    }

    init();

    if (connectButton) {
        connectButton.addEventListener('click', async function() {
            await init();
            checkConnectionStatus();
        });
    }

    // Add event listener to the grid cells (except the connect button)
    const gridCells = document.querySelectorAll('.grid-item:not(#cell-5)');
    gridCells.forEach(cell => {
        cell.addEventListener('click', async function() {
            // Check if connected
            if (!web3) {
                alert('Please connect your wallet first.');
                return;
            }

            // Purchase space
            try {
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
    });

    // Function to check connection status and update indicator
    async function checkConnectionStatus() {
        if (!web3) return;

        // Check if MetaMask is connected
        const accounts = await web3.eth.getAccounts();
        const connected = accounts.length > 0;

        // Update indicator based on connection status
        if (connected) {
            connectionDot.classList.remove('red');
            connectionDot.classList.add('green');
            connectionText.textContent = 'Connected';
            walletAddress.textContent = accounts[0];
        } else {
            connectionDot.classList.remove('green');
            connectionDot.classList.add('red');
            connectionText.textContent = 'Not connected';
            walletAddress.textContent = 'N/A';
        }
    }

    // Listen for account changes
    if (web3) {
        web3.eth.subscribe('accountsChanged', function(accounts) {
            checkConnectionStatus();
        });
    }
});
