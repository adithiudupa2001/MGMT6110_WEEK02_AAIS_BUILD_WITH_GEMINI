import React, { useState, useMemo } from 'react';
import { X, Star, TrendingUp, TrendingDown, Clock, Activity, Share2, Layers, ExternalLink, BarChart2, ShieldCheck, Newspaper } from 'lucide-react';
import { MarketItem, Timeframe } from '../types';
import { Sparkline } from './Sparkline';
import { MOCK_NEWS } from '../data/mockMarketData';

interface MarketDetailModalProps {
  item: MarketItem | null;
  onClose: () => void;
  isWatchlisted: boolean;
  onToggleWatchlist: (item: MarketItem) => void;
  onSelectConstituent?: (symbol: string) => void;
}

export const MarketDetailModal: React.FC<MarketDetailModalProps> = ({
  item,
  onClose,
  isWatchlisted,
  onToggleWatchlist,
  onSelectConstituent,
}) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('1D');
  const [chartType, setChartType] = useState<'area' | 'candles'>('area');
  const [hoveredPoint, setHoveredPoint] = useState<{ index: number; value: number } | null>(null);

  if (!item) return null;

  const isPositive = item.change >= 0;

  // Generate extended mock historical series based on chosen timeframe
  const chartData = useMemo(() => {
    const pointsCount = timeframe === '1D' ? 24 : timeframe === '5D' ? 30 : timeframe === '1M' ? 30 : 50;
    const basePrice = item.price;
    const volatility = timeframe === '1D' ? 0.008 : timeframe === '1M' ? 0.04 : 0.12;

    const data: { label: string; price: number; high: number; low: number; open: number; close: number; volume: number }[] = [];
    let current = basePrice * (1 - (isPositive ? 0.015 : -0.015));

    for (let i = 0; i < pointsCount; i++) {
      const step = (Math.random() - 0.48) * (basePrice * volatility * 0.4);
      current = Math.max(current + step, basePrice * 0.7);
      const high = current * (1 + Math.random() * 0.004);
      const low = current * (1 - Math.random() * 0.004);
      const open = low + Math.random() * (high - low);
      const close = low + Math.random() * (high - low);
      const vol = Math.floor(Math.random() * 800000) + 200000;

      let label = '';
      if (timeframe === '1D') {
        const hour = 9 + Math.floor(i / 3.5);
        const min = (i % 4) * 15;
        label = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`;
      } else {
        label = `Day ${i + 1}`;
      }

      data.push({ label, price: current, high, low, open, close, volume: vol });
    }

    // Set last point to current price
    if (data.length > 0) {
      data[data.length - 1].price = item.price;
      data[data.length - 1].close = item.price;
    }
    return data;
  }, [item.price, timeframe, isPositive]);

  // Chart rendering geometry
  const chartHeight = 260;
  const chartWidth = 720;
  const paddingX = 20;
  const paddingY = 20;

  const minPrice = Math.min(...chartData.map((d) => d.low || d.price));
  const maxPrice = Math.max(...chartData.map((d) => d.high || d.price));
  const priceRange = maxPrice - minPrice || 1;

  const pointsString = chartData
    .map((d, i) => {
      const x = paddingX + (i / (chartData.length - 1)) * (chartWidth - paddingX * 2);
      const y = chartHeight - paddingY - ((d.price - minPrice) / priceRange) * (chartHeight - paddingY * 2);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' L ');

  const currentDisplayPrice = hoveredPoint ? hoveredPoint.value : item.price;
  const dayRangeProgress =
    item.high !== item.low ? Math.min(Math.max(((item.price - item.low) / (item.high - item.low)) * 100, 0), 100) : 50;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white rounded-2xl border border-[#E0E3EB] shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-[#181c21]">
        {/* Modal Header */}
        <div className="p-5 border-b border-[#E0E3EB] flex items-center justify-between bg-[#f7f9ff]">
          <div className="flex items-center gap-3">
            {item.badgeNumber && (
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-xs"
                style={{ backgroundColor: item.badgeColor || '#0088cc' }}
              >
                {item.badgeNumber}
              </div>
            )}
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold">{item.name}</h2>
                <span className="text-xs font-mono font-semibold px-2 py-0.5 bg-white border border-[#E0E3EB] rounded text-[#5a5e6b]">
                  {item.symbol}
                </span>
                {item.country && (
                  <span className="text-xs text-[#5a5e6b] hidden sm:inline">• {item.country}</span>
                )}
              </div>
              <p className="text-xs text-[#5a5e6b] mt-0.5 line-clamp-1 max-w-xl">
                {item.description || 'Real-time financial benchmark instrument'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleWatchlist(item)}
              className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                isWatchlisted
                  ? 'bg-amber-50 border-amber-300 text-amber-600'
                  : 'bg-white border-[#E0E3EB] text-[#5a5e6b] hover:text-[#0049db]'
              }`}
              title={isWatchlisted ? 'Remove from Watchlist' : 'Add to Watchlist'}
            >
              <Star className={`w-4 h-4 ${isWatchlisted ? 'fill-amber-500' : ''}`} />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white border border-[#E0E3EB] hover:bg-[#ebeef5] text-[#5a5e6b] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 overflow-y-auto space-y-6">
          {/* Price & Primary Bar */}
          <div className="flex flex-wrap items-end justify-between gap-4 pb-2 border-b border-[#E0E3EB]/70">
            <div>
              <div className="text-3xl md:text-4xl font-bold font-mono tracking-tight tabular-nums">
                {currentDisplayPrice.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className="flex items-center gap-2.5 mt-1">
                <span
                  className={`inline-flex items-center gap-1 font-semibold text-sm px-2.5 py-0.5 rounded-full tabular-nums ${
                    isPositive ? 'bg-[#089981]/15 text-[#089981]' : 'bg-[#f23645]/15 text-[#f23645]'
                  }`}
                >
                  {isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  {isPositive ? '+' : ''}
                  {item.change.toFixed(2)} ({isPositive ? '+' : ''}
                  {item.changePercent.toFixed(2)}%)
                </span>
                <span className="text-xs text-[#5a5e6b] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> Market Open • Real-Time Quotes
                </span>
              </div>
            </div>

            {/* Timeframe & Chart Style toggles */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex bg-[#f1f4fb] p-0.5 rounded-lg border border-[#E0E3EB]">
                {(['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'ALL'] as Timeframe[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframe(tf)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                      timeframe === tf
                        ? 'bg-[#0049db] text-white shadow-2xs'
                        : 'text-[#5a5e6b] hover:text-[#181c21]'
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>

              <div className="flex bg-[#f1f4fb] p-0.5 rounded-lg border border-[#E0E3EB]">
                <button
                  onClick={() => setChartType('area')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    chartType === 'area' ? 'bg-white text-[#0049db] shadow-2xs' : 'text-[#5a5e6b]'
                  }`}
                >
                  Area
                </button>
                <button
                  onClick={() => setChartType('candles')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                    chartType === 'candles' ? 'bg-white text-[#0049db] shadow-2xs' : 'text-[#5a5e6b]'
                  }`}
                >
                  Candles
                </button>
              </div>
            </div>
          </div>

          {/* Interactive Chart Canvas */}
          <div className="bg-[#f7f9ff] border border-[#E0E3EB] rounded-xl p-4 relative">
            <div className="flex justify-between items-center text-xs text-[#5a5e6b] mb-1 font-mono">
              <span>High: {maxPrice.toFixed(2)}</span>
              <span>Low: {minPrice.toFixed(2)}</span>
            </div>

            <div className="w-full h-[240px] relative">
              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="modalAreaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={isPositive ? '#089981' : '#f23645'}
                      stopOpacity="0.25"
                    />
                    <stop
                      offset="100%"
                      stopColor={isPositive ? '#089981' : '#f23645'}
                      stopOpacity="0.0"
                    />
                  </linearGradient>
                </defs>

                {/* Horizontal Grid lines */}
                {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => {
                  const y = chartHeight * ratio;
                  return (
                    <line
                      key={idx}
                      x1={paddingX}
                      y1={y}
                      x2={chartWidth - paddingX}
                      y2={y}
                      stroke="#E0E3EB"
                      strokeDasharray="4 4"
                    />
                  );
                })}

                {chartType === 'area' ? (
                  <>
                    {/* Area fill */}
                    <path
                      d={`M ${pointsString} L ${chartWidth - paddingX},${chartHeight - paddingY} L ${paddingX},${chartHeight - paddingY} Z`}
                      fill="url(#modalAreaGradient)"
                    />
                    {/* Line stroke */}
                    <path
                      d={`M ${pointsString}`}
                      fill="none"
                      stroke={isPositive ? '#089981' : '#f23645'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </>
                ) : (
                  /* Candlesticks view */
                  chartData.map((candle, idx) => {
                    const x = paddingX + (idx / (chartData.length - 1)) * (chartWidth - paddingX * 2);
                    const isBull = candle.close >= candle.open;
                    const candleColor = isBull ? '#089981' : '#f23645';
                    const yHigh = chartHeight - paddingY - ((candle.high - minPrice) / priceRange) * (chartHeight - paddingY * 2);
                    const yLow = chartHeight - paddingY - ((candle.low - minPrice) / priceRange) * (chartHeight - paddingY * 2);
                    const yOpen = chartHeight - paddingY - ((candle.open - minPrice) / priceRange) * (chartHeight - paddingY * 2);
                    const yClose = chartHeight - paddingY - ((candle.close - minPrice) / priceRange) * (chartHeight - paddingY * 2);
                    const boxTop = Math.min(yOpen, yClose);
                    const boxHeight = Math.max(Math.abs(yClose - yOpen), 2);

                    return (
                      <g key={idx}>
                        <line x1={x} y1={yHigh} x2={x} y2={yLow} stroke={candleColor} strokeWidth="1.5" />
                        <rect
                          x={x - 4}
                          y={boxTop}
                          width="8"
                          height={boxHeight}
                          fill={candleColor}
                          rx="1"
                        />
                      </g>
                    );
                  })
                )}

                {/* Hover interaction points */}
                {chartData.map((d, i) => {
                  const x = paddingX + (i / (chartData.length - 1)) * (chartWidth - paddingX * 2);
                  const y = chartHeight - paddingY - ((d.price - minPrice) / priceRange) * (chartHeight - paddingY * 2);
                  return (
                    <circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="7"
                      className="opacity-0 hover:opacity-100 fill-[#0049db] stroke-white stroke-2 cursor-pointer transition-opacity"
                      onMouseEnter={() => setHoveredPoint({ index: i, value: d.price })}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                  );
                })}
              </svg>
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#737687] mt-2 font-mono">
              <span>{chartData[0]?.label || 'Open'}</span>
              <span>Mid Session</span>
              <span>{chartData[chartData.length - 1]?.label || 'Latest'}</span>
            </div>
          </div>

          {/* Key Statistics Grid */}
          <div>
            <h3 className="text-sm font-bold text-[#181c21] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BarChart2 className="w-4 h-4 text-[#0049db]" />
              Key Statistics & Overview
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-[#f7f9ff] border border-[#E0E3EB] rounded-lg p-3">
                <span className="text-xs text-[#5a5e6b] block">Open</span>
                <span className="text-sm font-semibold font-mono tabular-nums">
                  {item.open.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#f7f9ff] border border-[#E0E3EB] rounded-lg p-3">
                <span className="text-xs text-[#5a5e6b] block">Previous Close</span>
                <span className="text-sm font-semibold font-mono tabular-nums">
                  {item.previousClose.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#f7f9ff] border border-[#E0E3EB] rounded-lg p-3">
                <span className="text-xs text-[#5a5e6b] block">Day Range</span>
                <span className="text-sm font-semibold font-mono tabular-nums">
                  {item.low.toLocaleString()} - {item.high.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#f7f9ff] border border-[#E0E3EB] rounded-lg p-3">
                <span className="text-xs text-[#5a5e6b] block">52-Week Range</span>
                <span className="text-sm font-semibold font-mono tabular-nums">
                  {item.week52Low.toLocaleString()} - {item.week52High.toLocaleString()}
                </span>
              </div>
              <div className="bg-[#f7f9ff] border border-[#E0E3EB] rounded-lg p-3">
                <span className="text-xs text-[#5a5e6b] block">Volume</span>
                <span className="text-sm font-semibold font-mono tabular-nums">{item.volume}</span>
              </div>
              <div className="bg-[#f7f9ff] border border-[#E0E3EB] rounded-lg p-3">
                <span className="text-xs text-[#5a5e6b] block">P/E Ratio</span>
                <span className="text-sm font-semibold font-mono tabular-nums">
                  {item.peRatio ? item.peRatio.toFixed(1) : 'N/A'}
                </span>
              </div>
              <div className="bg-[#f7f9ff] border border-[#E0E3EB] rounded-lg p-3">
                <span className="text-xs text-[#5a5e6b] block">Market Cap</span>
                <span className="text-sm font-semibold font-mono tabular-nums">
                  {item.marketCap || 'Benchmark'}
                </span>
              </div>
              <div className="bg-[#f7f9ff] border border-[#E0E3EB] rounded-lg p-3">
                <span className="text-xs text-[#5a5e6b] block">Technical Signal</span>
                <span className="text-sm font-semibold text-[#089981] flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Bullish (68/100)
                </span>
              </div>
            </div>
          </div>

          {/* Constituents (if available) */}
          {item.constituents && item.constituents.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-[#181c21] uppercase tracking-wider flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#0049db]" />
                  Top Constituents & Weights ({item.constituents.length})
                </h3>
                <span className="text-xs text-[#5a5e6b]">Updated live</span>
              </div>

              <div className="border border-[#E0E3EB] rounded-xl overflow-hidden bg-white shadow-2xs">
                <table className="w-full text-left text-sm">
                  <thead className="bg-[#f1f4fb] text-xs font-semibold text-[#5a5e6b] uppercase tracking-wider border-b border-[#E0E3EB]">
                    <tr>
                      <th className="py-2.5 px-4">Symbol</th>
                      <th className="py-2.5 px-4">Company</th>
                      <th className="py-2.5 px-4 text-right">Weight</th>
                      <th className="py-2.5 px-4 text-right">Price</th>
                      <th className="py-2.5 px-4 text-right">Change</th>
                      <th className="py-2.5 px-4 text-right hidden sm:table-cell">Market Cap</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E0E3EB]/70">
                    {item.constituents.map((c) => {
                      const cPositive = c.changePercent >= 0;
                      return (
                        <tr
                          key={c.symbol}
                          className="hover:bg-[#f7f9ff] cursor-pointer transition-colors"
                          onClick={() => onSelectConstituent?.(c.symbol)}
                        >
                          <td className="py-2.5 px-4 font-bold text-[#0049db] font-mono">
                            {c.symbol}
                          </td>
                          <td className="py-2.5 px-4 font-medium text-[#181c21]">{c.name}</td>
                          <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#5a5e6b]">
                            {c.weight}%
                          </td>
                          <td className="py-2.5 px-4 text-right font-mono font-semibold tabular-nums">
                            ${c.price.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-4 text-right font-mono tabular-nums">
                            <span
                              className={`inline-block px-1.5 py-0.5 rounded text-xs font-semibold ${
                                cPositive ? 'text-[#089981] bg-[#089981]/10' : 'text-[#f23645] bg-[#f23645]/10'
                              }`}
                            >
                              {cPositive ? '+' : ''}
                              {c.changePercent.toFixed(2)}%
                            </span>
                          </td>
                          <td className="py-2.5 px-4 text-right font-mono tabular-nums text-[#5a5e6b] hidden sm:table-cell">
                            {c.marketCap}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Related News */}
          <div>
            <h3 className="text-sm font-bold text-[#181c21] uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Newspaper className="w-4 h-4 text-[#0049db]" />
              Related Market Pulse News
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {MOCK_NEWS.slice(0, 2).map((news) => (
                <div
                  key={news.id}
                  className="p-3 bg-[#f7f9ff] hover:bg-white border border-[#E0E3EB] hover:border-[#0049db] rounded-lg transition-all cursor-pointer"
                >
                  <div className="flex items-center justify-between text-xs text-[#5a5e6b] mb-1">
                    <span className="font-semibold text-[#0049db]">{news.source}</span>
                    <span>{news.timeAgo}</span>
                  </div>
                  <h4 className="text-xs font-semibold text-[#181c21] line-clamp-2">{news.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#E0E3EB] bg-[#f7f9ff] flex items-center justify-between">
          <div className="text-xs text-[#5a5e6b]">
            Exchange: <strong>NYSE / NASDAQ</strong> • Delayed 0s (Live)
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-white border border-[#E0E3EB] hover:bg-[#ebeef5] text-[#181c21] cursor-pointer"
            >
              Close
            </button>
            <button
              onClick={() => onToggleWatchlist(item)}
              className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-[#2962ff] text-white hover:bg-[#0049db] cursor-pointer shadow-xs"
            >
              {isWatchlisted ? 'In Watchlist' : 'Add to Watchlist'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
