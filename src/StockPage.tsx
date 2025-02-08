import React, { useEffect, useState } from "react";
import { stock } from "./stock-type";
import { useParams } from "react-router-dom";
import Chart from "./Chart";

export default function StockPage() {
  const ranges = ["1d", "5d", "1mo", "3mo", "6mo", "1y", "max"];
  const { ticker } = useParams();
  const [range, setRange] = useState("1d");
  const [stock, setStock] = useState<stock | null>(null);

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
          price: d.prices[index]?.toFixed(2) ?? 0,
        })),
      };
      setStock(s);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  }

  useEffect(() => {
    fetchAPI();
  }, [ticker, range]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      {stock ? (
        <div className="w-full max-w-4xl bg-white p-6 rounded-2xl shadow-lg">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-blue-700">
              {stock.name} ({ticker?.toUpperCase()})
            </h1>
            <p className="text-2xl font-semibold mt-2">${stock.price}</p>
          </div>

          <div className="mt-6">
            <Chart chartdata={stock.chart} />
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
