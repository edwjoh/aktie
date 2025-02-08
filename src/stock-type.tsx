export interface stock {
  name: string;
  price: number;
  chart: chart[];
}

export interface chart {
  time: number;
  price: number;
}
