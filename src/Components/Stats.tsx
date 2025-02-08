import React from "react";
import { chart } from "./stock-type";

function Stats({ chartdata, range }: { chartdata: chart[]; range: string }) {
	if (chartdata.length === 0) return null;

	const prices = chartdata.map((d) => d.price);
	const minPrice = Math.min(...prices);
	const maxPrice = Math.max(...prices);
	const firstPrice = prices[0];
	const lastPrice = prices[prices.length - 1];

	const priceChange = lastPrice - firstPrice;
	const percentageChange = ((priceChange / firstPrice) * 100).toFixed(2);

	return (
		<div className="bg-white p-6 rounded-2xl  w-80">
			<div className="mt-4 space-y-2 text-gray-600">
				<p>
					<span className="font-semibold">Lowest:</span> ${minPrice}
				</p>
				<p>
					<span className="font-semibold">Highest:</span> ${maxPrice}
				</p>
				<p>
					<span className="font-semibold">Change:</span> $
					{priceChange.toFixed(1)} (
					<span
						className={
							priceChange >= 0 ? "text-green-600" : "text-red-600"
						}
					>
						{percentageChange}%
					</span>
					)
				</p>
			</div>
		</div>
	);
}
export default Stats;
