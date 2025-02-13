import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		methods: "GET,POST",
	})
);

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
		res.status(400).json({ error: "Problem med api:n :(" });
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

app.listen(3000, () => console.log("Servern körs på port 3000"));
