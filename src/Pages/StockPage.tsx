import React, { useEffect, useState } from "react";
import { stock } from "../Components/stock-type";
import { useParams } from "react-router-dom";
import Chart from "../Components/Chart";
import Cookies from "js-cookie";

function StockPage() {
	const ranges = ["1d", "5d", "1mo", "3mo", "6mo", "1y", "max"];
	const { ticker } = useParams();
	const [range, setRange] = useState("1d");
	const [stock, setStock] = useState<stock | null>(null);
	const [saved, setSaved] = useState(false);

	useEffect(() => {
		fetchAPI();
		checkIfSaved();
	}, [ticker, range]);

	async function fetchAPI() {
		try {
			const res = await fetch(
				`http://localhost:3000/api/${ticker}?range=${range}`
			);
			const d = await res.json();
			const s: stock = {
				name: d.name,
				price: d.price,
				chart: d.times.map((time: string, index: number) => ({
					time: Number(time),
					price: Math.round(d.prices[index]) ?? 0,
				})),
			};
			setStock(s);
		} catch (error) {
			setStock(null);
		}
	}

	function checkIfSaved() {
		const savedStocks = (Cookies.get("sparade") || "")
			.split(",")
			.map((s) => s.toUpperCase());
		console.log(savedStocks);
		setSaved(savedStocks.includes(ticker?.toUpperCase()));
	}

	function toggleSaveStock() {
		if (!stock) return;

		let savedStocks = (Cookies.get("sparade") || "").split(",");

		if (saved) {
			savedStocks = savedStocks.filter(
				(str: string) => str.toUpperCase() !== ticker?.toUpperCase()
			);
			setSaved(false);
		} else {
			savedStocks.push(ticker?.toUpperCase());
			setSaved(true);
		}
		Cookies.set("sparade", savedStocks.join(), {
			expires: 365,
		});
	}

	return (
		<div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
			{stock ? (
				<div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
					<div className="text-center">
						<h1 className="text-3xl font-bold text-blue-700">
							{stock.name} ({ticker?.toUpperCase()})
						</h1>
					</div>

					<button
						onClick={toggleSaveStock}
						className={`mt-4 px-4 py-2 rounded-lg font-semibold transition ${
							saved
								? "bg-red-600 text-white hover:bg-red-700"
								: "bg-green-600 text-white hover:bg-green-700"
						}`}
					>
						{saved ? "Remove from Favorites" : "Save to Favorites"}
					</button>

					<div className="mt-6">
						<Chart chartdata={stock.chart} range={range} />
					</div>

					<div className="mt-6">
						<div className="flex overflow-x-auto space-x-3 scrollbar-hide py-2 px-1">
							{ranges.map((r) => (
								<button
									key={r}
									onClick={() => setRange(r)}
									className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
										range === r
											? "bg-blue-700 text-white"
											: "bg-blue-400 text-white hover:bg-blue-500"
									}`}
								>
									{r}
								</button>
							))}
						</div>
					</div>
				</div>
			) : (
				<p className="text-lg text-gray-600 mt-10">
					Search for a stock to view details.
				</p>
			)}
		</div>
	);
}
export default StockPage;
