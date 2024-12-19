const express = require("express");
const router = express.Router();
const { fetchHistoricalPrices } = require("../services/binanceAPI");
const { runBacktest } = require("../services/gridStrategy");

// Route pour exécuter un backtest
router.post("/run", async (req, res) => {
  const { symbol, interval, startTime, endTime, initialCapital } = req.body;

  try {
    // Récupération des données de prix
    const priceData = (
      await fetchHistoricalPrices(symbol, interval, startTime, endTime)
    ).map((candle) => candle.close);

    // Exécution du backtest
    const result = runBacktest({ initialCapital, priceData });
    res.json(result);
  } catch (err) {
    console.error("Error during backtest:", err.message);
    res.status(500).json({ error: "Failed to run backtest" });
  }
});

module.exports = router;
