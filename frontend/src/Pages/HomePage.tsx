import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const popularStocks = [
	{
		name: "Apple",
		ticker: "AAPL",
		logo: "https://logo.clearbit.com/apple.com",
	},
	{
		name: "Microsoft",
		ticker: "MSFT",
		logo: "https://logo.clearbit.com/microsoft.com",
	},
	{
		name: "Tesla",
		ticker: "TSLA",
		logo: "https://logo.clearbit.com/tesla.com",
	},
	{
		name: "Amazon",
		ticker: "AMZN",
		logo: "https://logo.clearbit.com/amazon.com",
	},
	{
		name: "Google",
		ticker: "GOOGL",
		logo: "https://logo.clearbit.com/google.com",
	},
	{
		name: "Meta",
		ticker: "META",
		logo: "https://logo.clearbit.com/meta.com",
	},
	{
		name: "Nvidia",
		ticker: "NVDA",
		logo: "https://logo.clearbit.com/nvidia.com",
	},
	{
		name: "Starbucks",
		ticker: "SBUX",
		logo: "https://logo.clearbit.com/starbucks.com",
	},
];

function HomePage() {
	const navigate = useNavigate();
	const [savedStocks, setSavedStocks] = useState<string[]>([]);

	useEffect(() => {
		const saved = (Cookies.get("sparade") || "").split(",");
		setSavedStocks(saved);
	}, []);

	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			<div className="text-center py-16 bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
				<h1 className="text-4xl font-bold">Aktiekoll</h1>
				<p className="mt-4 text-lg max-w-2xl mx-auto">
					Hemsida för att hålla koll på dina favoritaktier! <br />
					Med live priser!
				</p>
			</div>

			<div className="max-w-6xl mx-auto px-4 py-12">
				<h2 className="text-2xl font-semibold text-center mb-6">
					Populära aktier
				</h2>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
					{popularStocks.map((stock) => (
						<div
							onClick={() => navigate(`/stock/${stock.ticker}`)}
							key={stock.ticker}
							className="p-5 bg-white rounded-2xl shadow-md cursor-pointer"
						>
							<div className="flex flex-col items-center">
								<img
									src={stock.logo}
									alt={stock.name}
									className="w-16 h-16 mb-3 rounded-full"
								/>
								<h3 className="text-lg font-medium">
									{stock.name}
								</h3>
								<p className="text-gray-500">{stock.ticker}</p>
							</div>
						</div>
					))}
				</div>

				{savedStocks.length > 0 && (
					<>
						<h2 className="text-2xl font-semibold text-center mt-10 mb-6">
							Dina sparade aktier
						</h2>
						<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
							{savedStocks
								.filter((s) => s != "")
								.map((stock) => (
									<div
										onClick={() =>
											navigate(`/stock/${stock}`)
										}
										key={stock}
										className="p-5 bg-white rounded-2xl shadow-md cursor-pointer"
									>
										<div className="flex flex-col items-center">
											<p className="text-gray-500">
												{stock.toUpperCase()}
											</p>
										</div>
									</div>
								))}
						</div>
					</>
				)}
			</div>
		</div>
	);
}

export default HomePage;
