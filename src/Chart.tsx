import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import React from "react";
import { chart } from "./stock-type";

interface parametrar {
  chartdata: chart[];
  range: string;
}

export default function Chart({ chartdata, range }: parametrar) {
  const formatter = (tick: number) => {
    const date = new Date(tick * 1000);

    if (range === "1d") {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    if (range === "5d") {
      return date.toLocaleString("en-US", {
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
      });
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: ["1y", "max"].includes(range) ? "numeric" : undefined,
    });
  };

  const prices = chartdata.map((d) => d.price);

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const extra = (maxPrice - minPrice) * 0.1;

  const first = prices[0];
  const last = prices[prices.length - 1];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartdata}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickFormatter={formatter} />
        <YAxis domain={[minPrice - extra, maxPrice + extra]} />
        <Tooltip labelFormatter={formatter} />
        <Line
          type="monotone"
          dataKey="price"
          stroke={first < last ? "#00FF00" : "#FF0000"}
          dot={false}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
