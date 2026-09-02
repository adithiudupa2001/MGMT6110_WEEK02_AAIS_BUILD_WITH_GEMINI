export type MarketCategory = 'indices' | 'stocks' | 'crypto' | 'forex' | 'futures' | 'bonds' | 'heatmap';

export type Timeframe = '1D' | '5D' | '1M' | '6M' | 'YTD' | '1Y' | '5Y' | 'ALL';

export interface SparklinePoint {
  time: string;
  value: number;
}

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  category: MarketCategory;
  badgeNumber?: string;
  badgeColor?: string; // hex
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  volume: string;
  marketCap?: string;
  peRatio?: number;
  week52High: number;
  week52Low: number;
  sparkline: number[];
  constituents?: Constituent[];
  description?: string;
  country?: string;
}

export interface Constituent {
  symbol: string;
  name: string;
  weight: number;
  price: number;
  changePercent: number;
  marketCap: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  url?: string;
  sentiment?: 'bullish' | 'bearish' | 'neutral';
  relatedTickers?: string[];
}

export interface EconomicEvent {
  id: string;
  time: string;
  currency: string;
  event: string;
  impact: 'high' | 'medium' | 'low';
  actual?: string;
  forecast?: string;
  previous?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  unread: boolean;
  type: 'price_alert' | 'news' | 'market_open' | 'system';
}
