function runBacktest({ initialCapital, priceData }) {
  let cash = initialCapital; // Capital en USD
  let positions = 0; // Nombre de parts possédées
  const gridLevels = [0.02, 0.05, 0.08]; // Niveaux de baisse pour achats
  const sellThreshold = 0.005; // Seuil de chute pour vente
  let lastBuyPrice = priceData[0];
  const buyLogs = [];
  const sellLogs = [];

  priceData.forEach((price, index) => {
    const changePercent = (price - lastBuyPrice) / lastBuyPrice;

    // Vente si le prix chute de 0.5%
    if (positions > 0 && changePercent <= -sellThreshold) {
      cash += positions * price;
      sellLogs.push({
        time: index,
        sellPrice: price,
        positionsSold: positions,
      });
      positions = 0;
    }

    // Achat en fonction des grilles
    gridLevels.forEach((gridLevel) => {
      if (changePercent <= -gridLevel) {
        const amountToBuy = cash / (gridLevels.length * price);
        cash -= amountToBuy * price;
        positions += amountToBuy;
        lastBuyPrice = price;
        buyLogs.push({
          time: index,
          buyPrice: price,
          amountBought: amountToBuy,
        });
      }
    });
  });

  return {
    finalCash: cash,
    finalPositions: positions,
    totalValue: cash + positions * priceData[priceData.length - 1],
    buyLogs,
    sellLogs,
  };
}

module.exports = { runBacktest };
