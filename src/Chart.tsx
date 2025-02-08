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

export default function Chart({ chartdata }: { chartdata: chart[] }) {
  const formatXAxis = (tick: number) => {
    const date = new Date(tick * 1000);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: chartdata.length > 365 ? "numeric" : undefined,
    });
  };

  const formatTooltipLabel = (label: number) => {
    const date = new Date(label * 1000);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
    });
  };

  const prices = chartdata.map((d) => d.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const buffer = (maxPrice - minPrice) * 0.1;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartdata}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" tickFormatter={formatXAxis} />
        <YAxis domain={[minPrice - buffer, maxPrice + buffer]} />
        <Tooltip labelFormatter={formatTooltipLabel} />
        <Line type="monotone" dataKey="price" stroke="#000000" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export interface chart {
  time: number;
  price: number;
}
