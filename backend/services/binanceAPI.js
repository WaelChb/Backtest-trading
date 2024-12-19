const axios = require("axios");

const BINANCE_BASE_URL = "https://api.binance.com";

// Fonction pour récupérer les données historiques
async function fetchHistoricalPrices(symbol, interval, startTime, endTime) {
  const url = `${BINANCE_BASE_URL}/api/v3/klines`;

  try {
    const response = await axios.get(url, {
      params: {
        symbol,
        interval,
        startTime,
        endTime,
        limit: 1000, // Binance limite à 1000 bougies par requête
      },
    });

    // Structure des données retournées
    return response.data.map((candle) => ({
      openTime: candle[0],
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
      volume: parseFloat(candle[5]),
      closeTime: candle[6],
    }));
  } catch (err) {
    console.error("Error fetching historical prices:", err.message);
    throw err;
  }
}

module.exports = { fetchHistoricalPrices };
