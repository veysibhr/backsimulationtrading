const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5001;

app.use(cors());

// 4 fictional cryptocurrencies with predefined performances
const cryptoData = {
    CryptoA: { price: 100 },
    CryptoB: { price: 50 },
    CryptoC: { price: 200 },
    CryptoD: { price: 10 }
};

// Function to generate a random percentage change between -5% and +5%
const getRandomFluctuation = () => {
    return 1 + (Math.random() * 0.1 - 0.05); // Random number between 0.95 and 1.05
};

// Function to update crypto prices dynamically
function updateCryptoPrices() {
    for (let crypto in cryptoData) {
        const fluctuation = getRandomFluctuation();
        cryptoData[crypto].price = parseFloat((cryptoData[crypto].price * fluctuation).toFixed(2));
    }
}

// Endpoint to get the current crypto prices
app.get('/api/cryptos', (req, res) => {
    res.json(cryptoData);
});

// Timer to update prices every 3 seconds for 3 minutes
setInterval(updateCryptoPrices, 3000);  // Update every 3 seconds

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
