document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the connect button (middle slot)
    const connectButton = document.getElementById('cell-5');
    const connectionDot = document.getElementById('connection-dot');
    const connectionText = document.getElementById('connection-text');
    const walletAddress = document.getElementById('wallet-address');

    if (connectButton) {
        connectButton.addEventListener('click', function() {
            // Request connection to the user's wallet (e.g., MetaMask)
            if (window.ethereum) {
                window.ethereum.request({ method: 'eth_requestAccounts' });
            } else {
                console.error('Web3 provider not detected');
            }
        });
    }

    // Check connection status on page load
    checkConnectionStatus();

    // Function to check connection status and update indicator
    async function checkConnectionStatus() {
        // Check if MetaMask is connected
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
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
    window.ethereum.on('accountsChanged', function(accounts) {
        checkConnectionStatus();
    });
});
