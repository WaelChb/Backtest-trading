const express = require("express");
const bodyParser = require("body-parser");
const backtestRoutes = require("./routes/backtest");

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/backtest", backtestRoutes);

// Serveur
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
