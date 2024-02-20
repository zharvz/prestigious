document.addEventListener('DOMContentLoaded', function() {
    // Add event listener to the connect button (middle slot)
    const connectButton = document.getElementById('cell-5');

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
});
