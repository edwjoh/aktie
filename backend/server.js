import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());

const ranges = ["1d", "5d", "1mo", "3mo", "6mo", "1y", "max"];
const intervals = ["15m", "1h", "1d", "5d", "1wk", "1wk", "3mo"];

app.get("/api/:symbol", async (req, res) => {
  const symbol = req.params.symbol;
  const q = req.query;
  try {
    const response = await fetch(
      `https://query2.finance.yahoo.com/v8/finance/chart/${symbol}?range=${
        q.range
      }&interval=${intervals[ranges.indexOf(q.range)]}`
    );
    const data = await response.json();
    res.json(clean(data));
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

function clean(data) {
  const d = data.chart.result[0];
  const name = d.meta.longName;
  const price = d.meta.previousClose;
  const prices = d.indicators.quote[0].high;
  const times = d.timestamp;

  return { name: name, price: price, prices: prices, times: times };
}

app.listen(3000, () => console.log("Server running on port 3000"));
