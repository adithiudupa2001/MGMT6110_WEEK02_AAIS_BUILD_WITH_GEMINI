import React, { useState } from 'react';
import { MarketItem } from '../types';
import { Layers, ArrowUpRight, ArrowDownRight, Eye } from 'lucide-react';

interface HeatmapTile {
  symbol: string;
  name: string;
  sector: string;
  weight: number;
  changePercent: number;
  price: number;
}

interface MarketHeatmapProps {
  onSelectSymbol: (symbol: string) => void;
}

export const MarketHeatmap: React.FC<MarketHeatmapProps> = ({ onSelectSymbol }) => {
  const [selectedSector, setSelectedSector] = useState<string>('All');

  const heatmapData: HeatmapTile[] = [
    // Technology
    { symbol: 'AAPL', name: 'Apple Inc.', sector: 'Technology', weight: 14, changePercent: 0.65, price: 234.80 },
    { symbol: 'MSFT', name: 'Microsoft', sector: 'Technology', weight: 13, changePercent: -0.32, price: 448.20 },
    { symbol: 'NVDA', name: 'NVIDIA', sector: 'Technology', weight: 13, changePercent: 2.15, price: 138.50 },
    { symbol: 'AVGO', name: 'Broadcom', sector: 'Technology', weight: 5, changePercent: 3.40, price: 178.60 },
    { symbol: 'AMD', name: 'AMD', sector: 'Technology', weight: 4, changePercent: 2.79, price: 156.40 },
    // Communication / Internet
    { symbol: 'GOOGL', name: 'Alphabet', sector: 'Communication', weight: 9, changePercent: -0.15, price: 182.90 },
    { symbol: 'META', name: 'Meta', sector: 'Communication', weight: 8, changePercent: 1.45, price: 592.10 },
    { symbol: 'NFLX', name: 'Netflix', sector: 'Communication', weight: 3, changePercent: 1.80, price: 710.20 },
    // Consumer Cyclical
    { symbol: 'AMZN', name: 'Amazon', sector: 'Consumer Cyclical', weight: 10, changePercent: -0.80, price: 196.40 },
    { symbol: 'TSLA', name: 'Tesla', sector: 'Consumer Cyclical', weight: 6, changePercent: -2.30, price: 242.60 },
    { symbol: 'HD', name: 'Home Depot', sector: 'Consumer Cyclical', weight: 3, changePercent: -0.45, price: 408.30 },
    // Financial
    { symbol: 'BRK.B', name: 'Berkshire', sector: 'Financial', weight: 5, changePercent: 0.12, price: 462.10 },
    { symbol: 'JPM', name: 'JPMorgan Chase', sector: 'Financial', weight: 4, changePercent: 0.75, price: 224.50 },
    { symbol: 'V', name: 'Visa', sector: 'Financial', weight: 4, changePercent: 0.35, price: 290.40 },
    { symbol: 'GS', name: 'Goldman Sachs', sector: 'Financial', weight: 3, changePercent: 0.85, price: 512.90 },
    // Healthcare
    { symbol: 'LLY', name: 'Eli Lilly', sector: 'Healthcare', weight: 5, changePercent: -1.20, price: 890.30 },
    { symbol: 'UNH', name: 'UnitedHealth', sector: 'Healthcare', weight: 4, changePercent: -1.10, price: 578.40 },
    // Energy
    { symbol: 'XOM', name: 'ExxonMobil', sector: 'Energy', weight: 3, changePercent: 1.25, price: 122.40 },
  ];

  const sectors = ['All', 'Technology', 'Communication', 'Consumer Cyclical', 'Financial', 'Healthcare', 'Energy'];

  const filteredData = selectedSector === 'All'
    ? heatmapData
    : heatmapData.filter((d) => d.sector === selectedSector);

  return (
    <section className="bg-white border border-[#E0E3EB] rounded-2xl p-5 shadow-2xs mb-14">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E0E3EB]">
        <div>
          <h2 className="text-lg font-bold text-[#181c21] flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0049db]" />
            S&P 500 Market Heatmap
          </h2>
          <p className="text-xs text-[#5a5e6b] mt-0.5">
            Tile size indicates relative market capitalization; color represents daily percentage movement.
          </p>
        </div>

        {/* Sector filters */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {sectors.map((sec) => (
            <button
              key={sec}
              onClick={() => setSelectedSector(sec)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedSector === sec
                  ? 'bg-[#0049db] text-white shadow-xs'
                  : 'bg-[#f1f4fb] hover:bg-[#ebeef5] text-[#5a5e6b]'
              }`}
            >
              {sec}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Heatmap Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 mt-4">
        {filteredData.map((tile) => {
          const isPos = tile.changePercent >= 0;
          const absChange = Math.abs(tile.changePercent);
          
          // Compute color intensity based on magnitude
          let bgClass = '';
          if (isPos) {
            if (absChange > 2) bgClass = 'bg-[#089981] text-white';
            else if (absChange > 1) bgClass = 'bg-[#089981]/85 text-white';
            else bgClass = 'bg-[#089981]/25 text-[#089981] border border-[#089981]/40';
          } else {
            if (absChange > 2) bgClass = 'bg-[#f23645] text-white';
            else if (absChange > 1) bgClass = 'bg-[#f23645]/85 text-white';
            else bgClass = 'bg-[#f23645]/25 text-[#f23645] border border-[#f23645]/40';
          }

          // Relative col span for larger market cap items
          const colSpan = tile.weight > 10 ? 'col-span-2 row-span-2' : tile.weight > 6 ? 'col-span-2' : 'col-span-1';

          return (
            <div
              key={tile.symbol}
              onClick={() => onSelectSymbol(tile.symbol)}
              className={`${colSpan} ${bgClass} rounded-xl p-3 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md min-h-[90px]`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="font-bold font-mono text-sm tracking-tight">{tile.symbol}</span>
                  <div className="text-[11px] opacity-90 truncate max-w-[120px]">{tile.name}</div>
                </div>
                <span className="text-[10px] uppercase opacity-75 font-mono">{tile.sector.slice(0, 4)}</span>
              </div>

              <div className="flex items-end justify-between mt-2 font-mono">
                <span className="text-xs font-semibold tabular-nums">${tile.price.toFixed(2)}</span>
                <span className="text-xs font-bold tabular-nums">
                  {isPos ? '+' : ''}
                  {tile.changePercent.toFixed(2)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
